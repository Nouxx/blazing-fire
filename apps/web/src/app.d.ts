import { SupabaseClient, Session, User } from '@supabase/supabase-js';
import { Database } from '$lib/database/types';

declare global {
	namespace App {
		interface Error {
			name: string;
			message: string;
		}
		interface Locals {
			supabase: SupabaseClient<Database>;
			session: Session | null;
			user: User | null;
		}
		interface PageData {
			session: Session | null;
			user: User | null;
			menus?: {
				name: string;
			}[]
		}
	}
}

export {};
