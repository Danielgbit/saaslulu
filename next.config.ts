/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
  allowedDevOrigins: ['4cb647b27df8.ngrok-free.app']

};

module.exports = nextConfig;
