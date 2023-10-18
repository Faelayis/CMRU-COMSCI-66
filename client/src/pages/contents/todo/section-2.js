import { Card } from "@nextui-org/react";
import Head from "next/head";
import React from "react";

export default function Section2() {
	return (
		<div>
			<Head>
				<title>Section 2</title>
			</Head>
			<div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
				<Card
					style={{
						alignItems: "center",
						display: "flex",
						marginTop: "15px",
						minHeight: "200px",
						padding: "5px",
					}}
				>
					<h1 style={{ fontSize: "2.5rem", marginTop: "15px" }}>Section 2</h1>
					<p style={{ marginBottom: "15px", textIndent: "2em" }}>
						งาน ที่ได้รับมอบหมาย
						เว็บไซต์นี้สร้างขึ้นเพื่อติดตามงานที่ได้รับมอบหมายของ Section 2
					</p>
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
				</Card>
			</div>
		</div>
	);
}
