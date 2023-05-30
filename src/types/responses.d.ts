interface APILoginResponse {
  idToken: string;
}

interface APISignUpResponse {
  idToken: string;
  pterodactylUser: import('./common').PterodactylUser;
  dbUser: import('./common').User;
}

interface APIFetchUserResponse {
  pterodactylUser: import('./common').PterodactylUser;
  dbUser: import('./common').User;
}

interface APIResetPasswordResponse {
  idToken: string;
}
