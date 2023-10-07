import { Card } from "@nextui-org/react";
import Head from "next/head";
import { useSession } from "next-auth/react";

import UsageComp from "@/components/admin/usage";

export default function Dashboard() {
	const { data: session } = useSession();

	const allow = ["admin", "developer"].includes(session?.user?.role);

	return (
		<div>
			<Head>
				<title>Dashboard</title>
			</Head>
			<div className="max-w-8xl mx-auto p-5 py-24 sm:px-6 sm:py-32 lg:px-8">
				{allow ? (
					<Card
						style={{
							alignItems: "center",
							display: "flex",
							marginTop: "15px",
							minHeight: "200px",
							padding: "5px",
						}}
					>
						<h2 className="mt-3 select-none p-5 text-center text-3xl font-bold tracking-tight sm:text-4xl">
							Dashboard
						</h2>
						<UsageComp />
					</Card>
				) : (
					<div className="text-center">
						<h2 className="mt-3 p-5 text-center text-3xl font-bold tracking-tight sm:text-4xl">
							คุณไม่มีสิทธ์เข้าถึงหน้านี้
						</h2>
					</div>
				)}
			</div>
		</div>
	);
}
