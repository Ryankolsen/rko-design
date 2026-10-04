import { createFileRoute } from '@tanstack/react-router'
import { PrivacyPolicyPage } from '../../components/PrivacyPolicyPage'

export const Route = createFileRoute('/bourbon-dojo/privacy')({
  component: BourbonDojoPrivacyPage,
})

export function BourbonDojoPrivacyPage() {
  return (
    <PrivacyPolicyPage
      appName="Bourbon Dojo Privacy Policy"
      effectiveDate="Last updated: April 25, 2026"
      backHref="/bourbon-dojo"
      backLabel="← Bourbon Dojo"
      contactEmail="rkolsen.design@gmail.com"
      sections={[
        {
          heading: 'Information We Collect',
          body: (
            <>
              <p>We collect the following information when you use Bourbon Dojo:</p>
              <ul>
                <li>
                  <strong>Account information</strong> — your name and email address, provided when
                  you sign in with Google or Apple.
                </li>
                <li>
                  <strong>Collection and wishlist data</strong> — the bourbon bottles you add to your
                  collection or wishlist.
                </li>
                <li>
                  <strong>Tasting notes</strong> — ratings, notes, and reviews you write about
                  bourbons you have tried.
                </li>
                <li>
                  <strong>Group activity</strong> — groups you join or create, and sale alerts you
                  post or view within those groups.
                </li>
                <li>
                  <strong>Push notification tokens</strong> — a device token used to send you push
                  notifications (e.g., new sale alerts in your groups). You can disable notifications
                  at any time in your device settings.
                </li>
                <li>
                  <strong>Location-derived data</strong> — when using the sale alert feature, you may
                  search for store locations using Google Places. We send your search query to Google;
                  we do not store your device location.
                </li>
              </ul>
            </>
          ),
        },
        {
          heading: 'How We Use Your Information',
          body: (
            <>
              <ul>
                <li>To provide and operate the app (syncing your collection, tastings, and groups across devices).</li>
                <li>To send push notifications about activity in your groups, if you have enabled them.</li>
                <li>To authenticate your identity via Google or Apple sign-in.</li>
                <li>To improve the app based on how it is used.</li>
              </ul>
              <p>We do not sell your personal information. We do not use your data for advertising.</p>
            </>
          ),
        },
        {
          heading: 'Data Storage',
          body: (
            <p>
              Your data is stored on servers provided by Supabase (PostgreSQL database hosted on
              AWS infrastructure). Data is encrypted in transit (TLS) and at rest.
            </p>
          ),
        },
        {
          heading: 'Third-Party Services',
          body: (
            <ul>
              <li>
                <strong>Google Sign-In</strong> — used for authentication. Subject to{' '}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google's Privacy Policy</a>.
              </li>
              <li>
                <strong>Sign in with Apple</strong> — used for authentication. Subject to{' '}
                <a href="https://www.apple.com/legal/privacy/" target="_blank" rel="noopener noreferrer">Apple's Privacy Policy</a>.
              </li>
              <li>
                <strong>Google Places API</strong> — used for store name autocomplete in sale alerts.
                Search queries are sent to Google. Subject to{' '}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google's Privacy Policy</a>.
              </li>
              <li>
                <strong>Supabase</strong> — database and authentication infrastructure. Subject to{' '}
                <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer">Supabase's Privacy Policy</a>.
              </li>
              <li>
                <strong>Expo / EAS</strong> — used for app delivery and over-the-air updates.
              </li>
            </ul>
          ),
        },
        {
          heading: 'Data Retention and Deletion',
          body: (
            <p>
              Your data is retained as long as your account is active. To request deletion of your
              account and all associated data, contact us at the email below. We will process
              deletion requests within 30 days.
            </p>
          ),
        },
        {
          heading: "Children's Privacy",
          body: (
            <p>
              Bourbon Dojo is not intended for users under the age of 21. We do not knowingly
              collect information from anyone under 21. If you believe a minor has provided us
              with personal information, please contact us and we will delete it.
            </p>
          ),
        },
        {
          heading: 'Your Rights',
          body: (
            <>
              <p>You have the right to:</p>
              <ul>
                <li>Access the personal data we hold about you.</li>
                <li>Request correction of inaccurate data.</li>
                <li>Request deletion of your data.</li>
                <li>Opt out of push notifications at any time via device settings.</li>
              </ul>
            </>
          ),
        },
        {
          heading: 'Changes to This Policy',
          body: (
            <p>
              We may update this policy from time to time. We will notify you of significant
              changes by updating the date at the top of this page.
            </p>
          ),
        },
        {
          heading: 'Contact',
          body: (
            <p>
              For privacy questions or data deletion requests, contact:
              <br />
              <a href="mailto:rkolsen.design@gmail.com">rkolsen.design@gmail.com</a>
            </p>
          ),
        },
      ]}
    />
  )
}
