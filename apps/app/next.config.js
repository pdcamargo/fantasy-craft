const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin();

const API_URL = process.env.API_URL || "http://localhost:3333";

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@craft/ui", "@craft/translation", "@craft/query"],
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:path*",
  //       destination: `${API_URL}/:path*`,
  //     },
  //   ];
  // },
};

module.exports = withNextIntl(nextConfig);
