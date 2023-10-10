import type { APIObject, MetaData, MetaDataObject } from "@cmru-comsci-66/api";
import { student } from "@cmru-comsci-66/utils";
import type { NextApiRequest, NextApiResponse } from "next";
import SWR from "swr";

async function fetchMetaData(): Promise<MetaData | undefined> {
	try {
		const responses = await fetch(`${process.env.API_ARCHIVE_URL}/metadata.json`, {
			method: "get",
			headers: { "Content-Type": "application/json" },
		});

		if (!responses.ok) {
			throw new Error("Failed to fetch metadata");
		}

		return await responses.json();
	} catch (error) {
		console.error("Error fetching metadata:", error);
		return undefined;
	}
}

export default async function handle(request: NextApiRequest, response: NextApiResponse) {
	try {
		switch (request.method) {
			case "GET": {
				const studentId = request.query.id ? student.id.generate(request.query.id?.toString()) : undefined;

				if (request.query.data && request.query.id) {
					const responses = await fetch(`${process.env.API_ARCHIVE_URL}/${request.query.data}/API.json`, {
						method: "get",
						headers: { "Content-Type": "application/json" },
					});

					if (!responses.ok) {
						return response.status(404).json({ error: "Failed to fetch data from API.json" });
					}

					const body: { [key: string]: APIObject[] } = await responses.json();

					for (const key in body) {
						const data: APIObject[] = body[key];
						const foundItem = data.find((item) => item.studentId.toString() === studentId);

						if (foundItem) {
							return response.status(200).json(foundItem);
						}
					}
				} else if (request.query.id) {
					// eslint-disable-next-line no-inner-declarations
					async function fetchData() {
						try {
							const metadataResponse = await fetch(`${process.env.API_ARCHIVE_URL}/metadata.json`, {
								method: "GET",
								headers: { "Content-Type": "application/json" },
							});

							if (!metadataResponse.ok) {
								throw new Error("Failed to fetch metadata");
							}

							const { metadata }: { metadata: Record<string, MetaDataObject[]> } = await metadataResponse.json();

							const data = await Promise.all(
								Object.keys(metadata).map(async (key, index) => {
									const data: MetaDataObject[] = await Promise.all(
										metadata[key].map(async (item: MetaDataObject) => {
											const apiUrl = `${process.env.API_ARCHIVE_URL}/${item.api.base}`;
											const responses = await fetch(apiUrl, {
												method: "GET",
												headers: { "Content-Type": "application/json" },
											});

											if (!responses.ok) {
												throw new Error(`Failed to fetch data from ${apiUrl}`);
											}

											const body = await responses.json();
											const foundItem: APIObject = findItemById(body, studentId);

											delete item.api;

											return {
												...item,
												data: foundItem || body,
											};
										}),
									);

									return {
										id: index,
										name: key,
										data,
									};
								}),
							);

							return data;
						} catch (error) {
							console.error("An error occurred:", error);
							return [];
						}
					}

					// eslint-disable-next-line no-inner-declarations
					function findItemById(data: { [key: string]: APIObject[] }, id: string | undefined) {
						for (const key in data) {
							const itemList = data[key];
							const foundItem = itemList.find((item) => item.studentId.toString() === id);

							if (foundItem) {
								return foundItem;
							}
						}

						return;
					}

					return fetchData().then((result) => response.status(200).json(result));
				}
				return fetchMetaData()
					.then((result) => response.status(200).json(result))
					.catch(() => response.status(400).json({ error: "Failed to fetch data from metadata.json" }));
			}
			default: {
				return response.status(405).json({ error: "Method Not Allowed" });
			}
		}
	} catch (error) {
		switch (error?.code) {
			case "INVALID_STUDENT_ID_FORMAT": {
				return response.status(400).json({ code: error?.code, message: error?.notify });
			}

			default: {
				console.error("Error fetching archive data:", error);
				return response.status(500).json({ error: "Internal Server Error" });
			}
		}
	}
}

export function useArchiveMetaData() {
	try {
		const { data, error, isLoading } = SWR(`/api/archive`, (...arguments_) =>
			fetch(...arguments_, {
				method: "get",
			}).then((response) => response.json()),
		);

		return {
			MetaData: data?.metadata,
			isLoading,
			isError: error,
		};
	} catch (error) {
		console.error("Error useSWR:", error);
	}
}
interface ModifiedPayment {
	data: {
		data: APIObject;
		name: string;
		update_at: Date;
	}[];
	id: number;
	name: string;
}

export function useArchivePaymentById(id?: string) {
	try {
		const { data, error, isLoading } = SWR(id ? `/api/archive?id=${id}` : undefined, (...arguments_) =>
			fetch(...arguments_, {
				method: "get",
			}).then((response) => response.json()),
		);

		return {
			Payment: data as ModifiedPayment[],
			isLoading,
			isError: error,
		};
	} catch (error) {
		console.error("Error useSWR:", error);
	}
}

export type PaymentById = ModifiedPayment[];
