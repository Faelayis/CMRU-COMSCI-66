import React from "react";
import Footer from "./footer";
import ZisDrawer from "./drawer";

export default function Layout({ children }) {
	return (
		<div>
			<ZisDrawer />
			{children}
			<Footer />
		</div>
	);
}
