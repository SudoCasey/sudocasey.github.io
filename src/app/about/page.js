import * as React from 'react';
import SecondaryPageShell from '@/components/SecondaryPageShell';

export default function About() {
  return (
    <SecondaryPageShell title="About">
      <p style={{ fontSize: 18, lineHeight: 1.7, margin: '0 0 12px' }}>
        Casey Friedrich is a full stack web developer focused on performant,
        accessible web experiences and practical product delivery.
      </p>
      <p style={{ fontSize: 18, lineHeight: 1.7, margin: 0 }}>
        For the full portfolio and project history, head back to the homepage
        or reach out directly through the contact page.
      </p>
    </SecondaryPageShell>
  );
}
