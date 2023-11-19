import prisma from "@cmru-comsci-66/database";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handle(request: NextApiRequest, response: NextApiResponse) {
	const id = request.query.id;

	switch (request.method) {
		case "DELETE": {
			return DELETE(id, response);
		}

		default: {
			return DELETE(id, response);
		}
	}
}

async function DELETE(id: unknown, response: NextApiResponse) {
	try {
		if (!id || typeof id !== "string") {
			throw new Error("Invalid ID");
		}

		const payment = await prisma.payment.findUnique({
			where: { id },
			include: {
				approval: true,
			},
		});

		if (!payment) {
			throw new Error("Payment not found");
		}

		await prisma.payment.delete({
			where: { id },
		});

		if (payment.approval) {
			await prisma.paymentApproval.delete({
				where: { id: payment.approval.id },
			});
		}

		response.status(200).json({ message: "Payment and associated records deleted successfully" });
	} catch (error) {
		response.status(500).json({ error: error?.message });
	} finally {
		await prisma.$disconnect();
	}
}
