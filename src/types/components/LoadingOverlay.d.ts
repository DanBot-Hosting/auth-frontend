interface LoadingOverlayProps extends React.PropsWithChildren {
  withCancel?: boolean;
  cancelLabel?: string;
  onCancel?: () => void;
}
