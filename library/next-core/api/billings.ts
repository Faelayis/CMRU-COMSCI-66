import prisma from "@cmru-comsci-66/database";
import type { Billing, Prisma } from "@cmru-comsci-66/database/node_modules/@prisma/client/index";
import type { GetServerSidePropsResult, NextApiRequest, NextApiResponse } from "next";
import SWR from "swr";

interface MappedBilling {
	id: string;
	label: string;
	price: string;
	token: string;
}

/**
 * @desc Get billings data
 * @example
 * await findBilling();
 * @returns {Promise<NextApiResponse>}
 */
async function findBilling(select?: Prisma.BillingSelect) {
	try {
		const currentDate = new Date().toISOString();

		return prisma.billing
			.findMany({
				select: select || undefined,
				where: {
					OR: [
						{
							end_at: {
								gte: currentDate,
							},
						},
						{
							start_at: {
								lte: currentDate,
							},
						},
					],
				},
				orderBy: {
					id: "asc",
				},
			})
			.then((data) => {
				prisma.$disconnect();
				return data;
			});
	} catch (error) {
		prisma.$disconnect();
		console.error("Prisma Error fetching billing data:", error);
	}
}

/**
 * @desc GET /api/billings
 * @example
 * fetch("/api/billings")
 *	.then((response) => response.json())
 *	.then((data) => data);
 * @returns {Promise<void>}
 * @link http://localhost:3000/api/billings
 */
export default async function handle(request: NextApiRequest, response: NextApiResponse) {
	try {
		switch (request.method) {
			case "GET": {
				if (request.headers["use-webhook"] === "true") {
					const result = await findBilling({
							name: true,
							price: true,
							start_at: true,
							end_at: true,
							discord_webhookId: true,
							discord_webhook: {
								select: {
									id: true,
									token: true,
								},
							},
						}),
						resultMapped = result.map((item) => {
							return {
								label: item.name,
								price: item.price.toString(),
								id: BigInt(item.discord_webhookId).toString() ?? process.env.DISCORD_WEBHOOK_ID,
								token: item.discord_webhook?.token ?? process.env.DISCORD_WEBHOOK_TOKEN,
							};
						});

					return response.status(200).json(resultMapped);
				} else {
					const result = await findBilling(),
						resultBillingStringified = result.map((item) => ({
							...item,
							discord_webhookId: BigInt(item.discord_webhookId).toString(),
						}));

					return response.status(200).json(resultBillingStringified);
				}
			}

			default: {
				return response.status(405).json({ error: "Method Not Allowed" });
			}
		}
	} catch (error) {
		console.error("Error fetching billing data:", error);
		return response.status(500).json({ error: "Internal Server Error" });
	}
}

/**
 * Get billings data using SWR
 *
 * @returns {{
 *   billings: MappedBilling[],
 *   isLoading: Boolean,
 *   isError: Error
 * }}
 */
export function useBillings() {
	try {
		const { data, error, isLoading } = SWR("/api/billings", (...arguments_) =>
			fetch(...arguments_, {
				method: "get",
				headers: {
					"use-webhook": "true",
				},
			}).then((response) => response.json()),
		);

		return {
			billings: data as MappedBilling[],
			isLoading,
			isError: error,
		};
	} catch (error) {
		console.error("Error useSWR:", error);
	}
}

/**
 * @desc function for getServerSideProps()
 * @example
 * export async function getServerSideProps() {
 * 	return API();
 * }
 * @returns {Promise<GetServerSidePropsResult<{ billing: MappedBilling[] }>>}
 */
export async function API(): Promise<GetServerSidePropsResult<{ billing: MappedBilling[] }>> {
	try {
		const currentDate = new Date(),
			data = await findBilling({
				name: true,
				price: true,
				start_at: true,
				end_at: true,
				discord_webhookId: true,
				discord_webhook: {
					select: {
						id: true,
						token: true,
					},
				},
			});

		const mapData: MappedBilling[] = data
			.filter((item) => {
				if (item.start_at && item.end_at) {
					return item.start_at <= currentDate && item.end_at >= currentDate;
				} else if (item.start_at) {
					return item.start_at <= currentDate;
				} else if (item.end_at) {
					return item.end_at >= currentDate;
				}
				return false;
			})
			.map((item) => {
				return {
					label: item.name,
					price: item.price.toString(),
					id: BigInt(item.discord_webhookId).toString() ?? process.env.DISCORD_WEBHOOK_ID,
					token: item.discord_webhook?.token ?? process.env.DISCORD_WEBHOOK_TOKEN,
				};
			});

		return {
			props: { billing: mapData },
		};
	} catch (error) {
		console.error("Error fetching or billing mapping data:", error);
		return {
			props: { billing: [] },
		};
	}
}

export type Types = Billing[];
export type StringTypes = Array<{ [K in keyof Billing]: string }>;
export type MappedBillingTypes = MappedBilling[];
