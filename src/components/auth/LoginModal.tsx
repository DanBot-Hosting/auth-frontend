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
  Text,
  useMantineTheme,
  createStyles,
  rem,
} from '@mantine/core';
import { setCookie } from 'cookies-next';
import { showNotification } from '@mantine/notifications';
import useSWRMutation from 'swr/mutation';
import { useForm } from '@mantine/form';
import { apiFetch, getErrorMessage } from '@util/util';
import dayjs from 'dayjs';

const LoadingOverlay = dynamic(() => import('@mantine/core').then((mod) => mod.LoadingOverlay));

type PageProps = { opened: boolean; setOpened: (opened: boolean) => void };

export function LoginModal({ opened, setOpened }: PageProps) {
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();
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

  const { trigger } = useSWRMutation(
    '/auth/login',
    (key, { arg }: { arg: { email: string; password: string } }) =>
      apiFetch<APILoginResponse>(key, {
        method: 'POST',
        body: JSON.stringify(arg),
      })
  );

  async function handleSubmit(e: any) {
    e.preventDefault();

    const { email, password } = form.values;

    try {
      setLoading(true);

      const response = await trigger({ email, password });

      if (!response?.success ?? !response?.data) {
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
