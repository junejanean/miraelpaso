/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	modularizeImports: {
		'react-bootstrap': {
			transform: 'react-bootstrap/{{member}}',
		},
		lodash: {
			transform: 'lodash/{{member}}',
		},
	},
};

module.exports = nextConfig;
