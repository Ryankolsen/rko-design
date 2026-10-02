import { Link } from '@tanstack/react-router'
import { StoreBadge } from './StoreBadge'

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
}: ProjectCardProps) {
  const tagClassName = tagVariant === 'game' ? 'tag game' : 'tag'

  return (
    <div className="card">
      <Link className="card-img" to={href}>
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
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="store-links">
          {storeLinks.map((storeLink) => (
            <StoreBadge key={storeLink.platform} platform={storeLink.platform} url={storeLink.url} />
          ))}
        </div>
      </div>
    </div>
  )
}
