import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";

import Finance from "@/pages/admin/finance";
import Approval_Payment from "@/pages/admin/payment";

export default function UsageComp() {
	const tabs = [
		{
			content: <Finance />,
			id: "finance",
			label: "การเงิน",
		},
		{
			content: <Approval_Payment />,
			id: "approval_request",
			label: "คำขออนุมัติ",
		},
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
