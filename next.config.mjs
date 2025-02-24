/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // TODO: 서버 이미지 도메인으로 수정
    domains: ['helpx.adobe.com'],
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
