
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'storage.googleapis.com',
          pathname: '/**',  // Allows all paths
        },
      ],
    },
  };
  
  module.exports = nextConfig;
  