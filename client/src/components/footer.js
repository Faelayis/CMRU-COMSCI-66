import { Card } from "@mui/material";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import * as React from "react";

function handleToPage(page) {
	window.location.href = `/subjects/${page.toLowerCase()}`;
}

function Footer() {
	const pageLinks = [
		"multimedia",
		"math",
		"desigeprogram",
		"digitalliteracy",
		"holisticcare",
		"thai",
	];

	const teamLinks = [
		{
			name: "MofuNetive",
			link: "https://mofuproject.vercel.app/",
		},
		{
			name: "Faelayis",
			link: "https://github.com/Faelayis",
		},
		{
			name: "Zismail-Dev",
			link: "https://github.com/zismaildev",
		},
	];

	return (
		<>
			<Card p={5} className="Card-Footer">
				<Container
					component="footer"
					sx={{
						borderTop: (theme) => `1px solid ${theme.palette.divider}`,
						mt: 8,
						py: [3, 6],
					}}
				>
					<Grid container spacing={4} justifyContent="space-evenly">
						<Grid item xs={12} sm={6} md={3}>
							<Typography variant="h6" color="text.primary" gutterBottom>
								Team
							</Typography>
							<ul>
								{teamLinks.map((item) => (
									<li key={item.name}>
										<Link
											href={item.link}
											variant="subtitle1"
											color="text.secondary"
											target="_blank"
										>
											{item.name}
										</Link>
									</li>
								))}
							</ul>
						</Grid>
						<Grid item xs={12} sm={6} md={3}>
							<Typography
								variant="h6"
								color="text.primary"
								gutterBottom
								sx={{ textAlign: "center", mb: 2 }}
							>
								Page
							</Typography>
							<ul>
								{pageLinks.map((page) => (
									<li key={page}>
										<Link
											href="#"
											variant="subtitle1"
											color="text.secondary"
											onClick={() => handleToPage(page)}
										>
											{page}
										</Link>
									</li>
								))}
							</ul>
						</Grid>
					</Grid>
				</Container>
			</Card>
		</>
	);
}

export default Footer;
