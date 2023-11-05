import { SupabaseClient, Session } from '@supabase/supabase-js';
import { Database } from '$lib/database/types';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		interface Error {
			name: string;
			message: string;
		}
		interface Locals {
			supabase: SupabaseClient<Database>;
			getSession(): Promise<Session | null>;
		}
		// interface PageData {}
		// interface PageData {
		// 	session: Session | null
		//   }
		// interface Platform {}
	}
}

export {};
