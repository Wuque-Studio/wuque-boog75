/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: 'export',
    i18n: {
        locales: ['en', 'zh-CN'],
        defaultLocale: 'en',
    },
    images: {
        unoptimized: true
    },
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
}

module.exports = nextConfig
