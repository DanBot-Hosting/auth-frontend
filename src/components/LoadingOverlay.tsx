import { Overlay } from "@/components/Overlay";
import { CircleNotch } from "@phosphor-icons/react";
import { css } from "@styles/css";

/**
 * The LoadingOverlay component for loading screens for API calls.
 * Made on top of the Overlay component.
 * To hide the interface with it, consider using `useOverlay` with `asLoading` set to true for show method.
 * This component should not be used directly.
 *
 * @param {LoadingOverlayProps} props - The properties for the LoadingOverlay.
 * @param {CSSObject} [props.css={}] - Custom CSS styles to be applied to the component.
 * @param {React.ReactNode} [props.children="Loading..."] - The content to display inside the overlay. Defaults to "Loading...".
 * Won't add dot animation at the end.
 * @param {boolean} [props.withCancel=false] - Indicates whether to display a cancel button. Defaults to false.
 * @param {string} [props.cancelLabel="Cancel"] - The label for the cancel button. Defaults to "Cancel".
 * @param {() => void} [props.onCancel] - The callback function to be called when the cancel button is clicked.
 * @returns {JSX.Element} The rendered LoadingOverlay component. Will only render the component.
 */
export function LoadingOverlay({
  children = "Loading...",
  withCancel = false,
  cancelLabel = "Cancel",
  onCancel,
  css: cssProp = {}
}: LoadingOverlayProps) {
  const loading = css({
    display: "inline-flex",
    flexDir: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "1.25rem",
  }, cssProp);
  
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

  return (
    <Overlay>
      <div className={loading}>
        <div className={content}>
          {/* Unexpected value 2rem parsing width attribute */}
          <CircleNotch size="32px" weight="thin" className={spinner} />
          <div className={label}>{children}</div>
        </div>
        {withCancel ? (
          <div className={cancel} onClick={onCancel}>
            {cancelLabel}
          </div>
        ) : null}
      </div>
    </Overlay>
  );
}
