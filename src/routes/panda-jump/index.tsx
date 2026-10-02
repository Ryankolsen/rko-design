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
        <p className="pj-tagline">Hop, bounce, and climb your way to the top.</p>
        <p className="pj-description">
          A simple, pick-up-and-play jumper for Android. Guide a bamboo-loving
          panda up an ever-rising stack of platforms, chain jumps for combos,
          and see how high you can climb before gravity catches up.
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
