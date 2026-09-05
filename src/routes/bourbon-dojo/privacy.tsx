import { createFileRoute, Link } from '@tanstack/react-router'
import './bourbon-dojo.css'

export const Route = createFileRoute('/bourbon-dojo/privacy')({
  component: BourbonDojoPrivacyPage,
})

function BourbonDojoPrivacyPage() {
  return (
    <div className="bd-privacy-page">
      <div className="bd-privacy-container">
        <Link to="/bourbon-dojo" className="bd-back">← Bourbon Dojo</Link>

        <h1>Bourbon Dojo Privacy Policy</h1>
        <p className="bd-privacy-meta">Last updated: April 25, 2026</p>

        <p>
          Bourbon Dojo ("we", "our", or "us") is a mobile application that lets you track your
          bourbon collection, log tasting notes, manage a wishlist, and connect with friends in
          groups. This Privacy Policy explains what information we collect, how we use it, and
          your rights regarding your data.
        </p>

        <h2>Information We Collect</h2>
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

        <h2>How We Use Your Information</h2>
        <ul>
          <li>To provide and operate the app (syncing your collection, tastings, and groups across devices).</li>
          <li>To send push notifications about activity in your groups, if you have enabled them.</li>
          <li>To authenticate your identity via Google or Apple sign-in.</li>
          <li>To improve the app based on how it is used.</li>
        </ul>
        <p>We do not sell your personal information. We do not use your data for advertising.</p>

        <h2>Data Storage</h2>
        <p>
          Your data is stored on servers provided by Supabase (PostgreSQL database hosted on
          AWS infrastructure). Data is encrypted in transit (TLS) and at rest.
        </p>

        <h2>Third-Party Services</h2>
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

        <h2>Data Retention and Deletion</h2>
        <p>
          Your data is retained as long as your account is active. To request deletion of your
          account and all associated data, contact us at the email below. We will process
          deletion requests within 30 days.
        </p>

        <h2>Children's Privacy</h2>
        <p>
          Bourbon Dojo is not intended for users under the age of 21. We do not knowingly
          collect information from anyone under 21. If you believe a minor has provided us
          with personal information, please contact us and we will delete it.
        </p>

        <h2>Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access the personal data we hold about you.</li>
          <li>Request correction of inaccurate data.</li>
          <li>Request deletion of your data.</li>
          <li>Opt out of push notifications at any time via device settings.</li>
        </ul>

        <h2>Changes to This Policy</h2>
        <p>
          We may update this policy from time to time. We will notify you of significant
          changes by updating the date at the top of this page.
        </p>

        <h2>Contact</h2>
        <p>
          For privacy questions or data deletion requests, contact:
          <br />
          <a href="mailto:rkolsen.design@gmail.com">rkolsen.design@gmail.com</a>
        </p>
      </div>
    </div>
  )
}
