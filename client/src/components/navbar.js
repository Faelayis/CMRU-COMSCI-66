import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	Avatar,
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Link,
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
} from "@nextui-org/react";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

import { AcmeLogo } from "./logo";

export default function NavbarComp() {
	const { data: session } = useSession();

	return (
		<Navbar>
			<NavbarBrand>
				<Link href="/" color="foreground">
					<AcmeLogo />
					<p className="font-bold text-inherit">CMRU COMSCI 66</p>
				</Link>
			</NavbarBrand>

			<NavbarContent className="hidden gap-4 sm:flex" justify="start">
				<NavbarItem>
					<Link color="foreground" href="/contents/todo">
						สิ่งที่ต้องทำ
					</Link>
				</NavbarItem>
				<NavbarItem isActive>
					<Link color="secondary" href="/contents/finance">
						การเงิน
					</Link>
				</NavbarItem>
			</NavbarContent>

			{session ? (
				<NavbarContent as="div" justify="end">
					<Dropdown placement="bottom-end">
						<DropdownTrigger>
							<Avatar
								isBordered
								as="button"
								className="transition-transform"
								color="secondary"
								name="Profile"
								size="md"
								src={session.user.image}
							/>
						</DropdownTrigger>
						<DropdownMenu aria-label="Profile Actions" variant="flat">
							<DropdownItem key="profile" className="h-14 gap-2">
								<p className="font-semibold">เข้าสู่ระบบโดย</p>
								<p className="font-semibold">{session.user.email}</p>
							</DropdownItem>
							<DropdownItem key="settings">การตั้งค่า</DropdownItem>
							<DropdownItem
								key="help_and_feedback"
								href="/help"
								color="warning"
							>
								ความช่วยเหลือและข้อเสนอแนะ
							</DropdownItem>
							<DropdownItem
								key="logout"
								onClick={() => signOut()}
								color="danger"
							>
								ออกจากระบบ
							</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				</NavbarContent>
			) : (
				<NavbarItem>
					<Button
						color="primary"
						variant="faded"
						onClick={() => signIn("google")}
						startContent={
							<FontAwesomeIcon icon={faGoogle} className="h-4 w-4" />
						}
					>
						เข้าสู่ระบบ
					</Button>
				</NavbarItem>
			)}
		</Navbar>
	);
}
