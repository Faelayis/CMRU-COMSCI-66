import { deletePayment, usePayment } from "@api/payment";
import { useFilteredPaginatedSortedItems } from "@lib/utils/filtered";
import { capitalize } from "@lib/utils/finance";
import {
	Button,
	Chip,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Input,
	Pagination,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from "@nextui-org/react";
import { useCallback, useMemo, useState } from "react";

import DatePopover from "@/components/popover/date";
import LoadingSpinner from "@/components/spinner/loading";

import { ChevronDownIcon } from "../../icon/ChevronDownIcon";
import { SearchIcon } from "../../icon/SearchIcon";
import { VerticalDotsIcon } from "../../icon/VerticalDotsIcon";

const columns = [
	{ name: "ไอดี", sortable: true, uid: "id" },
	{ name: "รายการ", sortable: true, uid: "billing.name" },
	{ name: "คำอธิบาย", uid: "description" },
	{ name: "จำนวนเงิน", uid: "amount" },
	{ name: "สถานะ", sortable: true, uid: "status" },
	{ name: "โดย", uid: "student.name" },
	{ name: "สร้าง", sortable: true, uid: "created_at" },
	{ name: "อัปเดต", sortable: true, uid: "update_at" },
	{ name: "ตัวเลือก", uid: "actions" },
];

const statusOptions = [
	{ name: "เสร็จสิ้น ", uid: "succeed" },
	{ name: "รอ", uid: "waiting" },
	{ name: "รอการอนุมัติ", uid: "pending_approval" },
	{ name: "ยกเลิก", uid: "cancelled" },
	{ name: "ล้มเหลว", uid: "failed" },
	{ name: "คืนเงินแล้ว", uid: "refunded" },
	{ name: "ปฏิเสธการชำระเงิน", uid: "chargeback" },
];

const statusColorMap = {
	cancelled: "default",
	chargeback: "default",
	failed: "warning",
	pending_approval: "default",
	refunded: "default",
	succeed: "danger",
	waiting: "danger",
};

const INITIAL_VISIBLE_COLUMNS = [
	"billing.name",
	"amount",
	"status",
	"actions",
	"student.name",
];

export default function App() {
	const {
			isError: paymentIsError,
			isLoading: paymentIsLoading,
			payment,
		} = usePayment(undefined, {
			refreshInterval: 1000,
			revalidateIfStale: false,
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
		}),
		{ trigger } = deletePayment();

	console.log(payment);
	const [filterValue, setFilterValue] = useState(""),
		[selectedKeys, setSelectedKeys] = useState(new Set([])),
		[visibleColumns, setVisibleColumns] = useState(
			new Set(INITIAL_VISIBLE_COLUMNS),
		),
		[statusFilter, setStatusFilter] = useState("all"),
		[rowsPerPage, setRowsPerPage] = useState(10),
		[sortDescriptor, setSortDescriptor] = useState({
			column: "status",
			direction: "ascending",
		}),
		[page, setPage] = useState(1),
		pages = Math.ceil(payment?.length / rowsPerPage),
		hasSearchFilter = Boolean(filterValue),
		headerColumns = useMemo(() => {
			if (visibleColumns === "all") return columns;

			return columns.filter((column) =>
				Array.from(visibleColumns).includes(column.uid),
			);
		}, [visibleColumns]);

	const sortedItems = useFilteredPaginatedSortedItems({
		filterValue,
		hasSearchFilter,
		item: payment,
		page,
		rowsPerPage,
		sortDescriptor,
		statusFilter,
		statusOptions,
	});

	const handleDropdownAction = useCallback(
		(action, itemId) => {
			switch (action) {
				case "delete":
					trigger(itemId);
					break;
			}
		},
		[trigger],
	);

	const renderCell = useCallback(
		(payment, columnKey) => {
			const cellValue = payment[columnKey];

			switch (columnKey) {
				case "billing.name":
					return payment.billing?.name;
				case "student.name":
					return payment.student?.name;
				case "role":
					return (
						<div className="flex flex-col">
							<p className="text-bold text-small capitalize">{cellValue}</p>
							<p className="text-bold text-tiny text-default-500 capitalize">
								{payment.team}
							</p>
						</div>
					);
				case "created_at":
					return <DatePopover value={cellValue} />;
				case "update_at":
					return <DatePopover value={cellValue} />;
				case "status":
					return (
						<Chip
							className="text-default-600 gap-1 border-none capitalize"
							color={statusColorMap[payment.approval.status]}
							size="sm"
							variant="dot"
						>
							{payment.approval.status}
						</Chip>
					);
				case "actions":
					return (
						<div className="relative mx-1 flex items-center justify-self-center">
							<Dropdown className="border-1 border-default-200 bg-background">
								<DropdownTrigger aria-label="dropdown-label">
									<Button isIconOnly radius="full" size="sm" variant="light">
										<VerticalDotsIcon className="text-default-400" />
									</Button>
								</DropdownTrigger>
								<DropdownMenu
									disabledKeys={["edit"]}
									onAction={(item) => handleDropdownAction(item, payment.id)}
								>
									<DropdownItem key="edit">แก้ไข</DropdownItem>
									<DropdownItem
										className="text-danger"
										color="danger"
										key="delete"
									>
										ลบ
									</DropdownItem>
								</DropdownMenu>
							</Dropdown>
						</div>
					);
				default:
					return cellValue;
			}
		},
		[handleDropdownAction],
	);

	const onRowsPerPageChange = useCallback((e) => {
		setRowsPerPage(Number(e.target.value));
		setPage(1);
	}, []);

	const onSearchChange = useCallback((value) => {
		if (value) {
			setFilterValue(value);
			setPage(1);
		} else {
			setFilterValue("");
		}
	}, []);

	const topContent = useMemo(() => {
		return (
			<div className="flex flex-col gap-4">
				<div className="flex items-end justify-between gap-3">
					<Input
						classNames={{
							base: "w-full sm:max-w-[44%]",
							inputWrapper: "border-1",
						}}
						isClearable
						isDisabled={!payment?.length}
						onClear={() => setFilterValue("")}
						onValueChange={onSearchChange}
						placeholder="ค้นหาตามชื่อ..."
						size="sm"
						startContent={<SearchIcon className="text-default-300" />}
						value={filterValue}
						variant="bordered"
					/>
					<div className="flex gap-3">
						<Dropdown>
							<DropdownTrigger className="hidden sm:flex">
								<Button
									endContent={<ChevronDownIcon className="text-small" />}
									isDisabled={true}
									size="sm"
									variant="flat"
								>
									สถานะ
								</Button>
							</DropdownTrigger>
							<DropdownMenu
								aria-label="Table Columns"
								closeOnSelect={false}
								disallowEmptySelection
								onSelectionChange={setStatusFilter}
								selectedKeys={statusFilter}
								selectionMode="multiple"
							>
								{statusOptions.map((status) => (
									<DropdownItem className="capitalize" key={status.uid}>
										{capitalize(status.name)}
									</DropdownItem>
								))}
							</DropdownMenu>
						</Dropdown>
						<Dropdown>
							<DropdownTrigger className="hidden sm:flex">
								<Button
									endContent={<ChevronDownIcon className="text-small" />}
									size="sm"
									variant="flat"
								>
									คอลัมน์
								</Button>
							</DropdownTrigger>
							<DropdownMenu
								aria-label="Table Columns"
								closeOnSelect={false}
								disallowEmptySelection
								onSelectionChange={setVisibleColumns}
								selectedKeys={visibleColumns}
								selectionMode="multiple"
							>
								{columns.map((column) => (
									<DropdownItem className="capitalize" key={column.uid}>
										{capitalize(column.name)}
									</DropdownItem>
								))}
							</DropdownMenu>
						</Dropdown>
					</div>
				</div>

				{payment?.length ? (
					<div className="flex items-center justify-between">
						<span className="text-small text-default-400">
							มีทั้งหมด {payment?.length} คำขอ
						</span>
						{payment?.length >= rowsPerPage ? (
							<label className="text-small text-default-400 flex items-center">
								แถวต่อหน้า:
								<select
									className="text-small text-default-400 bg-transparent outline-none"
									onChange={onRowsPerPageChange}
								>
									<option value="10">10</option>
									<option value="15">15</option>
									<option value="50">50</option>
									<option value="50">100</option>
								</select>
							</label>
						) : undefined}
					</div>
				) : undefined}
			</div>
		);
	}, [
		onSearchChange,
		filterValue,
		statusFilter,
		visibleColumns,
		payment?.length,
		rowsPerPage,
		onRowsPerPageChange,
	]);

	const bottomContent = useMemo(() => {
		if (!payment?.length) return;

		return (
			<div className="flex items-center justify-between p-2">
				<Pagination
					classNames={{
						cursor: "bg-foreground text-background",
					}}
					color="default"
					isDisabled={hasSearchFilter}
					onChange={setPage}
					page={page}
					showControls
					total={pages}
					variant="light"
				/>
				{/* <span className="text-small text-default-400">
					{selectedKeys === "all"
						? "All items selected"
						: `${selectedKeys.size} จาก ${items.length} เลือกแล้ว`}
				</span> */}
			</div>
		);
	}, [payment?.length, hasSearchFilter, page, pages]);

	const classNames = useMemo(
		() => ({
			td: [
				"group-data-[first=true]:first:before:rounded-none",
				"group-data-[first=true]:last:before:rounded-none",
				"group-data-[middle=true]:before:rounded-none",
				"group-data-[last=true]:first:before:rounded-none",
				"group-data-[last=true]:last:before:rounded-none",
			],
			th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
			wrapper: ["max-h-[382px]", "max-w-3xl"],
		}),
		[],
	);

	if (paymentIsError || paymentIsLoading) {
		return (
			<LoadingSpinner isError={paymentIsError} isLoading={paymentIsLoading} />
		);
	}

	return (
		<Table
			bottomContent={bottomContent}
			bottomContentPlacement="outside"
			checkboxesProps={{
				classNames: {
					wrapper: "after:bg-foreground after:text-background text-background",
				},
			}}
			classNames={classNames}
			isCompact
			onSelectionChange={setSelectedKeys}
			onSortChange={setSortDescriptor}
			removeWrapper
			selectedKeys={selectedKeys}
			selectionMode="none"
			sortDescriptor={sortDescriptor}
			topContent={topContent}
			topContentPlacement="outside"
		>
			<TableHeader columns={headerColumns}>
				{(column) => (
					<TableColumn
						align={column.uid === "actions" ? "center" : "start"}
						allowsSorting={column.sortable}
						key={column.uid}
					>
						{column.name}
					</TableColumn>
				)}
			</TableHeader>
			<TableBody
				emptyContent={"ไม่พบการชำระเงินหรือคำขอใดๆ"}
				items={sortedItems}
			>
				{(item) => (
					<TableRow key={item.id}>
						{(columnKey) => (
							<TableCell>{renderCell(item, columnKey)}</TableCell>
						)}
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
}
