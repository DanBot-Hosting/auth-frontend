interface ModalProps extends React.PropsWithChildren {
  label: string;
  description?: string;
  buttons?: React.ReactElement[];
}