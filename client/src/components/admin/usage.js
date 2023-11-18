import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";

import finance from "@/pages/admin/finance";

export default function UsageComp() {
	const tabs = [
		{
			content: <finance />,
			id: "billings",
			label: "การเงิน",
		},
		// {
		// 	content: undefined,
		// 	id: "role",
		// 	label: "คำขออนุมัติ",
		// },
	];

	return (
		<div className="flex w-full flex-col">
			<div>
				<Tabs items={tabs}>
					{(item) => (
						<Tab key={item.id} title={item.label}>
							<Card>
								<CardBody>{item.content}</CardBody>
							</Card>
						</Tab>
					)}
				</Tabs>
			</div>
		</div>
	);
}
