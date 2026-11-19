"use client"

import React, { useEffect, useMemo, useRef, useState } from "react"
import { Pause, Play } from "lucide-react"
import { renderToString } from "react-dom/server"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Icon {
  x: number
  y: number
  z: number
  id: number
}

interface IconCloudProps {
  icons?: React.ReactNode[]
  images?: string[]
  showControl?: boolean
  /** Sphere radius as a fraction of the canvas size (default 0.25, the original look). */
  radiusRatio?: number
  /** Base icon size in CSS pixels at the sphere's front. */
  iconSize?: number
  className?: string
  /**
   * Optional "core" rendered at the sphere's centre. Icons on the far side draw
   * behind it, icons on the near side draw over it (faded where they cross it).
   */
  children?: React.ReactNode
  /** Radius of the core as a fraction of the canvas size (for the fade-over effect). */
  coreRatio?: number
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

const ICON_RES = 96 // offscreen bitmap resolution per icon (crisp on retina)

/**
 * Magic UI Icon Cloud, adapted:
 * - fills its parent (square) and tracks size with ResizeObserver
 * - renders at devicePixelRatio for sharp icons
 * - pointer events (mouse + touch), interaction state kept in refs (no re-render per move)
 * - pauses when scrolled offscreen or when prefers-reduced-motion is set
 */
export function IconCloud({
  icons,
  images,
  showControl = true,
  radiusRatio = 0.25,
  iconSize = 40,
  className,
  children,
  coreRatio = 0,
}: IconCloudProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const backRef = useRef<HTMLCanvasElement>(null)
  const hasCore = Boolean(children)
  const [isPaused, setIsPaused] = useState(false)

  const sizeRef = useRef(400)
  const dragRef = useRef<{ active: boolean; x: number; y: number }>({ active: false, x: 0, y: 0 })
  const mouseRef = useRef({ x: 200, y: 200, inside: false })
  const rotationRef = useRef({ x: 0.35, y: 0 })
  const targetRef = useRef<{
    x: number; y: number; startX: number; startY: number; startTime: number; duration: number
  } | null>(null)
  const visibleRef = useRef(true)
  const pausedRef = useRef(false)
  const iconCanvasesRef = useRef<HTMLCanvasElement[]>([])
  const imagesLoadedRef = useRef<boolean[]>([])

  useEffect(() => { pausedRef.current = isPaused }, [isPaused])

  // Reduced motion → start paused
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (mq.matches) setIsPaused(true)
    const onChange = (e: MediaQueryListEvent) => setIsPaused(e.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  // Build offscreen icon bitmaps
  useEffect(() => {
    if (!icons && !images) return
    const items = icons ?? images ?? []
    imagesLoadedRef.current = new Array(items.length).fill(false)

    iconCanvasesRef.current = items.map((item, index) => {
      const off = document.createElement("canvas")
      off.width = ICON_RES
      off.height = ICON_RES
      const offCtx = off.getContext("2d")
      if (!offCtx) return off

      const img = new Image()
      img.crossOrigin = "anonymous"
      img.src = images
        ? (item as string)
        : "data:image/svg+xml;base64," + btoa(renderToString(item as React.ReactElement))
      img.onload = () => {
        offCtx.clearRect(0, 0, ICON_RES, ICON_RES)
        // soft glass disc behind each logo so dark/bright logos both read
        offCtx.beginPath()
        offCtx.arc(ICON_RES / 2, ICON_RES / 2, ICON_RES / 2 - 1, 0, Math.PI * 2)
        offCtx.fillStyle = "rgba(20,16,32,0.72)"
        offCtx.fill()
        offCtx.strokeStyle = "rgba(196,181,253,0.22)"
        offCtx.lineWidth = 2
        offCtx.stroke()
        const pad = ICON_RES * 0.2
        offCtx.drawImage(img, pad, pad, ICON_RES - pad * 2, ICON_RES - pad * 2)
        imagesLoadedRef.current[index] = true
      }
      return off
    })
  }, [icons, images])

  // Unit-sphere positions (Fibonacci lattice)
  const iconPositions = useMemo<Icon[]>(() => {
    const n = (icons ?? images ?? []).length || 20
    const offset = 2 / n
    const increment = Math.PI * (3 - Math.sqrt(5))
    return Array.from({ length: n }, (_, i) => {
      const y = i * offset - 1 + offset / 2
      const r = Math.sqrt(1 - y * y)
      const phi = i * increment
      return { x: Math.cos(phi) * r, y, z: Math.sin(phi) * r, id: i }
    })
  }, [icons, images])

  // Project one icon with the current rotation
  const project = (icon: Icon, R: number) => {
    const { x: rx, y: ry } = rotationRef.current
    const cosX = Math.cos(rx), sinX = Math.sin(rx)
    const cosY = Math.cos(ry), sinY = Math.sin(ry)
    const px = icon.x * R, py = icon.y * R, pz = icon.z * R
    const x1 = px * cosY - pz * sinY
    const z1 = px * sinY + pz * cosY
    const y2 = py * cosX + z1 * sinX
    const z2 = -py * sinX + z1 * cosX
    return { x: x1, y: y2, z: z2 }
  }

  // Size tracking + visibility
  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return

    const resize = () => {
      const size = Math.max(160, Math.floor(wrap.clientWidth))
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      sizeRef.current = size
      for (const cv of [canvas, backRef.current]) {
        if (!cv) continue
        cv.width = size * dpr
        cv.height = size * dpr
        cv.style.width = `${size}px`
        cv.style.height = `${size}px`
        cv.getContext("2d")?.setTransform(dpr, 0, 0, dpr, 0, 0)
      }
      mouseRef.current = { x: size / 2, y: size / 2, inside: false }
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(wrap)

    const io = new IntersectionObserver(([e]) => { visibleRef.current = e.isIntersecting })
    io.observe(wrap)
    return () => { ro.disconnect(); io.disconnect() }
  }, [])

  // Render loop
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return
    const backCtx = backRef.current?.getContext("2d") ?? null
    let raf = 0
    let idleSpin = 0

    const frame = () => {
      raf = requestAnimationFrame(frame)
      const hasPending = Boolean(icons || images) && !imagesLoadedRef.current.every(Boolean)
      const target = targetRef.current
      if (!visibleRef.current && !hasPending) return
      if (pausedRef.current && !dragRef.current.active && !target && !hasPending && idleSpin > 1) return
      idleSpin++

      const size = sizeRef.current
      const c = size / 2
      const R = size * radiusRatio
      ctx.clearRect(0, 0, size, size)
      backCtx?.clearRect(0, 0, size, size)
      const coreR = size * coreRatio

      if (target) {
        const p = Math.min(1, (performance.now() - target.startTime) / target.duration)
        const e = easeOutCubic(p)
        rotationRef.current = {
          x: target.startX + (target.x - target.startX) * e,
          y: target.startY + (target.y - target.startY) * e,
        }
        if (p >= 1) targetRef.current = null
      } else if (!dragRef.current.active && !pausedRef.current) {
        const m = mouseRef.current
        if (m.inside) {
          const dx = m.x - c, dy = m.y - c
          const speed = 0.002 + (Math.hypot(dx, dy) / (c * Math.SQRT2)) * 0.008
          rotationRef.current.x += (dy / size) * speed
          rotationRef.current.y += (dx / size) * speed
        } else {
          rotationRef.current.y += 0.0022 // gentle idle drift
          rotationRef.current.x += 0.0006
        }
      }

      // depth-sort so front icons draw last
      const projected = iconPositions
        .map((icon, index) => ({ index, ...project(icon, R) }))
        .sort((a, b) => a.z - b.z)

      for (const p of projected) {
        const depth = (p.z + R) / (2 * R) // 0 back → 1 front
        const scale = 0.55 + depth * 0.6
        let alpha = 0.18 + depth * 0.82
        const s = iconSize * Math.min(1, size / 480) * scale
        // with a core: far-side icons go on the back layer, near-side on the front
        const behind = backCtx !== null && p.z < 0
        const g = behind ? backCtx! : ctx
        if (!behind && coreR > 0) {
          // fade near-side icons as they pass over the core so it stays readable
          const d = Math.hypot(p.x, p.y)
          alpha *= 0.35 + 0.65 * Math.min(1, Math.max(0, (d - coreR * 0.55) / (coreR * 0.6)))
        }
        g.save()
        g.globalAlpha = alpha
        g.translate(c + p.x, c + p.y)
        if (icons || images) {
          const bmp = iconCanvasesRef.current[p.index]
          if (bmp && imagesLoadedRef.current[p.index]) g.drawImage(bmp, -s / 2, -s / 2, s, s)
        } else {
          g.beginPath()
          g.arc(0, 0, s / 2, 0, Math.PI * 2)
          g.fillStyle = "#6d28d9"
          g.fill()
        }
        g.restore()
      }
    }
    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [icons, images, iconPositions, radiusRatio, iconSize, coreRatio, hasCore])

