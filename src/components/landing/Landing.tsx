import { useState } from 'react';
import { useRouter } from 'next/router';
import { Title, Text, Group, Button, Alert, Stack } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { LoginModal, SignUpModal } from '@components/auth';
import { IconAlertCircle } from '@tabler/icons-react';
import useStyles from './landing.styles';
import { CombinedUser } from '@util/types/common';

export function Landing({ user }: { user: CombinedUser }) {
  const { classes } = useStyles();
  const { push } = useRouter();
  const [signUpModalOpened, setSignUpModalOpened] = useState(false);
  const [loginModalOpened, setLoginModalOpened] = useState(false);
  const isMobile = useMediaQuery('(max-width: 600px)');

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

        {isMobile ? (
          <Group sx={{ position: 'fixed', bottom: '1rem', maxWidth: '350px' }}>
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
        ) : (
          !user && (
            <Group sx={{ position: 'fixed', bottom: '1rem' }}>
              <Alert
                title="Cookie Usage"
                color="yellow"
                withCloseButton={false}
                variant="outline"
                icon={<IconAlertCircle size="1rem" />}
              >
                This website uses cookies to store your session token. This is necessary for the
                site to function. By continuing, you agree to this.
              </Alert>
            </Group>
          )
        )}
      </Stack>
    </>
  );
}
