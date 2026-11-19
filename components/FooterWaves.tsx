"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * FooterWaves — a lightweight three.js backdrop for the footer.
 *
 * One THREE.Points draw call: a grid of particles whose wave motion is computed
 * entirely in the vertex shader. Per frame the CPU only updates two uniforms
 * (time + eased pointer), so it stays cheap even on low-end devices.
 * - renders only while the footer is on screen (IntersectionObserver)
 * - pixel ratio capped at 1.5, no antialias (points don't need it)
 * - prefers-reduced-motion → a single static frame
 */

const vertexShader = /* glsl */ `
uniform float uTime;
uniform vec2  uPointer;     // pointer on the plane, in world units
uniform float uPointerMix;  // 0 when the pointer is outside the footer
uniform float uPixelRatio;
varying float vHeight;
varying float vFade;

void main() {
  vec3 p = position;

  // layered travelling waves
  float h = sin(p.x * 0.55 + uTime * 0.9) * 0.35
          + sin(p.z * 0.8 - uTime * 0.7) * 0.25
          + sin((p.x + p.z) * 0.35 + uTime * 0.5) * 0.3;

  // ripple that follows the pointer
  float d = distance(p.xz, uPointer);
  h += sin(d * 2.4 - uTime * 3.0) * exp(-d * 0.55) * 0.55 * uPointerMix;

  p.y += h;
  vHeight = h;

  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;

  // size attenuation + slightly larger crests
  gl_PointSize = (2.2 + max(h, 0.0) * 2.0) * uPixelRatio * (9.0 / -mv.z);

  // fade toward the far edge and the sides
  vFade = smoothstep(18.0, 6.0, -mv.z) * smoothstep(13.0, 7.0, abs(p.x));
}`;

const fragmentShader = /* glsl */ `
varying float vHeight;
varying float vFade;

void main() {
  // soft round sprite
  vec2 uv = gl_PointCoord - 0.5;
  float r = length(uv);
  float a = smoothstep(0.5, 0.0, r);

  vec3 violet  = vec3(0.49, 0.23, 0.93);
  vec3 fuchsia = vec3(0.91, 0.47, 0.98);
  vec3 lime    = vec3(0.85, 0.98, 0.62);
  float t = smoothstep(-0.6, 0.9, vHeight);
  vec3 col = mix(violet, fuchsia, t);
  col = mix(col, lime, smoothstep(0.75, 1.1, vHeight) * 0.8);

  gl_FragColor = vec4(col, a * vFade * (0.35 + t * 0.65));
}`;

export default function FooterWaves() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pixelRatio = Math.min(window.devicePixelRatio, 1.5);

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "low-power" });
    renderer.setPixelRatio(pixelRatio);
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.display = "block";
    wrap.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 60);
    camera.position.set(0, 3.2, 7.5);
    camera.lookAt(0, 0, -2);

    // Particle grid on the XZ plane
    const COLS = 110;
    const ROWS = 46;
    const geometry = new THREE.PlaneGeometry(26, 16, COLS - 1, ROWS - 1);
    geometry.rotateX(-Math.PI / 2);
    geometry.translate(0, 0, -3);
    geometry.deleteAttribute("normal");
    geometry.deleteAttribute("uv");

    const uniforms = {
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uPointerMix: { value: 0 },
      uPixelRatio: { value: pixelRatio },
    };
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Sizing
    const resize = () => {
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      renderer.domElement.style.width = `${w}px`;
      renderer.domElement.style.height = `${h}px`;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    // Pointer → plane (y = 0) via raycast; listen on the footer, the canvas itself ignores events
    const host = wrap.parentElement ?? wrap;
    const raycaster = new THREE.Raycaster();
    const ndc = new THREE.Vector2();
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const hit = new THREE.Vector3();
    const targetPointer = new THREE.Vector2();
    let pointerInside = false;

    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
      raycaster.setFromCamera(ndc, camera);
      if (raycaster.ray.intersectPlane(plane, hit)) {
        targetPointer.set(hit.x, hit.z);
        pointerInside = true;
      }
    };
    const onLeave = () => { pointerInside = false; };
    host.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("pointerleave", onLeave);

    // Loop
    const timer = new THREE.Timer();
    timer.connect(document);

    const frame = () => {
      timer.update();
      const dt = Math.min(timer.getDelta(), 0.05);
      uniforms.uTime.value = timer.getElapsed();
      // ease pointer + ripple strength so motion never snaps
      uniforms.uPointer.value.x = THREE.MathUtils.damp(uniforms.uPointer.value.x, targetPointer.x, 4, dt);
      uniforms.uPointer.value.y = THREE.MathUtils.damp(uniforms.uPointer.value.y, targetPointer.y, 4, dt);
      uniforms.uPointerMix.value = THREE.MathUtils.damp(uniforms.uPointerMix.value, pointerInside ? 1 : 0, 3, dt);
      // slow drift of the whole field
      points.rotation.y = Math.sin(uniforms.uTime.value * 0.05) * 0.08;
      renderer.render(scene, camera);
    };

    let running = false;
    const start = () => {
      if (running || reduceMotion) return;
      running = true;
      renderer.setAnimationLoop(frame);
    };
    const stop = () => {
      if (!running) return;
      running = false;
      renderer.setAnimationLoop(null);
    };
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), { rootMargin: "120px" });
    io.observe(wrap);

    uniforms.uTime.value = 2.0;
    renderer.render(scene, camera); // static first frame (also the reduced-motion frame)
    wrap.style.opacity = "1";

    return () => {
      io.disconnect();
      ro.disconnect();
      stop();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      timer.dispose();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-1000"
    />
  );
}
