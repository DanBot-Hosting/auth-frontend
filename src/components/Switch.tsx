"use client";
import { css } from "@styles/css";
import { useCallback, useState } from "react";

/**
 * Custom styled Input element with a checkbox but styled as a switch.
 *
 * @param {import("@styles/types").SystemStyleObject} [props.css={}] - Custom CSS styles to be applied to the switch.
 * Is part of panda-css styling.
 * @param {(state: boolean) => void} [props.onChange] - The function to be called when the switch value changes.
 * @param {React.ReactNode} [props.children] - The content to be displayed next to the switch.
 * Will be wrapped in label element.
 * @param {boolean} [props.checked=false] - The initial checked state of the switch.
 * @param {string} [props.name] - The name attribute of the switch.
 * Will be applied to label as well.
 * @param {SwitchProps} props... - The input properties passed to the switch component.
 * @return {JSX.Element} The rendered wrapper around input checkbox component.
 */
export function Switch({
  css: cssProp = {},
  onChange,
  children,
  checked = false,
  name,
  ...props
}: SwitchProps) {
  const [isChecked, setIsChecked] = useState<boolean>(checked);

  const element = css(
    {
      position: "relative",
      display: "inline-flex",
      padding: "0.3125rem",
      justifyContent: "center",
      alignItems: "center",
      gap: "0.3125rem",
      cursor: "pointer",
      userSelect: "none",
    },
    cssProp
  );

  const checkbox = css({
    display: "flex",
    width: "2.1875rem",
    height: "1.375rem",
    padding: "0.125rem",
    flexDir: "column",
    justifyContent: "center",
    cursor: "pointer",

    appearance: "none",
    borderRadius: "0.6875rem",
    bg: "text.40",
    transition: "all .2s ease-in-out",

    "&:checked": {
      bg: "text.100",
      transition: "background .2s ease-in-out",

      // Toggler
      "& ~ div > div": {
        // container width - padding - toggler width
        left: "calc(2.1875rem - 0.125rem - 1.125rem)",
        transition: "all .15s ease-in-out",
      },
    },
  });

  const label = css({
    padding: "0.3125rem 0.4375rem",
    cursor: "pointer",

    color: "text.60",
    fontSize: "1rem",
    fontWeight: "400",
  });

  const toggleContainer = css({
    display: "flex",
    width: "2.1875rem",
    height: "1.375rem",
    padding: "0.125rem",

    position: "absolute",
    left: "0.3125rem",
    zIndex: "1",
    pointerEvents: "none",
  });

  const toggler = css({
    position: "absolute",
    bg: "background.100",
    width: "1.125rem",
    height: "1.125rem",

    borderRadius: "50%",
    // Include padding
    left: "0.125rem",
    transition: "all .15s ease-in-out",
  });

  const handleChange = useCallback(() => {
    const changedValue = !isChecked;
    if (onChange) onChange(isChecked);
    setIsChecked(() => changedValue);
  }, [isChecked, onChange]);

  return (
    <div className={element} onClick={handleChange}>
      <input
        type="checkbox"
        className={checkbox}
        checked={isChecked}
        onChange={handleChange}
        name={name}
        {...props}
      />
      <div className={toggleContainer}>
        <div className={toggler} />
      </div>
      {children ? (
        <label htmlFor={name} className={label}>
          {children}
        </label>
      ) : null}
    </div>
  );
}
