import { Card } from "@nextui-org/react";
import Head from "next/head";
import React from "react";

export default function Section1() {
	return (
		<div>
			<Head>
				<title>Section 1</title>
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
					<h1 style={{ fontSize: "2.5rem", marginTop: "15px" }}>Section 1</h1>
					<p style={{ marginBottom: "15px", textIndent: "2em" }}>
						งาน ที่ได้รับมอบหมาย
						เว็บไซต์นี้สร้างขึ้นเพื่อติดตามงานที่ได้รับมอบหมายของ Section 2
					</p>
				</Card>
			</div>
		</div>
	);
}
