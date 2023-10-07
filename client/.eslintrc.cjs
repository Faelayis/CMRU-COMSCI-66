/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
	root: true,
	extends: [
		"next/core-web-vitals",
		"plugin:@next/next/recommended",
		"plugin:react/recommended",
		"plugin:tailwindcss/recommended",
		"prettier",
		"../.eslintrc",
	],
	overrides: [
		{
			files: ["*.js", "*.jsx", "*.ts", "*.tsx"],
			parser: "@typescript-eslint/parser",
		},
		{
			files: ["./src/**"],
			plugins: ["perfectionist"],
			extends: ["plugin:perfectionist/recommended-natural"],
			rules: {
				"perfectionist/sort-named-imports": "off",
				"perfectionist/sort-imports": "off",
				"perfectionist/sort-objects": "warn",
			},
		},
	],
	plugins: ["react", "tailwindcss", "prettier"],
	ignorePatterns: ["node_modules", "src/pages/api", "src/lib"],
	parserOptions: {
		ecmaFeatures: {
			jsx: false,
		},
		babelOptions: {
			//@ts-ignore
			presets: [require.resolve("next/babel")],
		},
	},
	rules: {
		"tailwindcss/no-custom-classname": "off",
		"react/react-in-jsx-scope": "off",
		"react/prop-types": "off",
		"no-unused-vars": "warn",
		"no-undef": "off",
	},
};
