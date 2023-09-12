import { Select } from "@/components/Select";
import { useCookies } from "@/hooks/useCookies";
import { normalizePath, prependLocale } from "@/utils/dictionary";
import { CaretUpDown } from "@phosphor-icons/react";
import { css } from "@styles/css";
import { useCallback, useRef } from "react";

export function LanguagePicker({
  languages,
  translation,
  locale,
  css: cssProp = {},
}: LanguagePickerProps) {
  const pickedLocaleIndex = languages.findIndex(
    (lang) => lang.locale === locale
  );
  const { set } = useCookies();
  const selectRef = useRef<SelectRef | null>(null);
  const translationLabels = Object.keys(translation).reduce<
    Record<string, string>
  >((acc, key) => {
    const lang = languages.find(({ label }) => label === key);
    return {
      ...acc,
      [`${lang?.emoji} ${lang?.label}`]: `${lang?.emoji} ${translation[key]}`,
    };
  }, {});

  const select = css.raw({
    maxW: "15.625rem",
    gap: "0.875rem",
    bg: "none",
    outline: "1px solid token(colors.text.30)",

    color: "text.90",
    fontSize: "1rem",
    fontWeight: "400",

    _active: {
      bg: "none",
      outline: "1px solid token(colors.text.70)",
    },

    _focus: {
      bg: "none",
      outline: "1px solid token(colors.text.70)",
    },

    // Remove rotating caret
    // "& svg:last-child": {
    //   display: "none",
    // },

    // Dropdown
    "& ~ div > div": {
      maxW: "15.625rem",
    },
  });

  // const caret = css({
  //   color: "text.50",
  //   transition: "transform .15s ease-in-out",
  // });

  const handleTranslationSwitch = useCallback(
    (state: DropdownOption) => {
      window.location.pathname = prependLocale(
        normalizePath(window.location.pathname),
        state.value
      );
      set("language", state.value);
    },
    [set]
  );

  return (
    <Select
      initial={pickedLocaleIndex}
      translation={translationLabels}
      locale={locale}
      ref={selectRef}
      css={{ ...select, ...cssProp }}
      onChange={handleTranslationSwitch}
      options={languages.map<DropdownOption>((lang) => ({
        label: `${lang.emoji} ${lang.label}`,
        value: lang.locale,
      }))}
    >
      {/* <CaretUpDown size={18} weight="light" className={caret} /> */}
    </Select>
  );
}
