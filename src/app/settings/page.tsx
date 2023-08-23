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
  color: "text.100!",

  _hover: {
    color: "text.100!",
    textDecorationColor: "text.100!",
  },
});

const fields = css({
  display: "flex",
  p: "0.625rem 0.75rem",
  flexDir: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  gap: "1.25rem",
  alignSelf: "stretch",
});

const field = css({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  gap: "0.625rem",
  alignSelf: "stretch",

  "& > input": {
    maxW: "100%",
    borderRadius: "0.625rem",
  }
});

const label = css({
  color: "text.90",
  fontSize: "1rem",
  fontWeight: "400",
});

export default function Settings() {
  const { show: showModal, hide: hideModal } = useModal();

  const modalConfig: ModalProps = {
    label: "Update your password",
    description: "Enter your current password and a new password",
    buttons: [
      <button key="cancel" onClick={hideModal}>
        Cancel
      </button>,
      <button key="update" className={confirm} onClick={hideModal}>
        Change my password!
      </button>,
    ],
    children: (
      <div className={fields}>
        <div className={field}>
          <span className={label}>Current password</span>
          <Input placeholder="" />
        </div>
        <div className={field}>
          <span className={label}>New password</span>
          <Input placeholder="" />
        </div>
        <div className={field}>
          <span className={label}>Confirm new password</span>
          <Input placeholder="" />
        </div>
      </div>
    )
  }

  return (
    <>
      <button className={button} onClick={() => showModal(modalConfig)}>Use Password Change Modal</button>
    </>
  );
}
