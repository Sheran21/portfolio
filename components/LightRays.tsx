import { useRef, useEffect, useState, useCallback } from 'react';
import { Renderer, Program, Triangle, Mesh } from 'ogl';

export type RaysOrigin =
  | 'top-center' | 'top-left' | 'top-right'
  | 'right' | 'left'
  | 'bottom-center' | 'bottom-right' | 'bottom-left';

interface LightRaysProps {
  raysOrigin?: RaysOrigin;
  raysColor?: string;
  raysSpeed?: number;
  lightSpread?: number;
  rayLength?: number;
  pulsating?: boolean;
  fadeDistance?: number;
  saturation?: number;
  followMouse?: boolean;
  mouseInfluence?: number;
  noiseAmount?: number;
  distortion?: number;
  className?: string;
}

const hexToRgb = (hex: string): [number, number, number] => {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return m
    ? [parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255, parseInt(m[3], 16) / 255]
    : [1, 1, 1];
};

const getAnchorAndDir = (
  origin: RaysOrigin, w: number, h: number
): { anchor: [number, number]; dir: [number, number] } => {
  const o = 0.2;
  switch (origin) {
    case 'top-left':     return { anchor: [0,           -o * h],       dir: [0,  1] };
    case 'top-right':    return { anchor: [w,            -o * h],       dir: [0,  1] };
    case 'left':         return { anchor: [-o * w,        0.5 * h],     dir: [1,  0] };
    case 'right':        return { anchor: [(1 + o) * w,   0.5 * h],     dir: [-1, 0] };
    case 'bottom-left':  return { anchor: [0,           (1+o)*h],       dir: [0, -1] };
    case 'bottom-center':return { anchor: [0.5*w,       (1+o)*h],       dir: [0, -1] };
    case 'bottom-right': return { anchor: [w,           (1+o)*h],       dir: [0, -1] };
    default:             return { anchor: [0.5*w,        -o * h],       dir: [0,  1] };
  }
};

