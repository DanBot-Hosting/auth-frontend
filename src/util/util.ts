import { ErrorMessages } from '@util/constants';

export async function apiFetch<T>(
  path: string,
  options?: RequestInit & { idToken?: string | null }
): Promise<APIResponse<T>> {
  const headers = new Headers();

  headers.append('content-type', 'application/json');

  if (options?.idToken) headers.append('authorization', `Bearer ${options.idToken}`);

  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
    ...options,
    headers,
  });

  return data.json();
}

export function getErrorMessage(code?: keyof typeof ErrorMessages) {
  return code ? ErrorMessages[code] : ErrorMessages.UNKNOWN;
}
