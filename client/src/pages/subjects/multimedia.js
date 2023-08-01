import React from "react";
import Head from "next/head";
import Image from "next/image";
import { Card, CardContent, Container, Typography, Grid } from "@mui/material";
import { MultiData } from "@/data/data";

// Contents
import MultimediaIns from "/src/assets/instructor/chai.jpg";

export default function Multimedia() {
	return (
		<div>
			<Head>
				<title>Multimedia</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Container maxWidth="mb" sx={{ pt: 15, pb: 5 }}>
				<Card>
					<div className="condiv home">
						<Typography component="h1" variant="h4" textAlign="center" mt={5}>
							งาน เทคโนโลยีมัลติมีเดีย ที่ต้องทำ
						</Typography>
						<Typography component="h1" variant="h5" textAlign="center">
							รหัสวิชา COM 2202-69
						</Typography>
						<Typography component="h1" variant="h5" textAlign="center">
							อาจารย์ชัยทัศน์ เกียรติยากุล
						</Typography>

						<Grid container p={5}>
							<Grid item md={6} p={3} mt={2}>
								<Image
									src={MultimediaIns}
									alt="multimediains"
									className="responsive-img"
									priority
								/>
							</Grid>
							<Grid item container md={6} p={5}>
								<Grid container spacing={4} p={5}>
									{MultiData.map((item, index) => (
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
