import { PaymentById } from "@api/archive";

function checksNameMatch(index: string, list: string): string {
	if (index.toString() === list.toString()) return `${index}`;

	return `${index} ${list}`;
}

export function PaymentMerge(payment: PaymentById) {
	const merged = Object.keys(payment).map((key, index) => {
		const category = payment[index];

		if (category.data) {
			return category.data
				.map((list) => ({
					amount: list.data.amount ? `${list.data.amount} บาท` : list.data.amount,
					date: list.data.date,
					name: checksNameMatch(payment[index].name, list.name),
					slip: list.data.slip,
					status: list.data.status,
				}))
				.map((item, index) => {
					return { ...item, id: index };
				}); //.sort((a, b) => b.id - a.id);
		}
	});

	return merged.flat();
}
