import { SupabaseClient, Session } from '@supabase/supabase-js';
import { Database } from '$lib/database/types';

declare global {
	namespace App {
		interface Error {
			name: string;
			message: string;
		}
		interface Locals {
			supabase: SupabaseClient<Database>;
			getUserSession(): Promise<{ session: Session | null; user: User | null }>;
		}
		interface PageData {
			supabase: SupabaseClient<Database>;
			session: Session | null;
		}
	}
}

export {};
