"use client";
import { Check } from "@phosphor-icons/react";
import { css } from "@styles/css";
import { forwardRef, useCallback, useState } from "react";

/**
 * Custom styled Input element with a checkbox.
 *
 * @param {import("@styles/types").SystemStyleObject} [props.css={}] - Custom CSS styles to be applied to the checkbox.
 * Is part of panda-css styling.
 * @param {(state: boolean) => void} [props.onChange] - The function to be called when the checkbox value changes.
 * @param {React.ReactNode} [props.children] - The content to be displayed next to the checkbox.
 * Will be wrapped in label element.
 * @param {boolean} [props.checked=false] - The initial checked state of the checkbox.
 * @param {string} [props.name] - The name attribute of the checkbox.
 * Will be applied to label as well.
 * @param {CheckboxProps} props... - The input properties passed to the checkbox component.
 * @return {JSX.Element} The rendered wrapper around input checkbox component.
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(
    { css: cssProp = {}, onChange, children, checked = false, name, ...props },
    ref
  ) {
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
        maxWidth: "max-content",
      },
      cssProp
    );

    const checkbox = css({
      display: "flex",
      minWidth: "1.375rem",
      height: "1.375rem",
      flexDir: "column",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",

      appearance: "none",
      borderRadius: "0.5rem",
      border: "1px solid token(colors.text.100)",
      transition: "all .2s ease-in-out",

      "&:checked": {
        bg: "text.100",
        transition: "background .2s ease-in-out",

        // Inverted tick
        "& ~ div > svg": {
          opacity: "1",
          scale: "1",
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

    const center = css({
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "1.375rem",
      height: "1.375rem",

      position: "absolute",
      left: "0.3125rem",
      zIndex: "0",
      pointerEvents: "none",
    });

    const invertedTick = css({
      color: "background.100",

      opacity: "0",
      scale: "0.7",
      transition: "all .15s ease-in-out",
    });

    const handleChange = useCallback(() => {
      const changedValue = !isChecked;
      if (onChange) onChange(changedValue);
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
          ref={ref}
          {...props}
        />
        <div className={center}>
          <Check size={16} weight="bold" className={invertedTick} />
        </div>
        {children ? (
          <label htmlFor={name} className={label}>
            {children}
          </label>
        ) : null}
      </div>
    );
  }
);
