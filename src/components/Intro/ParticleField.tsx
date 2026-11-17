import { useEffect, useRef } from 'react'

declare global { interface Window { __jtechRevealAt?: number } }

type Particle = { x: number; y: number; z: number; speed: number; size: number; hue: number; phase: number }

export default function ParticleField({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d', { alpha: true })
    if (!canvas || !ctx) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let width = 0, height = 0, frame = 0
    let particles: Particle[] = []
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      width = window.innerWidth; height = window.innerHeight
      canvas.width = width * dpr; canvas.height = height * dpr
      canvas.style.width = `${width}px`; canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.min(150, Math.max(55, Math.round(width * height / 9500)))
      particles = Array.from({ length: count }, () => ({ x: Math.random() * width, y: Math.random() * height, z: Math.random(), speed: .12 + Math.random() * .48, size: .4 + Math.random() * 1.3, hue: Math.random() > .78 ? 298 : 326, phase: Math.random() * Math.PI * 2 }))
    }
    const draw = () => {
      const now = performance.now()
      const revealBurst = Math.max(0, 1 - Math.abs(now - (window.__jtechRevealAt ?? -10000)) / 700)
      ctx.clearRect(0, 0, width, height)
      for (const p of particles) {
        const oldX = p.x, oldY = p.y
        const dx = p.x - width * .5, dy = p.y - height * .5
        const inv = 1 / Math.max(90, Math.hypot(dx, dy))
        const burstSpeed = revealBurst * (2.2 + p.z * 3.4)
        p.y += (reduce ? 0 : -p.speed) + dy * inv * burstSpeed
        p.x += Math.sin(now * .00045 + p.phase) * .16 + dx * inv * burstSpeed
        if (p.y < -4) { p.y = height + 4; p.x = Math.random() * width }
        if (p.y > height + 4) { p.y = -4; p.x = Math.random() * width }
        if (p.x < -4) p.x = width + 4
        if (p.x > width + 4) p.x = -4
        const alpha = (.14 + p.z * .42) * (.84 + Math.sin(now * .001 + p.phase) * .16)
        ctx.fillStyle = `hsla(${p.hue}, 100%, ${62 + p.z * 18}%, ${alpha})`
        if (revealBurst > .05 && !reduce) {
          ctx.strokeStyle = `hsla(${p.hue}, 100%, 78%, ${alpha * revealBurst * .5})`
          ctx.lineWidth = .5 + p.z * .6
          ctx.beginPath(); ctx.moveTo(oldX, oldY); ctx.lineTo(p.x, p.y); ctx.stroke()
        }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size * (.5 + p.z), 0, Math.PI * 2); ctx.fill()
      }
      if (active && !reduce) frame = requestAnimationFrame(draw)
    }
    resize(); draw()
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', resize) }
  }, [active])
  return <canvas ref={canvasRef} className="particle-field" aria-hidden="true" />
}
