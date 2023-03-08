/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/event",
        permanent: false
      }
    ]
  }
}

module.exports = nextConfig
