/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@applyonce/shared'],
  swcMinify: true,
  compiler: {
    emotion: true,
  },
};

module.exports = nextConfig;
