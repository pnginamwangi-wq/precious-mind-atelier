import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { LuxButton } from "@/components/luxury/button";
import { useCookieConsent } from "@/lib/cookie-consent";
import { cn } from "@/lib/utils";

/**
 * Cookie consent surface. Renders:
 *   1. A first-visit banner (until the user makes a decision).
 *   2. A settings dialog with per-category toggles, available at any time.
 *
 * The dialog is opened by calling `openSettings()` from the shared hook
 * (e.g. from the footer "Cookie settings" link).
 */
export function CookieNotice() {
  const {
    hasDecided,
    categories,
    isSettingsOpen,
    openSettings,
    closeSettings,
    acceptAll,
    rejectAll,
    savePreferences,
  } = useCookieConsent();

  const [analytics, setAnalytics] = useState(categories.analytics);
  const [marketing, setMarketing] = useState(categories.marketing);

  useEffect(() => {
    if (isSettingsOpen) {
      setAnalytics(categories.analytics);
      setMarketing(categories.marketing);
    }
  }, [isSettingsOpen, categories]);

  const showBanner = hasDecided === false && !isSettingsOpen;

  return (
    <>
      {showBanner && (
        <div
          role="dialog"
          aria-live="polite"
          aria-label="Cookie notice"
          className="fixed inset-x-0 bottom-0 z-[90] border-t border-white/10 bg-obsidian/95 backdrop-blur-md"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-6 md:flex-row md:items-center md:justify-between md:gap-10 md:py-5">
            <div className="max-w-2xl">
              <p className="font-display text-base text-ivory md:text-lg">
                A note on cookies
              </p>
              <p className="mt-2 text-[13px] font-light leading-relaxed text-platinum/75">
                We use strictly necessary cookies to run this site. With your permission we also
                use analytics and marketing cookies to understand how the Academy is used and to
                share relevant offers. You can change your mind at any time from the footer.
                Read our{" "}
                <Link
                  to="/privacy"
                  className="text-gold underline-offset-4 hover:underline"
                  onClick={() => closeSettings()}
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <LuxButton variant="ghost" size="sm" onClick={rejectAll}>
                Reject non-essential
              </LuxButton>
              <LuxButton variant="outline" size="sm" onClick={openSettings}>
                Customise
              </LuxButton>
              <LuxButton variant="gold" size="sm" onClick={acceptAll}>
                Accept all
              </LuxButton>
            </div>
          </div>
        </div>
      )}

      {isSettingsOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-settings-title"
          className="fixed inset-0 z-[100] flex items-end justify-center bg-obsidian/70 p-0 backdrop-blur-sm md:items-center md:p-6"
        >
          <div className="relative w-full max-w-2xl border border-white/10 bg-obsidian shadow-2xl">
            <button
              type="button"
              onClick={closeSettings}
              aria-label="Close cookie settings"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center text-platinum/70 outline-none transition-colors hover:text-gold focus-visible:text-gold focus-visible:ring-1 focus-visible:ring-gold"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="px-6 pb-6 pt-8 md:px-10 md:pb-10 md:pt-10">
              <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-gold">
                Preferences
              </p>
              <h2
                id="cookie-settings-title"
                className="mt-3 font-display text-2xl text-ivory md:text-3xl"
              >
                Cookie settings
              </h2>
              <p className="mt-3 text-[13px] font-light leading-relaxed text-platinum/75">
                Choose which categories of cookies you allow. Strictly necessary cookies keep
                the site working and cannot be turned off.
              </p>

              <div className="mt-8 divide-y divide-white/5 border-y border-white/5">
                <CookieRow
                  title="Strictly necessary"
                  description="Required for authentication, security, and remembering your consent choices. Always on."
                  enabled
                  disabled
                />
                <CookieRow
                  title="Analytics"
                  description="Aggregated usage data that helps us understand which lessons and pages are most valuable."
                  enabled={analytics}
                  onChange={setAnalytics}
                />
                <CookieRow
                  title="Marketing"
                  description="Used to tailor Academy communications and measure the reach of our campaigns."
                  enabled={marketing}
                  onChange={setMarketing}
                />
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-end gap-3">
                <LuxButton variant="ghost" size="sm" onClick={rejectAll}>
                  Reject non-essential
                </LuxButton>
                <LuxButton
                  variant="outline"
                  size="sm"
                  onClick={() => savePreferences({ analytics, marketing })}
                >
                  Save preferences
                </LuxButton>
                <LuxButton variant="gold" size="sm" onClick={acceptAll}>
                  Accept all
                </LuxButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function CookieRow({
  title,
  description,
  enabled,
  disabled,
  onChange,
}: {
  title: string;
  description: string;
  enabled: boolean;
  disabled?: boolean;
  onChange?: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-6 py-5">
      <div className="max-w-lg">
        <p className="font-display text-base text-ivory">{title}</p>
        <p className="mt-1.5 text-[12.5px] font-light leading-relaxed text-platinum/70">
          {description}
        </p>
      </div>
      <Switch
        checked={enabled}
        disabled={disabled}
        onCheckedChange={(v) => onChange?.(Boolean(v))}
        aria-label={`${title} cookies`}
        className={cn(disabled && "opacity-70")}
      />
    </div>
  );
}

/**
 * Small text button suitable for the footer. Opens the cookie settings dialog.
 */
export function CookieSettingsLink({ className }: { className?: string }) {
  const { openSettings } = useCookieConsent();
  return (
    <button
      type="button"
      onClick={openSettings}
      className={cn(
        "rounded-sm text-[13px] font-light text-platinum/70 outline-none transition-colors hover:text-ivory focus-visible:text-ivory focus-visible:ring-1 focus-visible:ring-gold focus-visible:ring-offset-4 focus-visible:ring-offset-obsidian",
        className,
      )}
    >
      Cookie settings
    </button>
  );
}
