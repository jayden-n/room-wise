/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: 'http://localhost:3000',
    DB_LOCAL_URI: 'mongodb://127.0.0.1:27017/room-wise',
    // MUST add later for deployment
    DB_URI: '',
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
};

module.exports = nextConfig;
