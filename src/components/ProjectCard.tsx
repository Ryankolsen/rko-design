import { Link } from '@tanstack/react-router'
import { ExternalLink } from './ExternalLink'
import { StoreBadge } from './StoreBadge'
import type { ProjectCredit } from '../data/projects'

interface StoreLink {
  platform: 'ios' | 'android'
  url: string
}

interface ProjectCardProps {
  imageSrc: string
  imageAlt: string
  href: string
  tagVariant: 'plain' | 'game'
  tags: string[]
  title: string
  description: string
  storeLinks: StoreLink[]
  credit?: ProjectCredit
}

export function ProjectCard({
  imageSrc,
  imageAlt,
  href,
  tagVariant,
  tags,
  title,
  description,
  storeLinks,
  credit,
}: ProjectCardProps) {
  const tagClassName = tagVariant === 'game' ? 'tag game' : 'tag'

  return (
    <div className="card">
      {/* A mouse shortcut only; the title link is the card's one keyboard and screen-reader route. */}
      <Link className="card-img" to={href} tabIndex={-1} aria-hidden="true">
        <img src={imageSrc} alt={imageAlt} />
      </Link>
      <div className="card-body">
        <div className="tags">
          {tags.map((tag) => (
            <span key={tag} className={tagClassName}>
              {tag}
            </span>
          ))}
        </div>
        <h3>
          <Link to={href}>{title}</Link>
        </h3>
        <p>{description}</p>
        {credit && (
          <p className="card-credit">
            <span aria-hidden="true">♪</span> {credit.cardText} {credit.name} ·{' '}
            <ExternalLink href={credit.url}>{credit.linkLabel}</ExternalLink>
          </p>
        )}
        <div className="store-links">
          {storeLinks.map((storeLink) => (
            <StoreBadge key={storeLink.platform} platform={storeLink.platform} url={storeLink.url} />
          ))}
        </div>
      </div>
    </div>
  )
}
