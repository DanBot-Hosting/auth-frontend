import { Modal, ModalProps } from "@/components/Modal";
import { useOverlay } from "@/hooks/useOverlay";

export function useModal() {
  const { show: showOverlay, hide: hideOverlay } = useOverlay();

  function show(modalProps: ModalProps) {
    showOverlay({
      asLoading: false,
      children: (
        <Modal
          buttons={[<div onClick={hide} key="cancel">Cancel</div>]}
          {...modalProps}
        />
      ),
    });
  }

  function hide() {
    hideOverlay();
  }

  return { show, hide };
}
