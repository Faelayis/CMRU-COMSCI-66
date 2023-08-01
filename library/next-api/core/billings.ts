import prisma from "@cmru-comsci-66/database";
import type { billing } from "@cmru-comsci-66/database/node_modules/@prisma/client/index";
import type { GetServerSidePropsResult, NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

import { PropertiesToString } from "./types";

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
				const result = await prisma.billing.findMany({
						// where: {
						// 	end_at: {
						// 		gte: new Date().toISOString(),
						// 	},
						// },
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

export async function api(): Promise<GetServerSidePropsResult<unknown>> {
	try {
		const currentDate = new Date().toISOString(),
			keys = await prisma.discord_webhook.findMany(),
			response = await fetch(`${process.env.API_URL ?? `http://localhost:${process.env.PORT}`}/api/billings`),
			data = (await response.json()) as PropertiesToString<billing>[];

		const mapData = data
			.filter((item) => {
				if (item.start_at && item.end_at) {
					return item.start_at <= currentDate && item.end_at >= currentDate;
				} else if (item.start_at) {
					return item.start_at <= currentDate;
				} else if (item.end_at) {
					return item.end_at >= currentDate;
				}
			})
			.map((item) => ({
				id: item.discord_webhookId ?? null,
				price: item.price,
				token: keys.find((key) => key.id.toString() === item?.discord_webhookId?.toString())?.token ?? null,
				label: item.name,
			}));

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
