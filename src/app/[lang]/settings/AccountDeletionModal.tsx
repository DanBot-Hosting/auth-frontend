import { useModal } from "@/hooks/useModal";
import { css } from "@styles/css";

const verify = css({
  color: "text.100!",

  _hover: {
    color: "text.100!",
    textDecorationColor: "text.100!",
  },
});

export function useAccountDeletionModal(
  translation: Dictionary.Settings.Index
) {
  const { show: showModal, hide } = useModal();

  const modalConfig: ModalProps = {
    label: translation.modals.accountDeletion.title,
    description: translation.modals.accountDeletion.description,
    buttons: [
      <button key="cancel" onClick={hide}>
        {translation.modals.accountDeletion.buttons.cancel}
      </button>,
      <button key="confirm" className={verify} onClick={hide}>
        {translation.modals.accountDeletion.buttons.confirm}
      </button>,
    ],
  };

  function show() {
    showModal(modalConfig);
  }

  return { show, hide };
}
