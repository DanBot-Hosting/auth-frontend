"use client";
import { css } from "@styles/css";
import { useRef, useState } from "react";
import { Dropdown } from "@/components/Dropdown";
import { CaretDown } from "@phosphor-icons/react";

/**
 * Custom styled Select element.
 *
 * @param {string} [placeholder] - The placeholder text to be displayed when the select is empty.
 * @param {DropdownOption[]} props.options - The array of options to be displayed in the Dropdown.
 * @param {((option: DropdownOption) => void)} [props.onChange] -
 * The callback function to be executed when an option is changed.
 * @param {number} [props.initial] - The index of the initial option to be selected.
 * @param {SelectProps} props... - The div properties passed to the Select picker component.
 * @returns {JSX.Element} The rendered not responsive Select element.
 */
export function Select({
  placeholder,
  options,
  onChange,
  initial,
  css: cssProp = {},
  ...props
}: SelectProps) {
  const selectRef = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const caretRef = useRef<SVGSVGElement | null>(null);
  const [pickedOption, setPickedOption] = useState<DropdownOption>(
    typeof initial === "number"
      ? options[initial]
      : {
          label: placeholder ?? "",
          value: "",
        }
  );

  function toggleDropdownVisibility() {
    const currentVisibility = caretRef.current?.getAttribute("data-active");
    if (!currentVisibility) {
      selectRef.current?.setAttribute("data-active", "true");
      caretRef.current?.setAttribute("data-active", "true");
      dropdownRef.current?.setAttribute("data-active", "true");
      return;
    }

    selectRef.current?.removeAttribute("data-active");
    caretRef.current?.removeAttribute("data-active");
    dropdownRef.current?.removeAttribute("data-active");
  }

  function switchDropdown(option: DropdownOption) {
    caretRef.current?.removeAttribute("data-active");
    selectRef.current?.removeAttribute("data-active");
    dropdownRef.current?.removeAttribute("data-active");

    selectRef.current?.setAttribute("data-selected", "true");
    setPickedOption(option);

    if (onChange) onChange(option);
  }

  const wrapper = css({
    position: "relative",
    maxWidth: "18.75rem",
    width: "100%",
  });

  const dropdown = css({
    position: "absolute",
    width: "100%",
    top: "calc(100% + 0.625rem)",
    right: "left",

    opacity: "0",
    scale: ".95",
    pointerEvents: "none",
    zIndex: "1",
    transition: "opacity .15s ease-in-out, scale .15s ease-in-out",

    '&[data-active="true"]': {
      opacity: "1",
      scale: "1",
      pointerEvents: "unset",
      transition: "opacity .15s ease-in-out, scale .15s ease-in-out",
    },
  });

  const caret = css({
    color: "text.50",
    transition: "transform .15s ease-in-out",

    "&[data-active]": {
      // Rotate -180 degrees instead of 180 degrees
      // In order to have transition rotating
      // counter-clockwise
      transform: "rotate(-180deg)",
      transition: "transform .15s ease-in-out",
    },
  });

  const select = css(
    {
      display: "flex",
      maxWidth: "18.75rem",
      width: "100%",
      minHeight: "3.125rem",
      p: "0.625rem 1.5625rem",
      justifyContent: "space-between",
      alignItems: "center",
      flexShrink: "0",
      appearance: "none",
      userSelect: "none",
      cursor: "pointer",

      borderRadius: "1rem",
      bg: "pillbackground.30",
      backdropBlur: "full.3",
      backdropFilter: "auto",
      color: "text.40",
      fontSize: "1rem",
      fontWeight: "400",
      boxShadow: "none",
      // Needed to remove white outline from transition effect
      outline: "1px solid token(colors.text.5)",
      transition: "all 0.15s ease-in-out",

      "&[data-selected]": {
        color: "text.80",
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

  return (
    <div className={wrapper}>
      <div
        className={select}
        ref={selectRef}
        onClick={toggleDropdownVisibility}
        data-selected={!!pickedOption?.value || undefined}
        {...props}
      >
        <span
          className="label"
          // Initial value can depend on document
          suppressHydrationWarning
          // Will default to initial value no matter what if not dangerouslySetInnerHTML
          dangerouslySetInnerHTML={{
            __html: pickedOption?.label,
          }}
        />
        <CaretDown size={18} weight="light" className={caret} ref={caretRef} />
      </div>
      <div className={dropdown} ref={dropdownRef}>
        <Dropdown
          options={options}
          initial={initial}
          onTabClick={switchDropdown}
          css={{
            borderRadius: "1rem",
            width: "100%",

            // Hoverable border radius
            "& > div": {
              borderRadius: "0.375rem",
            },
          }}
        />
      </div>
    </div>
  );
}
