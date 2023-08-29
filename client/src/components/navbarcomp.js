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

import { AcmeLogo } from "./acmelogo";

export default function NavbarComp() {
	const { data: session } = useSession();

	const handleItemClick = (text) => {
		if (text === "Home") {
			window.location.href = "/";
		} else {
			window.location.href = `/contents/${text
				.toLowerCase()
				.replace(" ", "-")}`;
		}
	};
	return (
		<Navbar>
			<NavbarBrand>
				<Link href="/" color="foreground">
					<AcmeLogo />
					<p className="font-bold text-inherit">CMRU COMSCI 66</p>
				</Link>
			</NavbarBrand>

			<NavbarContent className="hidden sm:flex gap-4" justify="start">
				<NavbarItem>
					<Link color="foreground" onClick={() => handleItemClick("ToDo")}>
						ToDo
					</Link>
				</NavbarItem>
				<NavbarItem isActive>
					<Link
						onClick={() => handleItemClick("Finance")}
						aria-current="page"
						color="secondary"
					>
						Finance
					</Link>
				</NavbarItem>
				<NavbarItem>
					<Link color="foreground" onClick={() => handleItemClick("Leaders")}>
						Leaders
					</Link>
				</NavbarItem>
				<NavbarItem>
					<Link color="foreground" onClick={() => handleItemClick("About")}>
						About
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
								<p className="font-semibold">Signed in as</p>
								<p className="font-semibold">{session.user.email}</p>
							</DropdownItem>
							<DropdownItem key="settings">My Settings</DropdownItem>
							<DropdownItem key="team_settings">Team Settings</DropdownItem>
							<DropdownItem key="analytics">Analytics</DropdownItem>
							<DropdownItem key="system">System</DropdownItem>
							<DropdownItem key="configurations">Configurations</DropdownItem>
							<DropdownItem key="help_and_feedback">
								Help & Feedback
							</DropdownItem>
							<DropdownItem
								key="logout"
								onClick={() => signOut()}
								color="danger"
							>
								Log Out
							</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				</NavbarContent>
			) : (
				<NavbarItem>
					<Button color="success" onClick={() => signIn()} variant="flat">
						Sign In
					</Button>
				</NavbarItem>
			)}
		</Navbar>
	);
}
