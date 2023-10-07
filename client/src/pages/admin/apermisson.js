import { Button, Select, user } from "@nextui-org/react";

export default function Permis() {
	return (
		<div className="flex flex-col gap-4">
			<div className="mb-6 flex w-full flex-wrap gap-4 md:mb-0 md:flex-nowrap">
				<Select disablePortal label="fullname" value={user}></Select>
				<Select disablePortal label="users" value={user}></Select>
				<Select disablePortal label="role" value={user}></Select>
			</div>
			<div className="mb-6 flex w-full flex-wrap gap-4 md:mb-0 md:flex-nowrap">
				<Button color="primary"> submit</Button>
			</div>
		</div>
	);
}
