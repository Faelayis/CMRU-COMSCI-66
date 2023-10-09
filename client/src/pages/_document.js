import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html lang="en">
			<meta
				content="Computer Science 66 - Chiang Mai Rajabhat University"
				name="description"
			/>
			<meta content="width=device-width, initial-scale=1" name="viewport" />
			<link href="/favicon.ico" rel="icon" />
			<Head />
			<body className="relative flex min-h-screen select-none flex-col pb-20">
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
