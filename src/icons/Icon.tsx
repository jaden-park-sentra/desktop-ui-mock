import type { IconProps, IconSize, IconVariant } from "./types";
import { iconSizes } from "./types";
import { outlineIcons, filledIcons } from "./registry";

export interface IconComponentProps extends IconProps {
  name: string;
  variant?: IconVariant;
  size?: IconSize | number;
}

export function Icon({
  name,
  variant = "outline",
  size = "md",
  ...rest
}: IconComponentProps) {
  const registry = variant === "filled" ? filledIcons : outlineIcons;
  const Comp = registry[name];

  if (!Comp) {
    return null;
  }

  const px = typeof size === "number" ? size : iconSizes[size];

  return <Comp width={px} height={px} {...rest} />;
}
