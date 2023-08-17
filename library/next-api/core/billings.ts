import prisma from "@cmru-comsci-66/database";
import type { Billing, Prisma } from "@cmru-comsci-66/database/node_modules/@prisma/client/index";
import type { GetServerSidePropsResult, NextApiRequest, NextApiResponse } from "next";

interface findBillingArguments {
	includeWebhook?: boolean;
}

interface MappedBilling {
	id: string;
	label: string;
	price: string;
	token: string;
}

/**
 * @desc get billing data use prisma
 * @example
 * await findBilling();
 * @returns {Promise<NextApiResponse>}
 */
async function findBilling(config?: findBillingArguments) {
	try {
		const currentDate = new Date().toISOString();
		let includeQuery: Prisma.BillingInclude = {};

		if (config.includeWebhook) {
			includeQuery = {
				discord_webhook: { select: { token: true } },
			};
		}

		return prisma.billing.findMany({
			include: includeQuery,
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
		});
	} catch (error) {
		console.error("Prisma Error fetching billing data:", error);
	}
}

/**
 * @desc GET /api/billings
 * @example
 * fetch("/api/billings")
 *	.then((response) => response.json())
 *	.then((data) => data);
 * @returns {Promise<NextApiResponse>}
 * @link http://localhost:3000/api/billings
 */
export default async function handle(request: NextApiRequest, response: NextApiResponse) {
	try {
		switch (request.method) {
			case "GET": {
				const result = await findBilling({});
				const resultBillingStringified = result.map((item) => ({
					...item,
					discord_webhookId: BigInt(item.discord_webhookId).toString(),
				}));

				return response.status(200).json(resultBillingStringified);
			}
		}
	} catch (error) {
		console.error("Error fetching billing data:", error);
		return response.status(500).json({ error: "Internal Server Error" });
	}
}

/**
 * @desc MainScript for getServerSideProps()
 * @example
 * export async function getServerSideProps() {
 * 	return API();
 * }
 * @returns {Promise<GetServerSidePropsResult<{ billing: MappedBilling[] }>>}
 */
export async function API(): Promise<GetServerSidePropsResult<{ billing: MappedBilling[] }>> {
	try {
		const currentDate = new Date(),
			data = await findBilling({ includeWebhook: true });

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
