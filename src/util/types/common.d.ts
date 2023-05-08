import type { APIErrorCodes } from '../constants';

export interface APIResponse<T> {
  success?: boolean;
  error?: APIError;
  data: T;
}

interface APIError {
  message: string;
  code: keyof typeof APIErrorCodes;
}

export type CombinedUser = {
	pterodactylUser: PterodactylUser;
	dbUser: User;
}

export interface User {
	email: string;
	passwordHash?: string | null;
	emailVerified: boolean;
	consoleId: number;
	username: string;
	firstName: string;
	lastName: string;
	avatarURL?: string | null;
	linked: boolean;
	linkedAt?: Date | null;
	roles: UserRoles;
}

export interface PterodactylUser { 
	id: string;
	username: string;
	email: string;
	first_name: string;
	last_name: string;
	language: string;
	updated_timestamp: number;
	created_timestamp: number;
}