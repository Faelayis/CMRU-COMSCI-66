import { Card } from "@nextui-org/react";
import Head from "next/head";

export default function Gallery() {
	return (
		<div>
			<Head>
				<title>Gallery</title>
			</Head>
			<div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
				<Card>
					<div className="px-8 py-6">
						<h2 className="mt-3 p-5 text-center text-3xl font-bold tracking-tight sm:text-4xl">
							Gallery
						</h2>
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />
						<h2
							className="mt-3 p-5 text-center text-3xl font-bold tracking-tight sm:text-4xl"
							style={{ color: "red" }}
						>
							Coming soon
						</h2>
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />
					</div>
				</Card>
			</div>
		</div>
	);
}
