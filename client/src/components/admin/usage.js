import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";

import { tabs } from "@/config/admin";

export default function UsageComp() {
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
