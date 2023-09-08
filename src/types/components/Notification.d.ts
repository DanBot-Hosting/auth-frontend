interface NotificationProps extends React.PropsWithChildren, GlobalComponent {
  withConfirm?: boolean;
  confirmLabel?: string;
  onConfirm?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
