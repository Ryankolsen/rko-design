import { useEffect } from 'react'
import { createFileRoute, useLocation } from '@tanstack/react-router'
import { ProjectCard } from '../components/ProjectCard'
import { projects } from '../data/projects'
import { interests } from '../data/interests'

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

          {projects.map((project) => (
            <ProjectCard
              key={project.href}
              imageSrc={project.imageSrc}
              imageAlt={project.imageAlt}
              href={project.href}
              tagVariant={project.tagVariant}
              tags={project.tags}
              title={project.title}
              description={project.description}
              storeLinks={project.storeLinks}
            />
          ))}

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
            <p>When I'm not coding, I'm probably deep in a Brandon Sanderson epic, losing my mind over the latest Dungeon Crawler Carl audiobook, watching the Super Mario Bros. movie with my family, or finding a new bourbon to add to the vault.</p>
            <div className="pills">
              {interests.map((interest) => (
                <span key={interest} className="pill">
                  {interest}
                </span>
              ))}
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
