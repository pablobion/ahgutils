/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: 'build',
    experimental: {
        images: { // This will cause an error
          allowFutureImage: true,
        },
      },
}

module.exports = nextConfig
