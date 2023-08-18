import { css } from "@styles/css";
import Image, { ImageProps } from "next/image";

const avatar = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexShrink: "0",

  borderRadius: "50%",
  border: "1px solid token(colors.text.50)",
});

export function Avatar({ alt, ...props }: ImageProps) {
  return <Image alt={alt} className={avatar} {...props} />;
}
