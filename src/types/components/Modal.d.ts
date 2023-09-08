interface ModalProps extends React.PropsWithChildren, GlobalComponent {
  label: string;
  description?: string;
  buttons?: React.ReactElement[];
}
