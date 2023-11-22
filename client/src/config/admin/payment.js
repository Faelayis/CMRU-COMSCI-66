import { BillingsStatusColorMap } from "@/config/color";

const Columns = [
	{ name: "ไอดี", sortable: true, uid: "id" },
	{ name: "รายการ", sortable: true, uid: "billing.name" },
	{ name: "คำอธิบาย", uid: "description" },
	{ name: "จำนวนเงิน", uid: "amount" },
	{ name: "สถานะ", sortable: true, uid: "status" },
	{ name: "โดย", uid: "student.name" },
	{ name: "สร้าง", sortable: true, uid: "created_at" },
	{ name: "อัปเดต", sortable: true, uid: "update_at" },
	{ name: "ตัวเลือก", uid: "actions" },
];

const StatusOptions = [
	{ name: "เสร็จสิ้น ", uid: "succeed" },
	{ name: "รอ", uid: "waiting" },
	{ name: "รอการอนุมัติ", uid: "pending_approval" },
	{ name: "ยกเลิก", uid: "cancelled" },
	{ name: "ล้มเหลว", uid: "failed" },
	{ name: "คืนเงินแล้ว", uid: "refunded" },
	{ name: "ปฏิเสธการชำระเงิน", uid: "chargeback" },
];

const StatusColorMap = BillingsStatusColorMap;

const INITIAL_VISIBLE_COLUMNS = [
	"billing.name",
	"amount",
	"status",
	"actions",
	"student.name",
];

// eslint-disable-next-line simple-import-sort/exports
export { Columns, INITIAL_VISIBLE_COLUMNS, StatusColorMap, StatusOptions };
