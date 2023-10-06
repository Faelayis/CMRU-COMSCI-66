import { useBillings } from "@api/billings";
import { useStudent } from "@api/student";
import { Handle } from "@lib/base/finance/submit";
import {
	Button,
	Card,
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

export default function ModelComp() {
	const {
		billings,
		isLoading: billingsIsLoading,
		isError: billingsIsError,
	} = useBillings();
	const {
		student,
		isLoading: studentIsLoading,
		isError: studentIsError,
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
		return <CircularProgress />;
	}

	const handleSubmit = async () => {
		const data = new Handle();
		data.fullname = fullname;
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
				isOpen={isOpen}
				isDismissable={false}
				onOpenChange={onOpenChange}
				scrollBehavior="outside"
				motionProps={{
					variants: {
						enter: {
							y: 0,
							opacity: 1,
							transition: {
								duration: 0.3,
								ease: "easeOut",
							},
						},
						exit: {
							y: -20,
							opacity: 0,
							transition: {
								duration: 0.2,
								ease: "easeIn",
							},
						},
					},
				}}
			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">
								จ่ายเงินค่ากิจกรรม
							</ModalHeader>
							<ModalBody>
								<div className="flex w-full flex-col gap-4">
									{session.user?.studentId ? undefined : (
										<div className="flex w-full flex-col gap-4">
											<Select
												disablePortal
												isRequired={!fullname}
												label="ชื่อ - นามสกุล"
												disabledKeys={fullname ? [fullname] : []}
												selectedKeys={fullname ? [fullname] : []}
												disallowEmptySelection={false}
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
												value={studentid}
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
											/>
										</div>
									)}

									{fullname && studentid ? (
										<>
											<Select
												isRequired={!event}
												label="กิจกรรม"
												defaultSelectedKeys={
													event?.label ? [event?.label] : undefined
												}
												onChange={(e) => {
													const value = billings.find(
														(n) => n.label === e.target.value,
													);

													value
														? (setPrice(value.price),
														  setPricePlace(value.price))
														: (setPrice(""), setPricePlace());

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
													type="number"
													min="0"
													disablePortal
													isRequired={price < 0}
													label="จำนวนเงิน"
													placeholder={event.price}
													value={price}
													onChange={(e) => {
														if (!e.target.value) {
															setPrice(pricePlace);
														}

														setPrice(e.target.value);
													}}
												/>
											) : undefined}

											<input
												hidden
												id="SelectedFile"
												ref={inputRef}
												type="file"
												accept="image/*"
												style={{ display: "none" }}
												onChange={(e) => setSelectedFile(e.target.files[0])}
											/>

											{event ? (
												<>
													<Input
														label="หมายเหตุ"
														value={note}
														onChange={(e) => setNote(e.target.value)}
													/>

													{selectedFile ? (
														<Card className="relative col-span-12 h-[350px] sm:col-span-4">
															<Image
																alt="slip"
																className="z-0 h-full w-full object-contain"
																src={URL.createObjectURL(selectedFile)}
																width="0"
																height="0"
																style={{ width: "100%", height: "100%" }}
															/>
														</Card>
													) : undefined}

													<Button
														htmlFor="SelectedFile"
														onClick={handleOpenFileInput}
														radius="full"
														className="bg-gradient-to-tr text-black shadow-lg"
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
									<Button color="danger" variant="light" onPress={onClose}>
										ยกเลิก
									</Button>
									<Button
										className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
										onPress={handleSubmit}
									>
										ส่งข้อมูล
									</Button>
								</div>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
