import { createFileRoute, Link } from '@tanstack/react-router'
import './bourbon-dojo.css'

export const Route = createFileRoute('/bourbon-dojo/')({
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
    body: 'Log detailed notes and a 0–100 score for every pour. Build a record you\'ll treasure.',
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
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: 'The Dojo',
    body: 'Earn XP, climb belt ranks, and sharpen your knowledge daily. Play Dojo Duel or Pour or Faker — the Dojo rewards showing up.',
  },
]

function AppleButton() {
  return (
    <a href={IOS_STORE_URL} className="bd-store-btn" aria-label="Download on the App Store">
      <svg className="bd-store-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
      <span className="bd-store-btn-text">
        <span className="bd-store-btn-sub">Download on the</span>
        <span className="bd-store-btn-main">App Store</span>
      </span>
    </a>
  )
}

function GooglePlayButton() {
  return (
    <a href={ANDROID_STORE_URL} className="bd-store-btn" aria-label="Get it on Google Play" target="_blank" rel="noopener noreferrer">
      <svg className="bd-store-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M3.18 23.76c.37.21.8.22 1.2.04L16.54 12 12.36 7.82 3.18 23.76zM20.9 10.53L17.95 8.8l-3.79 3.2 3.79 3.2 2.97-1.74c.85-.5.85-1.44-.02-1.93zM2.01 1.46C1.99 1.63 2 1.8 2 1.98v20.04c0 .18.01.35.03.52l10.33-10.54L2.01 1.46zM13.18 12.7l3.18-3.18-10.34-5.97c-.4-.23-.82-.25-1.2-.08L13.18 12.7z" />
      </svg>
      <span className="bd-store-btn-text">
        <span className="bd-store-btn-sub">Get it on</span>
        <span className="bd-store-btn-main">Google Play</span>
      </span>
    </a>
  )
}

function BourbonDojoPage() {
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
          <AppleButton />
          <GooglePlayButton />
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
          <a href="mailto:ryankolsen@gmail.com">Contact</a>
        </nav>
        <p className="bd-footer-copy">&copy; {new Date().getFullYear()} Bourbon Dojo. All rights reserved.</p>
      </footer>
    </div>
  )
}
