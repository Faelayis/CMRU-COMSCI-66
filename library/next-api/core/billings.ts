import prisma from "@cmru-comsci-66/database";
import type { Billing } from "@cmru-comsci-66/database/node_modules/@prisma/client/index";
import type { GetServerSidePropsResult, NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

import { PropertiesToString } from "./types";

interface MappedBilling {
	id: string;
	label: string;
	price: string;
	token: string;
}

/* eslint-disable unicorn/no-null */

/**
 * @desc GET /api/billings
 * @example
 * fetch("/api/billings")
 *	.then((response) => response.json())
 *	.then((data) => data);
 * @returns {Promise<NextApiResponse>}
 */

export default async function handle(request: NextApiRequest, response: NextApiResponse) {
	try {
		switch (request.method) {
			case "GET": {
				const currentDate = new Date().toISOString();
				const result = await prisma.billing.findMany({
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
					}),
					resultBillingStringified = result.map((item) => ({
						...item,
						discord_webhookId: item?.discord_webhookId?.toString() ?? null,
					}));

				return response.status(200).json(resultBillingStringified);
			}
		}
	} catch (error) {
		console.error("Error fetching billing data:", error);
		return response.status(500).json({ error: "Internal Server Error" });
	}
}

export async function API(): Promise<GetServerSidePropsResult<{ billing: MappedBilling[] }>> {
	try {
		const discordWebhook = await prisma.discordWebhook.findMany({
				select: {
					token: true,
				},
			}),
			currentDate = new Date().toISOString(),
			response = await fetch(
				`${process.env.NODE_ENV === "development" ? `http://localhost:${process.env["npm_package_scripts_PORT"]}` : process.env.API_URL}` + "/api/billings",
			),
			data = (await response.json()) as PropertiesToString<Billing>[];

		const mapData: MappedBilling[] = data
			.filter((item) => {
				if (item.start_at && item.end_at) {
					return item.start_at <= currentDate && item.end_at >= currentDate;
				} else if (item.start_at) {
					return item.start_at <= currentDate;
				} else if (item.end_at) {
					return item.end_at >= currentDate;
				}
			})
			.map((item, index) => {
				return {
					id: item.discord_webhookId ?? process.env.DISCORD_WEBHOOK_ID,
					price: item.price,
					token: discordWebhook[index]?.token?.toString() ?? process.env.DISCORD_WEBHOOK_TOKEN,
					label: item.name,
				};
			});

		return {
			props: { billing: mapData },
		};
	} catch (error) {
		console.error("Error fetching or billing mapping data:", error);
		return {
			props: { billing: null },
		};
	}
}

export type Types = Billing[];
export type StringTypes = Array<{ [K in keyof Billing]: string }>;
export type MappedBillingTypes = MappedBilling[];
