import { css } from "@styles/css";
import { PropsWithChildren, ReactElement } from "react";

export interface ModalProps extends PropsWithChildren {
  label: string;
  description?: string;
  buttons?: ReactElement[];
}

const modal = css({
  display: "flex",
  maxWidth: "28.125rem",
  width: "100%",
  p: "0.625rem",
  flexDir: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "0.625rem",

  borderRadius: "1.25rem",
  bg: "solidoverlay",
});

const header = css({
  display: "flex",
  p: "0.625rem 0.75rem",
  flexDir: "column",
  width: "100%",
  justifyContent: "center",
  alignItems: "flex-start",
  gap: "0.9375rem",
});

const heading = css({
  color: "text.90",
  fontSize: "1.25rem",
  fontWeight: "500",
  lineHeight: "normal",
  m: "0",
});

const subLabel = css({
  color: "text.60",
  fontSize: "1rem",
  fontWeight: "400",
});

const buttonList = css({
  display: "flex",
  p: "0.625rem 0.9375rem",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: "1.25rem",
  alignSelf: "stretch",

  "& > *": {
    display: "flex",
    padding: "0.3125rem 0",
    flexDir: "column",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",

    color: "text.60",
    fontWeight: "400",
    fontSize: "1rem",
    textDecoration: "underline",
    textDecorationColor: "text.30",
    textUnderlineOffset: "0.1875rem",
    textDecorationThickness: "0.078125rem",
    transition: "all 0.2s ease-in-out",

    _hover: {
      color: "text.80",
      textDecorationColor: "text.90",
      textDecorationThickness: "0.09375rem",
      transition: "all 0.2s ease-in-out",
    },
  },
});

export function Modal({ label, description, children, buttons }: ModalProps) {
  return (
    <div className={modal}>
      <header className={header}>
        <h4 className={heading}>{label}</h4>
        <span className={subLabel}>{description}</span>
      </header>
      {children ? <div>{children}</div> : null}
      {buttons ? <div className={buttonList}>{buttons}</div> : null}
    </div>
  );
}
