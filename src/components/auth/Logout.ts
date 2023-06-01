import { deleteCookie, getCookie } from 'cookies-next';
import { showNotification } from '@mantine/notifications';
import { apiFetch, getErrorMessage } from '@util/util';

export async function logout() {
  try {
    const { error, success, data } = await apiFetch('/auth/logout', {
      method: 'POST',
      idToken: getCookie('idToken') as string,
      // Otherwise Bad Request
      body: "{}"
    });

    if (success) {
      // No need for awaiting the deleteCookie, it's synchronous
      deleteCookie('idToken');
      showNotification({
        title: 'Logged out',
        message: 'You have been logged out. Redirecting to home page.',
      });
      return true;
    }
    if (error) {
      const { title, message } = getErrorMessage(error.code ?? 'UNKNOWN');
      showNotification({
        title,
        message,
        color: 'red',
      });
      return false;
    }
    return false;
  } catch (err) {
    const { title, message } = getErrorMessage('UNKNOWN');
    showNotification({
      title,
      message,
      color: 'red',
    });
    return false;
  }
}
