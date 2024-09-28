const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin();

const API_URL = process.env.API_URL || "http://localhost:3333";

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@craft/ui", "@craft/translation"],
  async rewrites() {
    return [
      // {
      //   source: "/api/:path*",
      //   destination: `${API_URL}/:path*`,
      // },
    ];
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};
module.exports = withNextIntl(nextConfig);
