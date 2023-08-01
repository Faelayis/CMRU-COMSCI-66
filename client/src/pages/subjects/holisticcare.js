import React from "react";
import Head from "next/head";
import Image from "next/image";
import { Card, CardContent, Container, Typography, Grid } from "@mui/material";
import { HolisticData } from "@/data/data";

// Contents
import HolisticcareIns from "/src/assets/instructor/Kowhit.jpg";

export default function Holisticcare() {
	return (
		<div>
			<Head>
				<title>Holisticcare</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Container maxWidth="mb" sx={{ pt: 15, pb: 5 }}>
				<Card>
					<div className="condiv home">
						<Typography component="h1" variant="h4" textAlign="center" mt={5}>
							งาน การดูแลสุขภาพแบบองค์รวม ที่ต้องทำ
						</Typography>
						<Typography component="h1" variant="h5" textAlign="center">
							รหัสวิชา GEN 1403-62
						</Typography>
						<Typography component="h1" variant="h5" textAlign="center">
							อาจารย์โกวิท จอมคำ
						</Typography>

						<Grid container p={5}>
							<Grid item md={6} p={3} mt={2}>
								<Image
									src={HolisticcareIns}
									alt="Holisticcare"
									className="responsive-img"
									priority
								/>
							</Grid>
							<Grid item container md={6} p={5}>
								<Grid container spacing={4} p={5}>
									{HolisticData.map((item, index) => (
										<Grid item key={index} md={12}>
											<Card
												sx={{
													height: "100%",
													display: "flex",
													flexDirection: "column",
												}}
												className="hover-zoom"
											>
												<CardContent sx={{ flexGrow: 1 }}>
													<Typography gutterBottom variant="h5" component="h2">
														{item.title}
													</Typography>
													<Typography className="text-indent">
														งานที่ 1 : {item.content1}
													</Typography>
													<Typography className="text-indent">
														งานที่ 2 : {item.content2}
													</Typography>
													<Typography className="text-indent">
														งานที่ 3 : {item.content3}
													</Typography>
													<Typography className="text-indent">
														สั่งงานวันที่ : {item.date}
													</Typography>
													<Typography className="text-indent">
														กำหนดส่ง : {item.deadline}
													</Typography>
												</CardContent>
											</Card>
										</Grid>
									))}
								</Grid>
							</Grid>
						</Grid>
					</div>
				</Card>
			</Container>
		</div>
	);
}
