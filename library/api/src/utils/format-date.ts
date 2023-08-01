export function DdMmYyyy(date: Date): string {
	const options: Intl.DateTimeFormatOptions = { day: "2-digit", month: "2-digit", year: "numeric" };
	return new Intl.DateTimeFormat("th-TH", options).format(date);
}
