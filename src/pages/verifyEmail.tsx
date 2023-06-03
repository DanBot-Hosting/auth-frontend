import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { Title, Center } from '@mantine/core';
import useSWR from 'swr';
import { apiFetch } from '@util/util';
import { getCookie } from 'cookies-next';

const LoadingOverlay = dynamic(() => import('@mantine/core').then((mod) => mod.LoadingOverlay));

export default function VerifyEmailPage() {
  const { query } = useRouter();

  const { data, error, isLoading } = useSWR(`/users/verifyEmail?code=${query.code}`, (key) =>
    apiFetch(key, {
      method: 'POST',
      idToken: getCookie('idToken')?.toString(),
      body: '{}',
    })
  );

  return (
    <Center>
      <LoadingOverlay visible={isLoading} />
      {error ?? data?.error?.message ? (
        <Title mt="lg" order={2}>
          An error occurred. Please try again later.
        </Title>
      ) : data?.success ? (
        <Title mt="lg" order={2}>
          Your email has been verified! You can close this tab now.
        </Title>
      ) : null}
    </Center>
  );
}
