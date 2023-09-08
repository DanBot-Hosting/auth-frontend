import { css } from "@styles/css";

/**
 * Modal component made to be rendered on top of Overlay component.
 * To hide the interface with it, consider using `useModal`.
 * This component should not be used directly.
 *
 * @param {ModalProps} props - The properties passed to the component.
 * @param {string} props.label - The label aka title for the modal.
 * @param {string} [props.description] - The description for the modal. Element won't rendered if not set.
 * @param {CSSObject} [props.css={}] - Custom CSS styles to be applied to the component.
 * @param {React.ReactNode} [props.children] - The content of the modal. Element won't rendered if not set.
 * @param {React.ReactElement[]} [props.buttons] - The button list to be rendered in the modal.
 * Gets applied custom styles but they can be overriden by !important sign (or simply ! in panda-css).
 * @returns {JSX.Element} The rendered Modal component. Will only render dialog (without semantics).
 */
export function Modal({
  label,
  description,
  children,
  buttons,
  css: cssProp = {},
}: ModalProps) {
  const modal = css(
    {
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
    },
    cssProp
  );

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

  const content = css({
    alignSelf: "stretch",
  });

  const buttonList = css({
    display: "flex",
    p: "0.625rem 0.9375rem",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "1.25rem",
    alignSelf: "stretch",
    flexWrap: "wrap",

    "& > *": {
      display: "flex",
      padding: "0.3125rem 0",
      flexDir: "column",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
      whiteSpace: "nowrap",

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

  return (
    <div className={modal}>
      <header className={header}>
        <h4 className={heading}>{label}</h4>
        {description ? <span className={subLabel}>{description}</span> : null}
      </header>
      {children ? <div className={content}>{children}</div> : null}
      {buttons ? <div className={buttonList}>{buttons}</div> : null}
    </div>
  );
}
