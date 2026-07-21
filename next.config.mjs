/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/jackfruitproductions",
  output: "export",
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
