import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Button,
  Checkbox,
  Group,
  Modal,
  PasswordInput,
  TextInput,
  Title,
  LoadingOverlay,
  useMantineTheme,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { setCookie } from 'cookies-next';
import { useMutation } from '@tanstack/react-query';
import { apiFetch, getErrorMessage } from '@util/util';
import dayjs from 'dayjs'
import type { APILoginResponse } from '@util/types/responses';

type PageProps = { opened: boolean; setOpened: (opened: boolean) => void };

export function SignUpModal({ opened, setOpened }: PageProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
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

  const { mutateAsync, isSuccess } = useMutation({
    mutationFn: () => {
      return apiFetch<APILoginResponse>('/users/create', {
        method: 'POST',
        body: JSON.stringify({ firstName: form.values.firstName, lastName: form.values.lastName, email: form.values.email, username: form.values.username, avatarURL: form.values.avatarURL, password: form.values.password }),
      });
    },
  });

  async function handleSubmit(e: any) {
    e.preventDefault();

    try {
      setLoading(true);

      const { success, error, data } = await mutateAsync();

      if (!success ?? !isSuccess ?? !data) {
        setLoading(false);
        const { message, title } = getErrorMessage(error?.code);
        showNotification({
          message,
          title,
          color: 'red',
        });
        return;
      }

      const date = dayjs().add(1, 'month').toDate();
      setCookie('idToken', data.idToken, { expires: date });
      router.push('/dashboard');
      setLoading(false);
    } catch (err) {
      console.log(err);
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
          <TextInput label="First Name" placeholder="Doe" {...form.getInputProps('lastName')} />
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
          <Button type="submit" disabled={!form.values.tos ?? loading}>Submit</Button>
        </Group>
      </form>
    </Modal>
  );
}
