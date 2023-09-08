import { css } from "@styles/css";

/**
 * Custom styled Input element.
 *
 * @param {CSSObject} [props.css={}] - Custom CSS styles to be applied to the component.
 * @param {InputProps} props... - The props to be passed to the input element.
 * Can potentially override className
 * @returns {JSX.Element} The rendered not responsive Input element.
 */
export function Input({ css: cssProp = {}, ...props }: InputProps) {
  const input = css(
    {
      display: "flex",
      maxWidth: "18.75rem",
      width: "100%",
      minHeight: "3.125rem",
      p: "0.625rem 1.5625rem",
      alignItems: "center",
      flexShrink: "0",
      appearance: "none",

      borderRadius: "1rem",
      bg: "pillbackground.30",
      backdropBlur: "full.3",
      backdropFilter: "auto",
      color: "text.80",
      fontSize: "1rem",
      fontWeight: "400",
      boxShadow: "none",
      // Needed to remove white outline from transition effect
      outline: "1px solid transparent",
      transition: "all 0.15s ease-in-out",

      _placeholder: {
        color: "text.40",
      },

      _active: {
        outline: "1px solid token(colors.text.20)",
        bg: "pillbackground.50",
        transition: "all 0.15s ease-in-out",
      },

      _focus: {
        outline: "1px solid token(colors.text.20)",
        bg: "pillbackground.50",
        transition: "all 0.15s ease-in-out",
      },
    },
    cssProp
  );

  return <input type="text" className={input} {...props} />;
}
