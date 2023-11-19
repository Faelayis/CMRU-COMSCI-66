import prisma from "@cmru-comsci-66/database";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
	try {
		const { details } = request.body;

		const payment = await prisma.payment.create({
			data: { details },
		});

		const approval = await prisma.paymentApproval.create({
			data: { id: payment.id },
		});

		const updatedPayment = await prisma.payment.update({
			where: { id: payment.id },
			data: { approvalId: approval.id },
		});

		response.status(200).json({ payment: updatedPayment, approval });
	} catch (error) {
		response.status(500).json({ error: error?.message });
	} finally {
		await prisma.$disconnect();
	}
}
