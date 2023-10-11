export const timeZone: Intl.DateTimeFormatOptions["timeZone"] = "Asia/Bangkok";

export const get = (options?: Intl.DateTimeFormatOptions, dateString?: string): string => {
	const timeFormat = Intl.DateTimeFormat(
		"th-th",
		Object.assign(
			{
				dateStyle: "medium",
				timeStyle: "short",
				timeZone: timeZone,
			} as Intl.DateTimeFormatOptions,
			options,
		),
	);

	if (dateString) {
		try {
			const [day, month, year] = dateString.split("/").map(Number);

			return timeFormat
				.format(new Date(year, month - 1, day))
				?.split(" เวลา")[0]
				?.split("00:00")[0];
		} catch {
			return timeFormat.format();
		}
	}

	return timeFormat.format();
};
