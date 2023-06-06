import { useEffect, useState, type ReactElement } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { Title, Dialog, Stack, Text, Button, Divider } from '@mantine/core';
import { getCookie } from 'cookies-next';
import { showNotification } from '@mantine/notifications';
import useSWRMutation from 'swr/mutation';
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
  const [inputsDisabled, setInputsDisabled] = useState(false);
  const [emailDialogOpened, setEmailDialogOpened] = useState(false);
  const [emailSending, setEmailSending] = useState(false);
  const [loading, setLoading] = useState(false);

  /**
  useEffect(() => {
    // Add "?" for asynchronous cases
    if (!user?.dbUser.emailVerified) {
     // setInputsDisabled(true);
    //  setEmailDialogOpened(true);
    }
  }, [user?.dbUser.emailVerified]);

  */
  useEffect(() => {
    if (loading) {
      setInputsDisabled(true);
    } else if (user?.dbUser?.emailVerified) {
      setInputsDisabled(false);
    }
  }, [loading, user?.dbUser.emailVerified]);
  const { trigger: mutateEmailVerification } = useSWRMutation(
    '/users/verifyEmail',
    (key) => apiFetch<{ emailSent: string }>(key, {
      idToken: getCookie('idToken') as string,
      method: 'POST',
      body: '{}',
    })
  );

  async function handleEmailVerify(e: any) {
    e.preventDefault();

    try {
      setEmailSending(true);

      const response = await mutateEmailVerification();

      if (!response ?? !response?.success ?? !response?.data) {
        setEmailSending(false);
        const { message, title } = getErrorMessage(response?.error?.code ?? 'UNKNOWN');
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
          <Text
            size="sm"
            // use sx over style property for avoiding inline styles
            sx={{ marginBottom: 10 }}
          >
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
