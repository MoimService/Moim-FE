/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'deving-bucket.s3.ap-northeast-2.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'helpx.adobe.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/meeting',
        destination: '/meeting/mogakco',
        permanent: true,
      },
      {
        source: '/my-meeting',
        destination: '/my-meeting/my?type=created',
        permanent: true,
      },
    ];
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    // 추가된 부분
    config.resolve.fallback = {
      fs: false,
      net: false,
      tls: false,
    };

    return config;
  },
  reactStrictMode: false, // 추가
  transpilePackages: ['@fullpage/react-fullpage'], // 추가
};

export default nextConfig;
