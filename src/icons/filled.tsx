import type { IconProps } from "./types";

/* ═══════════════════════════════════════════
   Navigation icons — filled variants
   Used for active/selected SidebarNav items
   ═══════════════════════════════════════════ */

export function HomeFilled(p: IconProps) {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M3 9.5l9-7 9 7V20a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9.5z" />
    </svg>
  );
}

export function InboxFilled(p: IconProps) {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
      <path d="M22 12h-6l-2 3h-3l-2-3H2" stroke="currentColor" strokeWidth="0.5" fill="none" />
    </svg>
  );
}

export function FileTextFilled(p: IconProps) {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
      <path d="M14 2v6h6" fill="none" stroke="currentColor" strokeWidth="1" />
      <path d="M16 13H8M16 17H8M10 9H8" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function BoltFilled(p: IconProps) {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

export function ChatBubbleFilled(p: IconProps) {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

export function FileSearchFilled(p: IconProps) {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
      <circle cx="12" cy="14" r="2" fill="none" stroke="white" strokeWidth="1.5" />
      <path d="M16 10l-4 4" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function BellFilled(p: IconProps) {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function ChartBarFilled(p: IconProps) {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor" {...p}>
      <rect x="16" y="10" width="4" height="10" rx="1" />
      <rect x="10" y="4" width="4" height="16" rx="1" />
      <rect x="4" y="14" width="4" height="6" rx="1" />
    </svg>
  );
}

export function FileCheckFilled(p: IconProps) {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
      <path d="M9 15l2 2 4-4" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function UserFilled(p: IconProps) {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor" {...p}>
      <circle cx="12" cy="7" r="4" />
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2h16z" />
    </svg>
  );
}

export function FileSearchAltFilled(p: IconProps) {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
      <circle cx="11" cy="13" r="2.5" fill="none" stroke="white" strokeWidth="1.5" />
      <path d="M13 15l2.5 2.5" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function LifebuoyFilled(p: IconProps) {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor" {...p}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="white" strokeWidth="1.5" />
      <path d="M4.93 4.93l4.24 4.24M14.83 14.83l4.24 4.24M14.83 9.17l4.24-4.24M9.17 14.83l-4.24 4.24" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function CogFilled(p: IconProps) {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      <circle cx="12" cy="12" r="3" fill="white" stroke="none" />
    </svg>
  );
}

/* ═══════════════════════════════════════════
   Settings sidebar icons — filled variants
   ═══════════════════════════════════════════ */

export function WorkspaceFilled(p: IconProps) {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor" {...p}>
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function UsersFilled(p: IconProps) {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor" {...p}>
      <circle cx="9" cy="7" r="4" />
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2h16z" />
      <circle cx="17" cy="7" r="3" fillOpacity="0.7" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function GroupsFilled(p: IconProps) {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor" {...p}>
      <circle cx="9" cy="7" r="4" />
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2h14z" />
      <circle cx="17" cy="7" r="2" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function AuditLogFilled(p: IconProps) {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
      <path d="M16 13H8m8 4H8" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function MicrophoneFilled(p: IconProps) {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor" {...p}>
      <rect x="9" y="1" width="6" height="13" rx="3" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function FlagFilled(p: IconProps) {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <path d="M4 22V15" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function ClipboardCheckFilled(p: IconProps) {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M7 5H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
      <rect x="7" y="1" width="6" height="4" rx="1" fill="white" />
      <path d="M7 14l2 2 4-4" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CheckSquareFilled(p: IconProps) {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor" {...p}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9 11l3 3L22 4" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function BuildingFilled(p: IconProps) {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M3 9.5l9-7 9 7V20a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9.5z" />
      <rect x="9" y="12" width="6" height="10" fill="white" />
    </svg>
  );
}

export function UserCircleFilled(p: IconProps) {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor" {...p}>
      <circle cx="12" cy="7" r="4" />
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2h16z" />
    </svg>
  );
}

/* ═══════════════════════════════════════════
   Status icons — filled variants
   Used in Toast, SystemMessage
   ═══════════════════════════════════════════ */

export function InfoCircleFilled(p: IconProps) {
  return (
    <svg width={15} height={15} viewBox="0 0 15 15" fill="currentColor" {...p}>
      <circle cx="7.5" cy="7.5" r="7.1" />
      <path d="M7.5 4.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM6.75 6h.75v4.5h1.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

export function CheckCircleFilled(p: IconProps) {
  return (
    <svg width={15} height={15} viewBox="0 0 15 15" fill="currentColor" {...p}>
      <circle cx="7.5" cy="7.5" r="7.1" />
      <path d="M4.5 7.5 6.75 9.75 10.5 5.25" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

export function WarningFilled(p: IconProps) {
  return (
    <svg width={15} height={15} viewBox="0 0 15 15" fill="currentColor" {...p}>
      <circle cx="7.5" cy="7.5" r="7.1" />
      <path d="M7.5 4.5v3.75" stroke="white" strokeWidth="1.4" strokeLinecap="round" fill="none" />
      <circle cx="7.5" cy="10.5" r="0.75" fill="white" />
    </svg>
  );
}

export function ErrorCircleFilled(p: IconProps) {
  return (
    <svg width={15} height={15} viewBox="0 0 15 15" fill="currentColor" {...p}>
      <circle cx="7.5" cy="7.5" r="7.1" />
      <path d="M5.25 5.25 9.75 9.75M9.75 5.25 5.25 9.75" stroke="white" strokeWidth="1.4" strokeLinecap="round" fill="none" />
    </svg>
  );
}

/* ═══════════════════════════════════════════
   Theme toggle — filled variants
   ═══════════════════════════════════════════ */

export function SunFilled(p: IconProps) {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor" {...p}>
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function MoonFilled(p: IconProps) {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

/* ═══════════════════════════════════════════
   Step / chain-of-thought status dots
   ═══════════════════════════════════════════ */

export function PendingDot(p: IconProps) {
  return (
    <svg width={12} height={12} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}>
      <circle cx="6" cy="6" r="4" />
    </svg>
  );
}

export function ActiveDot(p: IconProps) {
  return (
    <svg width={12} height={12} viewBox="0 0 12 12" fill="currentColor" {...p}>
      <circle cx="6" cy="6" r="4" />
    </svg>
  );
}

export function CompleteDot(p: IconProps) {
  return (
    <svg width={12} height={12} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M3 6l2 2 4-4" />
    </svg>
  );
}

export function ErrorDot(p: IconProps) {
  return (
    <svg width={12} height={12} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" {...p}>
      <path d="M4 4l4 4M8 4l-4 4" />
    </svg>
  );
}

/* ═══════════════════════════════════════════
   Menubar radio dot
   ═══════════════════════════════════════════ */

export function RadioDot(p: IconProps) {
  return (
    <svg width={14} height={14} viewBox="0 0 14 14" fill="currentColor" {...p}>
      <circle cx="7" cy="7" r="3" />
    </svg>
  );
}
