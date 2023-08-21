import { css } from "@styles/css";
import { PropsWithChildren } from "react";

export interface NotificationProps extends PropsWithChildren {
  withConfirm?: boolean;
  confirmLabel?: string;
  onConfirm?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const notification = css({
  display: "inline-flex",
  maxWidth: "25rem",
  p: "0.625rem",
  alignItems: "center",
  flexShrink: "0",
  gap: "1.25rem",
  transition: "all 0.35s ease-in-out",

  borderRadius: "1.25rem",
  bg: "pillbackground.10",
  backdropFilter: "blur(5px)",
});

const content = css({
  display: "flex",
  p: "0.5rem 1.25rem",
  flexDir: "column",
  justifyContent: "center",
  alignItems: "flex-center",

  fontWeight: "400",
  fontSize: "1rem",
  color: "text.60",
});

const confirm = css({
  display: "flex",
  height: "2.5rem",
  padding: "0.5rem 1.25rem",
  flexDir: "column",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  userSelect: "none",

  fontWeight: "400",
  fontSize: "1rem",
  color: "text.100",
  textDecoration: "underline",
  textDecorationColor: "text.30",
  textUnderlineOffset: "0.1875rem",
  textDecorationThickness: "0.078125rem",
  transition: "all 0.2s ease-in-out",

  _hover: {
    textDecorationColor: "text.90",
    textDecorationThickness: "0.09375rem",
    transition: "all 0.2s ease-in-out",
  },
});

export function Notification({
  children,
  withConfirm = true,
  confirmLabel = "Accept",
  onConfirm,
}: NotificationProps) {
  return (
    <div className={notification}>
      <div className={content}>{children}</div>
      {withConfirm ? (
        <button className={confirm} onClick={onConfirm}>
          {confirmLabel}
        </button>
      ) : null}
    </div>
  );
}
