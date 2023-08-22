import { Overlay, OverlayProps } from "@/components/Overlay";
import { CircleNotch } from "@phosphor-icons/react";
import { css } from "@styles/css";

interface LoadingOverlayProps extends OverlayProps {
  withCancel?: boolean;
  cancelLabel?: string;
  onCancel?: () => void;
}

const loading = css({
  display: "inline-flex",
  flexDir: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "1.25rem",
});

const content = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const spinner = css({
  color: "text.60",
  animation: "spin 1s linear infinite",
});

const label = css({
  display: "flex",
  padding: "0.3125rem 0.75rem",
  flexDir: "column",
  justifyContent: "center",
  alignItems: "center",

  color: "text.60",
  fontSize: "0.875rem",
  fontWeight: "400",
});

const cancel = css({
  display: "flex",
  flexDir: "column",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  userSelect: "none",

  fontWeight: "400",
  fontSize: "0.875rem",
  color: "text.100",
  textDecorationColor: "text.30",
  textDecorationLine: "underline",
  textUnderlineOffset: "0.1875rem",
  textDecorationThickness: "0.078125rem",
  transition: "all 0.2s ease-in-out",

  _hover: {
    textDecorationColor: "text.90",
    textDecorationThickness: "0.09375rem",
    transition: "all 0.2s ease-in-out",
  },
});

export function LoadingOverlay({
  children = "Loading...",
  visible,
  withCancel = false,
  cancelLabel = "Cancel",
  onCancel
}: LoadingOverlayProps) {
  return (
    <Overlay visible={visible}>
      <div className={loading}>
        <div className={content}>
          <CircleNotch size="2rem" weight="thin" className={spinner} />
          <div className={label}>{children}</div>
        </div>
        {withCancel ? (          
          <div className={cancel} onClick={onCancel}>{cancelLabel}</div>
        ) : null}
      </div>
    </Overlay>
  );
}
