import { Card } from "@nextui-org/react";
import Head from "next/head";

export default function Help() {
	return (
		<div>
			<Head>
				<title>Help</title>
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
					<h1 style={{ fontSize: "2.5rem", marginTop: "15px" }}>Help</h1>
					<p style={{ marginBottom: "15px" }}>ติดต่อ แจ้ง ปัญหา</p>
				</Card>
			</div>
		</div>
	);
}
