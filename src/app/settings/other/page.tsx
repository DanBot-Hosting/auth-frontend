"use client";
import { Input } from "@/components/Input";
import { ModalProps } from "@/components/Modal";
import { useModal } from "@/hooks/useModal";
import { css } from "@styles/css";

const button = css({
  cursor: "pointer",
  color: "text.60",
  transition: "color .3s ease-in-out",

  _hover: {
    color: "text.90",
    transition: "color .3s ease-in-out",
  },
});

const confirm = css({
  color: "hsl(0, 57.4%, 51.2%)!",
  textDecorationColor: "hsla(0, 57.4%, 51.2%, 0.6)!",

  _hover: {
    color: "hsl(0, 57.4%, 51.2%)!",
    textDecorationColor: "hsl(0, 57.4%, 51.2%)!",
  },
});

const verify = css({
  color: "text.100!",

  _hover: {
    color: "text.100!",
    textDecorationColor: "text.100!",
  },
});

const codeInput = css({
  display: "flex",
  p: "0 0.625rem",
  flexDir: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  gap: "1.25rem",
  alignSelf: "stretch",

  "& > input": {
    textAlign: "center",
    maxW: "100%",
    borderRadius: "0.625rem",
  }
});

export default function Settings() {
  const { show: showModal, hide: hideModal } = useModal();

  const accountDeletionModalConfig: ModalProps = {
    label: "Are you sure?",
    description: "Are you sure you want to delete your account? This action is irreversible!",
    buttons: [
      <button key="cancel" onClick={hideModal}>
        Cancel
      </button>,
      <button key="update" className={verify} onClick={hideModal}>
        Get the verification code
      </button>,
    ],
  };

  const deletionConfirmationModalConfig: ModalProps = {
    label: "Confirm account deletion",
    description: "Enter deletion code sent via Email",
    buttons: [
      <button key="cancel" onClick={hideModal}>
        Cancel
      </button>,
      <button key="update" className={confirm} onClick={hideModal}>
        Delete my account!
      </button>,
    ],
    children: (
      <div className={codeInput}>
        <Input placeholder="000 000" />
      </div>
    )
  };

  return (
    <>
      <button
        className={button}
        onClick={() => showModal(accountDeletionModalConfig)}
      >
        Use Account Deletion Modal
      </button>
      <button
        className={button}
        onClick={() => showModal(deletionConfirmationModalConfig)}
      >
        Use Deletion Confirmation Modal
      </button>
    </>
  );
}
