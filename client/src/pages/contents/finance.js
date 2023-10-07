import { Button, Card, Input, Select, SelectItem } from "@nextui-org/react";
import Head from "next/head";

export default function Finance() {
	return (
		<div>
			<Head>
				<title>Finance</title>
			</Head>
			<div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
				<Card
					shadow
					style={{
						alignItems: "center",
						display: "flex",
						flexDirection: "column",
						padding: "20px",
					}}
				>
					<h1 style={{ fontSize: "2.5rem", marginTop: "15px" }}>
						Finance Page
					</h1>
					<p style={{ marginBottom: "15px" }}>
						โปรดตรวจสอบข้อมูลของท่านก่อนส่งข้อมูล
					</p>

					<div className="flex w-full flex-col gap-4">
						<Select label="Name" placeholder="ชื่อนามสกุล">
							<SelectItem></SelectItem>
						</Select>
						<Input label="Student ID" placeholder="รหัสนักศึกษา" />
						<Input label="Price" placeholder="จำนวนเงิน" />
						<Input label="Note" placeholder="หมายเหตุ" />
						<Select label="Uploadfile" placeholder="สลิป">
							<SelectItem></SelectItem>
						</Select>
						<Select label="Events" placeholder="กิจกรรม">
							<SelectItem></SelectItem>
						</Select>
						<Button
							className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
							radius="full"
						>
							ส่งข้อมูล
						</Button>
					</div>
				</Card>
			</div>
		</div>
	);
}
