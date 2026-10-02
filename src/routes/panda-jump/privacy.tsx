import { createFileRoute, Link } from '@tanstack/react-router'
import './panda-jump.css'

export const Route = createFileRoute('/panda-jump/privacy')({
  component: PandaJumpPrivacyPage,
})

function PandaJumpPrivacyPage() {
  return (
    <div className="pj-privacy-page">
      <div className="pj-privacy-container">
        <Link to="/" className="pj-back">← RKO Design</Link>

        <h1>Privacy Policy</h1>
        <p className="pj-privacy-meta">
          Effective date: October 2, 2026 &nbsp;·&nbsp; App: Panda Jump &nbsp;·&nbsp; Package: com.ryankolsen.pandajump
        </p>

        <p>
          This Privacy Policy describes how Panda Jump ("we," "us," or "our") handles information
          when you play Panda Jump on Android. The short version: Panda Jump does not collect,
          store, or share any personal information.
        </p>

        <h2>1. Information We Collect</h2>
        <p>
          None. Panda Jump runs entirely on your device. It has no accounts, no sign-in, and does
          not request internet access, so nothing you do in the game leaves your device.
        </p>

        <h2>2. Information We Do NOT Collect</h2>
        <ul>
          <li>We do not collect your name, email address, phone number, location, or any device identifiers.</li>
          <li>We do not show ads and do not use any advertising SDKs or ad-tracking identifiers.</li>
          <li>We do not use analytics or crash-reporting SDKs.</li>
          <li>There are no in-app purchases.</li>
          <li>We do not sell, rent, or share any data with third parties.</li>
        </ul>

        <h2>3. Permissions</h2>
        <p>
          Panda Jump requests no special Android permissions.
        </p>

        <h2>4. Children's Privacy</h2>
        <p>
          Panda Jump is made to be safe for players of all ages, including children under 13.
          Because the game collects no personal information from anyone, it collects none from
          children. If you have any concerns, please contact us at the address below.
        </p>

        <h2>5. Changes to This Policy</h2>
        <p>
          If the game ever changes how it handles information, we will update this policy and the
          effective date above before that change is released.
        </p>

        <h2>6. Contact Us</h2>
        <div className="pj-contact-box">
          <p>
            Questions about this policy? Reach us at:
            <br />
            <a href="mailto:ryankolsen@gmail.com">ryankolsen@gmail.com</a>
          </p>
        </div>
      </div>
    </div>
  )
}
