import { useArchivePaymentById } from "@api/archive";
import {
	Card,
	Chip,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from "@nextui-org/react";
import Head from "next/head";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";

const columns = [
	{ name: "วันที่", uid: "date" },
	{ name: "รายการ", uid: "name" },
	{ name: "จำนวนเงิน", uid: "amount" },
	{ name: "สถานะ", uid: "status" },
	{ name: "รายละเอียด", uid: "details" },
];

export default function Gallery() {
	const { data: session } = useSession();
	const {
		Payment: payment,
		isError: paymentIsError,
		isLoading: paymentIsLoading,
	} = useArchivePaymentById(session?.user?.studentId);

	const [data, setData] = useState([]);

	useEffect(() => {
		if (payment?.length > 0) {
			const firstCategory = payment[0];

			if (firstCategory.data) {
				const paymentStatusByMonth = firstCategory.data.map((monthData) => ({
					amount: monthData.data.amount,
					date: monthData.data.date,
					name: monthData.name,
					slip: monthData.data.slip,
					status: monthData.data.status,
				}));

				setData(
					paymentStatusByMonth
						.map((item, index) => {
							return { ...item, id: index };
						})
						.sort((a, b) => b.id - a.id),
				);
			}
		}
	}, [payment]);

	const renderCell = useCallback((user, columnKey) => {
		const cellValue = user[columnKey];

		const getStatusChip = () => {
			const isPaid = cellValue,
				isPending = !isPaid && user.amount;

			let color, text;

			if (isPaid) {
				color = "success";
				text = "จ่ายแล้ว";
			} else if (isPending) {
				color = "warning";
				text = "รอตรวจสอบ";
			} else {
				color = "danger";
				text = "ไม่ได้จ่าย";
			}

			return (
				<Chip className="capitalize" color={color} size="sm" variant="flat">
					{text}
				</Chip>
			);
		};

		switch (columnKey) {
			case "date":
				return (
					<div className="flex flex-col">
						<p className="text-bold text-sm capitalize">{cellValue || "-"}</p>
						{/* <p className="text-bold text-default-400 text-sm capitalize">
							note
						</p> */}
					</div>
				);
			case "name":
				if (!user.name) return;
				return (
					<div className="flex flex-col">
						<p className="text-bold text-sm capitalize">{cellValue}</p>
					</div>
				);
			case "status":
				return getStatusChip();
			case "details":
				if (!user.slip.name) return "-";
				return (
					<div className="relative flex items-center gap-2" href={user.slip}>
						<span className="cursor-pointer text-sm active:opacity-50">
							<Link href={user.slip.link} target="_blank">
								ดูสลิป ({user.slip.name})
							</Link>
						</span>
					</div>
				);
			default:
				return cellValue || "-";
		}
	}, []);

	if (paymentIsLoading) {
		return <></>;
	}

	return (
		<div>
			<Head>
				<title>Payment History</title>
			</Head>
			<div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
				<Card>
					<div className="px-8 py-6">
						<h2 className="mt-3 select-none p-5 text-center text-3xl font-bold tracking-tight sm:text-4xl">
							ประวัติการจ่ายเงิน
						</h2>
						<Table className="select-none">
							<TableHeader columns={columns}>
								{(column) => (
									<TableColumn
										align={column.uid === "actions" ? "center" : "start"}
										key={column.uid}
									>
										{column.name}
									</TableColumn>
								)}
							</TableHeader>
							<TableBody items={data}>
								{(item) => (
									<TableRow key={item?.id}>
										{(columnKey) => (
											<TableCell>{renderCell(item, columnKey)}</TableCell>
										)}
									</TableRow>
								)}
							</TableBody>
						</Table>
					</div>
				</Card>
			</div>
		</div>
	);
}
