import { css, cx } from "@styles/css";
import Image from "next/image";
import { GearFine } from "@/utils/icons";

/**
 * A configurable Avatar component with additional optimization by next/image.
 *
 * @param {AvatarProps} props - The props for the avatar component.
 * @param {CSSObject} [props.css={}] - Custom CSS styles to be applied to the component.
 * @param {string} props.alt - The alt text for the image.
 * @param {boolean} [props.configurable] - Whether the avatar is configurable (hoverable).
 * @param {number} props.size - The size of the avatar.
 * @param {AvatarProps} props... - Additional props for the avatar component.
 * @returns {JSX.Element} The rendered avatar component.
 */
export function Avatar({
  alt,
  configurable,
  size,
  css: cssProp = {},
  ...props
}: AvatarProps) {
  const avatar = css(
    {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexShrink: "0",
      width: "max-content",
      overflow: "hidden",
      aspectRatio: "1",

      borderRadius: "50%",
      border: "1px solid token(colors.text.50)",
    },
    cssProp
  );

  const overlay = css({
    position: "relative",
    cursor: "pointer",
    transition: "border .3s ease-in-out",

    _hover: {
      border: "1px solid token(colors.text.20)",
      transition: "border .3s ease-in-out",

      _after: {
        // Not using tokens because they're not constant for black color
        bg: "hsla(0, 0%, 0%, 0.65)",
        transition: "background .3s ease-in-out",
      },
    },

    _after: {
      content: '""',
      position: "absolute",
      top: "0",
      left: "0",
      height: "100%",
      width: "100%",
      transition: "background .3s ease-in-out",
    },
  });

  const gear = css({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: "1",
    transition: "color .3s ease-in-out",
    color: "transparent",

    _groupHover: {
      color: "hsla(0, 0%, 98%, 0.8)",
      transition: "color .20s ease-in-out",
    },
  });

  return (
    <div className={cx(avatar, configurable ? overlay : null, "group")}>
      <Image alt={alt} width={size} height={size} {...props} />
      {configurable ? (
        <GearFine className={gear} size={size / 2.5} weight="fill" />
      ) : null}
    </div>
  );
}
