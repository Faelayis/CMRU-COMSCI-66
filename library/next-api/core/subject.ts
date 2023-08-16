import prisma from "@cmru-comsci-66/database";
import type { Subject } from "@cmru-comsci-66/database/node_modules/@prisma/client/index";
import type { GetServerSidePropsResult, NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

import { PropertiesToString } from "./types";

/* eslint-disable unicorn/no-null */

/**
 * @desc GET /api/subject
 * @example
 * fetch("/api/subject")
 *	.then((response) => response.json())
 *	.then((data) => data);
 * @returns {Promise<NextApiResponse>}
 */

export default async function handle(request: NextApiRequest, response: NextApiResponse) {
	try {
		switch (request.method) {
			case "GET": {
				const result = await prisma.subject.findMany();

				return response.status(200).json(result);
			}
		}
	} catch (error) {
		console.error("Error fetching billing data:", error);
		return response.status(500).json({ error: "Internal Server Error" });
	}
}

export async function API(): Promise<GetServerSidePropsResult<{ subject: PropertiesToString<Subject>[] }>> {
	try {
		const response = await fetch(
				`${process.env.NODE_ENV === "development" ? `http://localhost:${process.env["npm_package_scripts_PORT"]}` : process.env.API_URL}` + "/api/subject",
			),
			data = (await response.json()) as PropertiesToString<Subject>[];

		return {
			props: { subject: data },
		};
	} catch (error) {
		console.error("Error fetching or subject data:", error);
		return {
			props: { subject: null },
		};
	}
}

export type Types = Subject[];
export type StringTypes = Array<{ [K in keyof Subject]: string }>;
