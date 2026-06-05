/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
   images: {
    domains: ["images.unsplash.com",
      "lh3.googleusercontent.com", // Google profile pics
    ],
    
  },
  reactCompiler: true,
};

export default nextConfig;
