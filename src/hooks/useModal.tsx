"use client";
import { Modal, ModalProps } from "@/components/Modal";
import { useOverlay } from "@/hooks/useOverlay";
import { useCallback } from "react";

export function useModal() {
  const { show: showOverlay, hide } = useOverlay();

  const show = useCallback((modalProps: ModalProps) => {
    showOverlay({
      asLoading: false,
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
