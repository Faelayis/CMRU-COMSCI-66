/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
	root: true,
	extends: [
		"next/core-web-vitals",
		"prettier",
		"plugin:react/recommended",
		"plugin:tailwindcss/recommended",
		"../.eslintrc",
	],
	overrides: [
		{
			files: ["*.js", "*.jsx", "*.ts", "*.tsx"],
			parser: "@typescript-eslint/parser",
		},
	],
	plugins: ["prettier", "react", "tailwindcss"],
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
