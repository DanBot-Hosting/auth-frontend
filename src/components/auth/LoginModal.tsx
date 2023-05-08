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
  Text,
  useMantineTheme,
  createStyles,
  rem,
  Box,
  LoadingOverlay,
} from '@mantine/core';
import { setCookie } from 'cookies-next';
import { showNotification } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';
import { useForm } from '@mantine/form';
import { apiFetch, getErrorMessage } from '@util/util';
import dayjs from 'dayjs';
import type { APILoginResponse } from '@util/types/responses';

type PageProps = { opened: boolean; setOpened: (opened: boolean) => void };

export function LoginModal({ opened, setOpened }: PageProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const theme = useMantineTheme();
  const useStyles = createStyles({
    text: {
      fontSize: `calc(${theme.fontSizes.sm} - ${rem(1)})`,
    },
  });
  const { classes } = useStyles();
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      email: '',
      password: '',
      cookies: true,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  const { mutateAsync, isSuccess } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => {
      return apiFetch<APILoginResponse>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
    },
  });

  async function handleSubmit(e: any) {
    e.preventDefault();

    const { email, password } = form.values;

    try {
      setLoading(true);

      const { success, error, data } = await mutateAsync({ email, password });

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
      console.error(err)
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
      title={<Title order={2}>Login</Title>}
      overlayProps={{
        color: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
        opacity: 0.55,
        blur: 3,
      }}
    >
      <LoadingOverlay visible={loading} overlayBlur={2} />

      <form onSubmit={form.onSubmit((_, e) => handleSubmit(e))}>
        <TextInput
          required
          label="Email"
          placeholder="john.doe@email.com"
          {...form.getInputProps('email')}
        />

        <PasswordInput required label="Password" mt="sm" {...form.getInputProps('password')} />

        <Group position="apart" mt="sm">
          <Checkbox
            label={
              <Text className={classes.text}>Agree to storage of access token in cookies</Text>
            }
            checked={form.values.cookies}
            {...form.getInputProps('cookies')}
          />
          <Button mt="md" type="submit" disabled={!form.values.cookies ?? loading}>
            Submit
          </Button>
        </Group>
      </form>
    </Modal>
  );
}
