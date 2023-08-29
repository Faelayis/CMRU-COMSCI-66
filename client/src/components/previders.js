import React from "react";

import FooterComp from "./footercomp";
import NavbarComp from "./navbarcomp";

export default function PreviderComp({ children }) {
	return (
		<div>
			<NavbarComp />
			{children}
			<FooterComp />
		</div>
	);
}
