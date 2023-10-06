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
		{ label: "แกลเลอรี่", url: "/contents/gallery", role: ["developer"] },
		{ label: "สิ่งที่ต้องทำ", url: "/contents/todo", role: ["developer"] },
		{ label: "เกี่ยวกับเรา", url: "/contents/about", role: ["developer"] },
	];

	return (
		<Navbar className="select-none" onMenuOpenChange={setIsMenuOpen}>
			<NavbarContent>
				<NavbarMenuToggle
					aria-label={isMenuOpen ? "Close menu" : "Open menu"}
					className="sm:hidden"
				/>
				<Link href="/" color="foreground">
					<p className="font-bold text-inherit">COMSCI 66</p>
				</Link>
			</NavbarContent>

			<NavbarContent className="hidden gap-4 sm:flex" justify="center">
				{menuItems
					.filter((item) =>
						item.role.includes(
							session?.user?.role ? session?.user?.role : null,
						),
					)
					.map((item) => (
						<NavbarItem key={item.url}>
							<Link href={item.url} color="foreground">
								<p>{item.label}</p>
							</Link>
						</NavbarItem>
					))}
			</NavbarContent>

			<NavbarContent as="div" justify="end">
				{session ? (
					<>
						<ModelComp />
						<Dropdown placement="bottom-end">
							<DropdownTrigger>
								<Avatar
									isBordered
									as="button"
									className="select-none transition-transform"
									color="secondary"
									name="Profile"
									size="md"
									src={session.user.image}
								/>
							</DropdownTrigger>
							<DropdownMenu
								aria-label="Actions"
								selectionMode="single"
								variant="flat"
							>
								<DropdownItem key="profile" className="h-14 gap-2">
									<p className="font-semibold">
										เข้าสู่ระบบโดย{" "}
										<code className="font-semibold">
											{session.user.role?.charAt(0).toUpperCase() +
												session.user.role?.slice(1)}
										</code>
									</p>
									<p className="font-semibold">{session.user.email}</p>
								</DropdownItem>
								<DropdownItem key="settings">
									<Link href="/" isDisabled={false} color="foreground">
										การตั้งค่า
									</Link>
								</DropdownItem>
								{session.user.role === "developer" && (
									<DropdownItem key="dashboard">
										<Link href="/admin/dashboard" color="foreground">
											แดชบอร์ด
										</Link>
									</DropdownItem>
								)}
								<DropdownItem key="help_and_feedback">
									<Link href="/help" color="foreground">
										ความช่วยเหลือและข้อเสนอแนะ
									</Link>
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
					<>
						<Button
							color="primary"
							variant="faded"
							onClick={() => signIn("google", { redirect: false })}
							startContent={
								<FontAwesomeIcon icon={faGoogle} className="h-4 w-4" />
							}
						>
							เข้าสู่ระบบ
						</Button>
					</>
				)}
			</NavbarContent>

			<NavbarMenu>
				{menuItems
					.filter((item) =>
						item.role.includes(
							session?.user?.role ? session?.user?.role : null,
						),
					)
					.map((item, index) => (
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
