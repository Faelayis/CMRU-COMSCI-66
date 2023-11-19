import prisma from "@cmru-comsci-66/database";
import type { Payment } from "@cmru-comsci-66/database/node_modules/@prisma/client/index";
import type { NextApiRequest, NextApiResponse } from "next";
import type { SWRConfiguration } from "swr";
import SWR from "swr";
import useSWRMutation from "swr/mutation";

const defaultHeaders: HeadersInit = { "Content-Type": "application/json" };

/**
 * @desc Get payment data
 * @example
 * await findBilling();
 * @returns {Promise<NextApiResponse>}
 */
async function findBilling() {
	try {
		return prisma.payment
			.findMany({
				include: { billing: true, student: true, approval: true },
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
 * @desc GET /api/payment
 * @example
 * fetch("/api/payment")
 *	.then((response) => response.json())
 *	.then((data) => data);
 * @returns {Promise<void>}
 * @link http://localhost:3000/api/payment
 */
export default async function handle(request: NextApiRequest, response: NextApiResponse) {
	try {
		switch (request.method) {
			case "GET": {
				const result = await findBilling();
				const resultpaymenttringified = result.map((item) => {
					return JSON.parse(JSON.stringify(item, (key, value) => (typeof value === "bigint" ? value.toString() : value)));
				});

				return response.status(200).json(resultpaymenttringified);
			}

			default: {
				return response.status(405).json({ error: "Method Not Allowed" });
			}
		}
	} catch (error) {
		console.error("Error fetching payment data:", error);
		return response.status(500).json({ error: "Internal Server Error" });
	}
}

/**
 * Get all payment data using SWR
 *
 * @returns {{
 *   payment: StringTypes[],
 *   isLoading: Boolean,
 *   isError: Error
 * }}
 */
export function usePayment(headers?: HeadersInit, options?: SWRConfiguration) {
	try {
		const { data, error, isLoading } = SWR(
			"/api/payment",
			(...arguments_) =>
				fetch(...arguments_, {
					method: "get",
					headers: headers,
				}).then((response) => response.json()),
			options,
		);

		return {
			payment: data as StringTypes[],
			isLoading,
			isError: error,
		};
	} catch (error) {
		console.error("Error useSWR:", error);
	}
}

/**
 * post payment data using useSWRMutation
 */
export function postPayment() {
	try {
		return useSWRMutation("/api/post/payment", (url, { arg }: { arg: Payment }) =>
			fetch(url, { method: "post", body: JSON.stringify(arg), headers: defaultHeaders }).then((response) => response.json()),
		);
	} catch (error) {
		console.error("Error useSWRMutation:", error);
	}
}

/**
 * delete payment data using useSWRMutation
 */
export function deletePayment() {
	try {
		return useSWRMutation("/api/post/payment/id:", (url, { arg }: { arg: string }) =>
			fetch(url.replace("id:", arg), { method: "DELETE", headers: defaultHeaders }).then((response) => response.json()),
		);
	} catch (error) {
		console.error("Error useSWRMutation:", error);
	}
}

export type Types = Payment[];
export type StringTypes = Array<{ [K in keyof Payment]: string }>;
