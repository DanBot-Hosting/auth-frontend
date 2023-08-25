import { Input } from "@/components/Input";
import { useModal } from "@/hooks/useModal";
import { css } from "@styles/css";

const modalConfirm = css({
  color: "hsl(0, 57.4%, 51.2%)!",
  textDecorationColor: "hsla(0, 57.4%, 51.2%, 0.6)!",

  _hover: {
    color: "hsl(0, 57.4%, 51.2%)!",
    textDecorationColor: "hsl(0, 57.4%, 51.2%)!",
  },
});

const modalCodeInput = css({
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

export function useDeleteConfirmationModal() {
  const { show: showModal, hide } = useModal();

  const modalConfig: ModalProps = {
    label: "Confirm account deletion",
    description: "Enter deletion code sent via Email",
    buttons: [
      <button key="cancel" onClick={hide}>
        Cancel
      </button>,
      <button key="update" className={modalConfirm} onClick={hide}>
        Delete my account!
      </button>,
    ],
    children: (
      <div className={modalCodeInput}>
        <Input placeholder="000 000" />
      </div>
    )
  };

  function show() {
    showModal(modalConfig);
  }

  return { show, hide };
}
