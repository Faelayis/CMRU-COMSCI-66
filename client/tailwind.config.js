import { nextui } from "@nextui-org/react";
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/pages/**/*.{js,jsx,tsx,mdx}",
		"./src/components/**/*.{js,jsx,tsx,mdx}",
		"./src/app/**/*.{js,jsx,tsx,mdx}",
		"../node_modules/@nextui-org/theme/dist/**/*.{js,jsx,tsx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
		},
	},
	darkMode: "class",
	plugins: [nextui()],
};
