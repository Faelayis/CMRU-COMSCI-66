import { BillingsStatusColorMap } from "@/config/color";

const Columns = [
	{ name: "ไอดี", sortable: true, uid: "id" },
	{ name: "ชื่อ", sortable: true, uid: "name" },
	{ name: "คำอธิบาย", uid: "description" },
	{ name: "จำนวนเงิน", sortable: true, uid: "price" },
	{ name: "ประเภท", sortable: true, uid: "types" },
	{ name: "เริ่มต้น", sortable: true, uid: "start_at" },
	{ name: "สิ้นสุด", sortable: true, uid: "end_at" },
	{ name: "ตัวเลือก", uid: "actions" },
];

const StatusOptions = [
	{ name: "Active", uid: "waiting" },
	{ name: "Succeed", uid: "succeed" },
	{ name: "Failed", uid: "failed" },
	{ name: "Refunded", uid: "refunded" },
	{ name: "Pending Approval", uid: "pending_approval" },
	{ name: "Cancelled", uid: "cancelled" },
	{ name: "Chargeback", uid: "chargeback" },
];

const StatusColorMap = BillingsStatusColorMap;

const INITIAL_VISIBLE_COLUMNS = [
	"name",
	"description",
	"price",
	"start_at",
	"end_at",
	"actions",
];

// eslint-disable-next-line simple-import-sort/exports
export { Columns, INITIAL_VISIBLE_COLUMNS, StatusColorMap, StatusOptions };
