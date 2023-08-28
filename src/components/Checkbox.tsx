"use client";
import { Check } from "@phosphor-icons/react";
import { css } from "@styles/css";
import { useCallback, useState } from "react";

export function Checkbox({
  css: cssProp = {},
  onChange,
  children,
  checked,
  name,
  ...props
}: CheckboxProps) {
  const [isChecked, setIsChecked] = useState<boolean>(checked ?? false);

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
    width: "1.375rem",
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
    zIndex: "1",
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
