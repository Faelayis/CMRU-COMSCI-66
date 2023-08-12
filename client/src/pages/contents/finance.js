import React, { useState } from "react";
import {
	Card,
	CardContent,
	Container,
	Typography,
	Grid,
	Box,
	TextField,
	Button,
	Autocomplete,
	Input,
} from "@mui/material";
import Swal from "sweetalert2";
import Head from "next/head";
import Image from "next/image";
import { DiscordWebHook } from "@cmru-comsci-66/api";

// Contents
import BillingImg from "@/assets/bill/bill.jpg";

import { api } from "../api/billings";

export async function getServerSideProps() {
	return api();
}

export default function Finance({ billing }) {
	const [selectedFile, setSelectedFile] = useState(null);
	const [fullname, setFullname] = useState("");
	const [studentid, setStudentId] = useState("");
	const [note, setNote] = useState("");
	const [price, setPrice] = useState("");
	const [dropdown, setDropDown] = useState("");
	const [billings] = useState(billing);
	const [isCooldown, setIsCooldown] = useState(false);

	const handleFileChange = (event) => {
		const file = event.target.files[0];
		setSelectedFile(file);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (isCooldown) {
			Swal.fire({
				icon: "warning",
				title: "Cooldown",
				text: "กรุณารอสักครู่ก่อนที่จะส่งข้อมูลอีกครั้ง",
			});
			return;
		}

		setIsCooldown(true);

		const webhook = new DiscordWebHook(dropdown?.id, dropdown?.token);

		try {
			await webhook.Send(selectedFile, { fullname, price, studentid, note });
			Swal.fire({
				icon: "success",
				title: "Success",
				text: "ข้อมูลถูกส่งเรียบร้อยแล้ว",
			});
		} catch (error) {
			Swal.fire({
				icon: "error",
				title: "Error",
				text: "เกิดข้อผิดพลาดในการส่งข้อมูล",
			});
		}

		setTimeout(() => {
			setIsCooldown(false);
		}, 5000); // ระยะเวลา cooldown (มิลลิวินาที)
	};

	return (
		<div>
			<Head>
				<title>Finance</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Container maxWidth="md" sx={{ pt: 15, pb: 5 }}>
				<Card>
					<Container sx={{ pt: 3 }} className="finance">
						<Typography
							component="h1"
							variant="h4"
							textAlign="center"
							style={{ color: "white" }}
						>
							Finance
						</Typography>

						<Grid container spacing={3} p={5}>
							<Grid item md={6} sm={12}>
								<Card
									sx={{
										height: "100%",
										display: "flex",
										flexDirection: "column",
										cursor: "pointer",
									}}
								>
									{/* ใส่ไฟล์ที่คุณเลือกไว้ใน Image ที่คุณต้องการแสดง */}
									{selectedFile ? (
										<Image
											src={URL.createObjectURL(selectedFile)}
											alt="Selected File"
											width={250}
											height={250}
											style={{ width: "100%", height: "auto" }}
										/>
									) : (
										<Image
											src={BillingImg}
											width={250}
											height={250}
											style={{ width: "auto", height: "auto" }}
											alt="Profile"
											className="responsive-img"
											priority
										/>
									)}
									{/* Input สำหรับอัปโหลดไฟล์ */}
								</Card>
							</Grid>

							<Grid item md={6} sm={12}>
								<Card
									sx={{
										height: "100%",
										display: "flex",
										flexDirection: "column",
										cursor: "pointer",
									}}
								>
									<CardContent sx={{ flexGrow: 1 }}>
										<Box
											component="form"
											sx={{ mt: 1 }}
											onSubmit={handleSubmit}
										>
											<Typography
												component="h1"
												variant="h4"
												textAlign="center"
											>
												ข้อมูลการชำระเงิน
											</Typography>
											<TextField
												margin="normal"
												fullWidth
												id="fullname"
												label="ขื่อ-สกุล"
												autoComplete="name"
												autoFocus
												value={fullname}
												onChange={(e) => setFullname(e.target.value)}
											/>
											<TextField
												type="text"
												margin="normal"
												required
												fullWidth
												id="studentid"
												label="รหัสนักศึกษา"
												autoComplete="studentid"
												autoFocus
												value={studentid}
												onChange={(e) => setStudentId(e.target.value)}
											/>
											<TextField
												type="text"
												margin="normal"
												required
												fullWidth
												id="price"
												label="จำนวนเงิน"
												autoComplete="price"
												autoFocus
												value={price}
												onChange={(e) => setPrice(e.target.value)}
											/>
											<TextField
												type="text"
												margin="normal"
												fullWidth
												id="note"
												label="หมายเหตุ"
												autoComplete="note"
												autoFocus
												value={note}
												onChange={(e) => setNote(e.target.value)}
											/>
											{/* ใช้ selectedFile เป็น value ของ Input */}
											<Input
												type="file"
												onChange={handleFileChange}
												style={{ margin: "16px 0" }}
											/>
											<Autocomplete
												margin="normal"
												required
												fullWidth
												disablePortal
												id="dropdown"
												value={dropdown}
												options={billings}
												sx={{ mt: 2 }}
												renderInput={(params) => (
													<TextField {...params} label="กิจกรรม" />
												)}
												onChange={(_e, v) => {
													v?.price ? setPrice(v.price) : setPrice(null);
													setDropDown(v);
												}}
											/>
											<Button
												type="submit"
												fullWidth
												variant="contained"
												sx={{ mt: 3, mb: 2 }}
											>
												Submit
											</Button>
										</Box>
									</CardContent>
								</Card>
							</Grid>
						</Grid>
					</Container>
				</Card>
			</Container>
		</div>
	);
}
