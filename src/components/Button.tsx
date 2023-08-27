import { css, cx } from "@styles/css";

export function Button({
  css: cssProp = {},
  secondary: secondaryProp,
  pill: pillProp,
  ...props
}: ButtonProps) {
  const button = css(
    {
      display: "inline-flex",
      padding: "0.625rem 1.25rem",
      justifyContent: "center",
      alignItems: "center",
      flexShrink: "0",
      cursor: "pointer",

      borderRadius: "0.625rem",
      bg: "text.90",
      color: "background.100",
      fontWeight: "400",
      fontSize: "1rem",
      lineHeight: "1.1875",
      transition: "background .15s ease-in-out",

      _hover: {
        bg: "text.80",
        transition: "background .15s ease-in-out",
      },
    },
    cssProp
  );

  const secondary = css({
    bg: "transparent",
    color: "text.90",
    border: "1px solid token(colors.text.90)",
    transition: "all .15s ease-in-out",

    _hover: {
      bg: "transparent!",
      color: "text.60",
      border: "1px solid token(colors.text.60)",
      transition: "all .15s ease-in-out !",
    },
  });

  const pill = css({
    borderRadius: "1.25rem!",
  });

  return (
    <button
      className={cx(
        button,
        secondaryProp ? secondary : null,
        pillProp ? pill : null
      )}
      {...props}
    />
  );
}
