import type { Billing, Prisma } from "@cmru-comsci-66/database";
import prisma from "@cmru-comsci-66/database";
import type { NextApiRequest, NextApiResponse } from "next";
import type { SWRConfiguration } from "swr";
import SWR from "swr";
import useSWRMutation from "swr/mutation";

const defaultHeaders: HeadersInit = { "Content-Type": "application/json" };

/**
 * @desc Get billings data
 * @example
 * await findBilling();
 * @returns {Promise<NextApiResponse>}
 */
async function findBilling(select?: Prisma.BillingSelect) {
	try {
		return prisma.billing
			.findMany({
				select: select || undefined,
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
			case "HEAD":
			case "GET": {
				const result = await findBilling(),
					resultBillingStringified = result.map((item) => ({
						...item,
						discord_webhookId: item.discord_webhookId ? BigInt(item.discord_webhookId).toString() : "",
					}));

				return response.status(200).json(resultBillingStringified);
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
 * Get all billings data using SWR
 *
 * @returns {{
 *   billings: StringTypes[],
 *   isLoading: Boolean,
 *   isError: Error
 * }}
 */
export function useBillings(headers?: HeadersInit, options?: SWRConfiguration) {
	try {
		const { data, error, isLoading } = SWR(
			"/api/billings",
			(...arguments_) =>
				fetch(...arguments_, {
					method: "get",
					headers: headers,
				}).then((response) => response.json()),
			options,
		);

		return {
			billings: data as StringTypes[],
			isLoading,
			isError: error,
		};
	} catch (error) {
		console.error("Error useSWR:", error);
	}
}

/**
 * post billings data using useSWRMutation
 */
export function postBillings() {
	try {
		return useSWRMutation("/api/post/billings", (url, { arg }: { arg: Billing }) =>
			fetch(url, { method: "post", body: JSON.stringify(arg), headers: defaultHeaders }).then((response) => response.json()),
		);
	} catch (error) {
		console.error("Error useSWRMutation:", error);
	}
}

/**
 * delete billings data using useSWRMutation
 */
export function deleteBillings() {
	try {
		return useSWRMutation("/api/post/billings/id:", (url, { arg }: { arg: string }) =>
			fetch(url.replace("id:", arg), { method: "DELETE", headers: defaultHeaders }).then((response) => response.json()),
		);
	} catch (error) {
		console.error("Error useSWRMutation:", error);
	}
}

export type Types = Billing[];
export type StringTypes = Array<{ [K in keyof Billing]: string }>;
