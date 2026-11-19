"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/**
 * SplashScreen — "particle assembly".
 *
 * A vortex of GPU particles spirals inward and assembles into the name,
 * holds while the role fades in, then bursts toward the camera as the overlay
 * dissolves into the page. All particle motion runs in the vertex shader; the
 * CPU only advances a few uniforms per frame.
 *
 * UX: skippable (button + Esc), honest progress counter, plays once per session,
 * and reduced-motion users get a short static title card instead.
 */

const NAME = "JANUL";
const SESSION_KEY = "splash-seen";

// Timeline (seconds)
const T_ASSEMBLE_START = 0.15;
const T_ASSEMBLE_END = 2.1;
const T_HOLD_END = 3.4;
const T_EXIT = 0.9; // burst + fade duration

const vertexShader = /* glsl */ `
attribute vec3 aStart;
attribute vec3 aTarget;
attribute float aSeed;

uniform float uTime;
uniform float uAssemble;   // 0 → 1
uniform float uExplode;    // 0 → 1
uniform float uPixelRatio;

varying float vSeed;
varying float vSettle;

float easeOutCubic(float t) { return 1.0 - pow(1.0 - t, 3.0); }

void main() {
  vSeed = aSeed;

  // staggered arrival: each particle starts at a slightly different moment
  float local = clamp((uAssemble - aSeed * 0.45) / 0.55, 0.0, 1.0);
  float e = easeOutCubic(local);
  vSettle = e;

  // the start cloud swirls around the Z axis until the particle departs
  float swirl = uTime * (0.35 + aSeed * 0.5) * (1.0 - e);
  float c = cos(swirl), s = sin(swirl);
  vec3 start = vec3(aStart.x * c - aStart.y * s, aStart.x * s + aStart.y * c, aStart.z);

  // curved flight path: lift along a sideways arc mid-transit
  vec3 p = mix(start, aTarget, e);
  float arc = sin(e * 3.14159) * (1.0 - e);
  p += vec3(-aTarget.y, aTarget.x, 0.0) * arc * 0.35;

  // idle shimmer once settled
  p += vec3(
    sin(uTime * 2.0 + aSeed * 40.0),
    cos(uTime * 1.7 + aSeed * 30.0),
    sin(uTime * 1.3 + aSeed * 20.0)
  ) * 0.012 * e;

  // exit burst: outward from the centre and toward the camera
  vec3 dir = normalize(aTarget + vec3(0.0001, 0.0001, 0.0) + vec3(0.0, 0.0, 0.6 + aSeed));
  p += dir * uExplode * uExplode * (6.0 + aSeed * 10.0);

  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = (2.4 + aSeed * 2.6 + uExplode * 3.0) * uPixelRatio * (10.0 / -mv.z);
}`;

const fragmentShader = /* glsl */ `
uniform float uFade;
varying float vSeed;
varying float vSettle;

void main() {
  float r = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.0, r);

  vec3 violet  = vec3(0.55, 0.36, 0.96);
  vec3 fuchsia = vec3(0.91, 0.47, 0.98);
  vec3 lime    = vec3(0.85, 0.98, 0.62);
  vec3 col = mix(violet, fuchsia, smoothstep(0.2, 0.9, vSeed));
  col = mix(col, lime, step(0.93, vSeed) * 0.85);
  // settled particles brighten slightly so the name reads crisply
  col *= 0.75 + vSettle * 0.45;

  gl_FragColor = vec4(col, a * uFade * (0.75 + vSettle * 0.25));
}`;

