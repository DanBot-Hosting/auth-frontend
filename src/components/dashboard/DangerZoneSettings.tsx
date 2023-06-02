import { useRouter } from 'next/router';
import { Button, Title, Text, Center, PinInput, LoadingOverlay, Modal, Group } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { UseMutateAsyncFunction, useMutation } from '@tanstack/react-query';
import { getCookie, deleteCookie } from 'cookies-next';
import { apiFetch, getErrorMessage } from '@util/util';
import { PageProps } from './index';
import { APIErrorCodes } from '@util/constants';
import { useDisclosure } from '@mantine/hooks';

async function confirmDeletionWithCode({
  deletionCode,
  toggleLoading,
  mutate,
}: {
  deletionCode: string;
  toggleLoading: () => void;
  mutate: UseMutateAsyncFunction<
    APIResponse<APIDeleteUserResponse>,
    unknown,
    {
      code?: string | undefined;
    },
    unknown
  >;
}): Promise<boolean> {
  toggleLoading();
  const { error: errorDeleting, success: successfullyDeleted } = await mutate({
    code: deletionCode,
  });
  toggleLoading();

  if (successfullyDeleted) {
    showNotification({
      title: 'Account Deleted',
      message: 'Your account has been successfully deleted.',
      color: 'green',
    });

    return true;
  } else if (errorDeleting) {
    const { message, title } = getErrorMessage(errorDeleting?.code);

    showNotification({
      message,
      title,
      color: 'red',
    });
  }

  return false;
}

export function DangerZoneSettings({ user, inputsDisabled }: PageProps) {
  const [visible, { toggle: toggleLoading, open: enableLoading, close: disableLoading }] =
    useDisclosure(false);
  // Not using @mantine/modals because of state management issues with loading overlay ^
  const [confirmModalOpened, { close: closeConfirmModal, open: openConfirmModal }] =
    useDisclosure(false);
  const [submitModalOpened, { close: closeSubmitModal, open: openSubmitModal }] =
    useDisclosure(false);
  const { push } = useRouter();

  const { mutateAsync: mutateDeleteUser, isSuccess: isDeleteUserSuccessful } = useMutation({
    mutationKey: ['deleteUser'],
    mutationFn: ({ code }: { code?: string }) =>
      apiFetch<APIDeleteUserResponse>(`/users/delete${code ? `?code=${code}` : ''}`, {
        idToken: getCookie('idToken') as string,
        method: 'DELETE',
      }),
  });

  return (
    <>
      <Title mt={50} order={4}>
        Danger Zone
      </Title>
      <Button
        color="red"
        sx={{ width: '20rem' }}
        disabled={inputsDisabled}
        onClick={openConfirmModal}
      >
        Delete Account
      </Button>
      <Modal
        // First confirmation modal
        opened={confirmModalOpened}
        onClose={closeConfirmModal}
        withCloseButton={false}
        title={<Title order={4}>Confirm Action</Title>}
        closeOnClickOutside={false}
      >
        <LoadingOverlay visible={visible} zIndex={1001} />
        <Text size="sm" color="dimmed">
          {user.dbUser.firstName}, are you sure you want to delete your account?
        </Text>
        <Group position="right" mt="sm">
          <Button onClick={closeConfirmModal} variant="default">
            Cancel
          </Button>
          <Button
            type="submit"
            color="red"
            onClick={async () => {
              enableLoading();
              const { error } = await mutateDeleteUser({});
              disableLoading();

              if (error ?? !isDeleteUserSuccessful) {
                const { message, title } = getErrorMessage(error?.code ?? 'UNKNOWN');
                showNotification({
                  message,
                  title,
                  color: 'red',
                });

                // Handle 'auth/deletion-request-already-sent' error
                if (error?.code !== APIErrorCodes[11]) return closeConfirmModal();
              }

              closeConfirmModal();
              openSubmitModal();
            }}
          >
            Confirm
          </Button>
        </Group>
      </Modal>
      <Modal
        // Second submit deletion code modal
        opened={submitModalOpened}
        onClose={closeSubmitModal}
        closeOnEscape={false}
        closeOnClickOutside={false}
        title={<Title order={4}>Enter the deletion code sent to your email</Title>}
      >
        <LoadingOverlay visible={visible} zIndex={1001} />
        <Center>
          <PinInput
            oneTimeCode
            length={6}
            size="lg"
            onComplete={async (deletionCode) => {
              enableLoading();
              // Confirm deletion with if statements + mutation checking on backend
              const status = await confirmDeletionWithCode({
                deletionCode,
                toggleLoading,
                mutate: mutateDeleteUser,
              });

              closeConfirmModal();
              closeSubmitModal();
              if (status) {
                deleteCookie('idToken');
                push('/');
              }
              disableLoading();
            }}
          />
        </Center>
      </Modal>
    </>
  );
}
