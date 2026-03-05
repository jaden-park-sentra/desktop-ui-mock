import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type Theme = "light" | "dark" | "system";

export type ResolvedTheme = "light" | "dark";

export type FontFamily = "geist" | "inter";

export interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: ResolvedTheme;
  grayscale: boolean;
  setGrayscale: (on: boolean) => void;
  fontFamily: FontFamily;
  setFontFamily: (f: FontFamily) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getSystemTheme(): ResolvedTheme {
  if (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark";
  }
  return "light";
}

function getStoredTheme(storageKey: string): Theme | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(storageKey);
    if (stored === "light" || stored === "dark" || stored === "system") {
      return stored;
    }
    return null;
  } catch {
    return null;
  }
}

function getStoredGrayscale(storageKey: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    const stored = localStorage.getItem(storageKey);
    if (stored === "true") return true;
    return false;
  } catch {
    return false;
  }
}

function getStoredFont(storageKey: string): FontFamily {
  if (typeof window === "undefined") return "geist";
  try {
    const stored = localStorage.getItem(storageKey);
    if (stored === "inter") return "inter";
    return "geist";
  } catch {
    return "geist";
  }
}

function resolveTheme(theme: Theme): ResolvedTheme {
  if (theme === "system") {
    return getSystemTheme();
  }
  return theme;
}

export interface ThemeProviderProps {
  defaultTheme?: Theme;
  storageKey?: string;
  grayscaleStorageKey?: string;
  fontStorageKey?: string;
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  defaultTheme = "system",
  storageKey = "sentra-theme",
  grayscaleStorageKey = "sentra-grayscale",
  fontStorageKey = "sentra-font",
  children,
}) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    const stored = getStoredTheme(storageKey);
    return stored ?? defaultTheme;
  });

  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() =>
    resolveTheme(theme)
  );

  const [grayscale, setGrayscaleState] = useState<boolean>(() =>
    getStoredGrayscale(grayscaleStorageKey)
  );

  const [fontFamily, setFontFamilyState] = useState<FontFamily>(() =>
    getStoredFont(fontStorageKey)
  );

  const setTheme = useCallback(
    (newTheme: Theme) => {
      setThemeState(newTheme);
      try {
        localStorage.setItem(storageKey, newTheme);
      } catch {
        // ignore
      }
    },
    [storageKey]
  );

  const setGrayscale = useCallback(
    (on: boolean) => {
      setGrayscaleState(on);
      try {
        localStorage.setItem(grayscaleStorageKey, String(on));
      } catch {
        // ignore
      }
    },
    [grayscaleStorageKey]
  );

  const setFontFamily = useCallback(
    (f: FontFamily) => {
      setFontFamilyState(f);
      try {
        localStorage.setItem(fontStorageKey, f);
      } catch {
        // ignore
      }
    },
    [fontStorageKey]
  );

  useEffect(() => {
    const resolved = resolveTheme(theme);
    setResolvedTheme(resolved);
    document.documentElement.setAttribute("data-theme", resolved);
    // Clear any previously stored sage accent
    document.documentElement.removeAttribute("data-accent");
  }, [theme]);

  useEffect(() => {
    if (grayscale) {
      document.documentElement.setAttribute("data-grayscale", "");
    } else {
      document.documentElement.removeAttribute("data-grayscale");
    }
  }, [grayscale]);

  useEffect(() => {
    if (fontFamily === "inter") {
      document.documentElement.setAttribute("data-font", "inter");
    } else {
      document.documentElement.removeAttribute("data-font");
    }
  }, [fontFamily]);

  useEffect(() => {
    if (theme !== "system") return;

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      const resolved = getSystemTheme();
      setResolvedTheme(resolved);
      document.documentElement.setAttribute("data-theme", resolved);
    };

    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, [theme]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme,
      resolvedTheme,
      grayscale,
      setGrayscale,
      fontFamily,
      setFontFamily,
    }),
    [theme, setTheme, resolvedTheme, grayscale, setGrayscale, fontFamily, setFontFamily]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
