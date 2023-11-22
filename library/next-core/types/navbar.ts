// eslint-disable-next-line prettier/prettier
import type { RoleType } from "@cmru-comsci-66/database";

export type DropdownItemKeyTypes = "payment_history" | "dashboard" | "settings" | "help_and_feedback" | "logout";

export type NavigationItemTypes = {
	label: string;
	role: RoleType[];
	url: string;
};

export type DropdownItemTypes = {
	[key: number]: {
		key: string;
		name: string;
		role?: RoleType[] | false;
		roleExclude?: RoleType[];
	}[];
	disabled: DropdownItemKeyTypes[];
};