  const localPoint = (e: React.PointerEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect()
    return { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const { x, y } = localPoint(e)
    const size = sizeRef.current
    const c = size / 2
    const R = size * radiusRatio

    // Click an icon → rotate it to the front
    for (const icon of iconPositions) {
      const p = project(icon, R)
      const depth = (p.z + R) / (2 * R)
      const r = (iconSize * Math.min(1, size / 480) * (0.55 + depth * 0.6)) / 2
      if ((x - (c + p.x)) ** 2 + (y - (c + p.y)) ** 2 < r * r && depth > 0.5) {
        const tx = -Math.atan2(icon.y, Math.hypot(icon.x, icon.z))
        const ty = Math.atan2(icon.x, icon.z)
        const { x: sx, y: sy } = rotationRef.current
        const dist = Math.hypot(tx - sx, ty - sy)
        targetRef.current = {
          x: tx, y: ty, startX: sx, startY: sy,
          startTime: performance.now(),
          duration: Math.min(2000, Math.max(800, dist * 1000)),
        }
        return
      }
    }
    dragRef.current = { active: true, x: e.clientX, y: e.clientY }
    canvasRef.current?.setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const { x, y } = localPoint(e)
    if (e.pointerType === "mouse") mouseRef.current = { x, y, inside: true }
    const d = dragRef.current
    if (d.active) {
      rotationRef.current = {
        x: rotationRef.current.x + (e.clientY - d.y) * 0.004,
        y: rotationRef.current.y + (e.clientX - d.x) * 0.004,
      }
      dragRef.current = { active: true, x: e.clientX, y: e.clientY }
    }
  }

  const endDrag = () => { dragRef.current.active = false }
  const onPointerLeave = () => { endDrag(); mouseRef.current.inside = false }

  return (
    <div ref={wrapRef} className={cn("relative aspect-square w-full", className)}>
      {hasCore && (
        <>
          <canvas ref={backRef} aria-hidden className="pointer-events-none absolute inset-0 block" />
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">{children}</div>
        </>
      )}
      <canvas
        ref={canvasRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={onPointerLeave}
        className="relative block touch-pan-y select-none"
        aria-label="Interactive 3D cloud of technology logos"
        role="img"
      />
      {showControl && (
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsPaused(!isPaused)}
          aria-label={isPaused ? "Play animation" : "Pause animation"}
          className="absolute top-2 right-2"
        >
          {isPaused ? <Play size={16} /> : <Pause size={16} />}
        </Button>
      )}
    </div>
  )
}
