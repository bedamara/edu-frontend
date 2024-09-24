import { config } from 'dotenv';

config();

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    trailingSlash: true,
    images: {
        remotePatterns: [
            process.env.NODE_ENV === 'production'
                ? {
                      protocol: 'https',
                      hostname: process.env.CMS_DOMAIN_FOR_FILES,
                      pathname: '/uploads/**',
                  }
                : {
                      protocol: 'http',
                      hostname: process.env.CMS_SERVICE_DOMAIN,
                      port: process.env.CMS_SERVICE_PORT,
                      pathname: '/uploads/**',
                  },
        ],
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/profile',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
