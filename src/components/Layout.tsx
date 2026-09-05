import { useEffect, useRef, type ReactNode } from 'react'
import { Link } from '@tanstack/react-router'
import '../style.css'

interface Star {
  x: number
  y: number
  size: number
  opacity: number
  twinkleSpeed: number
  twinkleOffset: number
}

export function Layout({ children }: { children: ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const navRef = useRef<HTMLElement>(null)

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

      animationId = requestAnimationFrame(draw)
    }

    const handleResize = () => {
      resize()
      initStars()
    }

    resize()
    initStars()
    draw()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  useEffect(() => {
    const nav = navRef.current!
    const handleScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 60)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <canvas id="starfield" ref={canvasRef} />

      <nav id="nav" ref={navRef}>
        <Link to="/" className="nav-logo">
          <img src="/rko-logo.png" alt="RKO" />
        </Link>
        <ul>
          <li><Link to="/" activeOptions={{ exact: true }}>Home</Link></li>
          <li><Link to="/" hash="projects">Projects</Link></li>
          <li><Link to="/" hash="about">About</Link></li>
          <li><Link to="/bourbon-dojo">Bourbon Dojo</Link></li>
          <li><Link to="/wizard-kittenz">Wizard Kittenz</Link></li>
        </ul>
      </nav>

      {children}
    </>
  )
}
