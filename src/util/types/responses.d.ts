import { PterodactylUser, User } from "./common";

export interface APILoginResponse {
    idToken: string;
}

export interface APISignUpResponse {
    idToken: string;
    pterodactylUser: PterodactylUser;
    dbUser: User
}

export interface APIFetchUserResponse {
    pterodactylUser: PterodactylUser;
    dbUser: User;
}