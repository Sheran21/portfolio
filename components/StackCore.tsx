"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Stack Core — a three.js scene for the Skills section.
 * A noise-displaced plasma core with a fresnel rim, a slowly counter-rotating
 * geodesic shell, three tilted orbits carrying skill nodes, and a particle halo.
 * Labels are real DOM (crisp fonts, accessible) projected from 3D each frame.
 */

type Node = { label: string; color: string; ring: number };

const NODES: Node[] = [
  { label: "TypeScript", color: "#3b82f6", ring: 0 },
  { label: "React",      color: "#61dafb", ring: 0 },
  { label: "Next.js",    color: "#f4f1fa", ring: 0 },
  { label: "Angular",    color: "#f43f5e", ring: 0 },
  { label: "Flutter",    color: "#54c5f8", ring: 0 },
  { label: "Android",    color: "#3ddc84", ring: 0 },
  { label: "Node.js",    color: "#84cc16", ring: 1 },
  { label: "Java",       color: "#f87171", ring: 1 },
  { label: "Spring Boot", color: "#6db33f", ring: 1 },
  { label: "Python",     color: "#facc15", ring: 1 },
  { label: "PostgreSQL", color: "#7aa2f7", ring: 1 },
  { label: "MongoDB",    color: "#22c55e", ring: 1 },
  { label: "Docker",     color: "#2496ed", ring: 2 },
  { label: "Jest",       color: "#e879f9", ring: 2 },
  { label: "Git",        color: "#fb7185", ring: 2 },
  { label: "CI/CD",      color: "#d9f99d", ring: 2 },
];

const RINGS = [
  { radius: 2.35, tilt: new THREE.Euler(1.2, 0.0, 0.35), speed: 0.16 },
  { radius: 1.95, tilt: new THREE.Euler(1.95, 0.5, -0.4), speed: -0.22 },
  { radius: 1.55, tilt: new THREE.Euler(0.6, -0.7, 0.9), speed: 0.3 },
];

