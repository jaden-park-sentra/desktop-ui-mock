import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AppSidebar from "./app-sidebar";

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
  "/integrations": "Integrations",
  "/settings": "Settings",
};

const MEETING_DETAIL_PATHS = ["/meeting-detail", "/meeting-detail-transcript", "/meeting-detail-video"];
const BREADCRUMB_PATHS: Record<string, { parent: string; parentPath: string }> = {
  "/meeting-notes": { parent: "Home", parentPath: "/home" },
  "/deep-research": { parent: "Home", parentPath: "/home" },
  "/commitments": { parent: "Home", parentPath: "/home" },
  "/weekly-reports": { parent: "Home", parentPath: "/home" },
  "/connections": { parent: "Home", parentPath: "/home" },
  "/integrations": { parent: "Home", parentPath: "/home" },
  "/settings": { parent: "Home", parentPath: "/home" },
};

const TopBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const label = ROUTE_LABELS[location.pathname] ?? "";
  const isMeetingDetail = MEETING_DETAIL_PATHS.includes(location.pathname);
  const breadcrumb = BREADCRUMB_PATHS[location.pathname];

  return (
    <div className="items-center flex justify-between left-5 right-5 absolute top-3">
      <div className="items-center flex gap-1.5">
        {isMeetingDetail ? (
          <button
            type="button"
            onClick={() => navigate("/meeting-notes")}
            className="bg-transparent border-none text-[var(--fg-muted)] cursor-pointer font-[Geist,system-ui,sans-serif] text-xs font-medium leading-4 p-0"
          >
            Meetings
          </button>
        ) : breadcrumb ? (
          <>
            <button
              type="button"
              onClick={() => navigate(breadcrumb.parentPath)}
              className="bg-transparent border-none text-[var(--fg-muted)] cursor-pointer font-[Geist,system-ui,sans-serif] text-xs font-medium leading-4 p-0"
            >
              {breadcrumb.parent}
            </button>
            <svg width="12" height="12" viewBox="0 0 15 15" fill="none" stroke="var(--fg-disabled)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5.5 3.5L9.5 7.5L5.5 11.5" />
            </svg>
            <span className="text-[var(--fg-muted)] font-[Geist,system-ui,sans-serif] text-xs font-medium leading-4">
              {label}
            </span>
          </>
        ) : (
          <span className="text-[var(--fg-base)] font-[Geist,system-ui,sans-serif] text-xs font-medium leading-4">
            {label}
          </span>
        )}
      </div>
      <div id="topbar-actions" />
    </div>
  );
};

const AppLayout = () => {
  return (
    <div className="flex h-screen bg-shell overflow-hidden pt-5">
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
  );
};

export default AppLayout;
