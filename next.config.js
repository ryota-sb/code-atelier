/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  experimental: {
    appDir: true
  },
  trailingSlash: true,
  images: {
    domains: ["images.microcms-assets.io"],
  },
  eslint: {
    dirs: ["app"],
  },
};
