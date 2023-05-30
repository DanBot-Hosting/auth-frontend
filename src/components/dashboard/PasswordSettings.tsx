import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Stack, Title, Text, Group, PasswordInput, Button } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';
import { getCookie, setCookie } from 'cookies-next';
import { apiFetch, getErrorMessage } from '@util/util';
import type { PageProps } from './index';

const Loader = dynamic(() => import('@mantine/core').then((mod) => mod.Loader));

export function PasswordSettings({ user, inputsDisabled, loading, setLoading }: PageProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const { mutateAsync, data, error, isSuccess } = useMutation({
    mutationFn: () =>
      apiFetch<APIResetPasswordResponse>('/users/password', {
        method: 'PATCH',
        idToken: getCookie('idToken') as string,
        body: JSON.stringify({
          email: user.dbUser.email,
          currentPassword,
          newPassword,
        }),
      }),
  });

  async function handlePasswordChange(e: any) {
    e.preventDefault();

    setLoading(true);

    try {
     await mutateAsync();
      setLoading(false);

      if (!data?.success) {
        setLoading(false);
        const { title, message } = getErrorMessage(data?.error?.code ?? 'UNKNOWN');
        showNotification({
          title,
          message,
          color: 'red',
        });
        return;
      }

      setCookie('idToken', data?.data.idToken);

      showNotification({
        title: 'Password Changed',
        message: 'Your password has been changed successfully',
        color: 'green',
      });
      return;
    } catch (err) {
      console.log(err);
      setLoading(false);
      const { title, message } = getErrorMessage('UNKNOWN');
      showNotification({ title, message, color: 'red' });
      return;
    }
  }

  const inputs = [
    {
      label: (
        <Text size="sm" color="dimmed">
          Current Password
        </Text>
      ),
      value: currentPassword,
      onChange: setCurrentPassword,
    },
    {
      label: (
        <Text size="sm" color="dimmed">
          New Password
        </Text>
      ),
      value: newPassword,
      onChange: setNewPassword,
    },
    {
      label: (
        <Text size="sm" color="dimmed">
          Confirm New Password
        </Text>
      ),
      value: confirmNewPassword,
      onChange: setConfirmNewPassword,
      props: {
        error: confirmNewPassword && newPassword !== confirmNewPassword && 'Passwords do not match',
      },
    },
  ];

  const textInputs = inputs.map((input, i) => (
    <PasswordInput
      key={i}
      label={input.label}
      size="md"
      value={input.value}
      onChange={(e) => input.onChange(e.currentTarget.value)}
      disabled={inputsDisabled}
      rightSection={loading && <Loader size="sm" />}
      {...input.props}
    />
  ));

  return (
    <>
      <Stack mt={50}>
        <Stack sx={{ gap: '2px' }}>
          <Title order={4}>Password</Title>
          <Text size="sm" color="dimmed">
            Password related settings
          </Text>
        </Stack>
        {textInputs}
      </Stack>

      <Group mt="sm">
        <Button color="green" disabled={inputsDisabled} onClick={(e) => handlePasswordChange(e)}>
          Update password
        </Button>
        <Button size="sm" variant="subtle" disabled={inputsDisabled}>
          Forgot password
        </Button>
      </Group>
    </>
  );
}
