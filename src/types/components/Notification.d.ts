interface NotificationProps extends React.PropsWithChildren {
  withConfirm?: boolean;
  confirmLabel?: string;
  onConfirm?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
