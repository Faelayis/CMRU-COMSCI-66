import { useMemo } from "react";

export function useFilteredPaginatedSortedItems({ filterValue, hasSearchFilter, item, page, rowsPerPage, sortDescriptor, statusFilter, statusOptions }) {
	const filteredItems = useMemo(() => {
		let filteredItem = item ? [...item] : [];

		if (hasSearchFilter) {
			filteredItem = filteredItem.filter((item) => item.name.toLowerCase().includes(filterValue.toLowerCase()));
		}

		if (statusFilter !== "all" && [...statusFilter].length !== statusOptions.length) {
			filteredItem = filteredItem.filter((item) => [...statusFilter].includes(item.status));
		}

		return filteredItem;
	}, [item, hasSearchFilter, statusFilter, filterValue, statusOptions]);

	const items = useMemo(() => {
		const start = (page - 1) * rowsPerPage;
		const end = start + rowsPerPage;

		return filteredItems.slice(start, end);
	}, [page, filteredItems, rowsPerPage]);

	const sortedItems = useMemo(() => {
		return [...items].sort((a, b) => {
			const first = a[sortDescriptor.column];
			const second = b[sortDescriptor.column];
			// eslint-disable-next-line prettier/prettier, unicorn/no-nested-ternary
			const cmp = first < second ? -1 : first > second ? 1 : 0;

			return sortDescriptor.direction === "descending" ? -cmp : cmp;
		});
	}, [sortDescriptor, items]);

	return sortedItems;
}
