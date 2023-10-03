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
	NavbarContent,
	NavbarItem,
	NavbarMenu,
	NavbarMenuItem,
	NavbarMenuToggle,
} from "@nextui-org/react";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

import ModelComp from "./modelcomp";

export default function NavbarComp() {
	const { data: session } = useSession();
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);

	const menuItems = [
		{ label: "Todo", url: "/contents/todo" },
		{ label: "About", url: "/contents/about" },
		{ label: "Gallery", url: "/contents/gallery" },
	];

	return (
		<Navbar onMenuOpenChange={setIsMenuOpen}>
			<NavbarContent>
				<NavbarMenuToggle
					aria-label={isMenuOpen ? "Close menu" : "Open menu"}
					className="sm:hidden"
				/>
				<Link href="/" color="foreground">
					<p className="font-bold text-inherit">COMSCI 66</p>
				</Link>
			</NavbarContent>

			{/** center contents */}
			<NavbarContent className="hidden gap-4 sm:flex" justify="center">
				<NavbarItem>
					<Link color="foreground" href="/contents/todo">
						Todo
					</Link>
				</NavbarItem>
				<NavbarItem isActive>
					<Link href="/contents/about" aria-current="page" color="secondary">
						About Us
					</Link>
				</NavbarItem>
				<NavbarItem>
					<Link href="/contents/gallery" color="foreground">
						Gallery
					</Link>
				</NavbarItem>
			</NavbarContent>

			{/** Profile and Login System */}
			<NavbarContent as="div" justify="end">
				{session ? (
					<>
						<ModelComp />
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
									<p className="font-semibold">role</p>
								</DropdownItem>
								<DropdownItem key="settings">การตั้งค่า</DropdownItem>
								<DropdownItem key="help_and_feedback" href="#">
									Dashboard
								</DropdownItem>
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
					</>
				) : (
					// Login System (for mobile)
					<>
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
					</>
				)}
			</NavbarContent>

			{/** open menu */}
			<NavbarMenu>
				{menuItems.map((item, index) => (
					<NavbarMenuItem key={`${item.label}-${index}`}>
						<Link
							color="foreground"
							className="w-full"
							href={item.url}
							size="lg"
						>
							{item.label}
						</Link>
					</NavbarMenuItem>
				))}
			</NavbarMenu>
		</Navbar>
	);
}
