import { useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import {
  Button,
  Checkbox,
  Group,
  Modal,
  PasswordInput,
  TextInput,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { setCookie } from 'cookies-next';
import useSWRMutation from 'swr/mutation';
import { apiFetch, getErrorMessage } from '@util/util';
import dayjs from 'dayjs';

type PageProps = { opened: boolean; setOpened: (opened: boolean) => void };

const LoadingOverlay = dynamic(() => import('@mantine/core').then((mod) => mod.LoadingOverlay));

export function SignUpModal({ opened, setOpened }: PageProps) {
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();
  const theme = useMantineTheme();
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      avatarURL: '',
      password: '',
      confirmPassword: '',
      tos: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      confirmPassword: (value, values) =>
        value !== values.password ? 'Passwords do not match' : null,
    },
  });

  const { trigger } = useSWRMutation(
    '/users/create',
    (key) =>
      apiFetch<APILoginResponse>(key, {
        method: 'POST',
        body: JSON.stringify({
          firstName: form.values.firstName,
          lastName: form.values.lastName,
          email: form.values.email,
          username: form.values.username,
          avatarURL: form.values.avatarURL,
          password: form.values.password,
        }),
      }),
  )

  async function handleSubmit(e: any) {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await trigger();

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

      const expires = dayjs().add(1, 'month').toDate();
      setCookie('idToken', response.data.idToken, { expires });

      // Push to dashboard takes time to load
      setOpened(false);
      push('/dashboard');

      setLoading(false);
    } catch (err) {
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
    <Modal
      opened={opened}
      centered
      onClose={() => setOpened(false)}
      title={<Title order={2}>Sign Up</Title>}
      overlayProps={{
        color: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
        opacity: 0.55,
        blur: 3,
      }}
    >
      <LoadingOverlay visible={loading} overlayBlur={2} />
      <form onSubmit={form.onSubmit((_, e) => handleSubmit(e))}>
        <Group>
          <TextInput
            required
            label="First Name"
            placeholder="John"
            {...form.getInputProps('firstName')}
          />
          <TextInput label="Last Name" placeholder="Doe" {...form.getInputProps('lastName')} />
        </Group>

        <Group mt="sm">
          <TextInput
            required
            label="Username"
            placeholder="JohnDoe12"
            {...form.getInputProps('username')}
          />
          <TextInput
            required
            label="Email"
            placeholder="john.doe@email.com"
            {...form.getInputProps('email')}
          />
        </Group>

        <TextInput
          label="Avatar URL"
          placeholder="https://i.imgur.com/example.png"
          mt="sm"
          {...form.getInputProps('avatarURL')}
        />

        <PasswordInput required label="Password" mt="sm" {...form.getInputProps('password')} />
        <PasswordInput
          required
          label="Confirm Password"
          mt="sm"
          {...form.getInputProps('confirmPassword')}
        />

        <Group mt="md" position="apart">
          <Checkbox label="Agree to TOS" {...form.getInputProps('tos')} />
          <Button type="submit" disabled={!form.values.tos ?? loading}>
            Submit
          </Button>
        </Group>
      </form>
    </Modal>
  );
}
