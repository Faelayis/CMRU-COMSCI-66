const { PrismaPlugin } = require("@prisma/nextjs-monorepo-workaround-plugin");

/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		port:
			process.env.NODE_ENV === "development"
				? process.env["npm_package_scripts_PORT"] || process.env["PORT"]
				: null,
	},
	publicRuntimeConfig: {
		appVersion: {
			project:
				process.env["npm_package_version"] ||
				` ${new Date().toLocaleDateString("th-th").toLocaleString()}`,
		},
	},
	webpack: (config, { isServer }) => {
		if (isServer) {
			config.plugins = [...config.plugins, new PrismaPlugin()];
		}
		return config;
	},
};

module.exports = nextConfig;
