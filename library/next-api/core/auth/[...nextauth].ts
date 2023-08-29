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
	adapter: PrismaAdapter(prisma),
	providers: [
		GoogleProvider({
			async profile(profile: GoogleProfile) {
				const user: User = {
					id: profile.sub,
					title: undefined,
					name: profile.name,
					image: profile.picture,
					role: undefined,
					email: profile.email,
					emailVerified: undefined,
					studentId: [],
					created_at: undefined,
					updateAt: undefined,
				};

				if (profile.hd === "g.cmru.ac.th") {
					user.role = "viewer" as $Enums.RoleType;

					if (!user.studentId.includes(Number(profile.email.split("@")[0]))) {
						user.role = "user" as $Enums.RoleType;
						user.studentId.push(Number(profile.email.split("@")[0]));
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
});
