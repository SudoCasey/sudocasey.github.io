const isProd = process.env.NODE_ENV === 'production';
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  // Configure for GitHub Pages root URL
  assetPrefix: isProd ? 'https://cfriedrich.net' : '',
  basePath: isProd ? '' : '',
  trailingSlash: true,
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  // Ensure proper static export
  distDir: 'out',
  // Performance: Enable compression
  compress: true,
  // Note: swcMinify is enabled by default in Next.js 15+
  // Performance: Target modern browsers to reduce legacy JavaScript
  compiler: {
    removeConsole: isProd ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  // Performance: Enable build caching
  experimental: {
    turbo: {
      resolveAlias: {
        // Add any aliases if needed
      },
    },
    // Note: optimizeCss requires critters package, removed to avoid build errors
  },
  // Performance: Configure build cache and optimizations
  webpack: (config, { dev, isServer }) => {
    // Enable caching in production
    if (!dev && !isServer) {
      config.cache = {
        type: 'filesystem',
      };
      
      // Performance: Optimize bundle splitting for client-side
      if (!isServer) {
        config.optimization = {
          ...config.optimization,
          moduleIds: 'deterministic',
          // Performance: Enable tree shaking
          usedExports: true,
          sideEffects: false,
          splitChunks: {
            chunks: 'all',
            minSize: 20000, // Only split chunks larger than 20KB
            maxSize: 244000, // Max chunk size for better caching
            cacheGroups: {
              default: false,
              vendors: false,
              // Separate chunk for MUI (large library)
              mui: {
                name: 'mui',
                test: /[\\/]node_modules[\\/]@mui[\\/]/,
                chunks: 'all',
                priority: 30,
                reuseExistingChunk: true,
                enforce: true,
              },
              // Separate chunk for THREE.js and Vanta (large libraries, loaded dynamically)
              three: {
                name: 'three',
                test: /[\\/]node_modules[\\/](three|vanta)[\\/]/,
                chunks: 'async', // Only split async chunks for these
                priority: 30,
                enforce: true,
              },
              // Vendor chunk for other node_modules
              vendor: {
                name: 'vendor',
                chunks: 'all',
                test: /[\\/]node_modules[\\/]/,
                priority: 20,
                reuseExistingChunk: true,
                minChunks: 2,
              },
              // Common chunk for shared code
              common: {
                name: 'common',
                minChunks: 2,
                chunks: 'all',
                priority: 10,
                reuseExistingChunk: true,
                enforce: true,
              },
            },
          },
        };
      }
    }
    return config;
  },
  // Note: headers() not available with static export
  // Cache headers should be configured at the server/CDN level
};

export default nextConfig;