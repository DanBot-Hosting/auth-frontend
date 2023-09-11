import { Client } from "@/app/[lang]/settings/interface/client";
import { getDictionary } from "@/utils/dictionary";
import { use } from "react";

export default function Interface({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const translation = use(
    getDictionary<Dictionary.Settings.Interface>(lang, "settings/interface")
  );
  return <Client translation={translation} locale={lang} />;
}
