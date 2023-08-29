/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
	root: true,
	extends: ["next/core-web-vitals", "prettier", "../.eslintrc"],
	plugins: ["prettier"],
	ignorePatterns: ["node_modules", "src/pages/api"],
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
