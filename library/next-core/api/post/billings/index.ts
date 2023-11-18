import prisma from "@cmru-comsci-66/database";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handle(request: NextApiRequest, response: NextApiResponse) {
	try {
		const body = request.body;
		const result = await prisma.billing.create({
			data: {
				name: body.name,
				description: body.description,
				price: Number(body.price) || undefined,
				start_at: new Date(body.start_at).toISOString(),
				end_at: new Date(body.end_at).toISOString(),
			},
		});

		return response.status(201).json(result);
	} catch (error) {
		return response.status(500).json({ error: error?.message });
	} finally {
		await prisma.$disconnect();
	}
}
