/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'digitalaka.com' },
    ],
  },
  webpack(config) {
    // Prevents EISDIR / readlink failures on Windows caused by
    // webpack trying to resolve junction-point symlinks in node_modules.
    config.resolve.symlinks = false;
    return config;
  },
};

export default nextConfig;
