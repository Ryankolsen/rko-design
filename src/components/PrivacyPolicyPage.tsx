import type { ReactNode } from 'react'
import { Link } from '@tanstack/react-router'
import '../style.css'

interface PrivacyPolicySection {
  heading: string
  body: ReactNode
}

interface PrivacyPolicyPageProps {
  appName: string
  effectiveDate: string
  backHref: string
  backLabel: string
  contactEmail: string
  sections: PrivacyPolicySection[]
  intro?: ReactNode
}

export function PrivacyPolicyPage({
  appName,
  effectiveDate,
  backHref,
  backLabel,
  contactEmail,
  sections,
  intro,
}: PrivacyPolicyPageProps) {
  return (
    <div className="privacy-page">
      <div className="privacy-container">
        <Link to={backHref} className="privacy-back">
          {backLabel}
        </Link>

        <h1>{appName}</h1>
        <p className="privacy-meta">{effectiveDate}</p>

        {intro}

        {sections.map((section, index) => (
          <section className="privacy-section" key={index}>
            <h2>{section.heading}</h2>
            <div className="privacy-section-body">{section.body}</div>
          </section>
        ))}

        <div className="privacy-contact">
          <p>
            Questions about this policy? Contact us at:
            <br />
            <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
          </p>
        </div>
      </div>
    </div>
  )
}
