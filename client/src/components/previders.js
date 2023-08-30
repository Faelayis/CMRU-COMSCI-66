import React from "react";

import Footer from "./footer";
import NavigationBar from "./navbar";

export default function PreviderComp({ children }) {
	return (
		<div>
			<NavigationBar />
			{children}
			<Footer />
		</div>
	);
}
