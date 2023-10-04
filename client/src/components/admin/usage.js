import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";

// Contents
import Afinance from "@/pages/admin/afinance";
import Permis from "@/pages/admin/apermisson";

export default function UsageComp() {
	let tabs = [
		{
			id: "billings",
			label: "Finance",
			content: <Afinance />,
		},
		{
			id: "role",
			label: "Permission",
			content: <Permis />,
		},
	];

	return (
		<div className="flex w-full flex-col">
			<Tabs aria-label="Dynamic tabs" items={tabs}>
				{(item) => (
					<Tab key={item.id} title={item.label}>
						<Card>
							<CardBody>{item.content}</CardBody>
						</Card>
					</Tab>
				)}
			</Tabs>
		</div>
	);
}
