import { PaymentById } from "@api/archive";

export function PaymentMerge(payment: PaymentById) {
	return Object.keys(payment).map((key) => {
		const category = payment[Number(key)];

		if (category.data) {
			return category.data
				.map((list) => ({
					amount: list.data.amount,
					date: list.data.date,
					name: `${payment[Number(key)].name} ${list.name}`,
					slip: list.data.slip,
					status: list.data.status,
				}))
				.map((item, index) => {
					return { ...item, id: index };
				})
				.sort((a, b) => b.id - a.id);
		}
	});
}
