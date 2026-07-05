"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// ── Glitch character pool ─────────────────────────────────────────────────────
const GLITCH_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*<>[]{}|/\\^~";
const TARGET_NAME  = "Janul Samaranayake";

function randomChar() {
  return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
}

// ── Types ─────────────────────────────────────────────────────────────────────
interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  life: number; maxLife: number;
  size: number; hue: number;
}

export default function SplashScreen({ onDone }: { onDone: () => void }) {
  // Refs
  const orbCanvasRef       = useRef<HTMLCanvasElement>(null);
  const particleCanvasRef  = useRef<HTMLCanvasElement>(null);
  const orbRafRef          = useRef<number>(0);
  const particleRafRef     = useRef<number>(0);
  const particlesRef       = useRef<Particle[]>([]);
  const burstFiredRef      = useRef(false);

  // State
  const [scanY, setScanY]             = useState(-4);           // scan line Y position
  const [scanDone, setScanDone]       = useState(false);
  const [showContent, setShowContent] = useState(false);        // content after scan
  const [glitchName, setGlitchName]   = useState("                  "); // 18 chars placeholder
  const [progress, setProgress]       = useState(0);            // 0–100
  const [exiting, setExiting]         = useState(false);

  // ── Plasma orb ───────────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = orbCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    const W = 90, H = 90, CX = 45, CY = 45, R = 34;
    canvas.width = W; canvas.height = H;

    const plasma = Array.from({ length: 30 }, () => ({
      phi:   Math.random() * Math.PI,
      theta: Math.random() * Math.PI * 2,
      speed: (Math.random() - 0.5) * 0.012,
    }));
    let t = 0;

    function frame() {
      t += 0.01;
      ctx.clearRect(0, 0, W, H);
      const g = ctx.createRadialGradient(CX - 10, CY - 10, 3, CX, CY, R);
      g.addColorStop(0,    "rgba(220,180,255,0.97)");
      g.addColorStop(0.22, "rgba(168,85,247,0.93)");
      g.addColorStop(0.6,  "rgba(100,20,190,0.88)");
      g.addColorStop(1,    "rgba(20,5,60,0.95)");
      ctx.beginPath(); ctx.arc(CX, CY, R, 0, Math.PI * 2);
      ctx.fillStyle = g; ctx.fill();

      plasma.forEach(p => {
        p.theta += p.speed;
        const x = Math.sin(p.phi) * Math.cos(p.theta);
        const y = Math.sin(p.phi) * Math.sin(p.theta);
        const z = Math.cos(p.phi);
        if (z < 0) return;
        const n = (Math.sin(x * 3 + t) * Math.cos(y * 2.7 - t * 0.7) * 0.5 +
                   Math.sin(x * 1.9 - t * 1.3) * 0.3 + 1) * 0.5;
        ctx.beginPath();
        ctx.arc(CX + x * R * 0.9, CY + y * R * 0.9, n * 2.8 + 0.4, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${260 + n * 80},100%,75%,${n * z * 0.72})`;
        ctx.fill();
      });

      const s = ctx.createRadialGradient(CX - 11, CY - 12, 0, CX - 9, CY - 10, 15);
      s.addColorStop(0, "rgba(255,255,255,0.58)");
      s.addColorStop(1, "transparent");
      ctx.beginPath(); ctx.arc(CX, CY, R, 0, Math.PI * 2); ctx.fillStyle = s; ctx.fill();

      const pulse = 0.75 + 0.25 * Math.sin(t * 1.8);
      const gl = ctx.createRadialGradient(CX, CY, R * 0.5, CX, CY, R * 2);
      gl.addColorStop(0, `rgba(168,85,247,${0.35 * pulse})`);
      gl.addColorStop(1, "transparent");
      ctx.beginPath(); ctx.arc(CX, CY, R * 2, 0, Math.PI * 2); ctx.fillStyle = gl; ctx.fill();

      orbRafRef.current = requestAnimationFrame(frame);
    }
    orbRafRef.current = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(orbRafRef.current);
  }, []);

  // ── Particle burst (fires once when showContent becomes true) ─────────────
  useEffect(() => {
    const canvas = particleCanvasRef.current;
    if (!canvas || !showContent || burstFiredRef.current) return;
    burstFiredRef.current = true;

    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    canvas.width  = canvas.offsetWidth  || window.innerWidth;
    canvas.height = canvas.offsetHeight || window.innerHeight;

    const CX = canvas.width  / 2;
    const CY = canvas.height / 2 - 60; // offset to match orb position

    // Spawn 36 particles in a burst
    particlesRef.current = Array.from({ length: 36 }, (_, i) => {
      const angle = (i / 36) * Math.PI * 2 + Math.random() * 0.3;
      const speed = 1.8 + Math.random() * 3.5;
      return {
        x: CX, y: CY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1, maxLife: 1,
        size: Math.random() * 3.5 + 1,
        hue: 260 + Math.random() * 80,
      };
    });

    function loop() {
      ctx.clearRect(0, 0, canvas!.width, canvas!.height);
      let alive = false;
      particlesRef.current.forEach(p => {
        p.life -= 0.018;
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.97;
        p.vy *= 0.97;
        if (p.life > 0) {
          alive = true;
          const a = p.life;
          // glow halo
          const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
          grd.addColorStop(0, `hsla(${p.hue},100%,70%,${a * 0.6})`);
          grd.addColorStop(1, "transparent");
          ctx.beginPath(); ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
          ctx.fillStyle = grd; ctx.fill();
          // core dot
          ctx.beginPath(); ctx.arc(p.x, p.y, p.size * a, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${p.hue},100%,78%,${a})`;
          ctx.fill();
        }
      });
      if (alive) particleRafRef.current = requestAnimationFrame(loop);
      else ctx.clearRect(0, 0, canvas!.width, canvas!.height);
    }
    particleRafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(particleRafRef.current);
  }, [showContent]);

  // ── Scan line animation ───────────────────────────────────────────────────
  useEffect(() => {
    // Sweep from -4px to 100vh over ~900ms
    const startTime  = performance.now();
    const duration   = 900;
    let rafId: number;

    function sweep(now: number) {
      const elapsed = now - startTime;
      const pct     = Math.min(elapsed / duration, 1);
      // ease-in-out quad
      const eased   = pct < 0.5 ? 2 * pct * pct : 1 - Math.pow(-2 * pct + 2, 2) / 2;
      setScanY(eased * 110); // go slightly past 100vh so it exits cleanly

      if (pct < 1) {
        rafId = requestAnimationFrame(sweep);
      } else {
        setScanDone(true);
        setShowContent(true);
      }
    }
    // Small delay before scan starts so the screen is fully black first
    const t = setTimeout(() => { rafId = requestAnimationFrame(sweep); }, 200);
    return () => { clearTimeout(t); cancelAnimationFrame(rafId); };
  }, []);

  // ── Glitch → resolve name ─────────────────────────────────────────────────
  useEffect(() => {
    if (!showContent) return;

    const TOTAL_DURATION = 1400; // ms total glitch time
    const SETTLE_START   = 600;  // when letters start locking in
    const startTime      = performance.now();
    const lockedChars    = new Array(TARGET_NAME.length).fill(false);
    let rafId: number;

    function tick(now: number) {
      const elapsed = now - startTime;
      const t       = Math.min(elapsed / TOTAL_DURATION, 1);

      // How many chars should be locked in by now
      const lockCount = Math.floor(
        ((elapsed - SETTLE_START) / (TOTAL_DURATION - SETTLE_START)) * TARGET_NAME.length
      );

      let display = "";
      for (let i = 0; i < TARGET_NAME.length; i++) {
        if (i < lockCount && elapsed > SETTLE_START) {
          lockedChars[i] = true;
        }
        if (lockedChars[i]) {
          display += TARGET_NAME[i];
        } else if (TARGET_NAME[i] === " ") {
          display += " ";
        } else {
          // Glitch faster early, slower near end
          display += Math.random() < 0.5 + t * 0.4 ? TARGET_NAME[i] : randomChar();
        }
      }
      setGlitchName(display);

      if (t < 1) rafId = requestAnimationFrame(tick);
      else setGlitchName(TARGET_NAME);
    }
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [showContent]);

  // ── Progress counter ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!showContent) return;

    const DURATION  = 1800; // ms to go 0→100
    const startTime = performance.now();
    let rafId: number;

    function tick(now: number) {
      const pct = Math.min((now - startTime) / DURATION, 1);
      // ease-out cubic so it slows near 100
      const eased = 1 - Math.pow(1 - pct, 3);
      setProgress(Math.round(eased * 100));
      if (pct < 1) rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [showContent]);

  // ── Exit timing ───────────────────────────────────────────────────────────
  useEffect(() => {
    const exitTimer = setTimeout(() => setExiting(true),  3000);
    const doneTimer = setTimeout(() => onDone(),          3000 + 900);
    return () => { clearTimeout(exitTimer); clearTimeout(doneTimer); };
  }, [onDone]);

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        @keyframes sp-ring-pulse {
          0%,100% { transform:scale(1);    opacity:1;    }
          50%      { transform:scale(1.07); opacity:0.45; }
        }
        @keyframes sp-glow-pulse {
          0%,100% { transform:scale(1);    opacity:0.8; }
          50%      { transform:scale(1.12); opacity:1;   }
        }
        @keyframes sp-fade-up {
          from { opacity:0; transform:translateY(12px); }
          to   { opacity:1; transform:translateY(0);    }
        }
        .sp-ring { animation: sp-ring-pulse 3s ease-in-out infinite; will-change:transform; }
        .sp-glow { animation: sp-glow-pulse 3s ease-in-out infinite; will-change:transform; }
        .sp-show { animation: sp-fade-up 0.6s cubic-bezier(.22,.68,0,1.05) both; }
        .sp-show-1 { animation: sp-fade-up 0.6s cubic-bezier(.22,.68,0,1.05) 0.05s both; }
        .sp-show-2 { animation: sp-fade-up 0.6s cubic-bezier(.22,.68,0,1.05) 0.18s both; }
        .sp-show-3 { animation: sp-fade-up 0.6s cubic-bezier(.22,.68,0,1.05) 0.32s both; }
        .sp-show-4 { animation: sp-fade-up 0.6s cubic-bezier(.22,.68,0,1.05) 0.44s both; }

        /* Scan line chromatic aberration glow */
        .scan-line {
          position: absolute;
          left: 0; right: 0;
          height: 3px;
          pointer-events: none;
          z-index: 20;
          background: linear-gradient(90deg,
            transparent 0%,
            rgba(139,92,246,0.4) 15%,
            rgba(168,85,247,0.9) 40%,
            rgba(232,121,249,1)  50%,
            rgba(168,85,247,0.9) 60%,
            rgba(56,189,248,0.4) 85%,
            transparent 100%
          );
          box-shadow:
            0 0 12px 2px rgba(168,85,247,0.7),
            0 0 40px 6px rgba(168,85,247,0.25),
            0 -1px 0 rgba(56,189,248,0.5),
            0  1px 0 rgba(232,121,249,0.5);
          will-change: top;
        }
        /* Scan trail — dim overlay that "reveals" content above the line */
        .scan-trail {
          position: absolute;
          left:0; right:0; top:0;
          pointer-events: none;
          z-index: 19;
          background: linear-gradient(to bottom,
            rgba(5,5,7,0) 0%,
            rgba(5,5,7,0) 100%
          );
        }
        /* Content masked — hidden until scan passes over it */
        .scan-mask {
          transition: opacity 0.3s ease;
        }

        /* Glitch name — subtle RGB split on active glitch */
        .glitch-active {
          text-shadow:
            1px 0 0 rgba(56,189,248,0.5),
           -1px 0 0 rgba(232,121,249,0.5);
        }

        /* Progress counter monospace */
        .progress-num {
          font-variant-numeric: tabular-nums;
          font-feature-settings: "tnum";
        }
      `}</style>

      {/* Full-screen overlay */}
      <div
        className="fixed inset-0 z-[9999] overflow-hidden bg-[#050507]"
        style={{
          transition: "opacity 0.85s cubic-bezier(.4,0,.2,1), transform 0.85s cubic-bezier(.4,0,.2,1)",
          opacity:    exiting ? 0 : 1,
          transform:  exiting ? "scale(1.04)" : "scale(1)",
          pointerEvents: exiting ? "none" : "auto",
        }}
      >
        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.045) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* ── SCAN LINE ── */}
        {!scanDone && (
          <>
            {/* Dark overlay ABOVE the scan line (unrevealed area) */}
            <div
              className="absolute left-0 right-0 top-0 z-[18] pointer-events-none bg-[#050507]"
              style={{ height: `${scanY}vh` }}
            />
            {/* The glowing scan line itself */}
            <div
              className="scan-line"
              style={{ top: `${scanY}vh` }}
            />
          </>
        )}

        {/* Particle canvas — fullscreen, behind content */}
        <canvas
          ref={particleCanvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-[5]"
        />

        {/* Corner accents */}
        {[
          "top-6 left-6 sm:top-8 sm:left-8 border-t border-l",
          "top-6 right-6 sm:top-8 sm:right-8 border-t border-r",
          "bottom-6 left-6 sm:bottom-8 sm:left-8 border-b border-l",
          "bottom-6 right-6 sm:bottom-8 sm:right-8 border-b border-r",
        ].map((cls, i) => (
          <div key={i} className={`absolute w-7 h-7 sm:w-10 sm:h-10 ${cls} border-purple-500/40 z-10`} />
        ))}

        {/* Main content — fades in after scan */}
        <div
          className="relative z-10 flex flex-col items-center justify-center h-full px-6"
          style={{
            opacity: showContent ? 1 : 0,
            transition: "opacity 0.2s ease",
          }}
        >
          {/* ── Orb cluster ── */}
          <div className="sp-show-1 relative flex items-center justify-center mb-8 sm:mb-10">
            <div
              className="sp-glow absolute w-[240px] h-[240px] rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(120,40,220,0.18) 0%, transparent 70%)" }}
            />
            <div className="sp-ring absolute w-[110px] h-[110px] rounded-full border border-purple-500/22" style={{ animationDelay: "0s" }} />
            <div className="sp-ring absolute w-[155px] h-[155px] rounded-full border border-purple-500/14" style={{ animationDelay: "0.5s" }} />
            <div className="sp-ring absolute w-[200px] h-[200px] rounded-full border border-purple-500/08" style={{ animationDelay: "1s" }} />
            <canvas ref={orbCanvasRef} className="relative z-10" />
          </div>

          {/* ── Text block ── */}
          <div className="text-center relative z-10">
            {/* Tag */}
            <p className="sp-show-2 text-[10px] sm:text-xs uppercase tracking-[0.35em] text-purple-400 mb-3">
              Portfolio
            </p>

            {/* Glitch name */}
            <h1
              className={`sp-show-2 text-[clamp(1.6rem,5.5vw,2.8rem)] font-extrabold leading-none tracking-tight ${showContent && glitchName !== TARGET_NAME ? "glitch-active" : ""}`}
              style={{
                background: "linear-gradient(135deg, #e9d5ff 0%, #d8b4fe 35%, #c084fc 65%, #a855f7 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontFamily: "'Syne', sans-serif",
                minWidth: "280px",
                display: "inline-block",
              }}
            >
              {glitchName}
            </h1>

            {/* Role */}
            <p className="sp-show-3 mt-3 text-xs sm:text-sm text-white/30 tracking-widest">
              Full Stack Developer · Software Engineering Undergraduate
            </p>
          </div>

          {/* ── Loading bar + progress counter ── */}
          <div className="sp-show-4 mt-10 sm:mt-12 flex flex-col items-center gap-3">
            {/* Bar */}
            <div className="w-36 sm:w-48 h-[2px] rounded-full overflow-hidden bg-white/6">
              <div
                className="h-full rounded-full transition-none"
                style={{
                  width: `${progress}%`,
                  background: "linear-gradient(90deg, #7c3aed, #c084fc, #a855f7)",
                  transition: "width 0.05s linear",
                }}
              />
            </div>

            {/* Counter row */}
            <div className="flex items-center gap-3">
              <span
                className="progress-num text-xs font-mono text-purple-400/80"
                style={{ minWidth: "2.8rem", textAlign: "right" }}
              >
                {String(progress).padStart(3, "0")}%
              </span>
              <span className="text-white/15 text-xs">|</span>
              <span className="text-[10px] font-mono text-white/25 uppercase tracking-widest">
                {progress < 30  ? "initialising..." :
                 progress < 60  ? "loading assets..." :
                 progress < 90  ? "building ui..." :
                 progress < 100 ? "almost ready..." :
                                  "ready."}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}