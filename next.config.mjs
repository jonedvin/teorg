/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    LIFF_ID: process.env.LIFF_ID,
    SKIP_LINE_LOGIN: process.env.SKIP_LINE_LOGIN,
    POSTGRES_URL: process.env.POSTGRES_URL,
  },
};

export default nextConfig;
