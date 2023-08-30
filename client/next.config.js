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
			project: require("../package.json").version,
			client: {
				version: require("./package.json").version,
				nextjs: require("./package.json").dependencies["next"],
				nextui: require("./package.json").dependencies["@nextui-org/react"],
				tailwind: require("./package.json").dependencies["tailwindcss"],
			},
			library: {
				api: require("../library/api/package.json").version,
				utils: require("../library/utils/package.json").version,
				database: require("../library/database/package.json").version,
				"next-api": require("../library/next-api/package.json").version,
			},
			date: {
				short: new Intl.DateTimeFormat("th-th", {
					dateStyle: "medium",
					timeStyle: "short",
				}).format(),
				full: new Intl.DateTimeFormat("th-th", {
					dateStyle: "full",
					timeStyle: "short",
				}).format(),
			},
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
