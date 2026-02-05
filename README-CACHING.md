# Caching Configuration for GitHub Pages

Since GitHub Pages doesn't support custom HTTP headers (like `.htaccess`), caching is handled through:

1. **Service Worker** - Implements long-term caching (1 year) for:
   - JavaScript files (`/chunks/`, `/_next/static/`)
   - CSS files (`/_next/static/css/`)
   - Images (all image files)
   - Static assets

2. **Next.js Build Optimizations** - Configured in `next.config.mjs`:
   - Bundle splitting for better caching
   - Tree-shaking to reduce unused code
   - Modern JavaScript (no legacy polyfills)

## For Better Caching (Optional)

If you want to add custom cache headers, consider:

1. **Using a CDN** (Cloudflare, etc.) - Can add cache headers
2. **Using Netlify** - Supports `_headers` file
3. **Using Vercel** - Automatic caching optimization

The service worker will still provide excellent caching for repeat visitors regardless of hosting.
