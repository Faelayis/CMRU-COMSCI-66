/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
	root: true,
	extends: ["next/core-web-vitals", "prettier", "../.eslintrc"],
	plugins: ["prettier"],
	ignorePatterns: ["node_modules", "dist"],
	parserOptions: {
		babelOptions: {
			presets: [require.resolve("next/babel")],
		},
	},
	rules: {
		"no-unused-vars": "warn",
		"no-undef": "off",
	},
};
