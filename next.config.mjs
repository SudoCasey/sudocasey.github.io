const isProd = process.env.NODE_ENV === 'production';
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Disable default image optimization
  },
  assetPrefix: isProd ? '/sudocasey.github.io/' : '',
  basePath: isProd ? '/sudocasey.github.io' : '',
  output: 'export',
  // Add configuration to handle dynamic routes
  trailingSlash: true,
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
};

export default nextConfig;