import { createFileRoute } from '@tanstack/react-router'
import { PrivacyPolicyPage } from '../../components/PrivacyPolicyPage'

export const Route = createFileRoute('/wizard-kittenz/privacy')({
  component: WizardKittenzPrivacyPage,
})

export function WizardKittenzPrivacyPage() {
  return (
    <PrivacyPolicyPage
      appName="Privacy Policy"
      effectiveDate="Effective date: May 13, 2026 · App: Wizard Kittenz · Package: com.wizardkittenz.game"
      backHref="/wizard-kittenz"
      backLabel="← Wizard Kittenz"
      contactEmail="rkolsen.design@gmail.com"
      intro={
        <p>
          This Privacy Policy describes how Wizard Kittenz ("we," "us," or "our") handles information
          when you play Wizard Kittenz on Android. We take your privacy seriously and keep data
          collection to the minimum necessary to run the game.
        </p>
      }
      sections={[
        {
          heading: '1. Information We Collect',
          body: (
            <>
              <p>We collect only what is needed to provide core game functionality:</p>
              <ul>
                <li><strong>Account credentials:</strong> A username and hashed password used to authenticate you with our Nakama game server. We never store plaintext passwords.</li>
                <li><strong>Game save data:</strong> Your character progress, class selection, level, skill tree choices, and dungeon run history — stored on our server so you can sync across sessions and play with others.</li>
                <li><strong>Device session data:</strong> Temporary session tokens issued by Nakama to keep you logged in. These expire when you log out or after a period of inactivity.</li>
                <li><strong>Purchase records:</strong> If you purchase consumable items (Revive Tokens) via Google Play Billing, Google processes the transaction. We receive only a purchase token confirming the transaction — not your payment details.</li>
              </ul>
            </>
          ),
        },
        {
          heading: '2. Information We Do NOT Collect',
          body: (
            <ul>
              <li>We do not run ads and do not use any advertising SDKs or ad-tracking identifiers.</li>
              <li>We do not collect your real name, email address, phone number, or physical location.</li>
              <li>We do not use analytics SDKs (e.g., Firebase Analytics, Crashlytics) that profile your behavior.</li>
              <li>We do not sell, rent, or share your data with third parties for marketing purposes.</li>
            </ul>
          ),
        },
        {
          heading: '3. How We Use Your Information',
          body: (
            <ul>
              <li>Authenticate you and maintain your session.</li>
              <li>Store and sync your game progress so you can resume play and join co-op sessions.</li>
              <li>Fulfill in-app purchases via Google Play Billing.</li>
              <li>Provide real-time multiplayer functionality (room-code-based co-op sessions).</li>
            </ul>
          ),
        },
        {
          heading: '4. Third-Party Services',
          body: (
            <>
              <p>Wizard Kittenz uses the following third-party services, each governed by their own privacy policies:</p>
              <ul>
                <li><strong>Google Play Billing</strong> — processes in-app purchases. See <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google's Privacy Policy</a>.</li>
                <li><strong>Nakama (Heroic Labs)</strong> — open-source game server we self-host for authentication, multiplayer, and save sync. Data is stored on servers we control and is not shared with Heroic Labs.</li>
              </ul>
            </>
          ),
        },
        {
          heading: '5. Data Retention',
          body: (
            <p>
              Your account and game data are retained for as long as your account is active. If you request
              account deletion (see Section 7), all associated data is permanently deleted within 30 days.
            </p>
          ),
        },
        {
          heading: "6. Children's Privacy",
          body: (
            <p>
              Wizard Kittenz is rated Mature 17+ due to fantasy violence and the depiction of alcohol,
              catnip, and mushrooms in a comedic context. It is not directed at children under 13. We do
              not knowingly collect personal information from anyone under 13. If you believe a child has
              provided us with information, please contact us and we will delete it promptly.
            </p>
          ),
        },
        {
          heading: '7. Your Rights & Account Deletion',
          body: (
            <>
              <p>You may request at any time:</p>
              <ul>
                <li>A copy of the data we hold for your account.</li>
                <li>Correction of inaccurate data.</li>
                <li>Deletion of your account and all associated data.</li>
              </ul>
              <p>To make any of these requests, email us at the address below.</p>
            </>
          ),
        },
        {
          heading: '8. Security',
          body: (
            <p>
              We use industry-standard practices including password hashing, encrypted connections (TLS),
              and token-based authentication to protect your data. No system is perfectly secure, but we
              work to minimize risk.
            </p>
          ),
        },
        {
          heading: '9. Changes to This Policy',
          body: (
            <p>
              We may update this policy as the game evolves. If we make material changes, we will update
              the effective date above. Continued use of the app after changes constitutes acceptance of
              the updated policy.
            </p>
          ),
        },
        {
          heading: '10. Contact Us',
          body: null,
        },
      ]}
    />
  )
}
