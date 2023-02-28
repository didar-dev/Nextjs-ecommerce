/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  reactStrictMode: false,
  env: {
    NEXTAUTH_SECRET: "NEXTAUTH_SECRET",
    NEXTAUTH_URL: "http://localhost:3000",
    GOOGLE_CLIENT_ID:
      "1084796998091-4i44i0qdiahn3bpkbotlcpmqs8i9r6ks.apps.googleusercontent.com",
    GOOGLE_CLIENT_SECRET: "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",
  },
};

module.exports = nextConfig;
