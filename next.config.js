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
              host: '**.eventmediapp.com',
            },
            {
              protocol: 'http',
              host: 'localhost',
            },
        ],
    },
};

module.exports = nextConfig;
