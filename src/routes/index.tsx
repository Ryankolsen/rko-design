import { useEffect } from 'react'
import { createFileRoute, useLocation } from '@tanstack/react-router'
import { ProjectCard } from '../components/ProjectCard'

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

          <ProjectCard
            imageSrc="/bourbon-card.png"
            imageAlt="BourbonVault"
            href="/bourbon-dojo"
            tagVariant="plain"
            tags={['Collection Tracker', 'Belt Progression', 'iOS & Android', '18+', 'Free', 'Available Now']}
            title="Bourbon Dojo"
            description="Track, rate, and explore your bourbon collection. Level up through belts as you taste and discover. Built for the enthusiast who takes their pour seriously."
            storeLinks={[
              { platform: 'ios', url: 'https://apps.apple.com/us/app/bourbon-dojo/id6762319810' },
              { platform: 'android', url: 'https://play.google.com/store/apps/details?id=com.ryankolsen.bourbondojo&hl=en_US' },
            ]}
          />

          <ProjectCard
            imageSrc="/wizard-kittenz-card.png"
            imageAlt="Wizard Kittenz"
            href="/wizard-kittenz"
            tagVariant="game"
            tags={['Dungeon Crawler', 'Multiplayer', 'Achievements', 'iOS & Android', '18+', 'Available Now']}
            title="Wizard Kittenz"
            description="Cats. Magic. Chaos. A fantasy adventure game built with Godot where imagination runs wild and kittens rule the realm."
            storeLinks={[
              { platform: 'ios', url: 'https://apps.apple.com/gb/app/wizard-kittenz/id6788580194' },
              { platform: 'android', url: 'https://play.google.com/store/apps/details?id=com.wizardkittenz.game' },
            ]}
          />

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
              <span className="pill">Dungeon Crawler Carl</span>
              <span className="pill">Marvel</span>
              <span className="pill">Family</span>
              <span className="pill">Godot</span>
              <span className="pill">React Native</span>
              <span className="pill">Bourbon</span>
              <span className="pill">Design</span>
              <span className="pill">Miami Dolphins</span>
              <span className="pill">WWE</span>
              <span className="pill">Inclusivity</span>
              <span className="pill">Express Yourself</span>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <p>Built by <span className="gold">Ryan K Olsen</span> &nbsp;·&nbsp; RKO Design &nbsp;·&nbsp; 2026</p>
      </footer>
    </>
  )
}
