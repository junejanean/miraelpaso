module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./src/**/*.{js,ts,jsx,tsx}',
		'./features/**/*.{js,ts,jsx,tsx}',
	],
	important: true,
	plugins: [],
	theme: {
		fontFamily: {
			display: ['Gilroy', 'sans-serif'],
			body: ['Graphik', 'sans-serif'],
		},
		extend: {
			colors: {
				cyan: '#9cdbff',
			},
			margin: {
				96: '24rem',
				128: '32rem',
			},
		},
	},
	variants: {
		opacity: ['responsive', 'hover'],
	},
};

// module.exports = {
// 	content: [
// 		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
// 		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
// 		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
// 	],
// 	theme: {
// 		extend: {
// 			backgroundImage: {
// 				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
// 				'gradient-conic':
// 					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
// 			},
// 		},
// 	},
// 	plugins: [],
// };

// module.exports = {
// 	purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
// 	darkMode: false, // or 'media' or 'class'
// 	theme: {
// 		extend: {},
// 	},
// 	variants: {
// 		extend: {},
// 	},
// 	plugins: [],
// };
