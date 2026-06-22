/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'digitalaka.com' },
    ],
  },
  webpack(config) {
    // Prevents EISDIR / readlink failures on Windows caused by webpack
    // trying to resolve junction-point symlinks inside node_modules
    // and dynamic-route directories (e.g. [slug]).
    config.resolve.symlinks = false;
    config.cache = false;
    return config;
  },
};

module.exports = nextConfig;