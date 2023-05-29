import { useEffect, useState, type ReactElement } from 'react';
import { useRouter } from 'next/router';
import {
  Loader,
  Title,
  Dialog,
  Stack,
  Text,
  Button,
  TextInput,
  PasswordInput,
  Group,
  PinInput,
  Center,
} from '@mantine/core';
import { modals } from '@mantine/modals';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import dayjs from 'dayjs';
import { showNotification } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';
import { apiFetch, getErrorMessage } from '@util/util';
import { DashboardLayout } from '@layouts/DashboardLayout';

export default function Dashboard({ user }: { user: CombinedUser }) {
  const router = useRouter();

  const [inputsDisabled, setInputsDisabled] = useState(false);
  const [emailDialogOpened, setEmailDialogOpened] = useState(false);
  const [loading, setLoading] = useState(false);

  const [username, setUsername] = useState(user.dbUser.username);
  const [email, setEmail] = useState(user.dbUser.email);
  const [firstName, setFirstName] = useState(user.dbUser.firstName);
  const [lastName, setLastName] = useState(user.dbUser.lastName);
  const [avatarURL, setAvatarURL] = useState(user.dbUser.avatarURL);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const [deletionCode, setDeletionCode] = useState('');

  useEffect(() => {
    if (!user ?? !user?.dbUser) router.push('/');

    if (!user.dbUser.emailVerified) {
      setInputsDisabled(true);
      setEmailDialogOpened(true);
    }
  }, []);

  useEffect(() => {
    if (loading) {
      setInputsDisabled(true);
    } else {
      setInputsDisabled(false);
    }
  });

  const { mutateAsync, isSuccess } = useMutation({
    mutationFn: (variables: Record<string, any>) => {
      return apiFetch<{ idToken: string }>('/users/update', {
        idToken: getCookie('idToken') as string,
        method: 'PUT',
        body: JSON.stringify(variables),
      });
    },
  });

  const { mutateAsync: mutateDeleteUser, isSuccess: isDeleteUserSuccessful } = useMutation({
    mutationFn: () => {
      return apiFetch<{ codeSent: string }>(`/users/delete?code=${deletionCode}`, {
        idToken: getCookie('idToken') as string,
        method: 'DELETE',
      });
    },
  });

  async function handleChanges(e: any) {
    e.preventDefault();

    try {
      setLoading(true);

      const { success, error, data } = await mutateAsync({
        username,
        email,
        firstName,
        lastName,
        avatarURL,
      });

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

      setLoading(false);

      showNotification({
        title: 'Changes saved',
        message: 'Your profile has been successfully updated.',
        color: 'green',
      });

      return;
    } catch (err) {
      console.error(err);
      setLoading(false);
      const { message, title } = getErrorMessage('UNKNOWN');
      showNotification({
        message,
        title,
        color: 'red',
      });
    }
  }

  function openDeleteModal() {
    return modals.openConfirmModal({
      title: 'Confirm Action',
      closeOnConfirm: false,
      labels: {
        confirm: 'Confirm',
        cancel: 'Cancel',
      },
      confirmProps: {
        color: 'red',
      },
      children: <Text color="dimmed">Are you sure you want to delete your account?</Text>,
      onConfirm: async () => {
        modals.openConfirmModal({
          title: 'Enter Deletion Code',
          closeOnEscape: false,
          closeOnClickOutside: true,
          closeButtonProps: { disabled: true },
          labels: {
            confirm: 'Submit',
            cancel: 'Cancel',
          },
          confirmProps: {
            color: 'red',
          },
          onConfirm: async () => {
            setLoading(true);
            await mutateDeleteUser();
            setLoading(false);

            if (!isDeleteUserSuccessful) {
              showNotification({
                title: 'Error',
                message: 'An error occurred while sending you a deletion code.',
                color: 'red',
              });
              modals.closeAll();
            }
            modals.closeAll();

            router.push('/');

            showNotification({
              title: 'Account Deleted',
              message: 'Your account has been successfully deleted.',
              color: 'green',
            });

            deleteCookie('idToken');
          },

          children: (
            <Center>
              <PinInput
                oneTimeCode
                length={6}
                size="lg"
                value={deletionCode}
                onChange={setDeletionCode}
              />
            </Center>
          ),
        });
      },
    });
  }

  return (
    <>
      <Stack align="center">
        <Title mt="lg">General Settings</Title>
        <Group position="center">
          <TextInput
            label={<Text mb={5}>Username</Text>}
            value={username}
            size="md"
            disabled={inputsDisabled}
            rightSection={loading && user.dbUser.username !== username && <Loader size="sm" />}
            onChange={(e) => setUsername(e.currentTarget.value)}
          />
          <TextInput
            label={<Text mb={5}>Email</Text>}
            value={email}
            size="md"
            disabled={inputsDisabled}
            rightSection={loading && user.dbUser.email !== email && <Loader size="sm" />}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <TextInput
            label={<Text mb={5}>Avatar</Text>}
            value={avatarURL}
            placeholder="https://example.com/profile.jpg"
            size="md"
            disabled={inputsDisabled}
            rightSection={loading && user.dbUser.avatarURL !== avatarURL && <Loader size="sm" />}
            onChange={(e) => setAvatarURL(e.currentTarget.value)}
          />
        </Group>
        <Group position="center">
          <TextInput
            label={<Text mb={5}>First Name</Text>}
            value={firstName}
            size="md"
            disabled={inputsDisabled}
            rightSection={loading && user.dbUser.firstName !== firstName && <Loader size="sm" />}
            onChange={(e) => setFirstName(e.currentTarget.value)}
          />
          <TextInput
            label={<Text mb={5}>Last Name</Text>}
            value={lastName}
            size="md"
            disabled={inputsDisabled}
            rightSection={loading && user.dbUser.lastName !== lastName && <Loader size="sm" />}
            onChange={(e) => setLastName(e.currentTarget.value)}
          />
        </Group>
        <Button
          color="green"
          variant="filled"
          mt={10}
          sx={{ width: '20rem' }}
          disabled={inputsDisabled}
          onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleChanges(e)}
        >
          Update profile
        </Button>
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
          <Button variant="outline">Send Verification Email</Button>
        </Stack>
      </Dialog>

      <Stack align="center">
        <Title mt={50}>Password</Title>

        <Group position="center" spacing="lg">
          <PasswordInput
            label={<Text mb={5}>Current Password</Text>}
            value={currentPassword}
            placeholder="Your password"
            size="md"
            disabled={inputsDisabled}
            rightSection={loading && <Loader size="sm" />}
            onChange={(e) => setCurrentPassword(e.currentTarget.value)}
            sx={{ width: '15rem' }}
          />

          <PasswordInput
            label={<Text mb={5}>New Password</Text>}
            value={newPassword}
            placeholder="New password"
            size="md"
            disabled={inputsDisabled}
            rightSection={loading && <Loader size="sm" />}
            onChange={(e) => setNewPassword(e.currentTarget.value)}
            sx={{ width: '15rem' }}
          />

          <PasswordInput
            label={<Text mb={5}>Confirm New Password</Text>}
            placeholder="Your password"
            size="md"
            value={confirmNewPassword}
            disabled={inputsDisabled}
            rightSection={loading && <Loader size="sm" />}
            sx={{ width: '15rem' }}
            error={
              confirmNewPassword && newPassword !== confirmNewPassword && 'Passwords do not match'
            }
            onClick={(e) => setConfirmNewPassword(e.currentTarget.value)}
          />
        </Group>

        <Button size="sm" color="gray" variant="light" mt={10} sx={{ width: '10rem' }}>
          Forgot password
        </Button>
        <Button color="green" mt={10} sx={{ width: '20rem' }} disabled={inputsDisabled}>
          Update password
        </Button>
      </Stack>

      <Stack align="center">
        <Title mt={50}>Danger Zone</Title>
        <Button color="red" sx={{ width: '20rem' }} onClick={() => openDeleteModal()}>
          Delete Account
        </Button>
      </Stack>
    </>
  );
}

Dashboard.getLayout = function getLayout(page: ReactElement, user: CombinedUser) {
  return <DashboardLayout user={user}>{page}</DashboardLayout>;
};
