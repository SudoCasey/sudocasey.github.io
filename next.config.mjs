const isProd = process.env.NODE_ENV === 'production';
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  // Configure for GitHub Pages root URL
  assetPrefix: isProd ? '/sudocasey.github.io' : '',
  basePath: isProd ? '/sudocasey.github.io' : '',
  trailingSlash: true,
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
};

export default nextConfig;