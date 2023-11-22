/* eslint-disable no-unused-vars */
import { DropdownItemTypes, NavigationItemTypes } from "@lib/types/navbar";

/**
 * @type {NavigationItemTypes}
 */
const navigationItem = [
	{
		label: "แกลเลอรี่",
		role: ["developer"],
		url: "/contents/gallery",
	},
	{
		label: "สิ่งที่ต้องทำ",
		role: ["developer"],
		url: "/contents/todo",
	},
	{
		label: "เกี่ยวกับเรา",
		role: ["developer"],
		url: "/contents/about",
	},
];

/**
 * @type {DropdownItemTypes}
 */
const dropdownItem = {
	1: [
		{
			key: "payment_history",
			name: "ประวัติจ่ายเงิน",
			role: false,
			// roleExclude: ["unknown"],
		},
		{
			key: "dashboard",
			name: "แดชบอร์ด",
			role: ["developer", "admin"],
		},
		{
			key: "settings",
			name: "การตั้งค่า",
			role: false,
		},
	],
	2: [
		{
			key: "help_and_feedback",
			name: "ความช่วยเหลือและข้อเสนอแนะ",
			role: false,
		},
	],
	disabled: ["profile", "settings", "help_and_feedback"],
};

export { dropdownItem, navigationItem };
