import { useRouter } from 'next/router';
import { Button, Title, Text, Center, PinInput, LoadingOverlay, Modal, Group } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import useSWRMutation from 'swr/mutation';
import { getCookie, deleteCookie } from 'cookies-next';
import { apiFetch, getErrorMessage } from '@util/util';
import { PageProps } from './index';
import { APIErrorCodes } from '@util/constants';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';

async function notifyDeletionStatus({ status }: { status?: APIError | true }): Promise<void> {
  if (status === true) {
    showNotification({
      title: 'Account Deleted',
      message: 'Your account has been successfully deleted.',
      color: 'green',
    });
  } else {
    const { message, title } = getErrorMessage(status?.code ?? 'UNKNOWN');

    showNotification({
      message,
      title,
      color: 'red',
    });
  }
}

export function DangerZoneSettings({ user, inputsDisabled }: PageProps) {
  const [deletionCode, setDeletionCode] = useState('000000');

  const [visible, { open: enableLoading, close: disableLoading }] =
    useDisclosure(false);
  // Not using @mantine/modals because of state management issues with loading overlay ^
  const [confirmModalOpened, { close: closeConfirmModal, open: openConfirmModal }] =
    useDisclosure(false);
  const [submitModalOpened, { close: closeSubmitModal, open: openSubmitModal }] =
    useDisclosure(false);
  const { push } = useRouter();

  const fetcher = (url: string) =>
    apiFetch<APIDeleteUserResponse>(url, {
      idToken: getCookie('idToken')?.toString(),
      method: 'DELETE',
    });

  // Verification code mutation
  const { trigger: mutateVerificationCode } = useSWRMutation('/users/delete', fetcher);
  // User deletion code mutation
  const { trigger: mutateDeleteUser } = useSWRMutation(
    `/users/delete?code=${deletionCode}`,
    fetcher
  );

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
              const response = await mutateVerificationCode();
              disableLoading();

              if (!response || response?.error) {
                const { message, title } = getErrorMessage(response?.error?.code ?? 'UNKNOWN');
                showNotification({
                  message,
                  title,
                  color: 'red',
                });

                // Handle 'auth/deletion-request-already-sent' error
                if (response?.error?.code !== APIErrorCodes[11]) return closeConfirmModal();
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
              setDeletionCode(deletionCode);

              enableLoading();
              // Confirm deletion with if statements + mutation checking on backend
              const response = await mutateDeleteUser();
              disableLoading();

              const status = response?.success || response?.error;
              notifyDeletionStatus({
                status,
              });

              closeConfirmModal();
              closeSubmitModal();
              if (!status) {
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
