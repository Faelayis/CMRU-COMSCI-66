export type PropertiesToString<T> = {
	[K in keyof T]: string;
};
