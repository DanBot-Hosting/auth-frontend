import { Modal, ModalProps } from "@/components/Modal";
import { useOverlay } from "@/hooks/useOverlay";

type OverlayReturn = ReturnType<typeof useOverlay>;

export function useModal(overlayProps: Parameters<OverlayReturn["show"]>[0]) {
  const { show: showOverlay, hide: hideOverlay } = useOverlay();

  function show(modalProps: ModalProps) {
    showOverlay({
      ...overlayProps,
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
