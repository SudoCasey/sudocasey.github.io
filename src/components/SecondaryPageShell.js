import * as React from 'react';
import Link from 'next/link';

const shellStyles = {
  page: {
    minHeight: '100vh',
    background: 'var(--mui-palette-background-default, #fff)',
    color: 'var(--mui-palette-text-primary, #111)',
  },
  container: {
    maxWidth: 1080,
    margin: '0 auto',
    padding: '24px 16px 48px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    borderBottom: '1px solid var(--mui-palette-divider, rgba(0,0,0,0.12))',
    paddingBottom: 14,
    marginBottom: 24,
    flexWrap: 'wrap',
  },
  brand: {
    fontWeight: 700,
    fontSize: 18,
    textDecoration: 'none',
    color: 'inherit',
  },
  nav: {
    display: 'flex',
    gap: 14,
    flexWrap: 'wrap',
  },
  navLink: {
    color: 'inherit',
    textDecoration: 'none',
    opacity: 0.9,
  },
  title: {
    margin: '0 0 16px',
    fontSize: 'clamp(1.8rem, 4vw, 2.2rem)',
    lineHeight: 1.2,
  },
  footer: {
    borderTop: '1px solid var(--mui-palette-divider, rgba(0,0,0,0.12))',
    paddingTop: 18,
    marginTop: 36,
    display: 'flex',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
    fontSize: 14,
    color: 'var(--mui-palette-text-secondary, #555)',
  },
  footerLinks: {
    display: 'flex',
    gap: 12,
    flexWrap: 'wrap',
  },
};

export default function SecondaryPageShell({ title, children }) {
  return (
    <div style={shellStyles.page}>
      <div style={shellStyles.container}>
        <header style={shellStyles.header}>
          <Link href="/" style={shellStyles.brand}>
            Casey Friedrich
          </Link>
          <nav style={shellStyles.nav} aria-label="Secondary page navigation">
            <Link href="/" style={shellStyles.navLink}>Home</Link>
            <Link href="/about" style={shellStyles.navLink}>About</Link>
            <Link href="/contact" style={shellStyles.navLink}>Contact</Link>
          </nav>
        </header>

        <main>
          <h1 style={shellStyles.title}>{title}</h1>
          {children}
        </main>

        <footer style={shellStyles.footer}>
          <div style={shellStyles.footerLinks}>
            <Link href="/privacy" style={shellStyles.navLink}>Privacy Policy</Link>
            <Link href="/terms" style={shellStyles.navLink}>Terms of Service</Link>
          </div>
          <div>Copyright © Casey Friedrich {new Date().getFullYear()}</div>
        </footer>
      </div>
    </div>
  );
}
