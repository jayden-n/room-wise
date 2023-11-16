/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		API_URL: "http://localhost:3000",
		DB_LOCAL_URI: "mongodb://127.0.0.1:27017/room-wise",
		// MUST add later for deployment
		DB_URI: "",

		// cloudinary images
		CLOUDINARY_CLOUD_NAME: "dfiee1wj5",
		CLOUDINARY_API_KEY: "157649354113575",
		CLOUDINARY_API_SECRET: "P4JB4Gj4ieA9NMUpG6_uYDg3gTM",

		// required for next-auth
		NEXTAUTH_URL: "http://localhost:3000",
		NEXTAUTH_SECRET: "DASDASDBDBFJHBWHJBJHABDASBDKS",
	},
	images: {
		domains: ["res.cloudinary.com"],
	},
};

module.exports = nextConfig;
