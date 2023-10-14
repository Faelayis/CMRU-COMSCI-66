export type MetaData = {
	[key: string]: JSON[];
};

export interface MetaDataObject {
	api: {
		base: string | undefined;
		image?: {
			slip: string | undefined;
		};
	};
	name: string | undefined;
	update_at: Date;
}

export interface APIObject {
	amount: string;
	date: string;
	details: string;
	id: string;
	name: string;
	slip: {
		name: string | null; // eslint-disable-next-line typescript-sort-keys/interface
		link: string | null;
		source: string | null;
	};
	status: string;
	studentId: string;
}
