// Photo-real laptop mockups for the Projects section.
//
// Warps each project screenshot onto the screen of a real laptop photo
// (free Unsplash License) with a perspective (homography) transform, then
// re-lights it from the photo so it sits naturally in the scene.
//
// Usage (from the project root):
//   node scripts/make-mockups.js <screenshots-dir> <photos-dir> public/projects
//
// screenshots-dir: 1.png (Ceylon Curry Pot), 2.png (Inventory), 3.png (Corpovinculo),
//                  4.webp (DJ Lidan), 5.webp (Save Marine Life)
// photos-dir:      ccp.jpg, inventory.jpg, corpo-night.jpg (3200px), lidan.jpg, marine.jpg
//
// Photo credits (Unsplash License — free for commercial use, no attribution required):
//   ccp.jpg        Alex Knight     https://unsplash.com/photos/j4uuKnN43_M
//   inventory.jpg  Devin Pickell   https://unsplash.com/photos/qu8w7x-0gw4
//   corpo-night.jpg Avtar Singh    https://unsplash.com/photos/P6NY5x3ivYg
//   lidan.jpg      Filip Baotić    https://unsplash.com/photos/zJ4yDrGMlp4
//   marine.jpg     Devin Pickell   https://unsplash.com/photos/p0UwQ-Wd8TM

const path = require("path");
const sharp = require(path.join(process.cwd(), "node_modules", "sharp"));

const [, , SHOTS, PHOTOS, OUT] = process.argv;
const SCREEN_W = 1600, SCREEN_H = 1000; // screenshot is fitted to 16:10 first

// Screen quads (in original photo pixels) were found by flood-filling each photo's
// screen from a seed point (corners = extremes of x+y and x-y); corpo-night.jpg's
// black screen merges with its dark room, so its corners were read from zoomed crops.
// `inset` trims to the active display area (u0,v0,u1,v1 in quad space; negative v0
// extends over the macOS menu bar). `crop` frames the laptop tightly; it is enlarged
// to `size` BEFORE the screenshot is warped in, so screen text stays crisp.
const jobs = [
  {
    shot: "1.png", photo: "ccp.jpg", out: "ccp-closeup.webp", size: [2000, 1200],
    quad: { tl: [796, 383], tr: [1709, 385], br: [1716, 984], bl: [788, 1002] },
    inset: [0.022, 0.045, 0.978, 0.962], glass: "black", fit: "cover",
    crop: { left: 410, top: 300, width: 1700, height: 1020 },
  },
  {
    shot: "2.png", photo: "inventory.jpg", out: "ccp-inventory-closeup.webp", size: [2000, 1200],
    quad: { tl: [341, 337], tr: [1548, 359], br: [1586, 1076], bl: [358, 1126] },
    inset: [-0.002, -0.052, 1.002, 1.004], glass: "lit", fit: "extend",
    crop: { left: 160, top: 230, width: 2000, height: 1200 },
  },
  {
    // wider 2.4:1 frame — this one is the wide "featured" card
    shot: "3.png", photo: "corpo-night.jpg", out: "corpovinculo-closeup.webp", size: [2400, 1000],
    quad: { tl: [713, 605], tr: [1950, 557], br: [2087, 1352], bl: [840, 1503] },
    inset: [0.016, 0.03, 0.984, 0.945], glass: "black", fit: "extend",
    crop: { left: 0, top: 510, width: 3200, height: 1333 },
  },
  {
    shot: "4.webp", photo: "lidan.jpg", out: "lidan-dj-closeup.webp", size: [2000, 1200],
    quad: { tl: [726, 1399], tr: [1530, 1406], br: [1540, 1903], bl: [729, 1902] },
    inset: [-0.008, -0.012, 1.008, 1.01], glass: "lit", fit: "cover",
    crop: { left: 460, top: 1255, width: 1450, height: 870 },
  },
  {
    shot: "5.webp", photo: "marine.jpg", out: "save-marine-closeup.webp", size: [2000, 1200],
    quad: { tl: [565, 225], tr: [1845, 225], br: [1841, 1000], bl: [570, 1001] },
    inset: [-0.002, -0.05, 1.002, 1.004], glass: "lit", fit: "cover",
    crop: { left: 215, top: 110, width: 2000, height: 1200 },
  },
];

