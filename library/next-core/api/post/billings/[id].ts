import prisma from "@cmru-comsci-66/database";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handle(request: NextApiRequest, response: NextApiResponse) {
	const id = request.query.id;

	switch (request.method) {
		case "DELETE": {
			return DELETE(id, response);
		}

		default: {
			return response.status(405).json({ error: "Method is not supported" });
		}
	}
}

async function DELETE(id: unknown, response: NextApiResponse) {
	const post = await prisma.billing.delete({
		where: { id: Number(id) },
	});

	return response.status(200).json(post);
}
