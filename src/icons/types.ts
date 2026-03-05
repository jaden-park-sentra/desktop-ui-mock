import type { SVGProps } from "react";

export type IconProps = SVGProps<SVGSVGElement>;

export type IconSize = "xs" | "sm" | "md" | "lg" | "xl";

export const iconSizes: Record<IconSize, number> = {
  xs: 10,
  sm: 12,
  md: 15,
  lg: 16,
  xl: 20,
};

export type IconVariant = "outline" | "filled";
