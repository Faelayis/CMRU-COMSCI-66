import prisma from "@cmru-comsci-66/database";
import type { Prisma, StudentList } from "@cmru-comsci-66/database/node_modules/@prisma/client/index";
import type { NextApiRequest, NextApiResponse } from "next";
import SWR from "swr";

/**
 * @desc get student data
 * @example
 * await findStudent();
 * @returns {Promise<StudentList[]>}
 */
async function findStudent(select?: Prisma.StudentListSelect) {
	try {
		return prisma.studentList
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
		console.error("Prisma Error fetching student data:", error);
	}
}

/**
 * @desc GET /api/student
 * @example
 * fetch("/api/student")
 *	.then((response) => response.json())
 *	.then((data) => data);
 * @returns {Promise<NextApiResponse>}
 * @link http://localhost:3000/api/student
 */
export default async function handle(request: NextApiRequest, response: NextApiResponse) {
	try {
		switch (request.method) {
			case "GET": {
				if (request.headers["select-lite"] === "true") {
					const result = await findStudent({
						id: true,
						name: true,
						section: true,
					});

					return response.status(200).json(result);
				} else {
					const result = await findStudent();

					return response.status(200).json(result);
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

interface MappedStudentLite {
	id: string;
	name: string;
	section: string;
}

/**
 * fetching student data using SWR.
 *
 * @returns {{
 *   student: MappedStudentLite[],
 *   isLoading: Boolean,
 *   isError: Error
 * }}
 */
export function useStudent() {
	try {
		const { data, error, isLoading } = SWR(
			`${process.env.NODE_ENV === "development" ? `http://localhost:${process.env.port}` : process.env.API_URL}` + "/api/student",
			(...arguments_) =>
				fetch(...arguments_, {
					method: "get",
					headers: {
						"select-lite": "true",
					},
				}).then((response) => response.json()),
		);

		return {
			student: data as MappedStudentLite[],
			isLoading,
			isError: error,
		};
	} catch (error) {
		console.error("Error useSWR:", error);
	}
}
export type Types = StudentList[];
export type StringTypes = Array<{ [K in keyof StudentList]: string }>;
