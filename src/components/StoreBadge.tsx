interface StoreBadgeProps {
  platform: 'ios' | 'android'
  url?: string
  disabled?: boolean
  label?: string
}

const IOS_ICON = (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" /></svg>
)

const ANDROID_ICON = (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true"><path d="M17.523 15.341l-.9-1.6A5.7 5.7 0 0018 11a5.7 5.7 0 00-.377-2.059l.891-1.562A.75.75 0 0017.16 6.5l-.9 1.575A5.985 5.985 0 0012 6.5a5.985 5.985 0 00-4.26 1.575L6.84 6.5a.75.75 0 00-1.353.879l.891 1.562A5.7 5.7 0 006 11a5.7 5.7 0 00.377 1.741l-.9 1.6a.75.75 0 001.3.75l.857-1.5A5.985 5.985 0 0012 15.5a5.985 5.985 0 004.366-1.909l.857 1.5a.75.75 0 001.3-.75zM9.5 12a.5.5 0 110-1 .5.5 0 010 1zm5 0a.5.5 0 110-1 .5.5 0 010 1z" /></svg>
)

export function StoreBadge({ platform, url, disabled, label }: StoreBadgeProps) {
  const icon = platform === 'ios' ? IOS_ICON : ANDROID_ICON
  const defaultLabel = platform === 'ios' ? 'Download on iOS' : 'Get it on Google Play'
  const text = label ?? defaultLabel
  const className = `store-btn ${platform === 'ios' ? 'ios' : 'android'}${disabled ? ' disabled' : ''}`

  if (disabled) {
    return (
      <span className={className} aria-disabled="true">
        {icon}
        {text}
      </span>
    )
  }

  return (
    <a href={url} className={className} target="_blank" rel="noopener noreferrer">
      {icon}
      {text}
    </a>
  )
}
