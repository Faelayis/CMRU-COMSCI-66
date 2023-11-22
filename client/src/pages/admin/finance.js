import { deleteBillings, useBillings } from "@api/billings";
import { date } from "@cmru-comsci-66/utils";
import { useFilterPaginatedSortedItems } from "@lib/utils/filter";
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

import LoadingSpinner from "@/components/spinner/loading";
import {
	Columns,
	INITIAL_VISIBLE_COLUMNS,
	StatusColorMap,
	StatusOptions,
} from "@/config/admin/finance";
import { TableRowsPerPage } from "@/config/default";
import Model_AddFinance from "@/dialog/admin/finance/add";

import { ChevronDownIcon } from "../../icon/ChevronDownIcon";
import { SearchIcon } from "../../icon/SearchIcon";
import { VerticalDotsIcon } from "../../icon/VerticalDotsIcon";

export default function Finances() {
	const {
			billings,
			isError: billingsIsError,
			isLoading: billingsIsLoading,
		} = useBillings(undefined, {
			refreshInterval: 1000,
			revalidateIfStale: false,
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
		}),
		{ trigger } = deleteBillings();

	const [filterValue, setFilterValue] = useState(""),
		[selectedKeys, setSelectedKeys] = useState(new Set([])),
		[visibleColumns, setVisibleColumns] = useState(
			new Set(INITIAL_VISIBLE_COLUMNS),
		),
		[statusFilter, setStatusFilter] = useState("all"),
		[rowsPerPage, setRowsPerPage] = useState(TableRowsPerPage),
		[sortDescriptor, setSortDescriptor] = useState({
			column: "id",
			direction: "ascending",
		}),
		[page, setPage] = useState(1),
		pages = Math.ceil((billings?.length ?? 0) / rowsPerPage),
		hasSearchFilter = Boolean(filterValue),
		headerColumns = useMemo(() => {
			if (visibleColumns === "all") return Columns;

			return Columns.filter((column) =>
				Array.from(visibleColumns).includes(column.uid),
			);
		}, [visibleColumns]);

	const sortedItems = useFilterPaginatedSortedItems({
		filterValue,
		hasSearchFilter,
		item: billings,
		page,
		rowsPerPage,
		sortDescriptor,
		statusFilter,
		statusOptions: StatusOptions,
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
		(List, columnKey) => {
			const cellValue = List[columnKey];

			switch (columnKey) {
				case "name":
					return List.name;
				case "role":
					return (
						<div className="flex flex-col">
							<p className="text-bold text-small capitalize">{cellValue}</p>
							<p className="text-bold text-tiny text-default-500 capitalize">
								{List.team}
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
							color={StatusColorMap[List.status]}
							size="sm"
							variant="dot"
						>
							{cellValue}
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
									onAction={(item) => handleDropdownAction(item, List.id)}
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
					return cellValue === 0 ? cellValue : cellValue ? cellValue : "-";
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
								{StatusOptions.map((status) => (
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
								{Columns.map((column) => (
									<DropdownItem className="capitalize" key={column.uid}>
										{capitalize(column.name)}
									</DropdownItem>
								))}
							</DropdownMenu>
						</Dropdown>
						<Model_AddFinance />
					</div>
				</div>

				{billings?.length ? (
					<div className="flex items-center justify-between">
						<span className="text-small text-default-400">
							มีทั้งหมด {billings?.length || 0} รายการ
						</span>
						{billings?.length <= rowsPerPage ? (
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
		billings?.length,
		rowsPerPage,
		onRowsPerPageChange,
	]);

	const bottomContent = useMemo(() => {
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

	if (billingsIsError || billingsIsLoading) {
		return (
			<LoadingSpinner isError={billingsIsError} isLoading={billingsIsLoading} />
		);
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
