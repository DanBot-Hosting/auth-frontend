import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { Title, Center } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '@util/util';
import { getCookie } from 'cookies-next';

const LoadingOverlay = dynamic(() => import('@mantine/core').then((mod) => mod.LoadingOverlay));

export default function VerifyEmailPage() {
  const { query } = useRouter();
  const [loading, setLoading] = useState(true);

  const { data, error, isSuccess } = useQuery({
    queryKey: ['verifyEmail', query.code],
    queryFn: () =>
      apiFetch(`/users/verifyEmail?code=${query.code}`, {
        method: 'POST',
        idToken: getCookie('idToken')?.toString(),
        body: '{}',
      }),
  });

  useEffect(() => {
    if (isSuccess) setLoading(false);
  }, [isSuccess]);

  return (
    <Center>
      <LoadingOverlay visible={loading} />
      {error ?? data?.error?.message ? (
        <Title mt="lg" order={2}>
          An error occurred. Please try again later.
        </Title>
      ) : null}
      <Title mt="lg" order={2}>
        {isSuccess ? 'Your email has been verified! You can close this tab now.' : ''}
      </Title>
    </Center>
  );
}
