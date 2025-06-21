/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
        {
            protocol:'https',
            hostname:'lh3.googleusercontent.com',
            port:'',
        }, {
          protocol: 'https',
          hostname: 'res.cloudinary.com', // ✅ Added Cloudinary
          port: '',
        }
    ],
  },
};

export default nextConfig;