// ── Homography helpers ─────────────────────────────────────────────────────
// Solve the 8-unknown projective map from the unit square to a quad.
function squareToQuad([x0, y0], [x1, y1], [x2, y2], [x3, y3]) {
  // corners in order: (0,0)->p0 tl, (1,0)->p1 tr, (1,1)->p2 br, (0,1)->p3 bl
  const dx1 = x1 - x2, dx2 = x3 - x2, dx3 = x0 - x1 + x2 - x3;
  const dy1 = y1 - y2, dy2 = y3 - y2, dy3 = y0 - y1 + y2 - y3;
  const den = dx1 * dy2 - dx2 * dy1;
  const g = (dx3 * dy2 - dx2 * dy3) / den;
  const h = (dx1 * dy3 - dx3 * dy1) / den;
  return [
    x1 - x0 + g * x1, x3 - x0 + h * x3, x0,
    y1 - y0 + g * y1, y3 - y0 + h * y3, y0,
    g, h, 1,
  ];
}
function invert3(m) {
  const [a, b, c, d, e, f, g, h, i] = m;
  const A = e * i - f * h, B = -(d * i - f * g), C = d * h - e * g;
  const det = a * A + b * B + c * C;
  return [
    A / det, -(b * i - c * h) / det, (b * f - c * e) / det,
    B / det, (a * i - c * g) / det, -(a * f - c * d) / det,
    C / det, -(a * h - b * g) / det, (a * e - b * d) / det,
  ];
}
const apply = (m, x, y) => {
  const w = m[6] * x + m[7] * y + m[8];
  return [(m[0] * x + m[1] * y + m[2]) / w, (m[3] * x + m[4] * y + m[5]) / w];
};

