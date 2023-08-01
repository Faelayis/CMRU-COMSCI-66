/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
	root: true,
	extends: ["next/core-web-vitals", "prettier"],
	plugins: ["prettier"],
	ignorePatterns: ["node_modules", "dist"],
	parserOptions: {
		babelOptions: {
			presets: [require.resolve("next/babel")],
		},
	},
	rules: {
		"prettier/prettier": "warn",
	},
};
