import React from "react";

import ZisDrawer from "./drawer";
import Footer from "./footer";

export default function Layout({ children }) {
	let footer = true;
	if (children?.type?.name === "Finance") footer = false;

	return (
		<div>
			<ZisDrawer />
			{children}
			{footer && <Footer />}
		</div>
	);
}
