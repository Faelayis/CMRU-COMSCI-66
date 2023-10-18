import { Avatar, Button, Card } from "@nextui-org/react";
import Head from "next/head";
import { useSession } from "next-auth/react";

export default function Setting() {
	const { data: session } = useSession();
	return (
		<div className="select-none">
			<Head>
				<title>Setting</title>
			</Head>
			<div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
				<Card>
					<div className="px-8 py-6">
						<h2 className="mt-3 select-none p-5 text-center text-3xl font-bold tracking-tight sm:text-4xl">
							Setting
						</h2>
						<Avatar
							className="h-20 w-20 text-large"
							isBordered
							radius="full"
							src={session.user.image}
						/>
						<div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2">
							<h1 className="mt-3 select-none p-5 text-2xl font-bold tracking-tight sm:text-2xl">
								ชื่อ-นามสกุล
							</h1>
							<p className="select-none p-5 text-2xl sm:text-2xl">
								{session.user.name}
							</p>
							<h1 className="mt-3 select-none p-5 text-2xl font-bold tracking-tight sm:text-2xl">
								อีเมล
							</h1>
							<p className="select-none p-5 text-2xl sm:text-2xl">
								{session.user.email}
							</p>
							<h1 className="mt-3 select-none p-5 text-2xl font-bold tracking-tight sm:text-2xl">
								ระดับสมาชิก
							</h1>
							<p className="select-none p-5 text-2xl sm:text-2xl">
								{session.user.role}
							</p>
						</div>
						<hr className="my-3 border-gray-200 dark:border-gray-700 sm:mx-auto lg:my-8" />
						<div className="p-5">
							<h1 className="select-none p-5 text-2xl font-bold tracking-tight sm:text-2xl">
								เชื่อมอีเมลอื่น
							</h1>
							<Button className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg">
								เชื่อม
							</Button>
						</div>
					</div>
				</Card>
			</div>
		</div>
	);
}
