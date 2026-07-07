import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

/**
 * Luxury button. Editorial, all caps, wide tracking. Never rounded.
 *
 * When `asChild` is true, the styles and inner icon/label markup are merged
 * into the caller's single child element (typically a Link or `<a>`), so we
 * never emit an invalid `<a><button>` nested pair for navigation actions.
 */
const buttonStyles = cva(
  "group inline-flex items-center justify-center gap-3 whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.28em] transition-all duration-500 cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian disabled:opacity-40 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        gold: "bg-gold text-obsidian hover:bg-champagne",
        outline:
          "border border-gold/40 text-gold hover:bg-gold hover:text-obsidian",
        ghost: "text-ivory hover:text-gold",
      },
      size: {
        md: "px-8 py-4",
        sm: "px-5 py-2 text-[10px] tracking-[0.24em]",
        lg: "px-12 py-5 text-[12px]",
      },
    },
    defaultVariants: { variant: "gold", size: "md" },
  },
);

export function luxButtonClass(
  opts?: VariantProps<typeof buttonStyles> & { className?: string },
) {
  const { className, ...rest } = opts ?? {};
  return cn(buttonStyles(rest), className);
}

type Props = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonStyles> & {
    icon?: ReactNode;
    asChild?: boolean;
  };

export const LuxButton = forwardRef<HTMLButtonElement, Props>(function LuxButton(
  { className, variant, size, icon, children, asChild, ...rest },
  ref,
) {
  const Comp: React.ElementType = asChild ? Slot : "button";
  return (
    <Comp
      ref={ref as never}
      className={cn(buttonStyles({ variant, size }), className)}
      {...rest}
    >
      {icon ? (
        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-current/40 transition-colors group-hover:border-current group-hover:bg-current/10">
          {icon}
        </span>
      ) : null}
      <Slottable>
        {asChild ? (children as ReactNode) : <span>{children}</span>}
      </Slottable>
    </Comp>
  );
});

/**
 * Editorial arrow link, subtle animated underline via right chevron.
 */
export function ArrowLink({
  children,
  href,
  className,
}: {
  children: ReactNode;
  href?: string;
  className?: string;
}) {
  const base =
    "group inline-flex items-center gap-3 rounded-sm text-[11px] font-light uppercase tracking-[0.28em] text-ivory outline-none transition-colors hover:text-gold focus-visible:text-gold focus-visible:ring-1 focus-visible:ring-gold focus-visible:ring-offset-4 focus-visible:ring-offset-obsidian";
  const content = (
    <>
      {children}
      <span
        aria-hidden
        className="inline-block transition-transform duration-500 group-hover:translate-x-1"
      >
        →
      </span>
    </>
  );
  // When no destination is supplied, render as a non-interactive visual
  // indicator instead of a dead `href="#"` anchor.
  if (!href) {
    return (
      <span aria-hidden className={cn(base, "pointer-events-none", className)}>
        {content}
      </span>
    );
  }
  return (
    <a href={href} className={cn(base, className)}>
      {content}
    </a>
  );
}
