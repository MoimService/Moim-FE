/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'deving-bucket.s3.ap-northeast-2.amazonaws.com',
      'helpx.adobe.com',
    ],
  },
  async redirects() {
    return [
      {
        source: '/meeting',
        destination: '/meeting/mogakco',
        permanent: true,
      },
    ];
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

export default nextConfig;
