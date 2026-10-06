import { createFileRoute, Link } from '@tanstack/react-router'
import { StoreBadge } from '../../components/StoreBadge'
import './panda-jump.css'

export const Route = createFileRoute('/panda-jump/')({
  component: PandaJumpPage,
})

function PandaJumpPage() {
  return (
    <div className="pj-page">
      <div className="pj-content">
        <img className="pj-banner" src="/panda-jump-card.png" alt="Panda Jump — a panda leaping between platforms" />
        <h1>Panda Jump</h1>
        <p className="pj-tagline">One tap. Nonstop barrels. How far can you go?</p>
        <p className="pj-description">
          A simple, pick-up-and-play side-scroller for Android. Tap to jump
          your panda over an endless stream of barrels through an AI-crafted
          bamboo forest and chase a new high score.
        </p>
        <p className="pj-description">
          Built with my daughter — she co-designed the game with AI and drew
          our panda. We polished it together from there.
        </p>
        <div className="pj-store-links store-links">
          <StoreBadge platform="android" disabled label="Coming Soon on Google Play" />
        </div>
        <footer className="pj-footer">
          <Link to="/panda-jump/privacy">Privacy Policy</Link>
        </footer>
      </div>
    </div>
  )
}
