import prisma from "@cmru-comsci-66/database";
import type { Subject } from "@cmru-comsci-66/database/node_modules/@prisma/client/index";
import type { GetServerSidePropsResult, NextApiRequest, NextApiResponse } from "next";

/**
 * @desc get subject data
 * @example
 * await findSubject();
 * @returns {Promise<Subject[]>}
 */
async function findSubject() {
	try {
		return prisma.subject
			.findMany({
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
		console.error("Prisma Error fetching subject data:", error);
	}
}

/**
 * @desc GET /api/subject
 * @example
 * fetch("/api/subject")
 *	.then((response) => response.json())
 *	.then((data) => data);
 * @returns {Promise<NextApiResponse>}
 * @link http://localhost:3000/api/subject
 */
export default async function handle(request: NextApiRequest, response: NextApiResponse) {
	try {
		switch (request.method) {
			case "GET": {
				const result = await findSubject();

				return response.status(200).json(result);
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
 * @desc MainScript for getServerSideProps()
 * @example
 * export async function getServerSideProps() {
 * 	return API();
 * }
 * @returns {Promise<GetServerSidePropsResult<{ subject: Array<{ [K in keyof Subject]: string }> }>>}
 */
export async function API(): Promise<GetServerSidePropsResult<{ subject: Array<{ [K in keyof Subject]: string }> }>> {
	try {
		const data = await findSubject();

		return {
			props: { subject: JSON.parse(JSON.stringify(data ?? [])) },
		};
	} catch (error) {
		console.error("Error fetching or subject data:", error);
		return {
			props: { subject: [] },
		};
	}
}

export type Types = Subject[];
export type StringTypes = Array<{ [K in keyof Subject]: string }>;
