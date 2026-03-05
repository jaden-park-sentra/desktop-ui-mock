import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AppSidebar from "./app-sidebar";

interface BreadcrumbSegment {
  label: string;
  path: string;
}

interface BreadcrumbContextValue {
  pageLabel: string | null;
  setPageLabel: (label: string | null) => void;
}

const BreadcrumbContext = createContext<BreadcrumbContextValue>({
  pageLabel: null,
  setPageLabel: () => {},
});

export const usePageLabel = (label: string) => {
  const { setPageLabel } = useContext(BreadcrumbContext);
  useEffect(() => {
    setPageLabel(label);
    return () => setPageLabel(null);
  }, [label, setPageLabel]);
};

const ROUTE_LABELS: Record<string, string> = {
  "/home": "Home",
  "/meeting-notes": "Meetings",
  "/meeting-detail": "Meetings",
  "/meeting-detail-transcript": "Meetings",
  "/meeting-detail-video": "Meetings",
  "/deep-research": "Deep Research",
  "/commitments": "Commitments",
  "/weekly-reports": "Reports",
  "/connections": "Connections",
  "/connection-detail": "Connections",
  "/integrations": "Integrations",
  "/settings": "Settings",
};

const BREADCRUMB_TRAILS: Record<string, BreadcrumbSegment[]> = {
  "/meeting-notes": [{ label: "Home", path: "/home" }],
  "/meeting-detail": [{ label: "Home", path: "/home" }],
  "/meeting-detail-transcript": [{ label: "Home", path: "/home" }],
  "/meeting-detail-video": [{ label: "Home", path: "/home" }],
  "/deep-research": [{ label: "Home", path: "/home" }],
  "/commitments": [{ label: "Home", path: "/home" }],
  "/weekly-reports": [{ label: "Home", path: "/home" }],
  "/connections": [{ label: "Home", path: "/home" }],
  "/connection-detail": [
    { label: "Home", path: "/home" },
    { label: "Connections", path: "/connections" },
  ],
  "/integrations": [{ label: "Home", path: "/home" }],
  "/settings": [{ label: "Home", path: "/home" }],
};

const ChevronSeparator = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 15 15"
    fill="none"
    stroke="var(--fg-disabled)"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5.5 3.5L9.5 7.5L5.5 11.5" />
  </svg>
);

const TopBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pageLabel } = useContext(BreadcrumbContext);

  const trail = BREADCRUMB_TRAILS[location.pathname];
  const currentLabel =
    pageLabel ?? ROUTE_LABELS[location.pathname] ?? "";

  return (
    <div className="items-center flex left-5 absolute top-3 z-10">
      <div className="items-center flex gap-1.5">
        {trail ? (
          <>
            {trail.map((segment, index) => (
              <span key={segment.path} className="items-center flex gap-1.5">
                {index > 0 && <ChevronSeparator />}
                <button
                  type="button"
                  onClick={() => navigate(segment.path)}
                  className="bg-transparent border-none text-[var(--fg-muted)] cursor-pointer font-[Geist,system-ui,sans-serif] text-xs font-medium leading-4 p-0"
                >
                  {segment.label}
                </button>
              </span>
            ))}
            <ChevronSeparator />
            <span className="text-[var(--fg-muted)] font-[Geist,system-ui,sans-serif] text-xs font-medium leading-4">
              {currentLabel}
            </span>
          </>
        ) : (
          <span className="text-[var(--fg-base)] font-[Geist,system-ui,sans-serif] text-xs font-medium leading-4">
            {currentLabel}
          </span>
        )}
      </div>
    </div>
  );
};

const AppLayout = () => {
  const [pageLabel, setPageLabel] = useState<string | null>(null);
  const stableSetPageLabel = useCallback(
    (label: string | null) => setPageLabel(label),
    [],
  );

  return (
    <BreadcrumbContext.Provider
      value={{ pageLabel, setPageLabel: stableSetPageLabel }}
    >
      <div className="flex h-screen bg-shell overflow-hidden pt-5 relative">
        <div className="drag absolute top-0 left-0 right-0 h-5" />
        <AppSidebar />
        <div className="flex-1 flex p-2 min-w-0 overflow-hidden">
          <main className="flex-1 bg-background rounded-lg shadow-[var(--shadow-card)] min-h-0 min-w-0 overflow-hidden relative">
            <TopBar />
            <div className="h-full overflow-x-hidden overflow-y-auto">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </BreadcrumbContext.Provider>
  );
};

export default AppLayout;
