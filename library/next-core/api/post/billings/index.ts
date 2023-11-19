import prisma from "@cmru-comsci-66/database";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handle(request: NextApiRequest, response: NextApiResponse) {
	try {
		const { description, end_at, name, price, start_at } = request.body;
		const billing = await prisma.billing.create({
			data: {
				name: name,
				description: description,
				price: Number(price) || undefined,
				start_at: start_at ? new Date(start_at).toISOString() : undefined,
				end_at: end_at ? new Date(end_at).toISOString() : undefined,
			},
		});

		response.status(201).json(billing);
	} catch (error) {
		response.status(500).json({ error: error?.message });
	} finally {
		await prisma.$disconnect();
	}
}
