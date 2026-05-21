import './style.css'

// Starfield
const canvas = document.getElementById('starfield') as HTMLCanvasElement
const ctx = canvas.getContext('2d')!

interface Star {
  x: number
  y: number
  size: number
  opacity: number
  twinkleSpeed: number
  twinkleOffset: number
}

let stars: Star[] = []
let w = 0
let h = 0
let frame = 0

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

  requestAnimationFrame(draw)
}

resize()
initStars()
draw()
window.addEventListener('resize', () => { resize(); initStars() })

// Nav scroll effect
const nav = document.getElementById('nav')!
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60)
}, { passive: true })