/** Sample filled pixels of the name, rendered in the site's display font. */
function sampleName(count: number, worldWidth: number): Float32Array {
  const W = 1200, H = 360;
  const cv = document.createElement("canvas");
  cv.width = W;
  cv.height = H;
  const g = cv.getContext("2d", { willReadFrequently: true })!;
  const family = getComputedStyle(document.body).getPropertyValue("--font-display").trim() || "sans-serif";
  g.fillStyle = "#fff";
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.font = `800 300px ${family}`;
  // keep letter spacing tight like the hero headline
  try { (g as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = "-12px"; } catch {}
  g.fillText(NAME, W / 2, H / 2 + 10);

  const data = g.getImageData(0, 0, W, H).data;
  const pts: number[] = [];
  let minX = W, maxX = 0;
  for (let y = 0; y < H; y += 2) {
    for (let x = 0; x < W; x += 2) {
      if (data[(y * W + x) * 4 + 3] > 140) {
        pts.push(x, y);
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
      }
    }
  }
  const out = new Float32Array(count * 3);
  if (pts.length === 0) return out;
  const textW = Math.max(1, maxX - minX);
  const scale = worldWidth / textW;
  const cx = (minX + maxX) / 2;
  for (let i = 0; i < count; i++) {
    const j = Math.floor(Math.random() * (pts.length / 2)) * 2;
    out[i * 3] = (pts[j] - cx + (Math.random() - 0.5) * 2) * scale;
    out[i * 3 + 1] = -(pts[j + 1] - H / 2 - 10 + (Math.random() - 0.5) * 2) * scale;
    out[i * 3 + 2] = (Math.random() - 0.5) * 0.15;
  }
  return out;
}

export default function SplashScreen({
  onDone,
  onReveal,
}: {
  /** Called when the splash has fully finished and can unmount. */
  onDone: () => void;
  /** Called when the exit begins, so the page can fade in underneath. */
  onReveal?: () => void;
}) {
  const revealRef = useRef(onReveal);
  useEffect(() => { revealRef.current = onReveal; }, [onReveal]);
  const stageRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const skipRef = useRef<() => void>(() => {});
  const [phase, setPhase] = useState<"intro" | "named" | "exit">("intro");

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      try { sessionStorage.setItem(SESSION_KEY, "1"); } catch {}
      onDone();
    };

    // Returning visitor in this session → skip straight to the site
    let seen = false;
    try { seen = sessionStorage.getItem(SESSION_KEY) === "1"; } catch {}
    if (seen) {
      const t = setTimeout(finish, 0);
      return () => clearTimeout(t);
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      // static title card, brief and calm
      const t1 = setTimeout(() => setPhase("named"), 50);
      const t2 = setTimeout(() => { setPhase("exit"); revealRef.current?.(); }, 900);
      const t3 = setTimeout(finish, 1300);
      if (counterRef.current) counterRef.current.textContent = "100";
      skipRef.current = finish;
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }

    // ── three.js setup ──
    const isSmall = window.innerWidth < 640;
    const COUNT = isSmall ? 4200 : 7500;
    const pixelRatio = Math.min(window.devicePixelRatio, 1.75);

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(pixelRatio);
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.display = "block";
    stage.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 10);

    const visibleWidth = () => 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z * camera.aspect;

    const geometry = new THREE.BufferGeometry();
    const starts = new Float32Array(COUNT * 3);
    const seeds = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      // spiral-galaxy start cloud
      const arm = i % 3;
      const r = 3 + Math.pow(Math.random(), 0.7) * 9;
      const theta = arm * ((Math.PI * 2) / 3) + r * 0.45 + (Math.random() - 0.5) * 0.9;
      starts[i * 3] = Math.cos(theta) * r;
      starts[i * 3 + 1] = Math.sin(theta) * r * 0.62;
      starts[i * 3 + 2] = (Math.random() - 0.5) * 6 - 2;
      seeds[i] = Math.random();
    }
    geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(COUNT * 3), 3)); // unused by shader; keeps three happy
    geometry.setAttribute("aStart", new THREE.BufferAttribute(starts, 3));
    geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
    const targetAttr = new THREE.BufferAttribute(new Float32Array(COUNT * 3), 3);
    geometry.setAttribute("aTarget", targetAttr);

    const uniforms = {
      uTime: { value: 0 },
      uAssemble: { value: 0 },
      uExplode: { value: 0 },
      uFade: { value: 0 },
      uPixelRatio: { value: pixelRatio },
    };
    const material = new THREE.ShaderMaterial({
      uniforms, vertexShader, fragmentShader,
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    });
    const points = new THREE.Points(geometry, material);
    points.frustumCulled = false; // positions come from the shader
    scene.add(points);

    const layoutTargets = () => {
      const width = Math.min(visibleWidth() * (isSmall ? 0.84 : 0.62), 9.5);
      targetAttr.array.set(sampleName(COUNT, width));
      targetAttr.needsUpdate = true;
    };

    const resize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight, false);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener("resize", resize);

    // ── Timeline ──
    const timer = new THREE.Timer();
    timer.connect(document);
    let t = 0;
    let t0 = -1;              // timer time at the first rendered frame
    let exitAt = -1;          // time the exit started
    let pageLoaded = document.readyState === "complete";
    const onLoad = () => { pageLoaded = true; };
    window.addEventListener("load", onLoad);
    let shownName = false;

    // Safety nets: never depend solely on animation frames (background tabs,
    // throttled or slow GPUs can stall them) — always finish on a timer too.
    const timers: ReturnType<typeof setTimeout>[] = [];
    const startExit = () => {
      if (exitAt >= 0) return;
      exitAt = t;
      setPhase("exit");
      revealRef.current?.();
      timers.push(setTimeout(finish, T_EXIT * 1000 + 400));
    };
    timers.push(setTimeout(startExit, 8000)); // hard cap on total splash time
    skipRef.current = startExit;

    const frame = () => {
      timer.update();
      // real elapsed time, so throttled/slow frames don't stretch the timeline
      if (t0 < 0) t0 = timer.getElapsed();
      t = timer.getElapsed() - t0;
      uniforms.uTime.value = t;
      uniforms.uFade.value = Math.min(1, t / 0.35);

      const a = THREE.MathUtils.clamp((t - T_ASSEMBLE_START) / (T_ASSEMBLE_END - T_ASSEMBLE_START), 0, 1);
      uniforms.uAssemble.value = a;

      // honest progress: timeline plus actual page load
      const pct = Math.round(Math.min(a, pageLoaded ? 1 : 0.92) * 100);
      if (counterRef.current) counterRef.current.textContent = String(pct).padStart(3, "0");
      if (barRef.current) barRef.current.style.transform = `scaleX(${pct / 100})`;

      if (!shownName && a > 0.82) { shownName = true; setPhase("named"); }

      // gentle camera drift for depth
      camera.position.x = Math.sin(t * 0.4) * 0.25;
      camera.position.y = Math.cos(t * 0.33) * 0.15;
      camera.lookAt(0, 0, 0);

      // hold until the page has loaded (cap at 6s so it never traps the user)
      if (exitAt < 0 && t > T_HOLD_END && (pageLoaded || t > 6)) startExit();

      if (exitAt >= 0) {
        const x = Math.min(1, (t - exitAt) / T_EXIT);
        uniforms.uExplode.value = x;
        uniforms.uFade.value = 1 - x * x;
        if (x >= 1) {
          renderer.setAnimationLoop(null);
          finish();
          return;
        }
      }
      renderer.render(scene, camera);
    };

    // Sample the name once the display font is ready (bounded wait)
    let cancelled = false;
    Promise.race([document.fonts?.ready ?? Promise.resolve(), new Promise((r) => setTimeout(r, 800))]).then(() => {
      if (cancelled) return;
      layoutTargets();
      renderer.setAnimationLoop(frame);
    });

    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") startExit(); };
    window.addEventListener("keydown", onKey);

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      renderer.setAnimationLoop(null);
      window.removeEventListener("resize", resize);
      window.removeEventListener("load", onLoad);
      window.removeEventListener("keydown", onKey);
      timer.dispose();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
  }, [onDone]);

  const named = phase !== "intro";
  const exiting = phase === "exit";

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
      className={`fixed inset-0 z-[9999] overflow-hidden bg-[var(--bg)] transition-opacity duration-700 ${exiting ? "opacity-0" : "opacity-100"}`}
      style={{ transitionDelay: exiting ? "0.15s" : "0s" }}
    >
      {/* soft violet core glow behind the particles */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-700/25 blur-[90px]" />
      <div className="pointer-events-none absolute inset-0 dot-grid [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)] opacity-60" />

      {/* three.js stage */}
      <div ref={stageRef} className="absolute inset-0" />

      {/* Role line under the assembled name */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 flex translate-y-[min(16vw,7.5rem)] justify-center px-6">
        <p
          className={`text-center font-accent text-[clamp(1.1rem,2.6vw,1.6rem)] text-[var(--ink)]/85 transition-all duration-700
                      ${named && !exiting ? "translate-y-0 opacity-100 blur-0" : "translate-y-3 opacity-0 blur-sm"}`}
        >
          Intern Software Engineer <span className="text-violet-300">·</span> itZorix
        </p>
      </div>

      {/* Bottom bar: label, counter, progress line */}
      <div className="absolute inset-x-0 bottom-0 px-5 pb-6 sm:px-10 sm:pb-9">
        <div className="flex items-end justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--ink-dim)]">
          <span>Portfolio · {new Date().getFullYear()}</span>
          <span className="text-[var(--ink-muted)]">
            <span ref={counterRef} className="tabular-nums text-violet-200">000</span>
            <span className="opacity-50"> / 100</span>
          </span>
        </div>
        <div className="mt-3 h-px w-full overflow-hidden bg-white/10">
          <div
            ref={barRef}
            className="h-full origin-left bg-gradient-to-r from-violet-500 via-fuchsia-400 to-lime-200"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>

      {/* Skip */}
      <button
        type="button"
        onClick={() => skipRef.current()}
        className="absolute right-4 top-4 min-h-[44px] rounded-full border border-white/10 bg-white/[0.04] px-4 font-mono text-[11px]
                   uppercase tracking-[0.2em] text-[var(--ink-muted)] backdrop-blur transition hover:border-violet-300/40 hover:text-white sm:right-8 sm:top-7"
      >
        Skip <span className="opacity-50">· esc</span>
      </button>
    </div>
  );
}
