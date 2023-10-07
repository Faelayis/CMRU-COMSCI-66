import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	Avatar,
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownSection,
	DropdownTrigger,
	Link,
	Navbar,
	NavbarContent,
	NavbarItem,
	NavbarMenu,
	NavbarMenuItem,
	NavbarMenuToggle,
	User,
} from "@nextui-org/react";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

import ModelComp from "@/dialog/pay";

export default function NavbarComp() {
	const router = useRouter(),
		openURL = (url) => {
			router.push(url);
		};

	const { data: session, status } = useSession();
	const isLogin = status === "authenticated" || status === "loading";
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);

	const menuItems = [
		{ label: "แกลเลอรี่", role: ["developer"], url: "/contents/gallery" },
		{ label: "สิ่งที่ต้องทำ", role: ["developer"], url: "/contents/todo" },
		{ label: "เกี่ยวกับเรา", role: ["developer"], url: "/contents/about" },
	].filter((item) =>
		item.role.includes(session?.user?.role ? session?.user?.role : null),
	);

	return (
		<Navbar className="select-none" onMenuOpenChange={setIsMenuOpen}>
			<NavbarContent>
				<NavbarMenuToggle
					aria-label={isMenuOpen ? "Close menu" : "Open menu"}
					className="sm:hidden"
				/>

				<Link
					className="cursor-pointer"
					color="foreground"
					onClick={() => openURL("/")}
				>
					<p className="font-bold text-inherit">COMSCI 66</p>
				</Link>
			</NavbarContent>

			<NavbarContent className="hidden gap-4 sm:flex" justify="center">
				{menuItems.map((item) => (
					<NavbarItem
						isActive={router.pathname === item.url ? true : false}
						key={item.url}
					>
						<p
							className="cursor-pointer"
							color="foreground"
							onClick={() => openURL(item.url)}
						>
							{item.label}
						</p>
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
									as="button"
									className="select-none transition-transform"
									color="default"
									isBordered
									name="Profile"
									size="md"
									src={session.user.image}
								/>
							</DropdownTrigger>

							<DropdownMenu
								aria-label="Actions"
								disabledKeys={["profile", "settings", "help_and_feedback"]}
								onAction={(item) => {
									switch (item) {
										case "dashboard":
											openURL("/admin/dashboard");
											break;
										case "settings":
											openURL("/");
											break;
										case "help_and_feedback":
											openURL("/help");
											break;
										case "logout":
											signOut();
											break;
									}
								}}
								selectionMode="none"
								variant="flat"
							>
								<DropdownSection aria-label="Profile & Actions" showDivider>
									<DropdownItem
										className="h-14 gap-2 opacity-100"
										isReadOnly
										key="profile"
									>
										<User
											avatarProps={{
												size: "sm",
												src: session.user.image,
											}}
											classNames={{
												description: "text-default-500 ",
												name: "text-default-600",
											}}
											description={session.user.email}
											name={session.user.nickname || session.user.name}
										/>
									</DropdownItem>

									<DropdownItem key="dashboard">แดชบอร์ด</DropdownItem>
									<DropdownItem key="settings">การตั้งค่า</DropdownItem>
								</DropdownSection>

								<DropdownSection aria-label="Help & Feedback" showDivider>
									<DropdownItem key="help_and_feedback">
										ความช่วยเหลือและข้อเสนอแนะ
									</DropdownItem>
								</DropdownSection>

								<DropdownSection aria-label="Logout">
									<DropdownItem
										className="text-danger"
										color="danger"
										key="logout"
									>
										ออกจากระบบ
									</DropdownItem>
								</DropdownSection>
							</DropdownMenu>
						</Dropdown>
					</>
				) : (
					<>
						<Button
							color="primary"
							disabled={isLogin}
							onClick={() => signIn("google", { redirect: false })}
							startContent={
								<FontAwesomeIcon className="h-4 w-4" icon={faGoogle} />
							}
							variant="faded"
						>
							เข้าสู่ระบบ
						</Button>
					</>
				)}
			</NavbarContent>

			<NavbarMenu>
				{menuItems.map((item, index) => (
					<NavbarMenuItem key={`${item.label}-${index}`}>
						<Link
							className="w-full cursor-pointer"
							color="foreground"
							onClick={() => {
								openURL(item.url);
							}}
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
