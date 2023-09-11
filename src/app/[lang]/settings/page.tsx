import { Client } from "@/app/[lang]/settings/client";
import { getDictionary } from "@/utils/dictionary";
import { use } from "react";

export default function Settings({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const translation = use(
    getDictionary<Dictionary.Settings.Index>(lang, "settings/index")
  );
  return <Client translation={translation} />;
}
