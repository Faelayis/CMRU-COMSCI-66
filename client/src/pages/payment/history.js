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
import { useCallback } from "react";

const columns = [
	{ name: "วันที่", uid: "date" },
	{ name: "รายการ", uid: "name" },
	{ name: "จำนวนเงิน", uid: "amount" },
	{ name: "สถานะ", uid: "status" },
	{ name: "รายละเอียด", uid: "details" },
];

const statusColorMap = {
	active: "success",
	paused: "danger",
	vacation: "warning",
};

export default function Gallery() {
	const renderCell = useCallback((user, columnKey) => {
		const cellValue = user[columnKey];

		switch (columnKey) {
			case "name":
				if (!user.name) return;
				return (
					<div className="flex flex-col">
						<p className="text-bold text-sm capitalize">{cellValue}</p>
						<p className="text-bold text-default-400 text-sm capitalize">
							{user.note}
						</p>
					</div>
				);
			case "date":
				if (!user.date) return;
				return (
					<div className="flex flex-col">
						<p className="text-bold text-sm capitalize">{cellValue}</p>
						<p className="text-bold text-default-400 text-sm capitalize">
							{user.team}
						</p>
					</div>
				);
			case "status":
				if (!user.status) return;
				return (
					<Chip
						className="capitalize"
						color={statusColorMap[user.status]}
						size="sm"
						variant="flat"
					>
						{cellValue}
					</Chip>
				);
			case "details":
				if (!user.details) return;
				return (
					<div className="relative flex items-center gap-2">
						<span className="cursor-pointer text-lg active:opacity-50">
							ดูสลิป
						</span>
					</div>
				);
			default:
				return cellValue;
		}
	}, []);
	return (
		<div>
			<Head>
				<title>Payment History</title>
			</Head>
			<div className=" mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
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
							<TableBody items={[]}>
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
