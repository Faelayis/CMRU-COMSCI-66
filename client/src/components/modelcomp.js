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

	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [selectedFile, setSelectedFile] = useState();
	const [fullname, setFullname] = useState("");
	const [studentid, setStudentId] = useState("");
	const [price, setPrice] = useState("");
	const [pricePlace, setPricePlace] = useState();
	const [note, setNote] = useState("");
	const [event, setEvent] = useState("");

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
		data.price = price;
		data.note = note;
		data.event = event;
		data.files = selectedFile;
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
									<Select
										disablePortal
										label="ชื่อนามสกุล"
										value={fullname}
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
												setFullname("");
											}
										}}
									/>
									<Input
										disablePortal
										label="จำนวนเงิน"
										placeholder={pricePlace}
										value={price}
										onChange={(e) => setPrice(e.target.value)}
									/>
									<Input
										label="หมายเหตุ"
										onChange={(e) => setNote(e.target.value)}
									/>
									<Select
										label="กิจกรรม"
										onChange={(e) => {
											const value = billings.find(
												(n) => n.label === e.target.value,
											);

											value
												? (setPrice(value.price), setPricePlace(value.price))
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

									{selectedFile ? (
										<Card className="relative col-span-12 h-[300px] sm:col-span-4">
											<Image
												removeWrapper
												alt="slip"
												className="z-0 h-full w-full object-contain"
												src={URL.createObjectURL(selectedFile)}
												width={300}
												height={300}
											/>
										</Card>
									) : undefined}

									<input
										ref={inputRef}
										type="file"
										id="file-input"
										accept="image/*"
										hidden
										onChange={(e) => setSelectedFile(e.target.files[0])}
									/>

									<Button
										htmlFor="file-input"
										onClick={handleOpenFileInput}
										radius="full"
										className="bg-gradient-to-tr text-black shadow-lg"
									>
										อัพโหลดสลิป
									</Button>
								</div>
							</ModalBody>
							<ModalFooter>
								<Button color="danger" variant="light" onPress={onClose}>
									ยกเลิก
								</Button>
								<Button
									className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
									onPress={handleSubmit}
								>
									ส่งข้อมูล
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
