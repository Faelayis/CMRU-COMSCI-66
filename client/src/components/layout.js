import React from "react";

import ZisDrawer from "./drawer";
import Footer from "./footer";

export default function Layout({ children }) {
	return (
		<div>
			<ZisDrawer />
			{children}
			<Footer />
		</div>
	);
}
