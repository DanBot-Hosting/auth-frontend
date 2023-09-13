import { Input } from "@/components/Input";
import { useModal } from "@/hooks/useModal";
import { css } from "@styles/css";

const modalConfirm = css({
  color: "text.100!",

  _hover: {
    color: "text.100!",
    textDecorationColor: "text.100!",
  },
});

const modalFields = css({
  display: "flex",
  p: "0.625rem 0.75rem",
  flexDir: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  gap: "1.25rem",
  alignSelf: "stretch",
});

const modalField = css({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  gap: "0.625rem",
  alignSelf: "stretch",

  "& > input": {
    maxW: "100%",
    borderRadius: "0.625rem",
  },
});

const modalLabel = css({
  color: "text.90",
  fontSize: "1rem",
  fontWeight: "400",
});

export function usePasswordChangeModal(
  translation: Dictionary.Settings.Index
) {
  const { show: showModal, hide } = useModal();

  const modalConfig: ModalProps = {
    label: translation.modals.passwordChange.title,
    description: translation.modals.passwordChange.description,
    buttons: [
      <button key="cancel" onClick={hide}>
        {translation.modals.passwordChange.buttons.cancel}
      </button>,
      <button key="confirm" className={modalConfirm} onClick={hide}>
        {translation.modals.passwordChange.buttons.confirm}
      </button>,
    ],
    children: (
      <div className={modalFields}>
        <div className={modalField}>
          <span className={modalLabel}>
            {translation.modals.passwordChange.fields.currentPassword.label}
          </span>
          <Input placeholder="" />
        </div>
        <div className={modalField}>
          <span className={modalLabel}>
            {translation.modals.passwordChange.fields.newPassword.label}
          </span>
          <Input placeholder="" />
        </div>
        <div className={modalField}>
          <span className={modalLabel}>
            {translation.modals.passwordChange.fields.confirmNewPassword.label}
          </span>
          <Input placeholder="" />
        </div>
      </div>
    ),
  };

  function show() {
    showModal(modalConfig);
  }

  return {
    show,
    hide,
  };
}
