import { createFileRoute, Link } from '@tanstack/react-router'
import { ExternalLink } from '../../components/ExternalLink'
import { StoreBadge } from '../../components/StoreBadge'
import { projects } from '../../data/projects'
import './wizard-kittenz.css'

export const Route = createFileRoute('/wizard-kittenz/')({
  head: () => ({ meta: [{ title: 'Wizard Kittenz — RKO Design' }] }),
  component: WizardKittenzPage,
})

export function WizardKittenzPage() {
  const project = projects.find((p) => p.href === '/wizard-kittenz')!
  const { credit } = project
  return (
    <div className="app-shell wk-page theme-wk">
      <div className="wk-stars" />
      <div className="app-content">
        <img className="app-banner" src="/wizard-kittenz-banner.png" alt="Wizard Kittenz — four wizard cats in a dungeon" />
        <h1>Wizard Kittenz</h1>
        <p className="app-tagline">Cast spells. Crawl dungeons. Be a cat.</p>
        <p className="app-description">
          A real-time co-op dungeon crawler for 1–4 players. Choose your class,
          gather your party, and descend into chaos — one room at a time.
          Catnip, ale, and mushrooms may or may not be involved.
        </p>
        <div className="app-store-links store-links">
          {project.storeLinks.map(({ platform, url }) => (
            <StoreBadge key={platform} platform={platform} url={url} />
          ))}
        </div>
        {credit && (
          <section className="wk-credit">
            <h2 className="wk-credit-heading">{credit.role}</h2>
            <p className="wk-credit-text">
              {credit.detailText} {credit.name} —{' '}
              <ExternalLink href={credit.url}>{credit.linkLabel}</ExternalLink>
            </p>
          </section>
        )}
        <footer className="wk-footer">
          <Link to="/wizard-kittenz/privacy">Privacy Policy</Link>
        </footer>
      </div>
    </div>
  )
}
