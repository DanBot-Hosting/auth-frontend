import { Button } from "@/components/Button";
import { getDictionary, prependLocale } from "@/utils/dictionary";
import { css } from "@styles/css";
import Link from "next/link";
import { use } from "react";

const main = css({
  display: "flex",
  flexDir: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "1.875rem",
  flexGrow: "1",
});

const code = css({
  fontSize: "8rem",
  lineHeight: "100%",
  fontWeight: "500",
  color: "text.100",
  userSelect: "none",
});

const status = css({
  fontSize: "8rem",
  lineHeight: "100%",
  marginBottom: "-3.125rem",
  fontWeight: "100",
  background:
    "linear-gradient(0deg, token(colors.text.60) 0%, transparent 100%)",
  backgroundClip: "text",
  WebkitTextFillColor: "transparent",
  userSelect: "none",
});

const rotated = css({
  display: "inline-block",
  transform: "rotate(180deg)",
});

const text = css({
  display: "flex",
  flexDir: "column",
  justifyContent: "center",
  alignItems: "center",
});

export default function NotFound({
  params: { lang },
}: {
  params: { lang: Locale },
}) {
  const translation = use(getDictionary<Dictionary.NotFound>(lang, "not-found"))
  return (
    <div className={main}>
      <div className={text}>
        <h1 className={status}>{translation.errorLabel}</h1>
        <h1 className={code}>
          <span>40</span>
          <span className={rotated}>4</span>
        </h1>
      </div>
      <Link href={prependLocale("/", lang)}>
        <Button secondary pill>
          {translation.homeButton}
        </Button>
      </Link>
    </div>
  );
}
