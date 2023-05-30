import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Title, Text, Group, Button, Alert, Stack } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import useStyles from './landing.styles';

const LoginModal = dynamic(() => import('@components/auth').then((mod) => mod.LoginModal));
const SignUpModal = dynamic(() => import('@components/auth').then((mod) => mod.SignUpModal));

export function Landing({ user, isMobile }: { user: CombinedUser; isMobile: boolean }) {
  const { classes } = useStyles();
  const { push } = useRouter();
  const [signUpModalOpened, setSignUpModalOpened] = useState(false);
  const [loginModalOpened, setLoginModalOpened] = useState(false);

  return (
    <>
      <Title pt={100} className={classes.title} align="center">
        Welcome
      </Title>
      <Text color="dimmed" align="center" size="md" sx={{ maxWidth: 580 }} mx="auto" mt="xl">
        This website allows you to manage your account on DanBot Hosting.
        <br />
        {user ? 'Click on dashboard to get started.' : 'Please Login or Signup to continue.'}
      </Text>

      {!user && (
        <>
          <LoginModal opened={loginModalOpened} setOpened={setLoginModalOpened} />
          <SignUpModal opened={signUpModalOpened} setOpened={setSignUpModalOpened} />
        </>
      )}

      <Stack align="center" mt="xl">
        {user ? (
          <Button onClick={() => push('/dashboard')}>Dashboard</Button>
        ) : (
          <Group>
            <Button size="md" onClick={() => setLoginModalOpened(true)}>
              Login
            </Button>
            <Button size="md" variant="subtle" onClick={() => setSignUpModalOpened(true)}>
              Sign Up
            </Button>
          </Group>
        )}

        {!user && (
          <Group className={classes.cookieAlert}>
            <Alert
              title="Cookie Usage"
              color="yellow"
              withCloseButton={false}
              variant="outline"
              icon={<IconAlertCircle size="1rem" />}
            >
              This website uses cookies to store your session token. This is necessary for the site
              to function. By continuing, you agree to this.
            </Alert>
          </Group>
        )}
      </Stack>
    </>
  );
}
