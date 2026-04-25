import * as React from 'react';
import Link from 'next/link';
import SecondaryPageShell from '@/components/SecondaryPageShell';

export default function PrivacyPolicy() {
  return (
    <SecondaryPageShell title="Privacy Policy">
      <p><strong>Last updated:</strong> April 12, 2024</p>
      <h2>Introduction</h2>
      <p>
        This Privacy Policy describes how personal information is collected, used, and shared
        when you visit or interact with cfriedrich.net.
      </p>
      <h2>Information We Collect</h2>
      <p>
        We may collect standard analytics and technical request data, including browser/device metadata
        and pages visited.
      </p>
      <h2>How We Use Information</h2>
      <ul>
        <li>Communicate with visitors who contact the site</li>
        <li>Improve site reliability, accessibility, and content quality</li>
        <li>Monitor usage patterns and troubleshoot issues</li>
      </ul>
      <h2>Sharing</h2>
      <p>
        We do not sell personal information. Third-party services may process limited data when required
        to operate contact or hosting features.
      </p>
      <h2>Your Rights</h2>
      <p>
        If you would like to request access, correction, or deletion of personal data, please use the{' '}
        <Link href="/contact">contact page</Link>.
      </p>
    </SecondaryPageShell>
  );
}