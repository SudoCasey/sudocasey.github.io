import * as React from 'react';
import SecondaryPageShell from '@/components/SecondaryPageShell';

const formStyles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: 20,
  },
  card: {
    border: '1px solid var(--mui-palette-divider, rgba(0,0,0,0.12))',
    borderRadius: 12,
    padding: 16,
  },
  field: {
    width: '100%',
    border: '1px solid var(--mui-palette-divider, rgba(0,0,0,0.24))',
    borderRadius: 10,
    padding: '10px 12px',
    marginTop: 8,
    marginBottom: 14,
    background: 'transparent',
    color: 'inherit',
  },
  button: {
    border: 0,
    borderRadius: 10,
    padding: '10px 16px',
    cursor: 'pointer',
    fontWeight: 600,
    background: '#1976d2',
    color: '#fff',
  },
};

export default function ContactPage() {
  return (
    <SecondaryPageShell title="Contact">
      <p style={{ lineHeight: 1.7, margin: '0 0 16px' }}>
        Send a direct message using the form below, or connect on social.
      </p>
      <div style={formStyles.grid}>
        <section style={formStyles.card}>
          <h2 style={{ marginTop: 0 }}>Send a Message</h2>
          <form action="https://api.web3forms.com/submit" method="POST">
            <input type="hidden" name="access_key" value="1f45b1ce-4dfc-4711-bee8-200c051b7a55" />
            <input type="hidden" name="subject" value="New message from cfriedrich.net contact page" />
            <label>
              Name
              <input required type="text" name="name" style={formStyles.field} />
            </label>
            <label>
              Email
              <input required type="email" name="email" style={formStyles.field} />
            </label>
            <label>
              Message
              <textarea required name="message" rows={6} style={formStyles.field} />
            </label>
            <button type="submit" style={formStyles.button}>Send Message</button>
          </form>
        </section>

        <section style={formStyles.card}>
          <h2 style={{ marginTop: 0 }}>Connect Elsewhere</h2>
          <p><a href="https://www.linkedin.com/in/caseyfriedrich1/" target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
          <p><a href="https://github.com/sudocasey" target="_blank" rel="noopener noreferrer">GitHub</a></p>
          <p><a href="https://bsky.app/profile/caseyfriedrich.bsky.social" target="_blank" rel="noopener noreferrer">Bluesky</a></p>
        </section>
      </div>
    </SecondaryPageShell>
  );
}