const LightRays: React.FC<LightRaysProps> = ({
  raysOrigin = 'top-center',
  raysColor = '#ffffff',
  raysSpeed = 1,
  lightSpread = 1,
  rayLength = 2,
  pulsating = false,
  fadeDistance = 1.0,
  saturation = 1.0,
  followMouse = true,
  mouseInfluence = 0.1,
  noiseAmount = 0.0,
  distortion = 0.0,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<{
    renderer: Renderer | null;
    uniforms: Record<string, { value: unknown }> | null;
    mesh: Mesh | null;
    rafId: number | null;
    mouse: { x: number; y: number };
    smoothMouse: { x: number; y: number };
    cleanup: (() => void) | null;
  }>({
    renderer: null, uniforms: null, mesh: null, rafId: null,
    mouse: { x: 0.5, y: 0.5 }, smoothMouse: { x: 0.5, y: 0.5 },
    cleanup: null,
  });

  const [isVisible, setIsVisible] = useState(false);

  // Intersection observer — only render when visible
  useEffect(() => {
    if (!containerRef.current) return;
    const obs = new IntersectionObserver(
      ([e]) => setIsVisible(e.isIntersecting),
      { threshold: 0.05 }
    );
    obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  // Reduced-motion preference — skip WebGL entirely
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const init = useCallback(async () => {
    const s = stateRef.current;
    if (!containerRef.current || prefersReducedMotion) return;

    if (s.cleanup) { s.cleanup(); s.cleanup = null; }

    await new Promise(r => setTimeout(r, 10));
    if (!containerRef.current) return;

    // ── Cap DPR: 1 on mobile, 1.5 on desktop to reduce fill rate ──
    const isMobile = window.innerWidth < 768;
    const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio, 1.5);

    const renderer = new Renderer({ dpr, alpha: true });
    s.renderer = renderer;

    const gl = renderer.gl;
    gl.canvas.style.width = '100%';
    gl.canvas.style.height = '100%';
    while (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild);
    }
    containerRef.current.appendChild(gl.canvas);

    const vert = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}`;

    const frag = `precision mediump float;
uniform float iTime;
uniform vec2  iResolution;
uniform vec2  rayPos;
uniform vec2  rayDir;
uniform vec3  raysColor;
uniform float raysSpeed;
uniform float lightSpread;
uniform float rayLength;
uniform float pulsating;
uniform float fadeDistance;
uniform float saturation;
uniform vec2  mousePos;
uniform float mouseInfluence;
uniform float noiseAmount;
uniform float distortion;
varying vec2 vUv;

float rayStrength(vec2 src, vec2 refDir, vec2 coord, float sA, float sB, float spd) {
  vec2 d = coord - src;
  float ca = dot(normalize(d), refDir);
  float spread = pow(max(ca, 0.0), 1.0 / max(lightSpread, 0.001));
  float dist = length(d);
  float lf = clamp((iResolution.x * rayLength - dist) / (iResolution.x * rayLength), 0.0, 1.0);
  float ff = clamp((iResolution.x * fadeDistance - dist) / (iResolution.x * fadeDistance), 0.5, 1.0);
  float pulse = pulsating > 0.5 ? (0.8 + 0.2 * sin(iTime * spd * 3.0)) : 1.0;
  float base = clamp(
    (0.45 + 0.15 * sin(ca * sA + iTime * spd)) +
    (0.3  + 0.2  * cos(-ca * sB + iTime * spd)),
    0.0, 1.0);
  return base * lf * ff * spread * pulse;
}

void main() {
  vec2 coord = vec2(gl_FragCoord.x, iResolution.y - gl_FragCoord.y);
  vec2 dir = rayDir;
  if (mouseInfluence > 0.0) {
    dir = normalize(mix(rayDir, normalize(mousePos * iResolution.xy - rayPos), mouseInfluence));
  }
  vec4 r1 = vec4(1.0) * rayStrength(rayPos, dir, coord, 36.22, 21.11, 1.5 * raysSpeed);
  vec4 r2 = vec4(1.0) * rayStrength(rayPos, dir, coord, 22.40, 18.02, 1.1 * raysSpeed);
  vec4 col = r1 * 0.5 + r2 * 0.4;
  float brightness = 1.0 - coord.y / iResolution.y;
  col.x *= 0.1 + brightness * 0.8;
  col.y *= 0.3 + brightness * 0.6;
  col.z *= 0.5 + brightness * 0.5;
  if (saturation != 1.0) {
    float g = dot(col.rgb, vec3(0.299, 0.587, 0.114));
    col.rgb = mix(vec3(g), col.rgb, saturation);
  }
  col.rgb *= raysColor;
  gl_FragColor = col;
}`;

    const uniforms = {
      iTime:          { value: 0 },
      iResolution:    { value: [1, 1] as [number, number] },
      rayPos:         { value: [0, 0] as [number, number] },
      rayDir:         { value: [0, 1] as [number, number] },
      raysColor:      { value: hexToRgb(raysColor) },
      raysSpeed:      { value: raysSpeed },
      lightSpread:    { value: lightSpread },
      rayLength:      { value: rayLength },
      pulsating:      { value: pulsating ? 1.0 : 0.0 },
      fadeDistance:   { value: fadeDistance },
      saturation:     { value: saturation },
      mousePos:       { value: [0.5, 0.5] as [number, number] },
      mouseInfluence: { value: mouseInfluence },
      noiseAmount:    { value: noiseAmount },
      distortion:     { value: distortion },
    };
    s.uniforms = uniforms as Record<string, { value: unknown }>;

    const geometry = new Triangle(gl);
    const program = new Program(gl, { vertex: vert, fragment: frag, uniforms });
    const mesh = new Mesh(gl, { geometry, program });
    s.mesh = mesh;

    const updateSize = () => {
      if (!containerRef.current || !s.renderer) return;
      const { clientWidth: wCSS, clientHeight: hCSS } = containerRef.current;
      s.renderer.setSize(wCSS, hCSS);
      const d = s.renderer.dpr;
      const w = wCSS * d, h = hCSS * d;
      uniforms.iResolution.value = [w, h];
      const { anchor, dir } = getAnchorAndDir(raysOrigin, w, h);
      uniforms.rayPos.value = anchor;
      uniforms.rayDir.value = dir;
    };

    // Throttled resize — max once per 200ms
    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    const onResize = () => {
      if (resizeTimer) return;
      resizeTimer = setTimeout(() => { updateSize(); resizeTimer = null; }, 200);
    };

    window.addEventListener('resize', onResize);
    updateSize();

    const loop = (t: number) => {
      if (!s.renderer || !s.uniforms || !s.mesh) return;
      uniforms.iTime.value = t * 0.001;
      if (followMouse && mouseInfluence > 0) {
        const sm = 0.92;
        s.smoothMouse.x = s.smoothMouse.x * sm + s.mouse.x * (1 - sm);
        s.smoothMouse.y = s.smoothMouse.y * sm + s.mouse.y * (1 - sm);
        uniforms.mousePos.value = [s.smoothMouse.x, s.smoothMouse.y];
      }
      try {
        renderer.render({ scene: mesh });
        s.rafId = requestAnimationFrame(loop);
      } catch { /* context lost — stop */ }
    };
    s.rafId = requestAnimationFrame(loop);

    s.cleanup = () => {
      if (s.rafId) { cancelAnimationFrame(s.rafId); s.rafId = null; }
      window.removeEventListener('resize', onResize);
      if (resizeTimer) clearTimeout(resizeTimer);
      try {
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        gl.canvas.parentNode?.removeChild(gl.canvas);
      } catch { /* ignore */ }
      s.renderer = null; s.uniforms = null; s.mesh = null;
    };
  }, [
    raysOrigin, raysColor, raysSpeed, lightSpread, rayLength,
    pulsating, fadeDistance, saturation, followMouse, mouseInfluence,
    noiseAmount, distortion, prefersReducedMotion,
  ]);

  useEffect(() => {
    if (!isVisible) return;
    init();
    return () => {
      const s = stateRef.current;
      if (s.cleanup) { s.cleanup(); s.cleanup = null; }
    };
  }, [isVisible, init]);

  useEffect(() => {
    if (!followMouse) return;
    const onMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const r = containerRef.current.getBoundingClientRect();
      stateRef.current.mouse = {
        x: (e.clientX - r.left) / r.width,
        y: (e.clientY - r.top)  / r.height,
      };
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [followMouse]);

  return (
    <div
      ref={containerRef}
      className={`w-full h-full pointer-events-none z-[3] overflow-hidden relative ${className}`.trim()}
    />
  );
};

export default LightRays;