// Ashima Arts simplex noise (MIT) — compact 3D version
const NOISE_GLSL = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0); const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy)); vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz); vec3 l=1.0-g; vec3 i1=min(g.xyz,l.zxy); vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx; vec3 x2=x0-i2+C.yyy; vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857; vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z); vec4 x_=floor(j*ns.z); vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy; vec4 y=y_*ns.x+ns.yyyy; vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy); vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0; vec4 s1=floor(b1)*2.0+1.0; vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy; vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x); vec3 p1=vec3(a0.zw,h.y); vec3 p2=vec3(a1.xy,h.z); vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0); m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`;

const coreVertex = /* glsl */ `
uniform float uTime;
uniform float uHover;
varying vec3 vNormal;
varying vec3 vViewPos;
varying float vNoise;
${NOISE_GLSL}
void main(){
  float n = snoise(normal * 1.2 + vec3(uTime * 0.3));
  float n2 = snoise(normal * 2.6 - vec3(uTime * 0.4)) * 0.25;
  vNoise = n + n2;
  vec3 displaced = position + normal * (vNoise * (0.07 + uHover * 0.06));
  vec4 mv = modelViewMatrix * vec4(displaced, 1.0);
  vViewPos = mv.xyz;
  vNormal = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * mv;
}`;

const coreFragment = /* glsl */ `
uniform float uTime;
varying vec3 vNormal;
varying vec3 vViewPos;
varying float vNoise;
void main(){
  vec3 viewDir = normalize(-vViewPos);
  float fres = pow(1.0 - max(dot(viewDir, normalize(vNormal)), 0.0), 3.0);
  vec3 deep = vec3(0.03, 0.01, 0.09);
  vec3 violet = vec3(0.33, 0.13, 0.75);
  vec3 fuchsia = vec3(0.91, 0.40, 0.98);
  vec3 lime = vec3(0.80, 0.98, 0.55);
  float t = smoothstep(-0.7, 0.9, vNoise);
  vec3 col = mix(deep, violet, t * 0.75);
  // thin glowing contour bands flowing over the surface
  float bands = pow(0.5 + 0.5 * sin(vNoise * 22.0 + uTime * 1.4), 48.0);
  col += fuchsia * bands * (0.15 + t * 0.35);
  // soft inner light where the surface bulges outward
  col += violet * smoothstep(0.3, 1.0, vNoise) * 0.35;
  col += mix(fuchsia, lime, smoothstep(0.6, 1.0, fres)) * fres * 1.1;
  gl_FragColor = vec4(col, 1.0);
}`;

function makeGlowTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  grad.addColorStop(0, "rgba(255,255,255,1)");
  grad.addColorStop(0.25, "rgba(255,255,255,0.45)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 128, 128);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export default function StackCore() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hoverRef = useRef<number>(-1);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ── Renderer / scene / camera ──
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.domElement.style.display = "block";
    wrap.prepend(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0, 8.2);

    const root = new THREE.Group();
    scene.add(root);

    const disposables: { dispose: () => void }[] = [];
    const track = <T extends { dispose: () => void }>(x: T) => { disposables.push(x); return x; };
    const glowTex = track(makeGlowTexture());

    // ── Core ──
    const coreUniforms = { uTime: { value: 0 }, uHover: { value: 0 } };
    const core = new THREE.Mesh(
      track(new THREE.IcosahedronGeometry(1.1, 48)),
      track(new THREE.ShaderMaterial({ uniforms: coreUniforms, vertexShader: coreVertex, fragmentShader: coreFragment })),
    );
    root.add(core);

    const coreGlow = new THREE.Sprite(track(new THREE.SpriteMaterial({
      map: glowTex, color: 0x7c3aed, transparent: true, opacity: 0.4,
      blending: THREE.AdditiveBlending, depthWrite: false,
    })));
    coreGlow.scale.setScalar(4.6);
    root.add(coreGlow);

    // ── Geodesic shell ──
    const shell = new THREE.LineSegments(
      track(new THREE.EdgesGeometry(track(new THREE.IcosahedronGeometry(1.38, 1)))),
      track(new THREE.LineBasicMaterial({ color: 0xc4b5fd, transparent: true, opacity: 0.16 })),
    );
    root.add(shell);

    // ── Orbits + nodes ──
    const nodeGeo = track(new THREE.SphereGeometry(0.075, 20, 20));
    const orbitGroups = RINGS.map((ring) => {
      const tiltGroup = new THREE.Group();
      tiltGroup.rotation.copy(ring.tilt);
      const spin = new THREE.Group();
      tiltGroup.add(spin);
      root.add(tiltGroup);

      const pts = new THREE.EllipseCurve(0, 0, ring.radius, ring.radius, 0, Math.PI * 2).getPoints(160);
      const lineGeo = track(new THREE.BufferGeometry().setFromPoints(pts.map((p) => new THREE.Vector3(p.x, p.y, 0))));
      const line = new THREE.LineLoop(lineGeo, track(new THREE.LineBasicMaterial({
        color: 0xa78bfa, transparent: true, opacity: 0.22,
      })));
      tiltGroup.add(line);
      return { tiltGroup, spin, ring };
    });

    const nodeObjs = NODES.map((n) => {
      const ringNodes = NODES.filter((x) => x.ring === n.ring);
      const idx = ringNodes.indexOf(n);
      const angle = (idx / ringNodes.length) * Math.PI * 2 + n.ring * 0.6;
      const { spin, ring } = orbitGroups[n.ring];

      const holder = new THREE.Group();
      holder.position.set(Math.cos(angle) * ring.radius, Math.sin(angle) * ring.radius, 0);
      spin.add(holder);

      const color = new THREE.Color(n.color);
      const mesh = new THREE.Mesh(nodeGeo, track(new THREE.MeshBasicMaterial({ color })));
      holder.add(mesh);

      const glow = new THREE.Sprite(track(new THREE.SpriteMaterial({
        map: glowTex, color, transparent: true, opacity: 0.85,
        blending: THREE.AdditiveBlending, depthWrite: false,
      })));
      glow.scale.setScalar(0.55);
      holder.add(glow);
      return { holder, mesh, glow, scale: 1 };
    });

    // ── Particle halo ──
    const COUNT = 900;
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const palette = [new THREE.Color("#c4b5fd"), new THREE.Color("#e879f9"), new THREE.Color("#8b5cf6"), new THREE.Color("#d9f99d")];
    for (let i = 0; i < COUNT; i++) {
      const r = 1.6 + Math.pow(Math.random(), 0.6) * 2.4;
      const u = Math.random() * 2 - 1;
      const th = Math.random() * Math.PI * 2;
      const s = Math.sqrt(1 - u * u);
      positions.set([r * s * Math.cos(th), r * u * 0.8, r * s * Math.sin(th)], i * 3);
      const c = palette[i % 17 === 0 ? 3 : i % 3];
      colors.set([c.r, c.g, c.b], i * 3);
    }
    const pGeo = track(new THREE.BufferGeometry());
    pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    pGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    const particles = new THREE.Points(pGeo, track(new THREE.PointsMaterial({
      size: 0.035, map: glowTex, vertexColors: true, transparent: true, opacity: 0.85,
      blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true,
    })));
    root.add(particles);

    // ── Sizing ──
    let width = 1, height = 1;
    const resize = () => {
      width = wrap.clientWidth;
      height = wrap.clientHeight;
      renderer.setSize(width, height, false);
      renderer.domElement.style.width = `${width}px`;
      renderer.domElement.style.height = `${height}px`;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    // ── Pointer parallax ──
    const pointer = { x: 0, y: 0 };
    const onPointerMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      pointer.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      pointer.y = ((e.clientY - r.top) / r.height) * 2 - 1;
    };
    const onPointerLeave = () => { pointer.x = 0; pointer.y = 0; };
    wrap.addEventListener("pointermove", onPointerMove);
    wrap.addEventListener("pointerleave", onPointerLeave);

    // ── Loop ──
    const timer = new THREE.Timer();
    timer.connect(document);
    const tmp = new THREE.Vector3();
    const camDir = new THREE.Vector3();
    let hoverMix = 0;

    const renderFrame = () => {
      timer.update();
      const dt = Math.min(timer.getDelta(), 0.05);
      const t = reduceMotion ? 0 : timer.getElapsed();

      coreUniforms.uTime.value = t;
      hoverMix = THREE.MathUtils.damp(hoverMix, hoverRef.current >= 0 ? 1 : 0, 6, dt);
      coreUniforms.uHover.value = hoverMix;

      if (!reduceMotion) {
        core.rotation.y += dt * 0.15;
        shell.rotation.y -= dt * 0.08;
        shell.rotation.x += dt * 0.03;
        particles.rotation.y += dt * 0.025;
        orbitGroups.forEach(({ spin, ring }) => {
          // slow orbits down while a skill is hovered so it's easy to read
          spin.rotation.z += dt * ring.speed * (1 - hoverMix * 0.85);
        });
        coreGlow.material.opacity = 0.38 + Math.sin(t * 1.6) * 0.06;
      }

      // damped parallax tilt
      root.rotation.x = THREE.MathUtils.damp(root.rotation.x, pointer.y * 0.35, 3, dt);
      root.rotation.y = THREE.MathUtils.damp(root.rotation.y, pointer.x * 0.45, 3, dt);

      // nodes: keep upright scale, hover emphasis, project labels to DOM
      camera.getWorldDirection(camDir);
      nodeObjs.forEach((o, i) => {
        const target = hoverRef.current === i ? 2 : 1;
        o.scale = THREE.MathUtils.damp(o.scale, target, 10, dt);
        o.mesh.scale.setScalar(o.scale);
        o.glow.scale.setScalar(0.55 * o.scale);

        o.holder.getWorldPosition(tmp);
        const depth = THREE.MathUtils.clamp((tmp.z + 2.4) / 4.8, 0, 1); // 0 back → 1 front
        tmp.project(camera);
        const el = labelRefs.current[i];
        if (el) {
          const x = (tmp.x * 0.5 + 0.5) * width;
          const y = (-tmp.y * 0.5 + 0.5) * height;
          el.style.transform = `translate(-50%, -100%) translate(${x}px, ${y - 12}px) scale(${0.8 + depth * 0.25})`;
          el.style.opacity = String(hoverRef.current === i ? 1 : 0.25 + depth * 0.75);
          el.style.zIndex = String(Math.round(depth * 100));
        }
      });

      renderer.render(scene, camera);
    };

    // Run only while visible
    let running = false;
    const start = () => { if (!running) { running = true; renderer.setAnimationLoop(renderFrame); } };
    const stop = () => { if (running) { running = false; renderer.setAnimationLoop(null); } };
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), { rootMargin: "100px" });
    io.observe(wrap);
    renderFrame();
    wrap.style.opacity = "1"; // fade in once the first frame is drawn

    return () => {
      io.disconnect();
      ro.disconnect();
      stop();
      wrap.removeEventListener("pointermove", onPointerMove);
      wrap.removeEventListener("pointerleave", onPointerLeave);
      timer.dispose();
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div className="relative">
      <div
        ref={wrapRef}
        className="relative mx-auto aspect-square w-full max-w-[480px] overflow-hidden opacity-0 transition-opacity duration-700"
      >
        {NODES.map((n, i) => (
          <div
            key={n.label}
            ref={(el) => { labelRefs.current[i] = el; }}
            onPointerEnter={() => { hoverRef.current = i; }}
            onPointerLeave={() => { hoverRef.current = -1; }}
            className="absolute left-0 top-0 flex cursor-default items-center gap-1.5 whitespace-nowrap rounded-full border border-white/10
                       bg-[#0d0b14]/70 px-2.5 py-1 font-mono text-[11px] text-white/90 backdrop-blur-sm will-change-transform
                       transition-[border-color,box-shadow] duration-200 hover:border-white/30"
            style={{ boxShadow: `0 0 18px -6px ${n.color}` }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: n.color }} />
            {n.label}
          </div>
        ))}
      </div>
      <p className="mt-2 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--ink-dim)]">
        hover a skill · move to tilt
      </p>
    </div>
  );
}
