import { useArchivePaymentById } from "@api/archive";
import { date } from "@cmru-comsci-66/utils";
import { PaymentMerge } from "@lib/utils/payment";
import {
	Card,
	Chip,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Spinner,
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

export default function PaymentHistory() {
	const { data: session } = useSession();
	const {
		Payment: payment,
		isError: paymentIsError,
		isLoading: paymentIsLoading,
	} = useArchivePaymentById(session?.user?.studentId);

	const [data, setData] = useState([]);

	useEffect(() => {
		if (payment?.length > 0) {
			return setData(PaymentMerge(payment));
		}
	}, [payment]);

	const renderCell = useCallback((list, columnKey) => {
		const cellValue = list[columnKey],
			getStatusChip = () => {
				const isPaid = cellValue,
					isPending = !isPaid && list.amount;

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
						{cellValue ? (
							<Popover placement="bottom-start" showArrow>
								<PopoverTrigger>
									<p className="text-bold cursor-pointer text-sm capitalize">
										{date.get(
											{
												dateStyle: "medium",
											},
											cellValue,
										)}
									</p>
								</PopoverTrigger>
								<PopoverContent>
									<div className="px-1 py-2">
										<div className="text-sm">
											{date.get(
												{
													dateStyle: "full",
												},
												cellValue,
											)}
										</div>
									</div>
								</PopoverContent>
							</Popover>
						) : (
							"-"
						)}
					</div>
				);
			case "name":
				if (!list.name) return;
				return (
					<div className="flex flex-col">
						<p className="text-bold text-sm capitalize">{cellValue}</p>
					</div>
				);
			case "status":
				return getStatusChip();
			case "details":
				if (!list.slip.name) return "-";
				return (
					// 	<div className="relative flex items-center gap-2">
					// 	<Popover placement="right" showArrow>
					// 		<PopoverTrigger>
					// 			<span className="cursor-pointer text-sm active:opacity-50">
					// 				{list.slip.name}
					// 			</span>
					// 		</PopoverTrigger>
					// 		<PopoverContent>
					// 			<div className="px-1 py-2">
					// 				<div className="text-sm">
					// 					<Image
					// 						alt=""
					// 						height="300"
					// 						src={list.slip.link}
					// 						style={{ height: "100%", width: "100%" }}
					// 						width="300"
					// 					/>
					// 				</div>
					// 			</div>
					// 		</PopoverContent>
					// 	</Popover>
					// </div>
					<div className="relative flex items-center gap-2" href={list.slip}>
						{list.slip.link ? (
							<span className="cursor-pointer text-sm active:opacity-50">
								<Link href={list.slip.link} target="_blank">
									{list.slip.name}
								</Link>
							</span>
						) : (
							list.slip.name
						)}
					</div>
				);
			default:
				return cellValue || "-";
		}
	}, []);

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

						<Table
							bottomContent={
								!(!paymentIsLoading && payment?.length > 0) ? (
									<>
										<div className="flex w-full justify-center">
											<div>
												<Spinner
													color={paymentIsError ? "danger" : undefined}
												/>
											</div>
										</div>
										{paymentIsError ? (
											<div className="select-text text-center">
												{`พบข้อผิดพลาด ${
													paymentIsError?.message || paymentIsError
												}`}
											</div>
										) : (
											<div className="text-center">กำลังโหลดข้อมูล..</div>
										)}
									</>
								) : !(payment?.length > 0) ? (
									<div className="text-center">ไม่พบข้อมูล</div>
								) : undefined
							}
							className="select-none"
						>
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
							<TableBody
								isLoading={!(!paymentIsLoading && payment?.length > 0)}
								items={data}
							>
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
