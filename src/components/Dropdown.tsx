"use client";
import { css } from "@styles/css";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useHoverable } from "@/hooks/useHoverable";

/**
 * A Dropdown menu with a list of buttons to interact with.
 * Uses hoverable to slide to the selected/hovered element.
 *
 * @param {DropdownOption[]} props.options - The array of options to be displayed in the Dropdown.
 * @param {number} [props.initial] - The index of the initial option to be selected.
 * @param {((option: DropdownOption) => void)} [props.onTabClick] -
 * The callback function to be executed when an option is clicked.
 * @param {import("@styles/types").SystemStyleObject} [props.css={}] - Custom CSS styles to be applied to the checkbox.
 * Is part of panda-css styling.
 * @param {DropdownProps} props... - The div properties passed to the wrapper Dropdown component.
 * @returns {JSX.Element} The rendered Dropdown component.
 */
export const Dropdown = forwardRef<DropdownRef, DropdownProps>(
  function Dropdown(
    { options, initial, onTabClick, css: cssProp = {}, ...props },
    ref
  ) {
    const optionsRef = useRef<(DropdownOptionRef | null)[]>([]);
    const [hoverableElement, setHoverableElement] =
      useState<HTMLDivElement | null>(null);
    const { find, change, hide, set } = useHoverable({
      children: optionsRef.current.map((opt) => opt?.ref ?? null),
      hoverable: hoverableElement,
    });

    useEffect(() => {
      if (typeof initial !== "number") return;
      const element = optionsRef.current[initial];

      if (!element?.ref) return hide();
      change(element.ref);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const manage = useCallback(
      (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        option: DropdownOption
      ) => {
        if (onTabClick) onTabClick(option);
        change(event.currentTarget);
      },
      [change, onTabClick]
    );

    const dropdown = css(
      {
        display: "flex",
        minWidth: "12.5rem",
        width: "max-content",
        p: "0.625rem",
        flexDir: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        position: "relative",

        borderRadius: "1.25rem",
        bg: "pillbackground.50",
        backdropBlur: "full.5",
        backdropFilter: "auto",
      },
      cssProp
    );

    const option = css({
      display: "flex",
      height: "2.5rem",
      p: "0rem 0.9375rem",
      alignItems: "center",
      alignSelf: "stretch",
      zIndex: "4",
      userSelect: "none",
      cursor: "pointer",

      borderRadius: "0.625rem",
      color: "text.60",
      fontWeight: "400",
      transition: "color 0.2s ease-in-out",

      _hover: {
        color: "text.90",
        transition: "color 0.2s ease-in-out",
      },

      "&[data-active-hoverable]": {
        color: "text.90",
        transition: "color 0.2s ease-in-out",
      },
    });

    const hoverable = css({
      position: "absolute",
      top: "0",
      left: "0",
      borderRadius: "0.625rem",
      bg: "pillbackground.70",
      zIndex: "3",
      transition: "all 0.2s ease-in-out",
    });

    useImperativeHandle(ref, () => ({
      switch: (option: DropdownOption) => {
        const element = optionsRef.current.find(
          (optionRef) =>
            optionRef?.value === option.value &&
            optionRef?.label === option.label
        );

        if (!element?.ref) return hide();
        change(element.ref);
      },
      ...hoverableElement,
    }));

    return (
      <div className={dropdown} {...props}>
        <div ref={setHoverableElement} className={hoverable} />
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={(event) => manage(event, opt)}
            ref={(ref) => optionsRef.current.push({ ref, ...opt })}
            onMouseEnter={(event) => set(event.currentTarget)}
            onMouseOut={find}
            className={option}
          >
            {opt.label}
          </button>
        ))}
      </div>
    );
  }
);
