interface AvatarProps extends Omit<import("next/image").ImageProps, "width" | "height"> {
  configurable?: boolean;
  size: number;
}