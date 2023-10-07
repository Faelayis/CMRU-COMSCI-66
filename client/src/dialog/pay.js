import { useBillings } from "@api/billings";
// eslint-disable-next-line no-unused-vars
import { ObjectTypes, useStudent } from "@api/student";
import { Handle } from "@lib/base/finance/submit";
import {
	Button,
	Card,
	CardHeader,
	CircularProgress,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Select,
	SelectItem,
	useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";

/** @type {ObjectTypes} */
let checkStudent;

export default function ModelComp() {
	const {
			billings,
			isError: billingsIsError,
			isLoading: billingsIsLoading,
		} = useBillings(),
		{
			isError: studentIsError,
			isLoading: studentIsLoading,
			student,
		} = useStudent();

	const { data: session } = useSession();
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [selectedFile, setSelectedFile] = useState();
	const [fullname, setFullname] = useState();
	const [studentid, setStudentId] = useState(session.user?.studentId ?? "");
	const [price, setPrice] = useState("");
	const [pricePlace, setPricePlace] = useState();
	const [note, setNote] = useState("");
	const [event, setEvent] = useState();
	// const [tags, setTags] = useState();

	const inputRef = useRef(),
		handleOpenFileInput = () => {
			inputRef.current.click();
		};

	if (billingsIsLoading || studentIsLoading) {
		return <CircularProgress label="กำลังโหลดข้อมูล.." />;
	}

	if (billingsIsError || studentIsError) {
		return <CircularProgress color="danger" label="ไม่สามารถโหลดข้อมูลได้" />;
	}

	if (session.user?.studentId) {
		checkStudent = student?.find((list) => list.id === session.user?.studentId);
	}

	const handleSubmit = async () => {
		const data = new Handle();
		data.fullname = fullname || checkStudent.name;
		data.studentid = studentid;
		data.price = price || (event?.price ?? pricePlace);
		data.note = note;
		data.event = event;

		if (data.files != selectedFile) {
			data.files = selectedFile;
		}

		data.send();
	};

	return (
		<>
			<Button
				className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
				onPress={onOpen}
			>
				จ่ายเงิน
			</Button>
			<Modal
				backdrop="opaque"
				isDismissable={false}
				isOpen={isOpen}
				motionProps={{
					variants: {
						enter: {
							opacity: 1,
							transition: {
								duration: 0.3,
								ease: "easeOut",
							},
							y: 0,
						},
						exit: {
							opacity: 0,
							transition: {
								duration: 0.2,
								ease: "easeIn",
							},
							y: -20,
						},
					},
				}}
				onOpenChange={onOpenChange}
				scrollBehavior="outside"
			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">
								จ่ายเงินค่ากิจกรรม
							</ModalHeader>
							<ModalBody>
								<div className="flex w-full flex-col gap-4">
									{session.user?.studentId ? (
										<Card className="py-4">
											<CardHeader className="flex-col items-start px-4 pb-0 pt-1">
												{checkStudent ? (
													<>
														<h4 className="text-large font-bold">
															{checkStudent.name.replace(
																/นาย|นางสาว/g,
																(match) => {
																	if (match === "นาย") {
																		return "นาย ";
																	} else {
																		return "นางสาว ";
																	}
																},
															)}
														</h4>
														<p className="text-tiny font-bold uppercase">
															รหัส {checkStudent.id} ห้อง {checkStudent.section}
														</p>
														<small className="text-default-600" color="default">
															บัญชีนี้ได้เชื่อมต่อกับรหัสนักศึกษาแล้ว
														</small>
													</>
												) : (
													<>
														<h4 className="text-large font-bold">
															ข้อมูลที่เชื่อมต่อกับรหัสนักศึกษาไม่ถูกต้อง
														</h4>
														<p className="text-tiny font-bold">
															บัญชี {session.user?.email}
														</p>
													</>
												)}
											</CardHeader>
										</Card>
									) : (
										<div className="flex w-full flex-col gap-4">
											<Select
												disablePortal
												disabledKeys={fullname ? [fullname] : []}
												disallowEmptySelection={false}
												isRequired={!fullname}
												label="ชื่อ - นามสกุล"
												onChange={(e) => {
													const checkStudent = student?.filter((d) =>
														d.name.match(e.target.value),
													)[0];

													setFullname(e.target.value);
													if (checkStudent && e.target.value) {
														setStudentId(checkStudent.id.toString());
													} else {
														setStudentId("");
													}
												}}
												selectedKeys={fullname ? [fullname] : []}
											>
												{student?.map((list) => (
													<SelectItem key={list.name} value={list.name}>
														{list.name}
													</SelectItem>
												))}
											</Select>

											<Input
												disablePortal
												isRequired={!studentid}
												label="รหัสนักศึกษา"
												onChange={(e) => {
													const value = e.target.value;
													const checkStudent = student?.filter(
														(d) =>
															d.id.toString() ===
															(value.length <= 3 ? `66143${value}` : value),
													)[0];

													setStudentId(value.slice(0, 8));
													if (checkStudent && value) {
														setFullname(checkStudent.name.toString());
													} else {
														setFullname();
													}
												}}
												value={studentid}
											/>
										</div>
									)}

									{(session.user?.studentId && checkStudent) ||
									(fullname && studentid) ? (
										<>
											<Select
												defaultSelectedKeys={
													event?.label ? [event?.label] : undefined
												}
												isRequired={!event}
												label="กิจกรรม"
												onChange={(e) => {
													const value = billings.find(
														(n) => n.label === e.target.value,
													);

													value
														? (setPrice(value.price),
														  setPricePlace(value.price))
														: (setPrice(), setPricePlace());

													setEvent(value);
												}}
											>
												{billings?.map((list) => (
													<SelectItem key={list.label} value={list.label}>
														{list.label}
													</SelectItem>
												))}
											</Select>

											{event ? (
												<Input
													disablePortal
													isRequired={price < 0}
													label="จำนวนเงิน"
													min="0"
													onChange={(e) => {
														if (!e.target.value) {
															setPrice(pricePlace);
														}

														setPrice(e.target.value);
													}}
													placeholder={event.price}
													type="number"
													value={price}
												/>
											) : undefined}

											<input
												accept="image/*"
												hidden
												id="SelectedFile"
												onChange={(e) => setSelectedFile(e.target.files[0])}
												ref={inputRef}
												style={{ display: "none" }}
												type="file"
											/>

											{event ? (
												<>
													<Input
														label="หมายเหตุ"
														onChange={(e) => setNote(e.target.value)}
														value={note}
													/>

													{selectedFile ? (
														<Card className="relative col-span-12 h-[350px] sm:col-span-4">
															<Image
																alt="slip"
																className="z-0 h-full w-full object-contain"
																height="0"
																src={URL.createObjectURL(selectedFile)}
																style={{ height: "100%", width: "100%" }}
																width="0"
															/>
														</Card>
													) : undefined}

													<Button
														className="bg-gradient-to-tr text-black shadow-lg"
														htmlFor="SelectedFile"
														onClick={handleOpenFileInput}
														radius="full"
													>
														อัพโหลด สลิป
													</Button>
												</>
											) : undefined}
										</>
									) : undefined}
								</div>
							</ModalBody>
							<ModalFooter>
								<div>
									<Button color="danger" onPress={onClose} variant="light">
										ยกเลิก
									</Button>
									{(session.user?.studentId && checkStudent) ||
									(fullname && studentid) ? (
										<Button
											className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
											onPress={handleSubmit}
										>
											ส่งข้อมูล
										</Button>
									) : undefined}
								</div>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
