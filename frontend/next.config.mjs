/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'digitalaka.com' },
    ],
  },
  // Removed the Webpack overrides so Vercel can build normally
};

export default nextConfig;