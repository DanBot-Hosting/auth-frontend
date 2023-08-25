interface UseGeneralOverlayProps {
  closeOnEscape?: boolean;
}

interface UseOverlayProps {
  asLoading?: false;
}

interface UseLoadingOverlayProps extends LoadingOverlayProps {
  asLoading?: true;
}

interface UseOverlay {
  show: (props: ShowOverlayProps) => void;
  hide: () => void;
}

type ShowOverlayProps = OverlayProps & UseGeneralOverlayProps & (UseOverlayProps | UseLoadingOverlayProps);
