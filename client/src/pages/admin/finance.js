import { useBillings } from "@api/billings";
import { date } from "@cmru-comsci-66/utils";
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
	Spinner,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from "@nextui-org/react";
import React from "react";

import Model_AddFinance from "@/dialog/admin/add_finance";

import { ChevronDownIcon } from "../../icon/ChevronDownIcon";
import { SearchIcon } from "../../icon/SearchIcon";
import { VerticalDotsIcon } from "../../icon/VerticalDotsIcon";

const columns = [
	{ name: "ไอดี", sortable: true, uid: "id" },
	{ name: "ชื่อ", sortable: true, uid: "name" },
	{ name: "คำอธิบาย", uid: "description" },
	{ name: "จำนวนเงิน", uid: "price" },
	{ name: "ประเภท", sortable: true, uid: "types" },
	{ name: "เริ่มต้น", uid: "start_at" },
	{ name: "สิ้นสุด", uid: "end_at" },
	{ name: "ตัวเลือก", uid: "actions" },
];

const statusOptions = [
	{ name: "Active", uid: "waiting" },
	{ name: "Succeed", uid: "succeed" },
	{ name: "Failed", uid: "failed" },
	{ name: "Refunded", uid: "refunded" },
	{ name: "Pending Approval", uid: "pending_approval" },
	{ name: "Cancelled", uid: "cancelled" },
	{ name: "Chargeback", uid: "chargeback" },
];

const statusColorMap = {
	cancelled: "default",
	chargeback: "default",
	failed: "warning",
	pending_approval: "default",
	refunded: "default",
	succeed: "danger",
	waiting: "success",
};

const INITIAL_VISIBLE_COLUMNS = [
	"name",
	"description",
	"price",
	"start_at",
	"end_at",
	"actions",
];

