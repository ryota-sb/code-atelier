/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    domains: ["images.microcms-assets.io"],
  },
  eslint: {
    dirs: ["app"],
  },
};
