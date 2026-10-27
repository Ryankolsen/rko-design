import type { AnchorHTMLAttributes, ReactNode } from 'react'

const NEW_TAB = '(opens in new tab)'

interface ExternalLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  children: ReactNode
}

/**
 * The one way to link off-site: always a new tab with a safe rel, and says so
 * to assistive technology. Not for mailto: or internal links.
 */
export function ExternalLink({ children, 'aria-label': ariaLabel, ...props }: ExternalLinkProps) {
  return (
    <a
      {...props}
      aria-label={ariaLabel && `${ariaLabel} ${NEW_TAB}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {/* The space sits outside the hidden span so every name computation keeps it. */}
      {children}{' '}
      <span className="visually-hidden">{NEW_TAB}</span>
    </a>
  )
}
