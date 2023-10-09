import { Card, Image } from "@nextui-org/react";
import Head from "next/head";
import Link from "next/link";

export default function todo() {
	return (
		<div>
			<Head>
				<title>ToDo</title>
			</Head>
			<div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
				<Card>
					<div className="px-8 py-6">
						<h2 className="mt-3 select-none p-5 text-center text-3xl font-bold tracking-tight sm:text-4xl">
							งานที่ได้รับมอบหมายของทั้ง 2 Section
						</h2>
						<div className="mt-8 flex space-x-4">
							<div className="flex flex-col items-center">
								<Link href="/contents/todo/section-1">
									<Card className="transition-shadow hover:bg-white hover:shadow-lg">
										<Image
											alt="Section 1"
											height={550}
											src="https://images.unsplash.com/photo-1607705703571-c5a8695f18f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&h=800&q=80"
											width={600}
										/>
										<p className="mt-2 text-center text-sm">Section 1</p>
									</Card>
								</Link>
							</div>
							<div className="flex flex-col items-center">
								<Link href="/contents/todo/section-2">
									<Card className="transition-shadow hover:bg-white hover:shadow-lg">
										<Image
											alt="Section 2"
											height={550}
											src="https://images.unsplash.com/photo-1555066931-bf19f8fd1085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&h=800&q=80"
											width={600}
										/>
										<p className="mt-2 text-center text-sm">Section 2</p>
									</Card>
								</Link>
							</div>
						</div>
					</div>
				</Card>
			</div>
		</div>
	);
}