export default function App() {
	const {
		billings,
		isError: billingsIsError,
		isLoading: billingsIsLoading,
	} = useBillings();

	const [filterValue, setFilterValue] = React.useState("");
	const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
	const [visibleColumns, setVisibleColumns] = React.useState(
		new Set(INITIAL_VISIBLE_COLUMNS),
	);
	const [statusFilter, setStatusFilter] = React.useState("all");
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const [sortDescriptor, setSortDescriptor] = React.useState({
		column: "age",
		direction: "ascending",
	});
	const [page, setPage] = React.useState(1);
	const pages = Math.ceil((billings?.length ?? 0) / rowsPerPage);
	const hasSearchFilter = Boolean(filterValue);
	const headerColumns = React.useMemo(() => {
		if (visibleColumns === "all") return columns;

		return columns.filter((column) =>
			Array.from(visibleColumns).includes(column.uid),
		);
	}, [visibleColumns]);

	const filteredItems = React.useMemo(() => {
		let filteredUsers = billings ? [...billings] : [];

		if (hasSearchFilter) {
			filteredUsers = filteredUsers.filter((user) =>
				user.name.toLowerCase().includes(filterValue.toLowerCase()),
			);
		}
		if (
			statusFilter !== "all" &&
			Array.from(statusFilter).length !== statusOptions.length
		) {
			filteredUsers = filteredUsers.filter((user) =>
				Array.from(statusFilter).includes(user.status),
			);
		}

		return filteredUsers;
	}, [billings, hasSearchFilter, statusFilter, filterValue]);

	const items = React.useMemo(() => {
		const start = (page - 1) * rowsPerPage;
		const end = start + rowsPerPage;
		const iterableFilteredItems = filteredItems;

		return iterableFilteredItems.slice(start, end);
	}, [page, filteredItems, rowsPerPage]);
	const sortedItems = React.useMemo(() => {
		return [...items].sort((a, b) => {
			const first = a[sortDescriptor.column];
			const second = b[sortDescriptor.column];
			const cmp = first < second ? -1 : first > second ? 1 : 0;

			return sortDescriptor.direction === "descending" ? -cmp : cmp;
		});
	}, [sortDescriptor, items]);

	const renderCell = React.useCallback((user, columnKey) => {
		const cellValue = user[columnKey];

		switch (columnKey) {
			case "name":
				return user.name;
			case "role":
				return (
					<div className="flex flex-col">
						<p className="text-bold text-small capitalize">{cellValue}</p>
						<p className="text-bold text-tiny text-default-500 capitalize">
							{user.team}
						</p>
					</div>
				);
			case "start_at":
				return cellValue
					? date.formatDateTime(cellValue, {
							dateStyle: "long",
					  })
					: "-";
			case "end_at":
				return cellValue
					? date.formatDateTime(cellValue, {
							dateStyle: "long",
					  })
					: "-";
			case "status":
				return (
					<Chip
						className="text-default-600 gap-1 border-none capitalize"
						color={statusColorMap[user.status]}
						size="sm"
						variant="dot"
					>
						{cellValue}
					</Chip>
				);
			case "actions":
				return (
					<div className="relative mx-1 flex items-center justify-self-center">
						<Dropdown className="bg-background border-1 border-default-200">
							<DropdownTrigger aria-label="dropdown-label">
								<Button isIconOnly radius="full" size="sm" variant="light">
									<VerticalDotsIcon className="text-default-400" />
								</Button>
							</DropdownTrigger>
							<DropdownMenu>
								<DropdownItem>แก้ไข</DropdownItem>
								<DropdownItem>ลบ</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					</div>
				);
			default:
				return cellValue === 0 ? cellValue : cellValue ? cellValue : "-";
		}
	}, []);

	const onRowsPerPageChange = React.useCallback((e) => {
		setRowsPerPage(Number(e.target.value));
		setPage(1);
	}, []);

	const onSearchChange = React.useCallback((value) => {
		if (value) {
			setFilterValue(value);
			setPage(1);
		} else {
			setFilterValue("");
		}
	}, []);

	const topContent = React.useMemo(() => {
		return (
			<div className="flex flex-col gap-4">
				<div className="flex items-end justify-between gap-3">
					<Input
						classNames={{
							base: "w-full sm:max-w-[44%]",
							inputWrapper: "border-1",
						}}
						isClearable
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
							<DropdownTrigger
								aria-label="Dropdown Trigger"
								className="hidden sm:flex"
							>
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
							<DropdownTrigger
								aria-label="dropdown-label"
								className="hidden sm:flex"
							>
								<Button
									endContent={<ChevronDownIcon className="text-small" />}
									size="sm"
									variant="flat"
								>
									แถว
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
						<Model_AddFinance />
					</div>
				</div>

				<div className="flex items-center justify-between">
					<span className="text-default-400 text-small">
						มีทั้งหมด {billings?.length || 0} รายการ
					</span>
					<label className="text-default-400 text-small flex items-center">
						แถวต่อหน้า:
						<select
							className="text-default-400 text-small bg-transparent outline-none"
							onChange={onRowsPerPageChange}
						>
							<option value="10">10</option>
							<option value="15">15</option>
							<option value="50">50</option>
							<option value="50">100</option>
						</select>
					</label>
				</div>
			</div>
		);
	}, [
		onSearchChange,
		filterValue,
		statusFilter,
		visibleColumns,
		billings?.length,
		onRowsPerPageChange,
	]);

	const bottomContent = React.useMemo(() => {
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
			</div>
		);
	}, [page, pages, hasSearchFilter]);

	const classNames = React.useMemo(
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

	if (billingsIsLoading) {
		return <Spinner label="กำลังโหลดข้อมูล.." size="sm" />;
	}

	if (billingsIsError) {
		return <Spinner color="danger" label="ไม่สามารถโหลดข้อมูลได้" size="sm" />;
	}

	return (
		<Table
			aria-label="Example table with custom cells, pagination and sorting"
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
			<TableBody emptyContent={"ไม่พบ"} items={sortedItems}>
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
