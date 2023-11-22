import Finance from "@/pages/admin/finance";
import Approval_Payment from "@/pages/admin/payment";

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

export { tabs };
