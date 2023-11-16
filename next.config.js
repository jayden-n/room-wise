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

		// nodemailer
		SMTP_HOST: "sandbox.smtp.mailtrap.io",
		SMTP_PORT: 2525,
		SMTP_USER: "2f79f0838cdcfa",
		SMTP_PASSWORD: "cdbbdbd1fe61f1",
		SMTP_FROM_EMAIL: "noreply@roomwise.ca",
		SMTP_FROM_NAME: "Room Wise Inc.",

		// required for next-auth
		NEXTAUTH_URL: "http://localhost:3000",
		NEXTAUTH_SECRET: "DASDASDBDBFJHBWHJBJHABDASBDKS",
	},
	images: {
		domains: ["res.cloudinary.com"],
	},
};

module.exports = nextConfig;
