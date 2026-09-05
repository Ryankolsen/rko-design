import { useEffect } from 'react'
import { createFileRoute, Link, useLocation } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    document.getElementById(hash)?.scrollIntoView()
  }, [hash])

  return (
    <>
      <section id="hero">
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="hero-eyebrow">Designer &nbsp;·&nbsp; Builder &nbsp;·&nbsp; Dreamer</p>
          <h1>Ryan<br /><span className="gold">Olsen</span></h1>
          <p className="hero-sub">Crafting worlds from code and imagination.</p>
          <a href="#projects" className="btn-primary">Explore Projects</a>
        </div>
      </section>

      <section id="projects">
        <h2 className="section-title">Projects</h2>
        <div className="projects-grid">

          <div className="card">
            <Link className="card-img" to="/bourbon-dojo">
              <img src="/bourbon-card.png" alt="BourbonVault" />
            </Link>
            <div className="card-body">
              <span className="tag">iOS App</span>
              <h3>Bourbon Dojo</h3>
              <p>Track, rate, and explore your bourbon collection. Level up through belts as you taste and discover. Built for the enthusiast who takes their pour seriously.</p>
              <div className="store-links">
                <a href="https://apps.apple.com/us/app/bourbon-dojo/id6762319810" className="store-btn ios" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" /></svg>
                  Download on iOS
                </a>
                <a href="https://play.google.com/store/apps/details?id=com.ryankolsen.bourbondojo&hl=en_US" className="store-btn android" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true"><path d="M17.523 15.341l-.9-1.6A5.7 5.7 0 0018 11a5.7 5.7 0 00-.377-2.059l.891-1.562A.75.75 0 0017.16 6.5l-.9 1.575A5.985 5.985 0 0012 6.5a5.985 5.985 0 00-4.26 1.575L6.84 6.5a.75.75 0 00-1.353.879l.891 1.562A5.7 5.7 0 006 11a5.7 5.7 0 00.377 1.741l-.9 1.6a.75.75 0 001.3.75l.857-1.5A5.985 5.985 0 0012 15.5a5.985 5.985 0 004.366-1.909l.857 1.5a.75.75 0 001.3-.75zM9.5 12a.5.5 0 110-1 .5.5 0 010 1zm5 0a.5.5 0 110-1 .5.5 0 010 1z" /></svg>
                  Get it on Google Play
                </a>
              </div>
            </div>
          </div>

          <div className="card">
            <Link className="card-img" to="/wizard-kittenz">
              <img src="/wizard-kittenz-card.png" alt="Wizard Kittenz" />
            </Link>
            <div className="card-body">
              <span className="tag game">Game</span>
              <h3>Wizard Kittenz</h3>
              <p>Cats. Magic. Chaos. A fantasy adventure game built with Godot where imagination runs wild and kittens rule the realm.</p>
              <div className="store-links">
                <a href="https://apps.apple.com/gb/app/wizard-kittenz/id6788580194" className="store-btn ios" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" /></svg>
                  Download on iOS
                </a>
                <a href="https://play.google.com/store/apps/details?id=com.wizardkittenz.game" className="store-btn android" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true"><path d="M17.523 15.341l-.9-1.6A5.7 5.7 0 0018 11a5.7 5.7 0 00-.377-2.059l.891-1.562A.75.75 0 0017.16 6.5l-.9 1.575A5.985 5.985 0 0012 6.5a5.985 5.985 0 00-4.26 1.575L6.84 6.5a.75.75 0 00-1.353.879l.891 1.562A5.7 5.7 0 006 11a5.7 5.7 0 00.377 1.741l-.9 1.6a.75.75 0 001.3.75l.857-1.5A5.985 5.985 0 0012 15.5a5.985 5.985 0 004.366-1.909l.857 1.5a.75.75 0 001.3-.75zM9.5 12a.5.5 0 110-1 .5.5 0 010 1zm5 0a.5.5 0 110-1 .5.5 0 010 1z" /></svg>
                  Get it on Google Play
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      <section id="about">
        <div className="about-inner">
          <div className="about-logo">
            <img src="/rko-logo.png" alt="RKO" />
          </div>
          <div className="about-text">
            <h2 className="section-title left">About</h2>
            <p>I'm Ryan — a designer and builder living at the intersection of craft and imagination. I build apps that solve real problems and games that spark joy.</p>
            <p>When I'm not coding, I'm probably deep in a Brandon Sanderson epic, losing my mind over a Star Wars moment, watching Dragon Ball Z with my family, or finding a new bourbon to add to the vault.</p>
            <div className="pills">
              <span className="pill">Brandon Sanderson</span>
              <span className="pill">Star Wars</span>
              <span className="pill">Dragon Ball Z</span>
              <span className="pill">Family</span>
              <span className="pill">Godot</span>
              <span className="pill">React Native</span>
              <span className="pill">Bourbon</span>
              <span className="pill">Design</span>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <p>Built by <span className="gold">Ryan Kolsen</span> &nbsp;·&nbsp; RKO Design &nbsp;·&nbsp; 2025</p>
      </footer>
    </>
  )
}
