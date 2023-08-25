"use client";
import { Modal } from "@/components/Modal";
import { useOverlay } from "@/hooks/useOverlay";
import { useCallback } from "react";

/**
 * Hook that lets interact with overlay-provider by adding modals on top of overlay.
 * Utilizes useOverlay hook.
 *
 * @returns {UseModal} An object containg show and hide functions.
 */
export function useModal(): UseModal {
  const { show: showOverlay, hide } = useOverlay();

  /**
   * Shows a modal with the given props.
   * 
   * @param {ModalProps} modalProps - The properties passed to the modal.
   * @param {boolean} [props.closeOnEscape=false] - Indicates whether to close the modal on pressing escape or clicking outside.
   * @param {string} modalProps.label - The label aka title for the modal.
   * @param {string} [modalProps.description] - The description for the modal. Element won't rendered if not set.
   * @param {React.ReactNode} [modalProps.children] - The content of the modal. Element won't rendered if not set.
   * @param {React.ReactElement[]} [modalProps.buttons] - The button list to be rendered in the modal.
   * Gets applied custom styles but they can be overriden by !important sign (or simply ! in panda-css).
   * @returns {void}
   */
  const show = useCallback(({ closeOnEscape = false, ...modalProps }: ModalProps & ShowModalProps) => {
    showOverlay({
      asLoading: false,
      closeOnEscape,
      children: (
        <Modal
          buttons={[<div onClick={hide} key="cancel">Cancel</div>]}
          {...modalProps}
        />
      ),
    });
  }, [showOverlay, hide]);

  return { show, hide };
}
