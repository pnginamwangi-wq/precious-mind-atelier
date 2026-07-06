import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type ConsentCategories = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

export type ConsentRecord = {
  categories: ConsentCategories;
  updatedAt: string;
  version: number;
};

const STORAGE_KEY = "pia.cookie-consent.v1";
const CONSENT_VERSION = 1;

const DEFAULT_CATEGORIES: ConsentCategories = {
  necessary: true,
  analytics: false,
  marketing: false,
};

type CookieConsentContextValue = {
  hasDecided: boolean;
  categories: ConsentCategories;
  isSettingsOpen: boolean;
  openSettings: () => void;
  closeSettings: () => void;
  acceptAll: () => void;
  rejectAll: () => void;
  savePreferences: (next: Partial<Omit<ConsentCategories, "necessary">>) => void;
};

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

function readStored(): ConsentRecord | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentRecord;
    if (parsed.version !== CONSENT_VERSION) return null;
    return {
      ...parsed,
      categories: { ...DEFAULT_CATEGORIES, ...parsed.categories, necessary: true },
    };
  } catch {
    return null;
  }
}

function writeStored(record: ConsentRecord) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
  } catch {
    // ignore quota / disabled storage
  }
}

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [record, setRecord] = useState<ConsentRecord | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [isSettingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    setRecord(readStored());
    setHydrated(true);
  }, []);

  const persist = useCallback((categories: ConsentCategories) => {
    const next: ConsentRecord = {
      categories,
      updatedAt: new Date().toISOString(),
      version: CONSENT_VERSION,
    };
    setRecord(next);
    writeStored(next);
  }, []);

  const acceptAll = useCallback(() => {
    persist({ necessary: true, analytics: true, marketing: true });
    setSettingsOpen(false);
  }, [persist]);

  const rejectAll = useCallback(() => {
    persist({ necessary: true, analytics: false, marketing: false });
    setSettingsOpen(false);
  }, [persist]);

  const savePreferences = useCallback(
    (next: Partial<Omit<ConsentCategories, "necessary">>) => {
      const base = record?.categories ?? DEFAULT_CATEGORIES;
      persist({
        necessary: true,
        analytics: next.analytics ?? base.analytics,
        marketing: next.marketing ?? base.marketing,
      });
      setSettingsOpen(false);
    },
    [persist, record],
  );

  const value = useMemo<CookieConsentContextValue>(
    () => ({
      hasDecided: hydrated && record !== null,
      categories: record?.categories ?? DEFAULT_CATEGORIES,
      isSettingsOpen,
      openSettings: () => setSettingsOpen(true),
      closeSettings: () => setSettingsOpen(false),
      acceptAll,
      rejectAll,
      savePreferences,
    }),
    [hydrated, record, isSettingsOpen, acceptAll, rejectAll, savePreferences],
  );

  return (
    <CookieConsentContext.Provider value={value}>{children}</CookieConsentContext.Provider>
  );
}

export function useCookieConsent(): CookieConsentContextValue {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) {
    throw new Error("useCookieConsent must be used within CookieConsentProvider");
  }
  return ctx;
}
