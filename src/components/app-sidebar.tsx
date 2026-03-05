import { useState, useCallback } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { TriangleDown, TriangleRight, ChevronDownMini } from "../icons/outline";
import { SunFilled, MoonFilled } from "../icons/filled";
import { outlineIcons, filledIcons } from "../icons/registry";
import { useTheme } from "./ThemeProvider";

type NavIconName =
  | "home"
  | "inbox"
  | "evaluations"
  | "workflows"
  | "calibrations"
  | "reviews"
  | "alerts"
  | "reports"
  | "assignments"
  | "learners"
  | "assessments"
  | "help"
  | "settings";

const navIconKey: Record<NavIconName, string> = {
  home: "home",
  inbox: "inbox",
  evaluations: "file-text",
  workflows: "bolt",
  calibrations: "chat-bubble",
  reviews: "file-search",
  alerts: "bell",
  reports: "chart-bar",
  assignments: "file-check",
  learners: "user",
  assessments: "file-search-alt",
  help: "lifebuoy",
  settings: "cog",
};

interface NavItem {
  id: string;
  label: string;
  path: string;
  icon: NavIconName;
}

interface NavSection {
  id: string;
  label: string;
  defaultCollapsed?: boolean;
  items: NavItem[];
}

const topItems: NavItem[] = [
  { id: "home", label: "Home", path: "/home", icon: "home" },
];

const sections: NavSection[] = [
  {
    id: "workspace",
    label: "Workspace",
    items: [
      { id: "meeting-notes", label: "Meeting Notes", path: "/meeting-notes", icon: "reviews" },
      { id: "deep-research", label: "Deep Research", path: "/deep-research", icon: "workflows" },
      { id: "commitments", label: "Commitments", path: "/commitments", icon: "assignments" },
      { id: "reports", label: "Reports", path: "/weekly-reports", icon: "reports" },
    ],
  },
  {
    id: "manage",
    label: "Manage",
    items: [
      { id: "integrations", label: "Integrations", path: "/integrations", icon: "calibrations" },
      { id: "connections", label: "Connections", path: "/connections", icon: "learners" },
    ],
  },
];

const footerItems: NavItem[] = [
  { id: "settings", label: "Settings", path: "/settings", icon: "settings" },
];

const navItemClass = "flex gap-2 h-7 items-center overflow-hidden pl-1.5 rounded-sm no-underline bg-transparent cursor-pointer text-sm font-medium leading-4 text-subtle-foreground w-full whitespace-nowrap transition-colors duration-150 hover:bg-base-hover";
const navItemActiveClass = "bg-base-pressed text-foreground hover:bg-base-pressed";

const SidebarNavItem = ({ item }: { item: NavItem }) => {
  const location = useLocation();
  const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + "/");
  const key = navIconKey[item.icon];
  const registry = isActive ? filledIcons : outlineIcons;
  const IconComp = registry[key] ?? outlineIcons[key];

  return (
    <NavLink
      to={item.path}
      className={`${navItemClass} ${isActive ? navItemActiveClass : ""}`}
      aria-current={isActive ? "page" : undefined}
    >
      <span className="w-4 h-4 shrink-0 flex items-center justify-center">
        {IconComp && <IconComp width={16} height={16} />}
      </span>
      {item.label}
    </NavLink>
  );
};

const SidebarSection = ({ section }: { section: NavSection }) => {
  const [isCollapsed, setIsCollapsed] = useState(section.defaultCollapsed ?? false);

  const toggleCollapsed = useCallback(() => {
    setIsCollapsed((previous) => !previous);
  }, []);

  return (
    <div className="flex flex-col gap-px px-3">
      <button
        type="button"
        className="flex gap-1 h-7 items-center p-1 rounded-md border-0 bg-transparent cursor-pointer text-sm font-medium leading-4 text-muted-foreground w-full text-left transition-colors duration-150 hover:text-subtle-foreground"
        aria-expanded={!isCollapsed}
        onClick={toggleCollapsed}
      >
        {section.label}
        <span className="w-3 h-3 shrink-0 flex items-center justify-center">
          {isCollapsed ? <TriangleRight width={6} height={6} /> : <TriangleDown width={6} height={6} />}
        </span>
      </button>
      {!isCollapsed && section.items.map((navItem) => (
        <SidebarNavItem key={navItem.id} item={navItem} />
      ))}
    </div>
  );
};

interface FooterBtnProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}

const FooterBtn = ({ icon, label, active, onClick }: FooterBtnProps) => (
  <button
    type="button"
    className={`flex items-center gap-2 w-full h-7 pl-1.5 border-0 rounded-sm bg-transparent cursor-pointer text-sm font-medium leading-4 text-subtle-foreground transition-colors duration-100 hover:bg-base-hover ${active ? "bg-info-subtle text-info hover:bg-info-subtle" : ""}`}
    onClick={onClick}
  >
    <span className="w-4 h-4 flex items-center justify-center shrink-0">{icon}</span>
    {label}
  </button>
);

const SidebarFooterToggles = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <FooterBtn
      icon={isDark ? <MoonFilled width={14} height={14} /> : <SunFilled width={14} height={14} />}
      label={isDark ? "Light Mode" : "Dark Mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    />
  );
};

const AppSidebar = () => {
  return (
    <aside className="w-56 shrink-0 flex flex-col h-full select-none bg-shell" role="navigation">
      <div className="flex items-center justify-between px-3 pt-3 pb-1">
        <button type="button" className="flex flex-1 gap-2 h-7 min-h-7 items-center pr-2 pl-1 rounded-md border-0 bg-transparent cursor-pointer transition-colors duration-150 hover:bg-hover-overlay">
          <span className="w-[18px] h-[18px] shrink-0 rounded-sm overflow-hidden bg-background p-px shadow-border-base">
            <img src="/sentra.png" alt="Sentra" className="w-full h-full rounded object-cover" />
          </span>
          <span className="flex gap-1 items-center shrink-0">
            <span className="text-sm font-medium leading-4 text-subtle-foreground">Sentra</span>
            <span className="w-3 h-3 shrink-0 flex items-center justify-center">
              <ChevronDownMini width={12} height={12} />
            </span>
          </span>
        </button>
      </div>

      <div className="flex flex-col gap-3.5 py-1.5">
        <div className="flex flex-col gap-px px-3">
          {topItems.map((navItem) => (
            <SidebarNavItem key={navItem.id} item={navItem} />
          ))}
        </div>
        {sections.map((section) => (
          <SidebarSection key={section.id} section={section} />
        ))}
      </div>

      <div className="flex flex-col flex-1 gap-px justify-end p-3">
        <button
          type="button"
          className={`${navItemClass} mb-1`}
          onClick={() => window.ipcRenderer?.send("open-sage-window")}
        >
          <span className="w-4 h-4 shrink-0 flex items-center justify-center">
            {(() => { const Ico = outlineIcons["bolt"]; return Ico ? <Ico width={16} height={16} /> : null; })()}
          </span>
          Sage Demo
        </button>
        <SidebarFooterToggles />
        {footerItems.map((navItem) => (
          <SidebarNavItem key={navItem.id} item={navItem} />
        ))}
      </div>
    </aside>
  );
};

export default AppSidebar;
