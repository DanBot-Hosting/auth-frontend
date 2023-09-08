interface AvatarProps
  extends Omit<import("next/image").ImageProps, "width" | "height">,
    GlobalComponent {
  configurable?: boolean;
  size: number;
}
