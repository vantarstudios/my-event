// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    trailingSlash: true,
    distDir: 'dist',
    poweredByHeader: false,
    skipTrailingSlashRedirect: true,
    images: {
        remotePatterns: [
            {
              protocol: 'https',
              hostname: '**.eventmediapp.com',
            },
            {
              protocol: 'http',
              hostname: 'localhost',
            },
        ],
    },
};

module.exports = nextConfig;
