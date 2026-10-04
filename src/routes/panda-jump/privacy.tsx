import { createFileRoute } from '@tanstack/react-router'
import { PrivacyPolicyPage } from '../../components/PrivacyPolicyPage'
import './panda-jump.css'

export const Route = createFileRoute('/panda-jump/privacy')({
  component: PandaJumpPrivacyPage,
})

function PandaJumpPrivacyPage() {
  return (
    <PrivacyPolicyPage
      appName="Privacy Policy"
      effectiveDate="Effective date: October 2, 2026 · App: Panda Jump · Package: com.ryankolsen.pandajump"
      backHref="/"
      backLabel="← RKO Design"
      contactEmail="rkolsen.design@gmail.com"
      intro={
        <p>
          This Privacy Policy describes how Panda Jump ("we," "us," or "our") handles information
          when you play Panda Jump on Android. The short version: Panda Jump does not collect,
          store, or share any personal information.
        </p>
      }
      sections={[
        {
          heading: '1. Information We Collect',
          body: (
            <p>
              None. Panda Jump runs entirely on your device. It has no accounts, no sign-in, and does
              not request internet access, so nothing you do in the game leaves your device.
            </p>
          ),
        },
        {
          heading: '2. Information We Do NOT Collect',
          body: (
            <ul>
              <li>We do not collect your name, email address, phone number, location, or any device identifiers.</li>
              <li>We do not show ads and do not use any advertising SDKs or ad-tracking identifiers.</li>
              <li>We do not use analytics or crash-reporting SDKs.</li>
              <li>There are no in-app purchases.</li>
              <li>We do not sell, rent, or share any data with third parties.</li>
            </ul>
          ),
        },
        {
          heading: '3. Permissions',
          body: <p>Panda Jump requests no special Android permissions.</p>,
        },
        {
          heading: "4. Children's Privacy",
          body: (
            <p>
              Panda Jump is made to be safe for players of all ages, including children under 13.
              Because the game collects no personal information from anyone, it collects none from
              children. If you have any concerns, please contact us at the address below.
            </p>
          ),
        },
        {
          heading: '5. Changes to This Policy',
          body: (
            <p>
              If the game ever changes how it handles information, we will update this policy and the
              effective date above before that change is released.
            </p>
          ),
        },
        {
          heading: '6. Contact Us',
          body: null,
        },
      ]}
    />
  )
}
