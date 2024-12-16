import { SupabaseClient, Session, User } from '@supabase/supabase-js';
import { Database } from '$lib/database/generated-types';

declare global {
	namespace App {
		interface Error {
			message: string;
			name?: string;
			code?: string;
		}
		interface Locals {
			supabase: SupabaseClient<Database>;
			session: Session | null;
			user: User | null;
		}
		interface PageData {
			session: Session | null;
			user: User | null;
			// src/routes/(app)/menus
			menus?: {
				name: string;
			}[];
		}
	}
}

export {};
