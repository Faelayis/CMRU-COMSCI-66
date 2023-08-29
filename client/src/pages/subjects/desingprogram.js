import { Card } from "@nextui-org/react";
import Head from "next/head";
import React from "react";

export default function DesingProgram() {
	return (
		<div>
			<Head>
				<title>Priciples of Computer</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
				<Card
					style={{
						display: "flex",
						alignItems: "center",
						minHeight: "200px",
						marginTop: "15px",
						padding: "5px",
					}}
				>
					<h1 style={{ fontSize: "2.5rem", marginTop: "15px" }}>
						Priciples of Computer Page
					</h1>
					<p style={{ marginBottom: "15px", textIndent: "2em" }}>
						เว็บไซต์นี้สร้างขึ้นมาโดย Next.js Framework และใช้ NextUI
						ในการตกแต่งและสร้าง Component ต่างๆในการตกแตงและออกแบบ Interface
						ของหน้า WebPage สร้างขึ้นโดยนักศึกษา คณะวิทยาศาสตร์และเทคโนโลยี
						สาขาวิทยาการคอมพิวเตอร์
					</p>
				</Card>
			</div>
		</div>
	);
}
