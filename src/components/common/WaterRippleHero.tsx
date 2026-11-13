import React, { useEffect, useRef } from "react"

export const WaterRippleHero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const cv = canvasRef.current
    if (!cv) return
    const ctx = cv.getContext("2d")
    if (!ctx) return

    let W = cv.offsetWidth
    let H = cv.offsetHeight
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let animationFrameId: number
    let rip: { x: number; y: number; r: number; a: number }[] = []
    let t = 0

    const size = () => {
      if (!cv) return
      W = cv.offsetWidth
      H = cv.offsetHeight
      cv.width = W * dpr
      cv.height = H * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    size()
    window.addEventListener("resize", size)

    const addRipple = () => {
      rip.push({
        x: W * (0.15 + Math.random() * 0.7),
        y: H * (0.2 + Math.random() * 0.7),
        r: 0,
        a: 0.45,
      })
    }

    for (let i = 0; i < 4; i++) {
      addRipple()
      rip[i].r = i * 70
    }

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      rip.forEach((p) => {
        for (let k = 0; k < 3; k++) {
          const rr = p.r - k * 22
          if (rr <= 0) continue
          ctx.beginPath()
          ctx.ellipse(p.x, p.y, rr, rr * 0.42, 0, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(143, 195, 255, ${p.a * (1 - k * 0.3)})`
          ctx.lineWidth = 1.2
          ctx.stroke()
        }
        p.r += 0.45
        p.a = Math.max(0, 0.45 - p.r / 750)
      })

      rip = rip.filter((p) => p.a > 0)
      if (++t % 160 === 0) addRipple()

      animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener("resize", size)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full pointer-events-none opacity-40"
    />
  )
}

