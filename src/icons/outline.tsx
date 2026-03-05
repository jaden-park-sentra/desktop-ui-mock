import type { IconProps } from "./types";

const s24: IconProps = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

const s15: IconProps = {
  width: 15,
  height: 15,
  viewBox: "0 0 15 15",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

const s16: IconProps = {
  width: 16,
  height: 16,
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

const s20: IconProps = {
  width: 20,
  height: 20,
  viewBox: "0 0 20 20",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

const s14: IconProps = {
  width: 14,
  height: 14,
  viewBox: "0 0 14 14",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

const s12: IconProps = {
  width: 12,
  height: 12,
  viewBox: "0 0 12 12",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

const s16t: IconProps = {
  width: 16,
  height: 16,
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

const s10: IconProps = {
  width: 10,
  height: 10,
  viewBox: "0 0 10 10",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

/* ═══════════════════════════════════════════
   Navigation icons (SidebarNav)
   ═══════════════════════════════════════════ */

export function Home(p: IconProps) {
  return (
    <svg {...s24} {...p}>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <path d="M9 22V12h6v10" />
    </svg>
  );
}

export function Inbox(p: IconProps) {
  return (
    <svg {...s24} {...p}>
      <path d="M22 12h-6l-2 3h-3l-2-3H2" />
      <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    </svg>
  );
}

export function FileText(p: IconProps) {
  return (
    <svg {...s24} {...p}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M16 13H8M16 17H8M10 9H8" />
    </svg>
  );
}

export function Bolt(p: IconProps) {
  return (
    <svg {...s24} {...p}>
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

export function ChatBubble(p: IconProps) {
  return (
    <svg {...s24} {...p}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

export function FileSearch(p: IconProps) {
  return (
    <svg {...s24} {...p}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <circle cx="12" cy="14" r="2" />
      <path d="M16 10l-4 4" />
    </svg>
  );
}

export function Bell(p: IconProps) {
  return (
    <svg {...s24} {...p}>
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

export function ChartBar(p: IconProps) {
  return (
    <svg {...s24} {...p}>
      <path d="M18 20V10M12 20V4M6 20v-6" />
    </svg>
  );
}

export function FileCheck(p: IconProps) {
  return (
    <svg {...s24} {...p}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6M9 15l2 2 4-4" />
    </svg>
  );
}

export function User(p: IconProps) {
  return (
    <svg {...s24} {...p}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

export function FileSearchAlt(p: IconProps) {
  return (
    <svg {...s24} {...p}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <circle cx="11" cy="11" r="2" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

export function Lifebuoy(p: IconProps) {
  return (
    <svg {...s24} {...p}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <path d="M4.93 4.93l4.24 4.24M14.83 14.83l4.24 4.24M14.83 9.17l4.24-4.24M9.17 14.83l-4.24 4.24" />
    </svg>
  );
}

export function Cog(p: IconProps) {
  return (
    <svg {...s24} {...p}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

/* ═══════════════════════════════════════════
   Settings sidebar icons
   ═══════════════════════════════════════════ */

export function Workspace(p: IconProps) {
  return (
    <svg {...s24} {...p}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  );
}

export function Users(p: IconProps) {
  return (
    <svg {...s24} {...p}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

export function Groups(p: IconProps) {
  return (
    <svg {...s24} {...p}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      <circle cx="17" cy="7" r="2" />
    </svg>
  );
}

export function AuditLog(p: IconProps) {
  return (
    <svg {...s24} {...p}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6M16 13H8m8 4H8m-4-4h.01M8 9h.01" />
    </svg>
  );
}

export function Microphone(p: IconProps) {
  return (
    <svg {...s24} {...p}>
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" />
    </svg>
  );
}

export function Flag(p: IconProps) {
  return (
    <svg {...s24} {...p}>
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <path d="M4 22V15" />
    </svg>
  );
}

export function ClipboardCheck(p: IconProps) {
  return (
    <svg {...s24} {...p}>
      <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m-6 9l2 2 4-4" />
    </svg>
  );
}

export function CheckSquare(p: IconProps) {
  return (
    <svg {...s24} {...p}>
      <path d="M9 11l3 3L22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  );
}

export function Building(p: IconProps) {
  return (
    <svg {...s24} {...p}>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <path d="M9 22V12h6v10" />
    </svg>
  );
}

export function UserCircle(p: IconProps) {
  return (
    <svg {...s24} {...p}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

/* ═══════════════════════════════════════════
   Utility icons — directional
   ═══════════════════════════════════════════ */

export function ChevronDown(p: IconProps) {
  return (
    <svg {...s16} {...p}>
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
}

export function ChevronUp(p: IconProps) {
  return (
    <svg {...s16} {...p}>
      <path d="M12 10L8 6l-4 4" />
    </svg>
  );
}

export function ChevronLeft(p: IconProps) {
  return (
    <svg {...s16} {...p}>
      <path d="M10 12L6 8l4-4" />
    </svg>
  );
}

export function ChevronRight(p: IconProps) {
  return (
    <svg {...s16} {...p}>
      <path d="M6 4l4 4-4 4" />
    </svg>
  );
}

export function ChevronDownMini(p: IconProps) {
  return (
    <svg width={8} height={8} viewBox="0 0 8 8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M2 3l2 2 2-2" />
    </svg>
  );
}

export function ArrowLeft(p: IconProps) {
  return (
    <svg {...s24} {...p}>
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  );
}

export function ArrowUp(p: IconProps) {
  return (
    <svg {...s14} {...p}>
      <path d="M7 11V3M7 3L3 7M7 3L11 7" />
    </svg>
  );
}

export function ArrowDown(p: IconProps) {
  return (
    <svg {...s16} {...p}>
      <path d="M4 6 8 10 12 6" />
    </svg>
  );
}

/* ═══════════════════════════════════════════
   Utility icons — actions
   ═══════════════════════════════════════════ */

export function XMark(p: IconProps) {
  return (
    <svg {...s15} strokeWidth={1.25} {...p}>
      <path d="M4.5 4.5L10.5 10.5M10.5 4.5L4.5 10.5" />
    </svg>
  );
}

export function Check(p: IconProps) {
  return (
    <svg {...s15} {...p}>
      <path d="M11.5 4.5L6 10.5L3.5 8" />
    </svg>
  );
}

export function CheckMini(p: IconProps) {
  return (
    <svg {...s12} strokeWidth="1.5" {...p}>
      <path d="M2.5 6 5 8.5 9.5 4" />
    </svg>
  );
}

export function Plus(p: IconProps) {
  return (
    <svg {...s14} strokeLinejoin={undefined} {...p}>
      <path d="M7 2v10M2 7h10" />
    </svg>
  );
}

export function Minus(p: IconProps) {
  return (
    <svg {...s12} strokeWidth="1.5" {...p}>
      <path d="M2.5 6h7" />
    </svg>
  );
}

export function Pencil(p: IconProps) {
  return (
    <svg {...s16t} {...p}>
      <path d="M5.5 13.5 2.5 13.5 2.5 10.5 10 3 13 6 5.5 13.5Z" />
      <path d="M8.5 4.5 11.5 7.5" />
    </svg>
  );
}

export function Trash(p: IconProps) {
  return (
    <svg {...s16t} {...p}>
      <path d="M3 4.5H13" />
      <path d="M6.5 7V11" />
      <path d="M9.5 7V11" />
      <path d="M4 4.5L4.5 13A1 1 0 0 0 5.5 14H10.5A1 1 0 0 0 11.5 13L12 4.5" />
      <path d="M6 4.5V2.5A0.5 0.5 0 0 1 6.5 2H9.5A0.5 0.5 0 0 1 10 2.5V4.5" />
    </svg>
  );
}

export function Clipboard(p: IconProps) {
  return (
    <svg {...s16t} {...p}>
      <rect x="5.5" y="5.5" width="8" height="8" rx="1" />
      <path d="M10.5 5.5V3.5A1 1 0 0 0 9.5 2.5H3.5A1 1 0 0 0 2.5 3.5V9.5A1 1 0 0 0 3.5 10.5H5.5" />
    </svg>
  );
}

export function MagnifyingGlass(p: IconProps) {
  return (
    <svg {...s16} {...p}>
      <circle cx="7" cy="7" r="4.5" />
      <path d="M10.5 10.5L14 14" />
    </svg>
  );
}

export function Link(p: IconProps) {
  return (
    <svg {...s16t} {...p}>
      <path d="M6.5 8.5a3 3 0 0 0 4.24.36l2-2a3 3 0 0 0-4.24-4.24L7.38 3.74" />
      <path d="M9.5 7.5a3 3 0 0 0-4.24-.36l-2 2a3 3 0 0 0 4.24 4.24l1.12-1.12" />
    </svg>
  );
}

export function Expand(p: IconProps) {
  return (
    <svg {...s15} strokeWidth={1.25} {...p}>
      <path d="M2.5 5V2.5H5" />
      <path d="M10 2.5H12.5V5" />
      <path d="M12.5 10V12.5H10" />
      <path d="M5 12.5H2.5V10" />
    </svg>
  );
}

export function Filter(p: IconProps) {
  return (
    <svg {...s24} {...p}>
      <path d="M4 6h16M6 12h12M8 18h8" />
    </svg>
  );
}

export function DragHandle(p: IconProps) {
  return (
    <svg width={15} height={15} viewBox="0 0 15 15" fill="currentColor" {...p}>
      <circle cx="5" cy="3.5" r="1" opacity="0.5" />
      <circle cx="10" cy="3.5" r="1" opacity="0.5" />
      <circle cx="5" cy="7.5" r="1" opacity="0.65" />
      <circle cx="10" cy="7.5" r="1" opacity="0.4" />
      <circle cx="5" cy="11.5" r="1" opacity="0.4" />
      <circle cx="10" cy="11.5" r="1" opacity="0.15" />
    </svg>
  );
}

/* ═══════════════════════════════════════════
   Status icons (outline)
   ═══════════════════════════════════════════ */

export function InfoCircle(p: IconProps) {
  return (
    <svg {...s20} {...p}>
      <path d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
      <path d="M10 6v4M10 14h.01" />
    </svg>
  );
}

export function CheckCircle(p: IconProps) {
  return (
    <svg {...s20} {...p}>
      <path d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
      <path d="M6 10l3 3 5-6" />
    </svg>
  );
}

export function WarningTriangle(p: IconProps) {
  return (
    <svg {...s20} {...p}>
      <path d="M8.26 3.05 1.5 15a2 2 0 0 0 1.74 3h12.52a2 2 0 0 0 1.74-3L11.74 3.05a2 2 0 0 0-3.48 0Z" />
      <path d="M10 7v4M10 13h.01" />
    </svg>
  );
}

export function ErrorCircle(p: IconProps) {
  return (
    <svg {...s20} {...p}>
      <path d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
      <path d="M8 8l4 4m0-4-4 4" />
    </svg>
  );
}

/* ═══════════════════════════════════════════
   Product / domain icons
   ═══════════════════════════════════════════ */

export function Calendar(p: IconProps) {
  return (
    <svg {...s15} strokeWidth={1} {...p}>
      <path d="M4.5 1.5V3.5M10.5 1.5V3.5M1.5 5.5H13.5M2.5 2.5H12.5C13.0523 2.5 13.5 2.94772 13.5 3.5V12.5C13.5 13.0523 13.0523 13.5 12.5 13.5H2.5C1.94772 13.5 1.5 13.0523 1.5 12.5V3.5C1.5 2.94772 1.94772 2.5 2.5 2.5Z" />
    </svg>
  );
}

export function CalendarMini(p: IconProps) {
  return (
    <svg {...s12} {...p}>
      <rect x="1.5" y="2" width="9" height="8.5" rx="1.5" />
      <path d="M1.5 5h9M4 1v2M8 1v2" />
    </svg>
  );
}

export function DocumentText(p: IconProps) {
  return (
    <svg {...s16} {...p}>
      <rect x="3" y="1.5" width="10" height="13" rx="2" />
      <path d="M6 5.5h4M6 8.5h4M6 11.5h2" />
    </svg>
  );
}

export function Folder(p: IconProps) {
  return (
    <svg {...s12} {...p}>
      <path d="M2 3.5V9.5C2 10.05 2.45 10.5 3 10.5H9C9.55 10.5 10 10.05 10 9.5V4.5C10 3.95 9.55 3.5 9 3.5H6L5 2H3C2.45 2 2 2.45 2 3V3.5Z" />
    </svg>
  );
}

export function People(p: IconProps) {
  return (
    <svg {...s12} {...p}>
      <circle cx="4.5" cy="3.5" r="1.75" />
      <path d="M1.5 10.5c0-1.66 1.34-3 3-3s3 1.34 3 3" />
      <circle cx="8.5" cy="4" r="1.25" />
      <path d="M10.5 10.5c0-1.1-.9-2-2-2" />
    </svg>
  );
}

export function MapPin(p: IconProps) {
  return (
    <svg {...s24} {...p}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export function Tag(p: IconProps) {
  return (
    <svg {...s15} strokeWidth={1} {...p}>
      <path d="M2.25 1.5A.75.75 0 0 0 1.5 2.25v4.19a.75.75 0 0 0 .22.53l6.31 6.31a.75.75 0 0 0 1.06 0l4.19-4.19a.75.75 0 0 0 0-1.06L6.97 1.72a.75.75 0 0 0-.53-.22H2.25ZM4.5 5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1Z" fill="none" />
    </svg>
  );
}

export function ShieldCheck(p: IconProps) {
  return (
    <svg {...s15} strokeWidth={0.75} {...p}>
      <path d="M7.5 1.43L2.88 3.57V6.86C2.88 10.14 4.82 12.29 7.5 13.57C10.18 12.29 12.12 10.14 12.12 6.86V3.57L7.5 1.43Z" fill="currentColor" fillOpacity="0.15" />
      <path d="M5.5 7.5L6.8 8.8L9.5 6.1" strokeWidth="1" />
    </svg>
  );
}

export function ThumbDown(p: IconProps) {
  return (
    <svg {...s15} strokeWidth={1} {...p}>
      <path d="M4.5 2h5.25a1.5 1.5 0 0 1 1.47 1.2L12 7.5a1 1 0 0 1-1 1.17H8.25l.5 2.5a.75.75 0 0 1-.71 1H7.5L4.5 8.5" />
      <path d="M2 2.5H4.5V8.5H2" />
    </svg>
  );
}

export function WarningExclamation(p: IconProps) {
  return (
    <svg {...s14} strokeWidth="1.25" {...p}>
      <path d="M6.07 2.15 1.07 10.89a1.08 1.08 0 0 0 .93 1.61h9.98a1.08 1.08 0 0 0 .93-1.61L7.93 2.15a1.08 1.08 0 0 0-1.86 0Z" />
      <path d="M7 5.25v2.5M7 10h.005" />
    </svg>
  );
}

export function Sun(p: IconProps) {
  return (
    <svg {...s24} {...p}>
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  );
}

export function Moon(p: IconProps) {
  return (
    <svg {...s24} {...p}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export function Hamburger(p: IconProps) {
  return (
    <svg {...s16} {...p}>
      <path d="M2 4h12M2 8h12M2 12h12" />
    </svg>
  );
}

export function ScorecardCheck(p: IconProps) {
  return (
    <svg {...s15} strokeWidth={1} {...p}>
      <rect x="2" y="2" width="11" height="11" rx="1.5" />
      <path d="M5 7.5l2 2 3-4" />
    </svg>
  );
}

/* ═══════════════════════════════════════════
   Media icons
   ═══════════════════════════════════════════ */

export function Play(p: IconProps) {
  return (
    <svg width={14} height={14} viewBox="0 0 14 14" fill="currentColor" {...p}>
      <path d="M3 2.5v9l8-4.5-8-4.5z" />
    </svg>
  );
}

export function Pause(p: IconProps) {
  return (
    <svg width={14} height={14} viewBox="0 0 14 14" fill="currentColor" {...p}>
      <path d="M4 2h2v10H4V2zm4 0h2v10H8V2z" />
    </svg>
  );
}

export function Volume(p: IconProps) {
  return (
    <svg width={14} height={14} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M8 2.5v9l-4-3H1V5.5h3l4-3z" fill="currentColor" />
    </svg>
  );
}

export function Mute(p: IconProps) {
  return (
    <svg width={14} height={14} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M8 2.5v9L4 8.5H1V5.5h3L8 2.5zM11 3l4 4-4 4" />
    </svg>
  );
}

/* ═══════════════════════════════════════════
   Mini / indicator icons
   ═══════════════════════════════════════════ */

export function TriangleDown(p: IconProps) {
  return (
    <svg width={6} height={4} viewBox="0 0 6 4" fill="currentColor" {...p}>
      <path d="M3 4L0 0h6L3 4z" />
    </svg>
  );
}

export function TriangleRight(p: IconProps) {
  return (
    <svg width={4} height={6} viewBox="0 0 4 6" fill="currentColor" {...p}>
      <path d="M4 3L0 6V0l4 3z" />
    </svg>
  );
}

export function EllipsisHorizontal(p: IconProps) {
  return (
    <svg width={15} height={15} viewBox="0 0 15 15" fill="currentColor" {...p}>
      <circle cx="3.5" cy="7.5" r="1" />
      <circle cx="7.5" cy="7.5" r="1" />
      <circle cx="11.5" cy="7.5" r="1" />
    </svg>
  );
}

export function Dot(p: IconProps) {
  return (
    <svg width={15} height={15} viewBox="0 0 15 15" fill="currentColor" {...p}>
      <circle cx="7.5" cy="7.5" r="2" />
    </svg>
  );
}

export function Loading(p: IconProps) {
  return (
    <svg width={15} height={15} viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" {...p}>
      <path d="M7.5 1.5A6 6 0 1 0 13.5 7.5" />
    </svg>
  );
}

export function Keyboard(p: IconProps) {
  return (
    <svg width={15} height={15} viewBox="0 0 15 15" fill="none" {...p}>
      <rect x="1" y="3" width="13" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <rect x="3.5" y="5" width="1.5" height="1.5" rx="0.3" fill="currentColor" />
      <rect x="6" y="5" width="1.5" height="1.5" rx="0.3" fill="currentColor" />
      <rect x="8.5" y="5" width="1.5" height="1.5" rx="0.3" fill="currentColor" />
      <rect x="3.5" y="7.5" width="1.5" height="1.5" rx="0.3" fill="currentColor" />
      <rect x="6" y="7.5" width="1.5" height="1.5" rx="0.3" fill="currentColor" />
      <rect x="8.5" y="7.5" width="1.5" height="1.5" rx="0.3" fill="currentColor" />
      <rect x="11" y="5" width="1.5" height="1.5" rx="0.3" fill="currentColor" />
      <rect x="11" y="7.5" width="1.5" height="1.5" rx="0.3" fill="currentColor" />
      <rect x="4.5" y="10" width="6" height="1.2" rx="0.3" fill="currentColor" />
    </svg>
  );
}

/* ═══════════════════════════════════════════
   Resource mini-icons (10x10 SidebarNav)
   ═══════════════════════════════════════════ */

export function SimulationsMin(p: IconProps) {
  return (
    <svg {...s10} {...p}>
      <path d="M8.75 5A3.75 3.75 0 0 1 5 8.75M1.25 5A3.75 3.75 0 0 1 5 1.25" />
      <path d="M1.25 5h2.5M6.25 5h2.5" />
      <path d="M5 1.25v2.5M5 6.25v2.5" />
    </svg>
  );
}

export function ScorecardsMin(p: IconProps) {
  return (
    <svg {...s10} {...p}>
      <path d="M1.25 3.75h7.5M3.75 1.25v7.5" />
      <rect x="1.25" y="1.25" width="7.5" height="7.5" rx="1" />
    </svg>
  );
}

export function PersonasMin(p: IconProps) {
  return (
    <svg {...s10} {...p}>
      <rect x="1.5" y="1.5" width="7" height="7" rx="1" />
      <path d="M3.5 4.5h3M3.5 6.5h2" />
    </svg>
  );
}

export function BackendToolsMin(p: IconProps) {
  return (
    <svg {...s10} {...p}>
      <path d="M1.5 8.5l3-3M5.5 1.5l3 3" />
      <path d="M2 5l3-3M5 8l3-3" />
    </svg>
  );
}

/* ═══════════════════════════════════════════
   Special / branded icons
   ═══════════════════════════════════════════ */

export function AiSparkle(p: IconProps) {
  return (
    <svg width={15} height={15} viewBox="0 0 15 15" fill="none" {...p}>
      <circle cx="7.5" cy="7.5" r="7.11" fill="url(#sparkle-body)" fillOpacity="0.85" />
      <ellipse cx="7.5" cy="1.5" rx="3" ry="3" fill="url(#sparkle-top)" opacity="0.7" />
      <ellipse cx="13" cy="7.5" rx="3" ry="3" fill="url(#sparkle-right)" opacity="0.7" />
      <ellipse cx="2" cy="7.5" rx="3" ry="3" fill="url(#sparkle-left)" opacity="0.7" />
      <ellipse cx="7.5" cy="13.5" rx="3" ry="3" fill="url(#sparkle-bottom)" opacity="0.7" />
      <ellipse cx="7.5" cy="7.5" rx="3" ry="3" fill="url(#sparkle-center)" opacity="0.7" />
      <defs>
        <radialGradient id="sparkle-body" cx="0.5" cy="0.5" r="0.5" gradientUnits="objectBoundingBox">
          <stop offset="0" stopColor="#f9a8d4" />
          <stop offset="0.5" stopColor="#c4b5fd" />
          <stop offset="1" stopColor="#818cf8" />
        </radialGradient>
        <radialGradient id="sparkle-top" cx="0.5" cy="0.5" r="0.5" gradientUnits="objectBoundingBox">
          <stop offset="0" stopColor="#fde68a" />
          <stop offset="1" stopColor="#f9a8d4" />
        </radialGradient>
        <radialGradient id="sparkle-right" cx="0.5" cy="0.5" r="0.5" gradientUnits="objectBoundingBox">
          <stop offset="0" stopColor="#a78bfa" />
          <stop offset="1" stopColor="#818cf8" />
        </radialGradient>
        <radialGradient id="sparkle-left" cx="0.5" cy="0.5" r="0.5" gradientUnits="objectBoundingBox">
          <stop offset="0" stopColor="#f9a8d4" />
          <stop offset="1" stopColor="#c084fc" />
        </radialGradient>
        <radialGradient id="sparkle-bottom" cx="0.5" cy="0.5" r="0.5" gradientUnits="objectBoundingBox">
          <stop offset="0" stopColor="#c4b5fd" />
          <stop offset="1" stopColor="#a78bfa" />
        </radialGradient>
        <radialGradient id="sparkle-center" cx="0.5" cy="0.5" r="0.5" gradientUnits="objectBoundingBox">
          <stop offset="0" stopColor="#fde68a" />
          <stop offset="1" stopColor="#f9a8d4" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export function SendCircle(p: IconProps) {
  return (
    <svg width={15} height={15} {...s15} {...p}>
      <circle cx="7.5" cy="7.5" r="7" fill="currentColor" stroke="none" />
      <path d="M7.5 10.5V5M7.5 5L5 7.5M7.5 5L10 7.5" stroke="white" fill="none" strokeWidth="1.25" />
    </svg>
  );
}
