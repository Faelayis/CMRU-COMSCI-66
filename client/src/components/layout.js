import Footer from "@/components/footer";
import NavbarComp from "@/components/navbar";

export default function PreviderComp({ children }) {
	return (
		<>
			<NavbarComp />
			<main>{children}</main>
			<Footer />
		</>
	);
}
