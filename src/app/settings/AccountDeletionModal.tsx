import { useModal } from "@/hooks/useModal";
import { css } from "@styles/css";

const verify = css({
  color: "text.100!",

  _hover: {
    color: "text.100!",
    textDecorationColor: "text.100!",
  },
});

export function useAccountDeletionModal() {
  const { show: showModal, hide } = useModal();

  const modalConfig: ModalProps = {
    label: "Are you sure?",
    description:
      "Are you sure you want to delete your account? This action is irreversible!",
    buttons: [
      <button key="cancel" onClick={hide}>
        Cancel
      </button>,
      <button key="update" className={verify} onClick={hide}>
        Get the verification code
      </button>,
    ],
  };

  function show() {
    showModal(modalConfig);
  }

  return { show, hide };
}
