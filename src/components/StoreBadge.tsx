import { ExternalLink } from './ExternalLink'

type Platform = 'ios' | 'android'
type Variant = 'default' | 'two-line'

interface StoreBadgeProps {
  platform: Platform
  url?: string
  /** Not on this store yet. Also implied by a missing url. */
  comingSoon?: boolean
  /** Replaces the single-line text; the two-line variant always shows its own lines. */
  label?: string
  /** `two-line` is the "Download on the / App Store" look. */
  variant?: Variant
}

const LABELS: Record<Platform, { available: string; comingSoon: string }> = {
  ios: { available: 'Download on iOS', comingSoon: 'Coming soon to the App Store' },
  android: { available: 'Get it on Google Play', comingSoon: 'Coming soon to Google Play' },
}

const TWO_LINE_LABELS: Record<Platform, { sub: string; main: string }> = {
  ios: { sub: 'Download on the', main: 'App Store' },
  android: { sub: 'Get it on', main: 'Google Play' },
}
const TWO_LINE_COMING_SOON_SUB = 'Coming soon to the'

const IOS_ICON = (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" /></svg>
)

const ANDROID_ICON = (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true"><path d="M17.523 15.341l-.9-1.6A5.7 5.7 0 0018 11a5.7 5.7 0 00-.377-2.059l.891-1.562A.75.75 0 0017.16 6.5l-.9 1.575A5.985 5.985 0 0012 6.5a5.985 5.985 0 00-4.26 1.575L6.84 6.5a.75.75 0 00-1.353.879l.891 1.562A5.7 5.7 0 006 11a5.7 5.7 0 00.377 1.741l-.9 1.6a.75.75 0 001.3.75l.857-1.5A5.985 5.985 0 0012 15.5a5.985 5.985 0 004.366-1.909l.857 1.5a.75.75 0 001.3-.75zM9.5 12a.5.5 0 110-1 .5.5 0 010 1zm5 0a.5.5 0 110-1 .5.5 0 010 1z" /></svg>
)

// The two-line badge keeps the Play Store's triangle mark rather than the Android robot.
const PLAY_ICON = (
  <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28" aria-hidden="true"><path d="M3.18 23.76c.37.21.8.22 1.2.04L16.54 12 12.36 7.82 3.18 23.76zM20.9 10.53L17.95 8.8l-3.79 3.2 3.79 3.2 2.97-1.74c.85-.5.85-1.44-.02-1.93zM2.01 1.46C1.99 1.63 2 1.8 2 1.98v20.04c0 .18.01.35.03.52l10.33-10.54L2.01 1.46zM13.18 12.7l3.18-3.18-10.34-5.97c-.4-.23-.82-.25-1.2-.08L13.18 12.7z" /></svg>
)

export function StoreBadge({ platform, url, comingSoon, label, variant = 'default' }: StoreBadgeProps) {
  const soon = comingSoon || !url
  const twoLine = variant === 'two-line'
  const className = `store-btn ${platform}${twoLine ? ' two-line' : ''}`

  let content
  if (twoLine) {
    const lines = TWO_LINE_LABELS[platform]
    content = (
      <>
        {platform === 'ios' ? IOS_ICON : PLAY_ICON}
        <span className="store-btn-text">
          <span className="store-btn-sub">{soon ? TWO_LINE_COMING_SOON_SUB : lines.sub}</span>
          {/* Collapsed by the column layout, but keeps the words apart in the accessible name. */}
          {' '}
          <span className="store-btn-main">{lines.main}</span>
        </span>
      </>
    )
  } else {
    content = (
      <>
        {platform === 'ios' ? IOS_ICON : ANDROID_ICON}
        {label ?? (soon ? LABELS[platform].comingSoon : LABELS[platform].available)}
      </>
    )
  }

  if (soon) {
    // Plain text, not a disabled link: there is nothing to activate.
    return <span className={`${className} coming-soon`}>{content}</span>
  }

  return (
    <ExternalLink href={url} className={className}>
      {content}
    </ExternalLink>
  )
}
