import { createFileRoute } from '@tanstack/react-router'
import { ExternalLink } from '../../components/ExternalLink'
import { PrivacyPolicyPage } from '../../components/PrivacyPolicyPage'
import './bourbon-dojo.css'

export const Route = createFileRoute('/bourbon-dojo/privacy')({
  head: () => ({ meta: [{ title: 'Bourbon Dojo Privacy Policy — RKO Design' }] }),
  component: BourbonDojoPrivacyPage,
})

export function BourbonDojoPrivacyPage() {
  return (
    <PrivacyPolicyPage
      theme="bd"
      appName="Bourbon Dojo Privacy Policy"
      effectiveDate="Last updated: October 17, 2026"
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
                  you sign in with Google, Apple, or email and password.
                </li>
                <li>
                  <strong>Profile</strong> — your display name, username, and an optional avatar
                  photo.
                </li>
                <li>
                  <strong>Collection and wishlist data</strong> — the bourbon bottles you add to your
                  collection or wishlist, including purchase price, date, place, and notes.
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
                  <strong>Social activity</strong> — people you follow, and likes and comments you
                  make.
                </li>
                <li>
                  <strong>Game and progression data</strong> — XP, belts, streaks, achievements, and
                  mini-game results.
                </li>
                <li>
                  <strong>Suggested catalog edits</strong> — corrections or additions you suggest to
                  the bourbon catalog.
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
                <li>To authenticate your identity via Google, Apple, or email and password sign-in.</li>
                <li>To improve the app based on how it is used.</li>
              </ul>
              <p>We do not sell your personal information. We do not use your data for advertising.</p>
            </>
          ),
        },
        {
          heading: 'What Others Can See',
          body: (
            <ul>
              <li>
                <strong>Visible to other users</strong> — your profile (name, username, avatar),
                tastings, collection, achievements, XP and belt, follows, likes, and comments.
              </li>
              <li>
                <strong>Visible only to members</strong> — group content and sale alerts are visible
                only to members of the group.
              </li>
              <li>
                <strong>Private</strong> — your wishlist.
              </li>
              <li>
                <strong>Anonymous</strong> — your Dojo Duel runs may be replayed to other players as
                anonymous opponents. Your name is not shown; the app labels them only "Ghost".
              </li>
              <li>
                <strong>Reviewed by admins</strong> — suggested catalog edits are reviewed by admins.
              </li>
            </ul>
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
                <ExternalLink href="https://policies.google.com/privacy">Google's Privacy Policy</ExternalLink>.
              </li>
              <li>
                <strong>Sign in with Apple</strong> — used for authentication. Subject to{' '}
                <ExternalLink href="https://www.apple.com/legal/privacy/">Apple's Privacy Policy</ExternalLink>.
              </li>
              <li>
                <strong>Google Places API</strong> — used for store name autocomplete in sale alerts.
                Search queries are sent to Google. Subject to{' '}
                <ExternalLink href="https://policies.google.com/privacy">Google's Privacy Policy</ExternalLink>.
              </li>
              <li>
                <strong>Supabase</strong> — database, email/password authentication, and profile photo storage. Subject to{' '}
                <ExternalLink href="https://supabase.com/privacy">Supabase's Privacy Policy</ExternalLink>.
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
            <>
              <p>Your data is retained as long as your account is active.</p>
              <p>
                You can delete your account in the app under Profile → Delete Account. Your account
                is scheduled for permanent deletion after a 30-day grace period. Signing back in
                during that period cancels the deletion. After 30 days, all of your data is
                permanently removed.
              </p>
              <p>
                You can also request deletion of your account and all associated data by contacting
                us at the email below.
              </p>
            </>
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
