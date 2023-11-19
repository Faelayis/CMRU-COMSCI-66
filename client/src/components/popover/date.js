import { date } from "@cmru-comsci-66/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import React from "react";

const Date = ({ value }) => {
	return value ? (
		<Popover placement="bottom-start" showArrow>
			<PopoverTrigger>
				<p className="text-bold cursor-pointer text-sm capitalize">
					{date.get(
						{
							dateStyle: "medium",
						},
						value,
					)}
				</p>
			</PopoverTrigger>
			<PopoverContent>
				<div className="px-1 py-2">
					<div className="text-sm">
						{date.get(
							{
								dateStyle: "full",
							},
							value,
						)}
					</div>
				</div>
			</PopoverContent>
		</Popover>
	) : (
		"-"
	);
};

export default Date;
