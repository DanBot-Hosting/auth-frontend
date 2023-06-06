import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { Title, Stack, TextInput, Text, Button } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import useSWRMutation from 'swr/mutation';
import { apiFetch, getErrorMessage } from '@util/util';
import { getCookie, setCookie, deleteCookie } from 'cookies-next';
import dayjs from 'dayjs';
import type { PageProps } from './index';

const Loader = dynamic(() => import('@mantine/core').then((mod) => mod.Loader));

export function GeneralSettings({ user, inputsDisabled, loading, setLoading }: PageProps) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [avatarURL, setAvatarURL] = useState<string | undefined>();

  useEffect(() => {
    if (user) {
      setUsername(user.dbUser.username);
      setEmail(user.dbUser.email);
      setFirstName(user.dbUser.firstName);
      setLastName(user.dbUser.lastName);
      setAvatarURL(user.dbUser.avatarURL ?? undefined);
    }
    return;
  }, []);

  const inputs = [
    {
      label: (
        <Text size="sm" color="dimmed">
          Username
        </Text>
      ),
      value: username,
      onChange: setUsername,
      props: {
        rightSection: loading && user.dbUser.username !== username && <Loader size="sm" />,
      },
    },
    {
      label: (
        <Text size="sm" color="dimmed">
          Email
        </Text>
      ),
      value: email,
      onChange: setEmail,
      props: {
        rightSection: loading && user.dbUser.email !== email && <Loader size="sm" />,
      },
    },
    {
      label: (
        <Text size="sm" color="dimmed">
          First Name
        </Text>
      ),
      value: firstName,
      onChange: setFirstName,
      props: {
        rightSection: loading && user.dbUser.firstName !== firstName && <Loader size="sm" />,
      },
    },
    {
      label: (
        <Text size="sm" color="dimmed">
          Last Name
        </Text>
      ),
      value: lastName,
      onChange: setLastName,
      props: {
        rightSection: loading && user.dbUser.lastName !== lastName && <Loader size="sm" />,
      },
    },
    {
      label: (
        <Text size="sm" color="dimmed">
          Avatar URL
        </Text>
      ),
      value: avatarURL,
      onChange: setAvatarURL,
      props: {
        rightSection: loading && user.dbUser.avatarURL !== avatarURL && <Loader size="sm" />,
      },
    },
  ];

  const textInputs = inputs.map((input, i) => (
    <TextInput
      key={i}
      label={input.label}
      size="md"
      value={input.value}
      onChange={(e) => input.onChange(e.currentTarget.value)}
      disabled={inputsDisabled}
      {...input.props}
    />
  ));

  const { trigger: mutateUpdateUser } = useSWRMutation(
    '/users/update',
    (key: string, { arg }: { arg: Record<string, any> }) =>
      apiFetch<{ idToken: string }>(key, {
        idToken: getCookie('idToken') as string,
        method: 'PUT',
        body: JSON.stringify(arg),
      })
  );

  async function handleChanges(e: any) {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await mutateUpdateUser({
        username,
        email,
        firstName,
        lastName,
        avatarURL,
      });

      if (!response ?? !response?.success ?? !response?.data) {
        setLoading(false);
        const { message, title } = getErrorMessage(response?.error?.code ?? 'UNKNOWN');
        showNotification({
          message,
          title,
          color: 'red',
        });
        return;
      }

      const date = dayjs().add(1, 'month').toDate();
      deleteCookie('idToken'); // cookie has to be deleted before it can be set again because directly overwriting/setting the cookie causes invalid jwt format
      setCookie('idToken', response.data.idToken, { expires: date });

      setLoading(false);

      showNotification({
        title: 'Changes saved',
        message: 'Your profile has been successfully updated.',
        color: 'green',
      });

      return;
    } catch (err) {
      console.error(err);
      setLoading(false);
      const { message, title } = getErrorMessage('UNKNOWN');
      showNotification({
        message,
        title,
        color: 'red',
      });
    }
  }

  return (
    <>
      <Stack>
        <Stack sx={{ gap: '2px' }}>
          <Title order={4}>General</Title>
          <Text size="sm" color="dimmed">
            General settings such as email, username, etc.
          </Text>
        </Stack>
        {textInputs}
      </Stack>

      <Button
        color="green"
        variant="filled"
        mt={10}
        sx={{ width: '20rem' }}
        disabled={inputsDisabled}
        onClick={(e) => handleChanges(e)}
      >
        Update profile
      </Button>
    </>
  );
}