async function fitScreenshot(file, fit) {
  if (fit === "extend") {
    // keep full width, continue the page's own background colour below
    const fitted = await sharp(file).resize({ width: SCREEN_W }).removeAlpha().png().toBuffer();
    const meta = await sharp(fitted).metadata();
    const { data } = await sharp(fitted).extract({ left: 2, top: meta.height - 2, width: 1, height: 1 }).raw().toBuffer({ resolveWithObject: true });
    const extended = await sharp(fitted)
      .extend({ bottom: Math.max(0, SCREEN_H - meta.height), background: { r: data[0], g: data[1], b: data[2] } })
      .png().toBuffer();
    return sharp(extended).extract({ left: 0, top: 0, width: SCREEN_W, height: SCREEN_H }).raw().toBuffer({ resolveWithObject: true });
  }
  return sharp(file).resize(SCREEN_W, SCREEN_H, { fit: "cover", position: "top" }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
}

(async () => {
  for (const j of jobs) {
    // crop tightly around the laptop and enlarge to the output size first
    const [PW, PH] = j.size;
    const framed = await sharp(path.join(PHOTOS, j.photo))
      .removeAlpha()
      .extract(j.crop)
      .resize(PW, PH, { kernel: "lanczos3" })
      .png()
      .toBuffer();
    const px = (await sharp(framed).raw().toBuffer()).slice();
    // low-frequency lighting only: blur so on-screen details (menu bar text,
    // icons) don't ghost through the relit screenshot
    const light = await sharp(framed).blur(30).raw().toBuffer();
    const k = PW / j.crop.width;
    const toOut = ([x, y]) => [(x - j.crop.left) * k, (y - j.crop.top) * k];
    const quad = { tl: toOut(j.quad.tl), tr: toOut(j.quad.tr), br: toOut(j.quad.br), bl: toOut(j.quad.bl) };
    const shot = await fitScreenshot(path.join(SHOTS, j.shot), j.fit);
    const sd = shot.data;

    // map unit square -> detected quad, then pull the inset sub-rectangle
    const H0 = squareToQuad(quad.tl, quad.tr, quad.br, quad.bl);
    const [u0, v0, u1, v1] = j.inset;
    const corners = [[u0, v0], [u1, v0], [u1, v1], [u0, v1]].map(([u, v]) => apply(H0, u, v));
    const H = squareToQuad(...corners);
    const Hinv = invert3(H);

    // approximate edge lengths in px for 1px anti-aliased edges
    const len = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
    const edgeW = (len(corners[0], corners[1]) + len(corners[3], corners[2])) / 2;
    const edgeH = (len(corners[0], corners[3]) + len(corners[1], corners[2])) / 2;

    // Lighting grid for lit panels: sample the blurred photo on a 5x5 grid kept
    // inside the panel (away from the bezel), normalised to the brightest sample.
    const G = 5, grid = [];
    if (j.glass === "lit") {
      let max = 1;
      for (let gy = 0; gy < G; gy++) for (let gx = 0; gx < G; gx++) {
        const [lx, ly] = apply(H, 0.12 + (gx / (G - 1)) * 0.76, 0.12 + (gy / (G - 1)) * 0.76).map(Math.round);
        const i = (ly * PW + lx) * 3;
        const l = (light[i] + light[i + 1] + light[i + 2]) / 3;
        grid.push(l); if (l > max) max = l;
      }
      for (let k = 0; k < grid.length; k++) grid[k] = Math.min(1, Math.max(0.82, grid[k] / max));
    }
    const shadeAt = (u, v) => {
      const gu = Math.min(1, Math.max(0, (u - 0.12) / 0.76)) * (G - 1);
      const gv = Math.min(1, Math.max(0, (v - 0.12) / 0.76)) * (G - 1);
      const x0 = Math.min(G - 2, gu | 0), y0 = Math.min(G - 2, gv | 0), fx = gu - x0, fy = gv - y0;
      const a = grid[y0 * G + x0], b = grid[y0 * G + x0 + 1], c = grid[(y0 + 1) * G + x0], d = grid[(y0 + 1) * G + x0 + 1];
      return (a * (1 - fx) + b * fx) * (1 - fy) + (c * (1 - fx) + d * fx) * fy;
    };

    const xs = corners.map((c) => c[0]), ys = corners.map((c) => c[1]);
    const minX = Math.max(0, Math.floor(Math.min(...xs)) - 2), maxX = Math.min(PW - 1, Math.ceil(Math.max(...xs)) + 2);
    const minY = Math.max(0, Math.floor(Math.min(...ys)) - 2), maxY = Math.min(PH - 1, Math.ceil(Math.max(...ys)) + 2);

    for (let y = minY; y <= maxY; y++) {
      for (let x = minX; x <= maxX; x++) {
        const [u, v] = apply(Hinv, x + 0.5, y + 0.5);
        const cov =
          Math.min(1, Math.max(0, Math.min(u, 1 - u) * edgeW + 0.5)) *
          Math.min(1, Math.max(0, Math.min(v, 1 - v) * edgeH + 0.5));
        if (cov <= 0) continue;

        // bilinear sample from the screenshot
        const sx = Math.min(SCREEN_W - 1.001, Math.max(0, u * SCREEN_W - 0.5));
        const sy = Math.min(SCREEN_H - 1.001, Math.max(0, v * SCREEN_H - 0.5));
        const ix = sx | 0, iy = sy | 0, fx = sx - ix, fy = sy - iy;
        const p00 = (iy * SCREEN_W + ix) * 3, p10 = p00 + 3, p01 = p00 + SCREEN_W * 3, p11 = p01 + 3;

        const o = (y * PW + x) * 3;
        const shade = j.glass === "lit" ? shadeAt(u, v) : 1;
        for (let c = 0; c < 3; c++) {
          let s =
            (sd[p00 + c] * (1 - fx) + sd[p10 + c] * fx) * (1 - fy) +
            (sd[p01 + c] * (1 - fx) + sd[p11 + c] * fx) * fy;
          const orig = px[o + c];
          if (j.glass === "lit") {
            // carry the panel's real light falloff onto the screenshot
            s *= shade * 0.98;
          } else {
            // emissive screen under glass: slight dim + keep the faint reflections
            s = s * 0.93 + orig * 0.55;
          }
          px[o + c] = Math.round(Math.min(255, orig * (1 - cov) + s * cov));
        }
      }
    }

    await sharp(px, { raw: { width: PW, height: PH, channels: 3 } })
      .modulate({ saturation: 1.04 })
      .webp({ quality: 86, effort: 5 })
      .toFile(path.join(OUT, j.out));
    console.log("wrote", j.out);
  }
})().catch((e) => { console.error(e); process.exit(1); });
