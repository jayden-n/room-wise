/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				poppins: ["Poppins", "sans-serif"],
				hotel: ["Grand Hotel", "sans-serif"],
			},
		},
		container: {
			padding: "5rem",
		},
	},
	plugins: [],
};
