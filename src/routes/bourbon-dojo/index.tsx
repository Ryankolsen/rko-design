import { createFileRoute, Link } from '@tanstack/react-router'
import { StoreBadge } from '../../components/StoreBadge'
import './bourbon-dojo.css'

export const Route = createFileRoute('/bourbon-dojo/')({
  head: () => ({ meta: [{ title: 'Bourbon Dojo — RKO Design' }] }),
  component: BourbonDojoPage,
})

const IOS_STORE_URL = 'https://apps.apple.com/us/app/bourbon-dojo/id6762319810'
const ANDROID_STORE_URL = 'https://play.google.com/store/apps/details?id=com.ryankolsen.bourbondojo&hl=en_US'

const features = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    title: 'Your Vault',
    body: 'Catalogue every bottle you own. Know exactly what\'s in your collection at a glance.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
    title: 'Tasting Notes',
    body: 'Rate every pour from 1 to 5 stars and log nose, palate and finish notes. Build a record you\'ll treasure.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    title: 'Discover & Wishlist',
    body: 'Browse 1,860+ bourbons from our curated catalog. Add anything to your wishlist.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'Groups & Sale Alerts',
    body: 'Create a crew, post sale finds, and never let your circle miss a great bottle.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    title: 'Friends & Feed',
    body: 'Follow friends, see their latest tastings in your feed, and join in with likes and comments. Unlock dozens of achievements along the way.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: 'The Dojo',
    body: 'Earn XP, climb belt ranks, and sharpen your knowledge daily. Play Dojo Duel or Pour or Faker — the Dojo rewards showing up.',
  },
]

export function BourbonDojoPage() {
  return (
    <div className="bd-page">
      <header className="bd-hero">
        <div className="bd-hero-glow" aria-hidden="true" />

        <div className="bd-logo-lockup">
          <img src="/bourbon-dojo-icon.png" alt="Bourbon Dojo icon" className="bd-app-icon" />
          <div className="bd-wordmark">
            <h1 className="bd-app-name">Bourbon Dojo</h1>
            <p className="bd-app-tagline">Master your collection.</p>
          </div>
        </div>

        <p className="bd-hero-copy">
          Track every bottle, log every pour, discover what to hunt next — and share
          the best finds with your crew.
        </p>

        <div className="bd-store-row">
          <StoreBadge platform="ios" variant="two-line" url={IOS_STORE_URL} />
          <StoreBadge platform="android" variant="two-line" url={ANDROID_STORE_URL} />
        </div>

        <p className="bd-store-note">Available for iOS &amp; Android</p>
      </header>

      <div className="bd-section-divider" aria-hidden="true">
        <span className="bd-divider-ornament">&#12288;&#10022;&#12288;</span>
      </div>

      <section className="bd-features" aria-label="Features">
        <h2 className="bd-features-heading">Everything a bourbon enthusiast needs</h2>
        <div className="bd-feature-grid">
          {features.map((f) => (
            <article key={f.title} className="bd-feature-card">
              <div className="bd-feature-icon" aria-hidden="true">{f.icon}</div>
              <h3 className="bd-feature-title">{f.title}</h3>
              <p className="bd-feature-body">{f.body}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="bd-footer">
        <p className="bd-footer-name">Bourbon Dojo</p>
        <nav className="bd-footer-links" aria-label="Footer links">
          <Link to="/bourbon-dojo/privacy">Privacy Policy</Link>
          <span className="bd-footer-sep" aria-hidden="true">·</span>
          <a href="mailto:rkolsen.design@gmail.com">Contact</a>
        </nav>
        <p className="bd-footer-copy">&copy; {new Date().getFullYear()} Bourbon Dojo. All rights reserved.</p>
      </footer>
    </div>
  )
}
