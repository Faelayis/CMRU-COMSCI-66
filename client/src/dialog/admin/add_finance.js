import { postBillings } from "@api/billings";
import { date } from "@cmru-comsci-66/utils";
import {
	Accordion,
	AccordionItem,
	Button,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Textarea,
	useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";

import { PlusIcon } from "../../icon/PlusIcon";

export default function ModelComp() {
	const { trigger } = postBillings();
	const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure();
	const [name, setName] = useState();
	const [price, setPrice] = useState();
	const [description, setDescription] = useState();
	const [startDate, setStartDate] = useState();
	const [endDate, setEndDate] = useState();

	const handleSubmit = async () => {
		try {
			await trigger({
				description: description,
				end_at: endDate,
				name: name,
				price: price,
				start_at: startDate,
			}).then(() => {
				onClose();
			});
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<>
			<Button
				className="bg-foreground text-background"
				endContent={<PlusIcon />}
				isDisabled={true}
				onPress={onOpen}
				size="sm"
			>
				สร้าง
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
								สร้างการเรียกเก็บเงิน
							</ModalHeader>
							<ModalBody>
								<div className="flex w-full flex-col gap-4">
									<Input
										isRequired={true}
										label="ชื่อ"
										onChange={(event) => setName(event.target.value)}
										value={name}
									/>

									<Input
										disablePortal
										isRequired={price < 0}
										label="จำนวนเงิน"
										min="0"
										onChange={(event) => setPrice(event.target.value)}
										type="number"
										value={price}
									/>
								</div>
								<Textarea
									label="คำอิบาย"
									onChange={(event) => setDescription(event.target.value)}
									value={description}
								/>

								<Accordion variant="bordered">
									<AccordionItem
										aria-label="more"
										// indicator={({ isOpen }) => console.log(isOpen)}
										key="1"
										subtitle={
											<span>
												<strong>
													{endDate || startDate ? "" : "ระยะ"}เวลา
												</strong>{" "}
												{endDate || startDate
													? `เริ่ม ${date.formatDateString(startDate, endDate)}`
													: ""}
											</span>
										}
									>
										<label htmlFor="start-date-time">เริ่มต้น</label>
										<Input
											id="start-date-time"
											isRequired={true}
											onChange={(event) => setStartDate(event.target.value)}
											type="datetime-local"
											value={startDate}
										/>

										<label htmlFor="end-date-time">สินสุด</label>
										<Input
											id="end-date-time"
											isRequired={false}
											onChange={(event) => setEndDate(event.target.value)}
											type="datetime-local"
											value={endDate}
										/>
									</AccordionItem>
								</Accordion>

								{/* <Accordion variant="bordered">
									<AccordionItem
										aria-label="more"
										key="1"
										subtitle={
											<span>
												<strong>เพิ่มเติม</strong>
											</span>
										}
									></AccordionItem>
								</Accordion> */}
							</ModalBody>
							<ModalFooter>
								<div>
									<Button color="danger" onPress={onClose} variant="light">
										ยกเลิก
									</Button>

									<Button color="primary" onClick={handleSubmit}>
										เสร็จ
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
