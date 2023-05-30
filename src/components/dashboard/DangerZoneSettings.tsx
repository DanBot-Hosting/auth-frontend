import { useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Title, Text, Center, PinInput } from '@mantine/core';
import { openConfirmModal, closeAllModals } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';
import { getCookie, deleteCookie } from 'cookies-next';
import { apiFetch } from '@util/util';
import { PageProps } from './index';

export function DangerZoneSettings({ user, loading, setLoading, inputsDisabled }: PageProps) {
  const [deletionCode, setDeletionCode] = useState('');
  const { push } = useRouter();

  const { mutateAsync: mutateDeleteUser, isSuccess: isDeleteUserSuccessful } = useMutation({
    mutationKey: ['deleteUser'],
    mutationFn: () => {
      return apiFetch<{ codeSent: string }>(`/users/delete`, {
        idToken: getCookie('idToken') as string,
        method: 'DELETE',
      });
    },
  });

  function openDeleteModal(e: any) {
    e.preventDefault();

    openConfirmModal({
      title: <Title order={4}>Confirm Action</Title>,
      closeOnConfirm: false,
      closeOnClickOutside: false,
      labels: {
        confirm: 'Confirm',
        cancel: 'Cancel',
      },
      confirmProps: {
        color: 'red',
      },
      children: (
        <Text size="sm" color="dimmed">
          Are you sure you want to delete your account?
        </Text>
      ),
      onConfirm: async () => {
        openConfirmModal({
          title: <Title order={4}>Enter Deletion Code</Title>,
          closeOnEscape: false,
          closeOnClickOutside: false,
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
            console.log('deletionCode', deletionCode);
            // await mutateDeleteUser();
            setLoading(false);

            {
              /*
                if (!isDeleteUserSuccessful) {
                    showNotification({
                        title: 'Error',
                        message: 'An error occurred while sending you a deletion code.',
                        color: 'red',
                    });
                    closeAllModals();
                }
                closeAllModals();

                push('/');

                showNotification({
                    title: 'Account Deleted',
                    message: 'Your account has been successfully deleted.',
                    color: 'green',
                });

                deleteCookie('idToken');
            */
            }
          },

          children: (
            <Center>
              <PinInput
                oneTimeCode
                length={6}
                size="lg"
                onComplete={(value) => {
                  setDeletionCode(value);
                }}
              />
            </Center>
          ),
        });
      },
    });
  }

  return (
    <>
      <Title mt={50} order={4}>
        Danger Zone
      </Title>
      <Button color="red" sx={{ width: '20rem' }} onClick={(e) => openDeleteModal(e)}>
        Delete Account
      </Button>
    </>
  );
}
