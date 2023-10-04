import { Button, Input } from "@nextui-org/react";

export default function Afinance() {
	return (
		<div className="flex flex-col gap-4">
			<div className="mb-6 flex w-full flex-wrap gap-4 md:mb-0 md:flex-nowrap">
				<Input
					type="event"
					label="กิจกรรม"
					placeholder="Enter Your Event"
					labelPlacement="outside"
				/>
				<Input
					type="number"
					label="จำนวนเงิน"
					placeholder="0.00"
					labelPlacement="outside"
					startContent={
						<div className="pointer-events-none flex items-center">
							<span className="text-default-400 text-small">$</span>
						</div>
					}
				/>
				<Input
					type="date"
					label="ระยะเวลา"
					placeholder="Date Time"
					labelPlacement="outside"
				/>
			</div>
			<div className="mb-6 flex w-full flex-wrap gap-4 md:mb-0 md:flex-nowrap">
				<Button color="primary">Submit</Button>
			</div>
		</div>
	);
}
