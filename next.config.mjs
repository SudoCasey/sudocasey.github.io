const isProd = process.env.NODE_ENV === 'production';
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  // Configure for GitHub Pages root URL
  assetPrefix: isProd ? '' : '',
  basePath: isProd ? '' : '',
  trailingSlash: true,
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  // Ensure proper static export
  distDir: 'out',
};

export default nextConfig;