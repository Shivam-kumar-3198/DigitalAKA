/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'digitalaka.com' },
    ],
  },
  webpack(config) {
    // Prevents EISDIR / readlink failures on Windows caused by
    // webpack trying to resolve junction-point symlinks in node_modules.
    config.resolve.symlinks = false;

    // Disable webpack's filesystem cache on Windows — the PackFileCacheStrategy
    // fails to snapshot symlinks (junction points), causing non-deterministic
    // build failures where compiled page chunks go missing from .next/.
    if (process.platform === 'win32') {
      config.cache = false;
    }

    return config;
  },
};

export default nextConfig;
