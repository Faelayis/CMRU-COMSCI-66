import prisma from "@cmru-comsci-66/database";
import type { $Enums, User } from "@cmru-comsci-66/database/node_modules/@prisma/client/index";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";

export default NextAuth({
	debug: Boolean(process.env.faelayis) || process.env.NODE_ENV === "development",
	logger: process.env.faelayis
		? {
				error(code, metadata) {
					console.error(code, metadata);
				},
				warn(code) {
					console.warn(code);
				},
				debug(code, metadata) {
					console.debug(code, metadata);
				},
		  }
		: undefined,
	session: {
		maxAge: 90 * 24 * 60 * 60, // 3 month
	},
	adapter: PrismaAdapter(prisma),
	providers: [
		GoogleProvider({
			async profile(profile: GoogleProfile) {
				const user: User = {
					id: profile.sub,
					name: profile.name,
					nickname: undefined,
					image: profile.picture,
					role: undefined,
					email: profile.email,
					emailVerified: undefined,
					studentId: undefined,
					created_at: undefined,
					updateAt: undefined,
				};

				if (profile.hd === "g.cmru.ac.th") {
					user.role = "viewer" as $Enums.RoleType;

					try {
						const studentId = Number(profile.email?.split("@")[0] || 0),
							student = await prisma.studentList.findUniqueOrThrow({ where: { id: studentId } });

						if (studentId && student) {
							user.role = "user" as $Enums.RoleType;
							user.studentId = studentId;
						}
					} catch (error) {
						console.error(error);
					}
				}

				return {
					...user,
				};
			},
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
	],
	callbacks: {
		async session({ session, user }) {
			session = {
				...session,
				user: {
					...user,
					...session.user,
				},
			};

			return session;
		},
	},
});
