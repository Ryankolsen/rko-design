import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

interface Star {
  x: number
  y: number
  size: number
  opacity: number
  twinkleSpeed: number
  twinkleOffset: number
}

/**
 * The decorative twinkling background behind every page. With reduced motion
 * preferred it draws a single still frame instead of animating.
 */
export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!

    let stars: Star[] = []
    let w = 0
    let h = 0
    let frame = 0
    let animationId = 0

    function resize() {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }

    function initStars() {
      stars = Array.from({ length: 250 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        size: Math.random() * 1.4 + 0.2,
        opacity: Math.random() * 0.6 + 0.1,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinkleOffset: Math.random() * Math.PI * 2,
      }))
    }

    function draw() {
      ctx.clearRect(0, 0, w, h)
      frame++

      for (const s of stars) {
        const twinkle = Math.sin(frame * s.twinkleSpeed + s.twinkleOffset) * 0.15
        const alpha = Math.max(0, Math.min(1, s.opacity + twinkle))
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(200, 220, 255, ${alpha})`
        ctx.fill()
      }

      if (!reducedMotion) animationId = requestAnimationFrame(draw)
    }

    const handleResize = () => {
      resize()
      initStars()
      // The loop picks up the new stars on its next frame; a still field must redraw now.
      if (reducedMotion) draw()
    }

    resize()
    initStars()
    draw()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationId)
    }
  }, [reducedMotion])

  return <canvas id="starfield" ref={canvasRef} aria-hidden="true" />
}
