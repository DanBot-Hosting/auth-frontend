export enum APIErrorCodes {
  'auth/no-auth-header',
  'auth/invalid-auth-header',
  'auth/unauthorized',

  'auth/user-not-found',
  'auth/email-in-use',
  'auth/incorrect-password',
  'auth/new-password-same-as-old-password',

  'auth/id-token-not-found',
  'auth/id-token-revoked',

  'auth/deletion-request-not-found',
  'auth/deletion-code-invalid',
  'auth/deletion-request-already-sent',

  'auth/email-verification-request-not-found',
  'auth/email-verification-code-invalid',

  'api/internal-error',
}

export const Roles = {
  ADMIN: 'ADMIN',
  DEVELOPER: 'DEVELOPER',
  DONATOR: 'DONATOR',
  USER: 'USER',
} as const;

export const ErrorMessages = {
  'auth/no-auth-header': {
    title: 'No Authorization Header',
    message:
      'No Authorization header was found in the request. This should not happen. Please contact the developers.',
  },

  'auth/invalid-auth-header': {
    title: 'Invalid Authorization Header',
    message:
      'The Authorization header is invalid. This should not happen. Please contact the developers.',
  },

  'auth/unauthorized': {
    title: 'Unauthorized',
    message: 'You are not authorized to perform this action.',
  },

  'auth/user-not-found': {
    title: 'User Not Found',
    message:
      'Data for your email was not found. Please try again. If this problem persists, please contact the developers.',
  },

  'auth/email-in-use': {
    title: 'Email In Use',
    message: 'A user with that email already exists. Please try again with a different email.',
  },

  'auth/incorrect-password': {
    title: 'Incorrect Password',
    message: 'The password you entered is incorrect. Please try again.',
  },

  'auth/new-password-same-as-old-password': {
    title: 'Same Passwords',
    message: 'The new password cannot be the same as the old password. Please try again.',
  },

  'auth/id-token-not-found': {
    title: 'ID Token Not Found',
    message: 'The ID token was not found. This should not happen. Please contact the developers.',
  },

  'auth/id-token-revoked': {
    title: 'ID Token Revoked',
    message: 'Your ID token was revoked. Please log in again.',
  },

  'auth/deletion-request-not-found': {
    title: 'Deletion Request Not Found',
    message: 'Your deletion request was not found, it may have expired. Please try again.',
  },

  'auth/deletion-code-invalid': {
    title: 'Deletion Code Invalid',
    message:
      'The deletion code is invalid. Please try again with the right code sent to you on your email.',
  },

  'auth/deletion-request-already-sent': {
    title: 'Deletion Request Already Sent',
    message:
      'A deletion request has already been sent to your email. Please check your email and try again.',
  },

  'auth/email-verification-request-not-found': {
    title: 'Email Verification Request Not Found',
    message:
      'Your email verification request was not found, it may have expired. Please try again.',
  },

  'auth/email-verification-code-invalid': {
    title: 'Email Verification Code Invalid',
    message:
      'The email verification code is invalid. Please try again with the right code sent to you on your email.',
  },

  'api/internal-error': {
    title: 'Internal Error',
    message:
      'An internal error occurred. Please try again. If this problem persists, please contact the developers.',
  },

  UNKNOWN: {
    title: 'Unknown Error',
    message:
      'An unknown error occurred. Please try again. If this problem persists, please contact the developers.',
  },
} as const;

export const footerData: FooterData = {
  updates: [
    {
      label: "Discord",
      link: "https://discord.com/invite/dbh",
    },
    {
      label: "GitHub",
      link: "https://github.com/Danbot-Hosting",
    },
  ],
  support: [
    {
      label: "Contact",
      link: "https://danbot.host/support",
    },
    {
      label: "FAQ",
      link: "https://status.danbot.host",
    },
  ],

  legal: [
    {
      label: "Terms of Service",
      link: "https://danbot.host/terms",
    },
    {
      label: "Privacy Policy",
      link: "https://danbot.host/privacy",
    },
  ],
};

export const headerData: HeaderData = {
  Panel: "https://panel.danbot.host",
  Discord: "https://discord.com/invite/dbh",
};
