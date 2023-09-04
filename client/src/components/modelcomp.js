import {
	Button,
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
import React from "react";

export default function ModelComp() {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	return (
		<>
			<Button
				className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
				onPress={onOpen}
			>
				จ่ายเงิน
			</Button>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">
								โปรดตรวจสอบข้อมูลของท่านก่อนส่งข้อมูล
							</ModalHeader>
							<ModalBody>
								<div className="flex w-full flex-col gap-4">
									<Select label="Name" placeholder="ชื่อนามสกุล">
										<SelectItem></SelectItem>
									</Select>
									<Input label="Student ID" placeholder="รหัสนักศึกษา" />
									<Input label="Price" placeholder="จำนวนเงิน" />
									<Input label="Note" placeholder="หมายเหตุ" />
									<Select label="Uploadfile" placeholder="สลิป">
										<SelectItem></SelectItem>
									</Select>
									<Select label="Events" placeholder="กิจกรรม">
										<SelectItem></SelectItem>
									</Select>
									<Button
										radius="full"
										className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
									>
										ส่งข้อมูล
									</Button>
								</div>
							</ModalBody>
							<ModalFooter>
								<Button color="danger" variant="light" onPress={onClose}>
									ยกเลิก
								</Button>
								<Button
									className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
									onPress={onClose}
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
