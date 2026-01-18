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
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "creativitychronicles.com",
      },
      {
        protocol: "https",
        hostname: "creativeartsstudios.com",
      },
      {
        protocol: "https",
        hostname: "i0.wp.com",
      },
      {
        protocol: "https",
        hostname: "crafist.com",
      },
      {
        protocol: "https",
        hostname: "thepotterywheel.com",
      },
      {
        protocol: "https",
        hostname: "c02.purpledshub.com",
      },
    ],
  },
};

module.exports = nextConfig;
