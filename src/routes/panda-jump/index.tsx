import { createFileRoute, Link } from '@tanstack/react-router'
import { StoreBadge } from '../../components/StoreBadge'
import './panda-jump.css'

export const Route = createFileRoute('/panda-jump/')({
  head: () => ({ meta: [{ title: 'Panda Jump — RKO Design' }] }),
  component: PandaJumpPage,
})

export function PandaJumpPage() {
  return (
    <div className="app-shell pj-page theme-pj">
      <div className="app-content">
        <img className="app-banner" src="/panda-jump-card.png" alt="Panda Jump — a panda leaping between platforms" />
        <h1>Panda Jump</h1>
        <p className="app-tagline">One tap. Nonstop barrels. How far can you go?</p>
        <p className="app-description">
          A simple, pick-up-and-play side-scroller for Android. Tap to jump
          your panda over an endless stream of barrels through an AI-crafted
          bamboo forest and chase a new high score.
        </p>
        <p className="app-description">
          Built with my daughter — she co-designed the game with AI and drew
          our panda. We polished it together from there.
        </p>
        <div className="app-store-links store-links">
          <StoreBadge platform="android" comingSoon />
        </div>
        <footer className="app-footer">
          <Link to="/panda-jump/privacy">Privacy Policy</Link>
        </footer>
      </div>
    </div>
  )
}
