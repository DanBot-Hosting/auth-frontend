import { Client } from "@/app/[lang]/settings/interface/client";
import { translate } from "@/utils/dictionary";

export default function Interface({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const translation = translate("settings/interface", lang);
  return <Client translation={translation} locale={lang} />;
}
