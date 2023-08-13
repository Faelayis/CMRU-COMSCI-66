export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[];

export interface Database {
	public: {
		Tables: {
			_BillingToStudentList: {
				Row: {
					A: number;
					B: number;
				};
				Insert: {
					A: number;
					B: number;
				};
				Update: {
					A?: number;
					B?: number;
				};
				Relationships: [
					{
						foreignKeyName: "_BillingToStudentList_A_fkey";
						columns: ["A"];
						referencedRelation: "Billings";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "_BillingToStudentList_B_fkey";
						columns: ["B"];
						referencedRelation: "Student List";
						referencedColumns: ["id"];
					},
				];
			};
			Billings: {
				Row: {
					description: string | null;
					discord_webhookId: number | null;
					end_at: string | null;
					id: number;
					name: string;
					price: number;
					start_at: string | null;
					time: Database["public"]["Enums"]["BillingTime"] | null;
					types: Database["public"]["Enums"]["BillingType"];
				};
				Insert: {
					description?: string | null;
					discord_webhookId?: number | null;
					end_at?: string | null;
					id?: number;
					name: string;
					price?: number;
					start_at?: string | null;
					time?: Database["public"]["Enums"]["BillingTime"] | null;
					types?: Database["public"]["Enums"]["BillingType"];
				};
				Update: {
					description?: string | null;
					discord_webhookId?: number | null;
					end_at?: string | null;
					id?: number;
					name?: string;
					price?: number;
					start_at?: string | null;
					time?: Database["public"]["Enums"]["BillingTime"] | null;
					types?: Database["public"]["Enums"]["BillingType"];
				};
				Relationships: [
					{
						foreignKeyName: "Billings_discord_webhookId_fkey";
						columns: ["discord_webhookId"];
						referencedRelation: "Discord Webhook";
						referencedColumns: ["id"];
					},
				];
			};
			"Discord Webhook": {
				Row: {
					id: number;
					token: string;
				};
				Insert: {
					id: number;
					token: string;
				};
				Update: {
					id?: number;
					token?: string;
				};
				Relationships: [];
			};
			"Student List": {
				Row: {
					id: number;
					name: string;
					section: number;
					status: string | null;
					update_at: string | null;
					userId: number | null;
				};
				Insert: {
					id: number;
					name: string;
					section: number;
					status?: string | null;
					update_at?: string | null;
					userId?: number | null;
				};
				Update: {
					id?: number;
					name?: string;
					section?: number;
					status?: string | null;
					update_at?: string | null;
					userId?: number | null;
				};
				Relationships: [
					{
						foreignKeyName: "Student List_userId_fkey";
						columns: ["userId"];
						referencedRelation: "Users";
						referencedColumns: ["id"];
					},
				];
			};
			Subject: {
				Row: {
					coursecode: string | null;
					id: number;
					instructor: string | null;
					SubjectName: string;
				};
				Insert: {
					coursecode?: string | null;
					id?: number;
					instructor?: string | null;
					SubjectName: string;
				};
				Update: {
					coursecode?: string | null;
					id?: number;
					instructor?: string | null;
					SubjectName?: string;
				};
				Relationships: [];
			};
			Users: {
				Row: {
					created_at: string;
					id: number;
					password: string | null;
					title: string | null;
					username: string | null;
				};
				Insert: {
					created_at?: string;
					id?: number;
					password?: string | null;
					title?: string | null;
					username?: string | null;
				};
				Update: {
					created_at?: string;
					id?: number;
					password?: string | null;
					title?: string | null;
					username?: string | null;
				};
				Relationships: [];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			BillingTime: "once" | "week" | "month" | "year";
			BillingType: "event" | "force" | "general" | "public";
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
}
