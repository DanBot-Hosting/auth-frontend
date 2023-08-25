interface UseModal {
  show: (modalProps: ModalProps & ShowModalProps) => void;
  hide: () => void;
}

interface ShowModalProps {
  closeOnEscape?: boolean;
}
