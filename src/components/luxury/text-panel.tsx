import type { ElementType, ReactNode, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/**
 * TextPanel
 *
 * Shared dark reading surface for long copy that sits over cinematic
 * media. Guarantees WCAG AA even against the busiest posters: opaque
 * warm-black background, 16px backdrop blur, gold hairline border,
 * soft drop shadow. Constrained to a 620px reading measure by default.
 *
 * Use whenever the shared scrim gradients cannot fully quiet the
 * underlying image, or wherever a heading + body + CTA cluster needs
 * to survive the poster fallback, video motion, and reduced-motion
 * simultaneously.
 */

type Padding = "sm" | "md" | "lg";

const PADDING: Record<Padding, string> = {
  sm: "p-5 md:p-6",
  md: "p-6 md:p-8",
  lg: "p-8 md:p-10",
};

export interface TextPanelProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  padding?: Padding;
  children: ReactNode;
}

export function TextPanel({
  as,
  padding = "md",
  className,
  children,
  ...rest
}: TextPanelProps) {
  const Tag = (as ?? "div") as ElementType;
  return (
    <Tag
      className={cn(
        // Panel surface: matches scrim-panel utility spec exactly so
        // gradient-only and panel-only sections read as one system.
        "relative max-w-[620px] rounded-sm",
        "bg-[rgba(9,8,6,0.88)] backdrop-blur-[16px]",
        "border border-[rgba(242,216,137,0.24)]",
        "shadow-[0_20px_60px_rgba(0,0,0,0.5)]",
        PADDING[padding],
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
