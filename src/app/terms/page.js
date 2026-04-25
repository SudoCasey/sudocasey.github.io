import * as React from 'react';
import Link from 'next/link';
import SecondaryPageShell from '@/components/SecondaryPageShell';

export default function TermsOfService() {
  return (
    <SecondaryPageShell title="Terms of Service">
      <p><strong>Last updated:</strong> April 12, 2024</p>
      <h2>Agreement</h2>
      <p>
        By using this site, you agree to these terms and all applicable laws and regulations.
      </p>
      <h2>Use License</h2>
      <p>
        Content is provided for personal, non-commercial reference. You may not copy for commercial use,
        attempt to reverse engineer software, or remove ownership notices.
      </p>
      <h2>Disclaimer</h2>
      <p>
        Materials are provided "as is" without warranties of any kind, to the fullest extent permitted by law.
      </p>
      <h2>Limitations</h2>
      <p>
        We are not liable for damages arising from use or inability to use the site.
      </p>
      <h2>Governing Law</h2>
      <p>
        These terms are governed by the laws of Florida, United States.
      </p>
      <h2>Contact</h2>
      <p>
        Questions about these terms can be sent through the <Link href="/contact">contact page</Link>.
      </p>
    </SecondaryPageShell>
  );
}