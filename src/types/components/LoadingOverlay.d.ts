interface LoadingOverlayProps extends React.PropsWithChildren, GlobalComponent {
  withCancel?: boolean;
  cancelLabel?: string;
  onCancel?: () => void;
}
