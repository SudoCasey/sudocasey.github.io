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
  // Enable build caching
  experimental: {
    turbo: {
      resolveAlias: {
        // Add any aliases if needed
      },
    },
  },
  // Configure build cache
  webpack: (config, { dev, isServer }) => {
    // Enable caching in production
    if (!dev) {
      config.cache = {
        type: 'filesystem',
        buildDependencies: {
          config: [import.meta.url],
        },
      };
    }
    return config;
  },
};

export default nextConfig;