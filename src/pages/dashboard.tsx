import { useEffect, useState, type ReactElement } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Title, Dialog, Stack, Text, Button, Divider, Loader } from '@mantine/core';
import { getCookie } from 'cookies-next';
import { showNotification } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';
import { apiFetch, getErrorMessage } from '@util/util';

const DashboardLayout = dynamic(() =>
  import('@layouts/DashboardLayout').then((mod) => mod.DashboardLayout)
);
const GeneralSettings = dynamic(() =>
  import('@components/dashboard/GeneralSettings').then((mod) => mod.GeneralSettings)
);
const PasswordSettings = dynamic(() =>
  import('@components/dashboard/PasswordSettings').then((mod) => mod.PasswordSettings)
);
const DangerZoneSettings = dynamic(() =>
  import('@components/dashboard/DangerZoneSettings').then((mod) => mod.DangerZoneSettings)
);

export default function Dashboard({ user }: { user: CombinedUser }) {
  const router = useRouter();

  const [inputsDisabled, setInputsDisabled] = useState(true);
  const [emailDialogOpened, setEmailDialogOpened] = useState(false);
  const [emailSending, setEmailSending] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user.dbUser.emailVerified) {
      setInputsDisabled(true);
      setEmailDialogOpened(true);
    }
  }, []);

  useEffect(() => {
    if (loading) {
      setInputsDisabled(true);
    } else if (user?.dbUser?.emailVerified) {
      setInputsDisabled(false);
    }
  });

  const { mutateAsync: mutateEmailVerification, isSuccess: isEmailVerificationSuccessful } =
    useMutation({
      mutationKey: ['verifyEmail'],
      mutationFn: () => {
        return apiFetch<{ emailSent: string }>(`/users/verifyEmail`, {
          idToken: getCookie('idToken') as string,
          method: 'POST',
        });
      },
    });

  async function handleEmailVerify(e: any) {
    e.preventDefault();

    try {
      setEmailSending(true);

      const { success, error, data } = await mutateEmailVerification();
      console.log(data, error);

      if (!success ?? !isEmailVerificationSuccessful ?? !data) {
        setEmailSending(false);
        const { message, title } = getErrorMessage(error?.code);
        showNotification({
          message,
          title,
          color: 'red',
        });
        return;
      }

      setEmailSending(true);

      showNotification({
        color: 'green',
        title: 'Email Sent',
        message: 'An email has been sent to your email address with a link to verify your email.',
      });
      return;
    } catch (err) {
      console.error(err);
      setEmailSending(false);
      const { message, title } = getErrorMessage('UNKNOWN');
      showNotification({
        message,
        title,
        color: 'red',
      });
    }
  }

  return user ? (
    <>
      <Head>
        <meta name="robots" content="noindex,nofollow" />
        <meta name="googlebot" content="noindex,nofollow" />
      </Head>

      <Stack>
        <Title order={2} mt="lg">
          Account Settings
        </Title>

        <Divider />

        <GeneralSettings
          user={user}
          loading={loading}
          setLoading={setLoading}
          inputsDisabled={inputsDisabled}
        />
        <PasswordSettings
          user={user}
          loading={loading}
          setLoading={setLoading}
          inputsDisabled={inputsDisabled}
        />
        <DangerZoneSettings
          user={user}
          loading={loading}
          setLoading={setLoading}
          inputsDisabled={inputsDisabled}
        />
      </Stack>

      <Dialog
        opened={emailDialogOpened}
        onClose={() => setEmailDialogOpened(false)}
        withCloseButton={false}
        size="lg"
        radius="md"
      >
        <Stack spacing="xs">
          <Title order={4}>Email Not Verified</Title>
          <Text size="sm" style={{ marginBottom: 10 }}>
            Your email has not yet been verified. Please verify it before being able to make changes
            to your account.
          </Text>
          <Button variant="outline" disabled={emailSending} onClick={(e) => handleEmailVerify(e)}>
            Send Verification Email
          </Button>
        </Stack>
      </Dialog>
    </>
  ) : null;
}

Dashboard.getLayout = function getLayout(
  page: ReactElement,
  user: CombinedUser,
  isMobile: boolean
) {
  return (
    <DashboardLayout user={user} isMobile={isMobile}>
      {page}
    </DashboardLayout>
  );
};
