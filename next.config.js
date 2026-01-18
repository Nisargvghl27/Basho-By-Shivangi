// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ["images.unsplash.com"],
//   },
// };

// module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

module.exports = nextConfig;
