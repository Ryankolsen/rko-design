import type { ReactNode } from 'react'
import { Link } from '@tanstack/react-router'
import { StoreBadge } from './StoreBadge'
import '../style.css'

interface AppLandingPageImage {
  src: string
  alt: string
}

interface AppLandingPageStoreLink {
  platform: 'ios' | 'android'
  url?: string
  disabled?: boolean
  label?: string
}

interface AppLandingPageFeature {
  icon: ReactNode
  title: string
  body: string
}

interface AppLandingPageProps {
  appName: string
  tagline: string
  description: string
  /** Icon + wordmark hero shape (e.g. Bourbon Dojo). */
  heroIcon?: AppLandingPageImage
  /** Single banner-image hero shape (e.g. Wizard Kittenz, Panda Jump). */
  bannerImage?: AppLandingPageImage
  storeLinks: AppLandingPageStoreLink[]
  features?: AppLandingPageFeature[]
  privacyHref: string
  contactEmail: string
}

export function AppLandingPage({
  appName,
  tagline,
  description,
  heroIcon,
  bannerImage,
  storeLinks,
  features,
  privacyHref,
  contactEmail,
}: AppLandingPageProps) {
  return (
    <div className="app-page">
      <header className="app-hero">
        {heroIcon ? (
          <div className="app-hero-lockup">
            <img src={heroIcon.src} alt={heroIcon.alt} className="app-hero-icon" />
            <div className="app-hero-wordmark">
              <h1 className="app-hero-name">{appName}</h1>
              <p className="app-hero-tagline">{tagline}</p>
            </div>
          </div>
        ) : (
          <>
            {bannerImage && (
              <img src={bannerImage.src} alt={bannerImage.alt} className="app-hero-banner" />
            )}
            <h1 className="app-hero-name">{appName}</h1>
            <p className="app-hero-tagline">{tagline}</p>
          </>
        )}

        <p className="app-hero-description">{description}</p>

        <div className="app-store-row store-links">
          {storeLinks.map((link) => (
            <StoreBadge
              key={link.platform}
              platform={link.platform}
              url={link.url}
              disabled={link.disabled}
              label={link.label}
            />
          ))}
        </div>
      </header>

      {features && features.length > 0 && (
        <section className="app-features" aria-label="Features">
          <div className="app-features-grid">
            {features.map((feature) => (
              <article key={feature.title} className="app-feature-card">
                <div className="app-feature-icon" aria-hidden="true">{feature.icon}</div>
                <h3 className="app-feature-title">{feature.title}</h3>
                <p className="app-feature-body">{feature.body}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      <footer className="app-footer">
        <nav className="app-footer-links" aria-label="Footer links">
          <Link to={privacyHref}>Privacy Policy</Link>
          <span className="app-footer-sep" aria-hidden="true">·</span>
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
        </nav>
        <p className="app-footer-copy">&copy; {new Date().getFullYear()} {appName}. All rights reserved.</p>
      </footer>
    </div>
  )
}
