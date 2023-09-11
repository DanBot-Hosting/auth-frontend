import { Client } from "@/app/[lang]/settings/client";
import { translate } from "@/utils/dictionary";

export default function Settings({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const translation = translate("settings/index", lang);
  return <Client translation={translation} />;
}
