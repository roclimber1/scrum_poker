/** @type {import('next').NextConfig} */

const path = require('path')


const nextConfig = {
    experimental: {
        appDir: true
    },
    resolve: {
        alias: {
            '@/utils': path.resolve(__dirname, './utils'),
            '@/components': path.resolve(__dirname, './components'),
            '@/redux': path.resolve(__dirname, './redux'),
            '@/hooks': path.resolve(__dirname, './hooks')
        }
    }
}

module.exports = nextConfig
