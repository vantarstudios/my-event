// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    trailingSlash: true,
    distDir: 'dist',
    poweredByHeader: false,
    skipTrailingSlashRedirect: true,
};

module.exports = nextConfig;
