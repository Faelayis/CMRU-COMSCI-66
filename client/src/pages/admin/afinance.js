import { Button, Input } from "@nextui-org/react";

export default function Afinance() {
	return (
		<div className="flex flex-col gap-4">
			<div className="mb-6 flex w-full flex-wrap gap-4 md:mb-0 md:flex-nowrap">
				<Input
					label="กิจกรรม"
					labelPlacement="outside"
					placeholder="Enter Your Event"
					type="event"
				/>
				<Input
					label="จำนวนเงิน"
					labelPlacement="outside"
					placeholder="0.00"
					startContent={
						<div className="pointer-events-none flex items-center">
							<span className="text-small text-default-400">$</span>
						</div>
					}
					type="number"
				/>
				<Input
					label="ระยะเวลา"
					labelPlacement="outside"
					placeholder="Date Time"
					type="date"
				/>
			</div>
			<div className="mb-6 flex w-full flex-wrap gap-4 md:mb-0 md:flex-nowrap">
				<Button color="primary">Submit</Button>
			</div>
		</div>
	);
}
