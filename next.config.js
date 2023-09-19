/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        instrumentationHook: true, serverActions: true,
    },
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: 'picsum.photos'
        }]
    }
}

module.exports = nextConfig