import Footer from "./footer";
import NavbarComp from "./navbar";

export default function PreviderComp({ children }) {
	return (
		<div>
			<NavbarComp />
			{children}
			<Footer />
		</div>
	);
}
