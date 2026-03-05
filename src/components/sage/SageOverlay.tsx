import {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
  type ReactNode,
  type KeyboardEvent,
} from "react";
import s from "./sage.module.css";
import {
  MEETING,
  ENHANCED_NOTES,
  PRIVATE_NOTES,
  TRANSCRIPT,
  TEMPLATES,
  SOURCE_DATA,
  CHAT_SUGGESTIONS,
  PRE_MEETING_BRIEF,
  QUICK_ACTIONS,
  type SageNoteSection,
  type SageQuickAction,
} from "./sageData";

/* ═══════════════════════════════════════════════════════════
   State Machine
   ═══════════════════════════════════════════════════════════ */

type SageState =
  | "landing"
  | "desktop-idle"
  | "pre-meeting-notif"
  | "pre-meeting-brief"
  | "meeting-active"
  | "notification"
  | "pill-collapsed"
  | "pill-expanded"
  | "empty-editor"
  | "generate-prompt"
  | "enhancing"
  | "enhanced-notes"
  | "templates"
  | "share"
  | "source-popover"
  | "private-notes"
  | "transcript"
  | "chat";


const NEEDS_NOTES_PANEL = new Set<SageState>([
  "pre-meeting-brief",
  "empty-editor",
  "generate-prompt",
  "enhancing",
  "enhanced-notes",
  "templates",
  "share",
  "source-popover",
  "private-notes",
  "transcript",
  "chat",
]);

const MOCK_CHAT_RESPONSES: Record<string, string> = {
  "What were the key decisions made?":
    "The key decisions were: 1) Inter font preferred over default, 2) Grayscale color scheme preferred over pure white, 3) In-context chat is a must-have for enterprise, and 4) Reports section consolidation has value but needs clearer UX.",
  "Summarize the enterprise feedback":
    "The enterprise feedback was overwhelmingly positive. Ashwin rated confidence for enterprise demos at '100% or more' with the new interface. The target demographic (35-55) prefers professional, clear design. Technology and financial services sectors show the strongest pain points.",
  "List all action items from this meeting":
    "Action items: 1) Schedule follow-up design review with broader team including sales, 2) Iterate on size/spacing feedback for memory section, 3) Prepare enterprise-specific demo script, 4) Prioritize enterprise demo flow refinement.",
  "What concerns were raised about feature adoption?":
    "Risk radar has low adoption despite technical value. Users say 'we have meetings and OKRs' — it's too abstracted from daily workflow. Weekly business reports and swim lanes remain the most popular features with customers.",
};

/* ═══════════════════════════════════════════════════════════
   SVG Icon Helpers
   ═══════════════════════════════════════════════════════════ */

function IcoSparkle({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M8 1l1.5 4.5L14 7l-4.5 1.5L8 13l-1.5-4.5L2 7l4.5-1.5L8 1z" fill="currentColor" />
    </svg>
  );
}

function IcoPlay({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <path d="M3 2l9 5-9 5V2z" fill="currentColor" />
    </svg>
  );
}

function IcoChevronRight({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
      <path d="M4 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IcoChevronLeft({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
      <path d="M8 3L5 6l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IcoX({ size = 10 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" fill="none">
      <path d="M2 2l6 6M8 2l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IcoWaveform({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <rect x="1" y="6" width="2" height="4" rx="1" fill="currentColor" />
      <rect x="5" y="3" width="2" height="10" rx="1" fill="currentColor" />
      <rect x="9" y="5" width="2" height="6" rx="1" fill="currentColor" />
      <rect x="13" y="6" width="2" height="4" rx="1" fill="currentColor" />
    </svg>
  );
}

function IcoSearch({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9.5 9.5L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IcoCopy({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <rect x="4" y="4" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 4V3a1.5 1.5 0 00-1.5-1.5H3A1.5 1.5 0 001.5 3v5.5A1.5 1.5 0 003 10h1" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function IcoMinus({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <path d="M3 7h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IcoStop({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
      <rect x="2" y="2" width="8" height="8" rx="1" fill="currentColor" />
    </svg>
  );
}

function IcoLock({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
      <rect x="2" y="5" width="8" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M4 5V3.5a2 2 0 014 0V5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function IcoLink({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <path d="M6 8l2-2M5 9.5a2.5 2.5 0 01 0-5l1 0M9 4.5a2.5 2.5 0 010 5l-1 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IcoMore({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <circle cx="3" cy="7" r="1" fill="currentColor" />
      <circle cx="7" cy="7" r="1" fill="currentColor" />
      <circle cx="11" cy="7" r="1" fill="currentColor" />
    </svg>
  );
}

function IcoList({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <path d="M3 3h8M3 7h8M3 11h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IcoMail({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <rect x="1" y="3" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M1 4l6 4 6-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function IcoSlack({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <rect x="1" y="5" width="4" height="2" rx="1" fill="#36C5F0" />
      <rect x="9" y="5" width="4" height="2" rx="1" fill="#2EB67D" />
      <rect x="5" y="1" width="4" height="2" rx="1" fill="#ECB22E" transform="rotate(90 5 1)" />
      <rect x="5" y="9" width="4" height="2" rx="1" fill="#E01E5A" transform="rotate(90 5 9)" />
    </svg>
  );
}

function IcoDoc({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <rect x="2" y="1" width="10" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M5 5h4M5 7.5h4M5 10h2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

function IcoCheck({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
      <path d="M2.5 6l2.5 2.5L9.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}



function IcoMagnify({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
      <circle cx="5" cy="5" r="3.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M8 8l3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function IcoClock({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M7 4v3.5l2.5 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* MacDesktop simulation removed — content renders directly */

/* ═══════════════════════════════════════════════════════════
   Notification
   ═══════════════════════════════════════════════════════════ */

function Notification({
  onLaunch,
}: {
  onLaunch: () => void;
}) {
  const [dismissing, setDismissing] = useState(false);

  const handleLaunch = useCallback(() => {
    setDismissing(true);
    setTimeout(onLaunch, 200);
  }, [onLaunch]);

  const names = MEETING.participants.map((p) => p.name).join(" & ");

  return (
    <div className={`${s.notification} ${dismissing ? s.notificationDismissing : ""}`}>
      <div className={s.notifCopyWrap}>
        <div className={s.notifLabel}>Upcoming Meeting</div>
        <div className={s.notifCopy}>
          Your call with <strong>{names}</strong> is starting. Launch with Sentra notes?
        </div>
      </div>
      <button type="button" className={s.notifLaunchBtn} onClick={handleLaunch}>
        Launch Meeting
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Pre-Meeting Notification
   ═══════════════════════════════════════════════════════════ */

function PreMeetingNotification({
  onViewBrief,
  onDismiss,
}: {
  onViewBrief: () => void;
  onDismiss: () => void;
}) {
  const [dismissing, setDismissing] = useState(false);
  const name = PRE_MEETING_BRIEF.attendees[0]?.name || "your teammate";

  const handleDismiss = useCallback(() => {
    setDismissing(true);
    setTimeout(onDismiss, 200);
  }, [onDismiss]);

  const handleView = useCallback(() => {
    setDismissing(true);
    setTimeout(onViewBrief, 200);
  }, [onViewBrief]);

  return (
    <div className={`${s.preMeetingNotif} ${dismissing ? s.notificationDismissing : ""}`}>
      <div className={s.preMeetingCopyWrap}>
        <div className={s.preMeetingLabel}>Meeting Prep</div>
        <div className={s.preMeetingCopy}>
          Your meeting with <strong>{name}</strong> is in 15 min. Want to review your prep?
        </div>
      </div>
      <div className={s.preMeetingActions}>
        <button type="button" className={s.preMeetingViewBtn} onClick={handleView}>
          View Brief
        </button>
        <button type="button" className={s.preMeetingDismissBtn} onClick={handleDismiss}>
          Dismiss
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Pre-Meeting Brief Panel Content
   ═══════════════════════════════════════════════════════════ */

function BriefContent() {
  const brief = PRE_MEETING_BRIEF;
  const sourceIcon = (src: "slack" | "email" | "doc") => {
    if (src === "slack") return <IcoSlack size={12} />;
    if (src === "email") return <IcoMail size={12} />;
    return <IcoDoc size={12} />;
  };

  return (
    <div className={s.briefContent}>
      {/* Attendees */}
      <div className={s.briefSection}>
        <div className={s.briefSectionHeading}>
          Attendees
        </div>
        {brief.attendees.map((a) => (
          <div key={a.name} className={s.briefAttendeeRow}>
            <div className={s.briefAttendeeAvatar}>{a.initials}</div>
            <div className={s.briefAttendeeInfo}>
              <span className={s.briefAttendeeName}>{a.name}</span>
              <span className={s.briefAttendeeRole}>{a.role}</span>
            </div>
            <span className={s.briefAttendeeLastSpoke}>{a.lastSpoke}</span>
          </div>
        ))}
      </div>

      {/* Last Meeting */}
      <div className={s.briefSection}>
        <div className={s.briefSectionHeading}>
          Last Meeting
        </div>
        <div className={s.briefLastMeetingHeader}>
          <span className={s.briefLastMeetingTitle}>{brief.lastMeeting.title}</span>
          <span className={s.briefLastMeetingDate}>{brief.lastMeeting.date}</span>
        </div>
        <ul className={s.briefKeyPoints}>
          {brief.lastMeeting.keyPoints.map((pt, i) => (
            <li key={i} className={s.briefKeyPoint}>{pt}</li>
          ))}
        </ul>
      </div>

      {/* Open Action Items */}
      <div className={s.briefSection}>
        <div className={s.briefSectionHeading}>
          Open Action Items
        </div>
        {brief.actionItems.map((item, i) => (
          <div key={i} className={s.briefActionItem}>
            <div className={s.briefActionCheck}><IcoCheck size={10} /></div>
            <div className={s.briefActionBody}>
              <span className={s.briefActionText}>{item.text}</span>
              <span className={s.briefActionMeta}>{item.owner} · {item.fromDate}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Sources */}
      <div className={s.briefSourcesSection}>
        <div className={s.briefSourcesLabel}>Sources</div>
        <div className={s.briefSourcesList}>
          {brief.context.map((ctx, i) => (
            <div key={i} className={s.briefSourceChip}>
              <span className={s.briefSourceChipIcon}>{sourceIcon(ctx.source)}</span>
              {ctx.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Recording Pill
   ═══════════════════════════════════════════════════════════ */

function PillCollapsed({
  onClick,
  useNewPill,
}: {
  onClick: () => void;
  useNewPill?: boolean;
}) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onClick();
      }
    },
    [onClick],
  );
  if (!useNewPill) {
    return (
      <div className={s.pillWrap}>
        <div
          className={s.pillCollapsed}
          onClick={onClick}
          onKeyDown={handleKeyDown}
          role="button"
          tabIndex={0}
          aria-label="Expand recording pill"
        >
          <div className={s.pillLogo}><IcoSparkle size={14} /></div>
          <div className={s.pillDot} />
        </div>
      </div>
    );
  }

  return (
    <div className={s.pillWrap}>
      <div
        className={`${s.pillCollapsed} ${s.pillCollapsedNew}`}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-label="Expand recording pill"
      >
        <div className={s.pillDragHandle} aria-hidden="true">
          <span /><span /><span /><span /><span /><span />
        </div>
        <div className={s.pillWaveform} aria-hidden="true">
          <span /><span /><span /><span />
        </div>
        <div className={s.pillLogo}><IcoSparkle size={14} /></div>
        <span className={s.pillCollapsedLabel}>Recording</span>
      </div>
    </div>
  );
}

function PillExpanded({
  onCollapse,
  onStop,
  elapsed,
  useNewPill,
}: {
  onCollapse: () => void;
  onStop: () => void;
  elapsed: number;
  useNewPill?: boolean;
}) {
  const mins = Math.floor(elapsed / 60);
  const secs = elapsed % 60;
  const timeDisplay = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

  if (!useNewPill) {
    return (
      <div className={s.pillWrap}>
        <div className={s.pillExpanded}>
          <div className={s.pillExpandedHeader}>
            <div className={s.pillLogo}><IcoSparkle size={14} /></div>
            <span className={s.pillRecLabel}>Recording</span>
            <div className={s.pillDot} />
            <span className={s.pillTimer}>{timeDisplay}</span>
          </div>
          <div className={s.pillTranscript}>
            {TRANSCRIPT.slice(0, 4).map((line, i) => (
              <p key={i} className={s.pillTranscriptLine}>
                <strong>{line.speaker}:</strong> {line.text}
              </p>
            ))}
          </div>
          <div className={s.pillControls}>
            <button type="button" className={s.pillStopBtn} onClick={onStop} aria-label="Stop recording">
              <IcoStop size={10} /> Stop
            </button>
            <button type="button" className={s.pillCollapseBtn} onClick={onCollapse} aria-label="Collapse pill">
              <IcoChevronRight />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={s.pillWrap}>
      <div className={`${s.pillExpanded} ${useNewPill ? s.pillExpandedNew : ""}`}>
        <div className={s.pillExpandedHeader}>
          <div className={`${s.pillWaveform} ${s.pillWaveformMini}`} aria-hidden="true">
            <span /><span /><span /><span />
          </div>
          <div className={s.pillLogo}><IcoSparkle size={14} /></div>
          <span className={s.pillRecLabel}>Recording</span>
          <span className={s.pillTimer}>{timeDisplay}</span>
        </div>
        <div className={`${s.pillTranscript} ${s.pillTranscriptLive}`}>
          {TRANSCRIPT.slice(0, 6).map((line, i) => (
            <div
              key={i}
              className={`${s.pillLiveLine} ${line.isUser ? s.pillLiveLineUser : s.pillLiveLineOther}`}
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <div className={s.pillLiveSpeaker}>{line.isUser ? "You" : line.speaker}</div>
              <div className={s.pillLiveText}>{line.text}</div>
            </div>
          ))}
        </div>
        <div className={s.pillControls}>
          <button type="button" className={s.pillStopBtn} onClick={onStop} aria-label="Stop recording">
            <IcoStop size={10} /> Stop
          </button>
          <button type="button" className={s.pillCollapseBtn} onClick={onCollapse} aria-label="Collapse pill">
            <IcoChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Bottom Bar
   ═══════════════════════════════════════════════════════════ */

function BottomBar({
  onTranscript,
  onResume,
  onChat,
  onFollowUp,
  showResume,
  askLabel,
  hidden,
  transcriptActive,
  chatActive,
  useGranolaLayout,
}: {
  onTranscript: () => void;
  onResume?: () => void;
  onChat: () => void;
  onFollowUp: () => void;
  showResume?: boolean;
  askLabel?: string;
  hidden?: boolean;
  transcriptActive?: boolean;
  chatActive?: boolean;
  useGranolaLayout?: boolean;
}) {
  const [toast, setToast] = useState(false);

  const handleFollowUp = useCallback(() => {
    setToast(true);
    onFollowUp();
    setTimeout(() => setToast(false), 2500);
  }, [onFollowUp]);

  if (hidden) return null;

  const resumeAction = onResume || onTranscript;

  if (useGranolaLayout) {
    return (
      <>
        <div className={s.bottomBar}>
          <div className={s.bottomBarLeft}>
            <div className={`${s.bottomBarPill} ${transcriptActive ? s.bottomBarPillActive : ""}`}>
              <button
                type="button"
                className={s.bottomBarPillWave}
                onClick={onTranscript}
                aria-label={transcriptActive ? "Close transcript" : "Open transcript"}
              >
                <IcoWaveform />
                <IcoChevronRight />
              </button>
              {showResume && (
                <button type="button" className={s.bottomBarPillResume} onClick={resumeAction}>
                  Resume
                </button>
              )}
            </div>
          </div>
          <div className={s.bottomBarCenter}>
            <div
              className={`${s.askInputShell} ${chatActive ? s.askInputShellActive : ""}`}
              role="button"
              tabIndex={0}
              onClick={onChat}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onChat();
                }
              }}
              aria-label={chatActive ? "Close chat" : "Open chat"}
            >
              <span className={s.askInputText}>{askLabel || "Ask anything"}</span>
              <button
                type="button"
                className={s.askInlineAction}
                onClick={(e) => {
                  e.stopPropagation();
                  handleFollowUp();
                }}
                aria-label="Write follow up email"
              >
                <span className={s.followUpIcon}>✎</span>
                Write follow up email
              </button>
            </div>
          </div>
        </div>
        {toast && (
          <div className={s.sageToast}>✓ Follow-up email drafted</div>
        )}
      </>
    );
  }

  return (
    <>
      <div className={s.bottomBar}>
        <div className={s.bottomBarLeft}>
          <button
            type="button"
            className={`${s.waveformBtn} ${transcriptActive ? s.waveformBtnActive : ""}`}
            onClick={onTranscript}
            aria-label={transcriptActive ? "Close transcript" : "Open transcript"}
          >
            <IcoWaveform />
            <IcoChevronRight />
          </button>
          {showResume && (
            <button type="button" className={s.resumeBtn}>Resume</button>
          )}
        </div>
        <div className={s.bottomBarCenter}>
          <button
            type="button"
            className={`${s.askInputBtn} ${chatActive ? s.askInputBtnActive : ""}`}
            onClick={onChat}
            aria-label={chatActive ? "Close chat" : "Open chat"}
          >
            {askLabel || "Ask anything"}
          </button>
        </div>
        <div className={s.bottomBarRight}>
          <button type="button" className={s.followUpBtn} onClick={handleFollowUp} aria-label="Write follow up email">
            <span className={s.followUpIcon}>✎</span>
            Write follow up email
          </button>
        </div>
      </div>
      {toast && (
        <div className={s.sageToast}>✓ Follow-up email drafted</div>
      )}
    </>
  );
}

/* ═══════════════════════════════════════════════════════════
   Enhanced Notes Content
   ═══════════════════════════════════════════════════════════ */

const FALLBACK_SOURCES = ["src-4", "src-5", "src-6", "src-7", "src-8", "src-9"];

function EnhancedNotesContent({
  activeSourceId,
  onSourceClick,
  onSourceClose,
}: {
  activeSourceId: string | null;
  onSourceClick: (sourceId: string) => void;
  onSourceClose: () => void;
}) {
  let fallbackIdx = 0;
  const getFallbackSource = () => {
    const id = FALLBACK_SOURCES[fallbackIdx % FALLBACK_SOURCES.length] || "src-1";
    fallbackIdx++;
    return id;
  };

  return (
    <div className={s.enhancedContent}>
      {ENHANCED_NOTES.map((section, si) => (
        <div key={si} className={s.sectionBlock}>
          <div className={s.sectionHeading}>
            {section.heading}
          </div>
          <ul className={s.bulletList}>
            {section.items.map((item, ii) => {
              const srcId = item.sourceId || getFallbackSource();
              const isActive = activeSourceId === srcId;
              return (
                <li key={ii}>
                  <div className={`${s.bulletItem} ${isActive ? s.bulletItemActive : ""}`}>
                    <span className={s.bulletItemText}>{item.text}</span>
                    <button
                      type="button"
                      className={s.sourceBtn}
                      onClick={() => isActive ? onSourceClose() : onSourceClick(srcId)}
                      aria-label="View transcript source"
                    >
                      <IcoMagnify />
                    </button>
                  </div>
                  {isActive && <SourcePopover sourceId={srcId} onClose={onSourceClose} />}
                  {item.children && (
                    <ul className={s.subBulletList}>
                      {item.children.map((child, ci) => {
                        const childSrcId = getFallbackSource();
                        const isChildActive = activeSourceId === childSrcId;
                        return (
                          <li key={ci}>
                            <div className={`${s.subBulletItem} ${isChildActive ? s.bulletItemActive : ""}`}>
                              <span className={s.subBulletItemText}>{child}</span>
                              <button
                                type="button"
                                className={s.sourceBtn}
                                onClick={() => isChildActive ? onSourceClose() : onSourceClick(childSrcId)}
                                aria-label="View transcript source"
                              >
                                <IcoMagnify />
                              </button>
                            </div>
                            {isChildActive && <SourcePopover sourceId={childSrcId} onClose={onSourceClose} />}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Actions Bar — contextual actions derived from meeting notes
   ═══════════════════════════════════════════════════════════ */

const ACTION_ICONS: Record<SageQuickAction["type"], (props: { size?: number }) => ReactNode> = {
  email: IcoMail,
  schedule: IcoClock,
  task: IcoCheck,
};

function ActionsBar() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = useCallback((action: SageQuickAction) => {
    navigator.clipboard.writeText(action.draft).then(() => {
      setCopiedId(action.id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  }, []);

  return (
    <div className={s.actionsBar}>
      <div className={s.actionsDivider}>
        <div className={s.actionsDividerLine} />
        <span className={s.actionsDividerLabel}>Take action</span>
        <div className={s.actionsDividerLine} />
      </div>

      <div className={s.actionsList}>
        {QUICK_ACTIONS.map((action) => {
          const Icon = ACTION_ICONS[action.type];
          const isExpanded = expandedId === action.id;
          const isCopied = copiedId === action.id;

          return (
            <div key={action.id} className={`${s.actionCard} ${isExpanded ? s.actionCardExpanded : ""}`}>
              <button
                type="button"
                className={s.actionTrigger}
                onClick={() => setExpandedId(isExpanded ? null : action.id)}
                aria-expanded={isExpanded}
              >
                <span className={s.actionIcon}>
                  <Icon size={14} />
                </span>
                <span className={s.actionText}>
                  <span className={s.actionLabel}>{action.label}</span>
                  <span className={s.actionDesc}>{action.description}</span>
                </span>
                <span className={`${s.actionChevron} ${isExpanded ? s.actionChevronOpen : ""}`}>
                  <IcoChevronRight size={10} />
                </span>
              </button>

              {isExpanded && (
                <div className={s.actionDraft}>
                  <pre className={s.actionDraftText}>{action.draft}</pre>
                  <button
                    type="button"
                    className={s.actionCopyBtn}
                    onClick={() => handleCopy(action)}
                  >
                    {isCopied ? (
                      <>
                        <IcoCheck size={12} /> Copied
                      </>
                    ) : (
                      <>
                        <IcoCopy size={12} /> Copy
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Enhancer Animation
   ═══════════════════════════════════════════════════════════ */

function flattenNotes(sections: SageNoteSection[]): { type: "heading" | "item" | "child"; text: string; sectionIdx: number }[] {
  const flat: { type: "heading" | "item" | "child"; text: string; sectionIdx: number }[] = [];
  sections.forEach((sec, si) => {
    flat.push({ type: "heading", text: sec.heading, sectionIdx: si });
    sec.items.forEach((item) => {
      flat.push({ type: "item", text: item.text, sectionIdx: si });
      item.children?.forEach((c) => {
        flat.push({ type: "child", text: c, sectionIdx: si });
      });
    });
  });
  return flat;
}

function EnhancerView({ onComplete, onCancel }: { onComplete: () => void; onCancel: () => void }) {
  const flatItems = useMemo(() => flattenNotes(ENHANCED_NOTES), []);
  const total = flatItems.length;
  const [progress, setProgress] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const onCompleteRef = useRef(onComplete);
  const startTimeRef = useRef(0);
  const rafRef = useRef(0);
  onCompleteRef.current = onComplete;

  const DURATION = 5500;
  const EASE_OUT = (t: number) => 1 - Math.pow(1 - t, 2.2);

  useEffect(() => {
    startTimeRef.current = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTimeRef.current;
      const raw = Math.min(elapsed / DURATION, 1);
      const eased = EASE_OUT(raw);
      setProgress(eased);

      if (raw < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setTimeout(() => onCompleteRef.current(), 400);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const revealed = Math.floor(progress * total);

  return (
    <div ref={scrollRef} className={`${s.notesScroll} ${s.enhancerScrollArea}`}>
      <div className={s.noteTitle}>{MEETING.title}</div>
      <div className={s.noteMeta}>
        <span className={s.noteChip}>📅 {MEETING.date}</span>
        <span className={s.noteChip}>👥 Me</span>
        <span className={s.noteChip}>+ Add to folder</span>
      </div>
      <div>
        <div className={s.enhancerContent}>
          {flatItems.map((item, i) => {
            const itemProgress = i / total;
            const isRevealed = progress >= itemProgress;
            const isFrontier = isRevealed && i >= revealed - 2;
            const cls = [
              s.enhancerItemSmooth,
              isRevealed ? s.enhancerItemVisible : s.enhancerItemHidden,
              isFrontier ? s.enhancerItemFrontier : "",
            ].join(" ");

            if (item.type === "heading") {
              return (
                <div key={i} className={`${cls} ${s.enhancerHeading}`}>
                  <div className={s.sectionHeading}>
                    {item.text}
                  </div>
                </div>
              );
            }
            if (item.type === "item") {
              return (
                <div key={i} className={`${cls} ${s.enhancerBullet}`}>
                  <span className={s.enhancerBulletText}>• {item.text}</span>
                </div>
              );
            }
            return (
              <div key={i} className={`${cls} ${s.enhancerSubBullet}`}>
                <span className={s.enhancerSubBulletText}>○ {item.text}</span>
              </div>
            );
          })}
        </div>
      </div>

      {progress < 1 && (
        <div className={s.enhancerStatusBar}>
          <div className={s.enhancerProgressTrack}>
            <div className={s.enhancerProgressFill} style={{ width: `${progress * 100}%` }} />
          </div>
          <div className={s.enhancerStatusContent}>
            <div className={s.enhancerStatusLeft}>
              <div className={s.enhancerSpinner} />
              <div className={s.enhancerStatusText}>
                <span className={s.enhancerStatusTitle}>Generating enhanced AI notes</span>
                <span className={s.enhancerStatusSub}>Analyzing transcript and synthesizing key insights...</span>
              </div>
            </div>
            <div className={s.enhancerStatusRight}>
              <span className={s.enhancerPercent}>{Math.round(progress * 100)}%</span>
              <button type="button" className={s.enhancerCancel} onClick={onCancel}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {progress >= 1 && (
        <div className={s.enhancerDoneBar}>
          <span className={s.enhancerDoneIcon}>✓</span>
          <span className={s.enhancerDoneText}>Enhanced AI notes generated</span>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Transcript Panel
   ═══════════════════════════════════════════════════════════ */

function TranscriptPanel({ onClose }: { onClose: () => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  return (
    <div className={s.transcriptPanel}>
      <div className={s.transcriptHeader}>
        <span className={s.transcriptHeaderTitle}>Transcript</span>
        <div className={s.transcriptHeaderSpacer} />
        <div className={s.transcriptHeaderActions}>
          <button type="button" className={s.chromeIconBtn} aria-label="Search transcript"><IcoSearch /></button>
          <button type="button" className={s.chromeIconBtn} aria-label="Copy transcript"><IcoCopy /></button>
          <button type="button" className={s.chromeIconBtn} onClick={onClose} aria-label="Minimize transcript"><IcoMinus /></button>
        </div>
      </div>
      <div ref={scrollRef} className={s.transcriptScroll}>
        {TRANSCRIPT.map((line, i) => (
          <div key={i} className={line.isUser ? s.transcriptLineUser : s.transcriptLineOther}>
            <div className={s.transcriptLineHeader}>
              <div className={line.isUser ? s.transcriptSpeakerYou : s.transcriptSpeaker}>
                {line.isUser ? "You" : line.speaker}
              </div>
              <span className={s.transcriptTime}>{line.time}</span>
            </div>
            <div className={s.transcriptBubble}>{line.text}</div>
          </div>
        ))}
      </div>
      <div className={s.transcriptBottom}>
        <div className={s.transcriptLive}>
          <div className={s.transcriptLiveDot} />
          Live
        </div>
        <div className={s.bottomBarLeft}>
          <button type="button" className={s.resumeBtn} onClick={onClose}>Back to Notes</button>
        </div>
        <div className={s.langSelector}>
          English <IcoChevronRight />
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Chat Panel
   ═══════════════════════════════════════════════════════════ */

function ChatPanel({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const handleSuggestion = useCallback((sug: string) => {
    setMessages((prev) => [...prev, { role: "user", text: sug }]);
    const response = MOCK_CHAT_RESPONSES[sug] || "I can help with that. Let me look through the meeting notes...";
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "ai", text: response }]);
    }, 800);
  }, []);

  return (
    <div className={s.chatPanel}>
      <div className={s.chatHeader}>
        <span className={s.chatHeaderTitle}>Ask about this meeting</span>
        <button type="button" className={s.chromeIconBtn} onClick={onClose} aria-label="Minimize chat"><IcoMinus /></button>
      </div>
      <div ref={scrollRef} className={s.chatScroll}>
        {messages.length === 0 && (
          <div className={s.chatSuggestions}>
            {CHAT_SUGGESTIONS.map((sug) => (
              <button key={sug} type="button" className={s.chatSuggestBtn} onClick={() => handleSuggestion(sug)}>{sug}</button>
            ))}
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={msg.role === "user" ? s.chatUserMsg : s.chatAiMsg}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className={s.chatInputBar}>
        <button type="button" className={s.askInputBtn} style={{ flex: 1 }}>
          Ask anything...
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Templates Dropdown
   ═══════════════════════════════════════════════════════════ */

function TemplatesDropdown({ onSelect }: { onSelect: () => void }) {
  const iconMap: Record<string, string> = {
    sparkle: "✦",
    people: "👥",
    search: "🔍",
    briefcase: "💼",
    bolt: "⚡",
    calendar: "📅",
    grid: "▦",
  };
  return (
    <div className={s.templatesDropdown}>
      <div className={s.templatesHeader}>
        <span className={s.templatesTitle}>Templates</span>
        <button type="button" className={s.templatesNew}>New template</button>
      </div>
      {TEMPLATES.map((t) => (
        <button key={t.id} type="button" className={s.templateItem} onClick={onSelect}>
          <span className={s.templateIcon}>{iconMap[t.icon] || "•"}</span>
          <span className={s.templateLabel}>{t.label}</span>
          {t.shortcut && <span className={s.templateShortcut}>{t.shortcut}</span>}
        </button>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Share Dropdown
   ═══════════════════════════════════════════════════════════ */

function ShareDropdown({ onAction }: { onAction: () => void }) {
  return (
    <div className={s.shareDropdown}>
      <button type="button" className={s.shareItem} onClick={onAction}>
        <span className={s.shareItemIcon}><IcoMail /></span> Draft email
      </button>
      <button type="button" className={s.shareItem} onClick={onAction}>
        <span className={s.shareItemIcon}><IcoCopy /></span> Copy text
      </button>
      <button type="button" className={s.shareItem} onClick={onAction}>
        <span className={s.shareItemIcon}><IcoSlack /></span> Send to Slack
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Source Popover
   ═══════════════════════════════════════════════════════════ */

function SourcePopover({ sourceId, onClose }: { sourceId: string; onClose: () => void }) {
  const data = SOURCE_DATA[sourceId];
  if (!data) return null;
  return (
    <div className={s.sourcePopover} onClick={(e) => e.stopPropagation()}>
      <div className={s.sourcePopoverHeader}>
        <div className={s.sourceLabel}>Transcript Source</div>
        <button type="button" className={s.chromeIconBtn} onClick={onClose} aria-label="Close source popover">
          <IcoX size={8} />
        </button>
      </div>
      <div className={s.sourceText}>{data.summary}</div>
      {data.quotes.map((q, i) => (
        <div key={i} className={s.sourceQuote}>{q}</div>
      ))}
      <div className={s.sourceInterpretation}>{data.interpretation}</div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Notes Panel
   ═══════════════════════════════════════════════════════════ */

function NotesPanel({
  state,
  onStateChange,
  showBriefThread,
  onStartMeeting,
  useGranolaBottomBar,
  useFloatingActions,
  useCompactToolbar,
}: {
  state: SageState;
  onStateChange: (s: SageState) => void;
  showBriefThread?: boolean;
  onStartMeeting?: () => void;
  useGranolaBottomBar?: boolean;
  useFloatingActions?: boolean;
  useCompactToolbar?: boolean;
}) {
  const [activeSourceId, setActiveSourceId] = useState<string | null>(null);
  const [showTemplates, setShowTemplates] = useState(state === "templates");
  const [showShare, setShowShare] = useState(state === "share");
  const [copyToast, setCopyToast] = useState(false);
  const [briefFlash, setBriefFlash] = useState(false);
  const [briefExpanded, setBriefExpanded] = useState(false);
  const flashTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const notesScrollRef = useRef<HTMLDivElement>(null);
  const meetingTitleRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const [actionsVisible, setActionsVisible] = useState(false);

  const isBrief = state === "pre-meeting-brief";
  const isPrivate = state === "private-notes";
  const isEnhanced = state === "enhanced-notes" || state === "templates" || state === "share" || state === "source-popover";
  const showToolbar = isEnhanced || isPrivate;
  const showTranscript = state === "transcript";
  const showChat = state === "chat";
  const isEnhancing = state === "enhancing";
  const showGenerateBtn = state === "empty-editor" || state === "generate-prompt";
  const isGeneratePrompt = state === "generate-prompt";
  const hasOpenOverlay = showTemplates || showShare || (activeSourceId != null && state === "source-popover");

  const [briefCountdown, setBriefCountdown] = useState(15);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isBrief) {
      setBriefCountdown(15);
      countdownRef.current = setInterval(() => {
        setBriefCountdown((prev) => {
          if (prev <= 1) {
            if (countdownRef.current) clearInterval(countdownRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 800);
      flashTimerRef.current = setTimeout(() => setBriefFlash(true), 12000);
    } else {
      setBriefFlash(false);
      setBriefCountdown(15);
      if (countdownRef.current) clearInterval(countdownRef.current);
    }
    return () => {
      if (flashTimerRef.current) clearTimeout(flashTimerRef.current);
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, [isBrief]);

  const meetingReady = briefCountdown <= 5;

  const scrollToActions = useCallback(() => {
    actionsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    setBriefExpanded(false);
  }, [state]);

  const onEnhancerComplete = useCallback(() => onStateChange("enhanced-notes"), [onStateChange]);
  const onEnhancerCancel = useCallback(() => onStateChange("enhanced-notes"), [onStateChange]);

  const dismissOverlays = useCallback(() => {
    if (showTemplates) { setShowTemplates(false); onStateChange("enhanced-notes"); }
    if (showShare) { setShowShare(false); onStateChange("enhanced-notes"); }
    if (activeSourceId) { setActiveSourceId(null); onStateChange("enhanced-notes"); }
  }, [showTemplates, showShare, activeSourceId, onStateChange]);

  useEffect(() => {
    setShowTemplates(state === "templates");
    setShowShare(state === "share");
    if (state === "source-popover") setActiveSourceId("src-3");
  }, [state]);

  useEffect(() => {
    if (!useFloatingActions || !isEnhanced || !notesScrollRef.current || !actionsRef.current) {
      setActionsVisible(false);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => setActionsVisible(Boolean(entries[0]?.isIntersecting)),
      { root: notesScrollRef.current, threshold: 0.25 },
    );
    observer.observe(actionsRef.current);
    return () => observer.disconnect();
  }, [useFloatingActions, isEnhanced, state]);

  // Escape key handler for all overlays
  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (showTemplates || showShare) {
        e.stopPropagation();
        setShowTemplates(false);
        setShowShare(false);
        onStateChange("enhanced-notes");
      } else if (activeSourceId && state === "source-popover") {
        e.stopPropagation();
        setActiveSourceId(null);
        onStateChange("enhanced-notes");
      } else if (showTranscript || showChat) {
        e.stopPropagation();
        onStateChange("enhanced-notes");
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [showTemplates, showShare, activeSourceId, state, showTranscript, showChat, onStateChange]);

  const handleCopyLink = useCallback(() => {
    setCopyToast(true);
    setTimeout(() => setCopyToast(false), 2000);
  }, []);

  return (
    <div className={s.notesPanelWrap}>
      <div className={s.notesPanel}>
        {/* Top Chrome / Toolbar */}
        {useCompactToolbar ? (
          <div className={`${s.windowChrome} ${s.windowChromeCompact}`}>
            <div className={s.trafficLights}>
              <div className={`${s.trafficDot} ${s.trafficRed}`} onClick={() => window.ipcRenderer?.send("close-sage-window")} style={{ cursor: "pointer" }} />
              <div className={`${s.trafficDot} ${s.trafficYellow}`} />
              <div className={`${s.trafficDot} ${s.trafficGreen}`} />
            </div>
            {showToolbar && (
              <>
                <button type="button" className={`${s.toolbarBtn} ${s.toolbarBtnDisabled}`} aria-label="List view (demo only)" disabled>
                  <IcoList />
                </button>
                <button
                  type="button"
                  className={showTemplates ? s.toolbarBtnActive : s.toolbarBtn}
                  aria-label="Templates"
                  aria-expanded={showTemplates}
                  onClick={() => {
                    const next = !showTemplates;
                    setShowTemplates(next);
                    setShowShare(false);
                    onStateChange(next ? "templates" : "enhanced-notes");
                  }}
                >
                  <IcoSparkle size={12} /> <IcoChevronRight />
                </button>
              </>
            )}
            <div className={s.toolbarSpacer} />
            {showToolbar && (
              <>
                <div className={s.segmentedControl}>
                  <div className={`${s.segmentedIndicator} ${isPrivate ? s.segmentedIndicatorRight : ""}`} />
                  <button
                    type="button"
                    className={`${s.segmentedBtn} ${!isPrivate ? s.segmentedBtnActive : ""}`}
                    onClick={() => { if (isPrivate) onStateChange("enhanced-notes"); }}
                  >
                    Enhanced
                  </button>
                  <button
                    type="button"
                    className={`${s.segmentedBtn} ${isPrivate ? s.segmentedBtnActive : ""}`}
                    onClick={() => { if (!isPrivate) onStateChange("private-notes"); }}
                  >
                    Private
                  </button>
                </div>
                <button
                  type="button"
                  className={showShare ? `${s.shareBtn} ${s.shareBtnOpen}` : s.shareBtn}
                  aria-expanded={showShare}
                  onClick={() => {
                    const next = !showShare;
                    setShowShare(next);
                    setShowTemplates(false);
                    onStateChange(next ? "share" : "enhanced-notes");
                  }}
                >
                  <IcoLock size={10} /> Share
                </button>
                <button type="button" className={s.toolbarBtn} aria-label="Copy link" onClick={handleCopyLink}>
                  <IcoLink />
                </button>
              </>
            )}
            <div className={s.chromeRight}>
              <button type="button" className={`${s.chromeIconBtn} ${s.chromeIconBtnDisabled}`} aria-label="Back (demo only)" disabled>
                <IcoChevronLeft size={10} />
              </button>
              <button type="button" className={`${s.chromeIconBtn} ${s.chromeIconBtnDisabled}`} aria-label="More options (demo only)" disabled>
                <IcoMore />
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className={s.windowChrome}>
              <div className={s.trafficLights}>
                <div className={`${s.trafficDot} ${s.trafficRed}`} onClick={() => window.ipcRenderer?.send("close-sage-window")} style={{ cursor: "pointer" }} />
                <div className={`${s.trafficDot} ${s.trafficYellow}`} />
                <div className={`${s.trafficDot} ${s.trafficGreen}`} />
              </div>
              <div className={s.toolbarSpacer} />
              <div className={s.chromeRight}>
                <button type="button" className={`${s.chromeIconBtn} ${s.chromeIconBtnDisabled}`} aria-label="Back (demo only)" disabled>
                  <IcoChevronLeft size={10} />
                </button>
                <button type="button" className={`${s.chromeIconBtn} ${s.chromeIconBtnDisabled}`} aria-label="More options (demo only)" disabled>
                  <IcoMore />
                </button>
              </div>
            </div>

            {showToolbar && (
              <div className={`${s.toolbar} ${s.toolbarAnimated}`}>
                <button type="button" className={`${s.toolbarBtn} ${s.toolbarBtnDisabled}`} aria-label="List view (demo only)" disabled>
                  <IcoList />
                </button>
                <button
                  type="button"
                  className={showTemplates ? s.toolbarBtnActive : s.toolbarBtn}
                  aria-label="Templates"
                  aria-expanded={showTemplates}
                  onClick={() => {
                    const next = !showTemplates;
                    setShowTemplates(next);
                    setShowShare(false);
                    onStateChange(next ? "templates" : "enhanced-notes");
                  }}
                >
                  <IcoSparkle size={12} /> <IcoChevronRight />
                </button>
                <div className={s.toolbarSpacer} />
                <div className={s.segmentedControl}>
                  <div className={`${s.segmentedIndicator} ${isPrivate ? s.segmentedIndicatorRight : ""}`} />
                  <button
                    type="button"
                    className={`${s.segmentedBtn} ${!isPrivate ? s.segmentedBtnActive : ""}`}
                    onClick={() => { if (isPrivate) onStateChange("enhanced-notes"); }}
                  >
                    Enhanced
                  </button>
                  <button
                    type="button"
                    className={`${s.segmentedBtn} ${isPrivate ? s.segmentedBtnActive : ""}`}
                    onClick={() => { if (!isPrivate) onStateChange("private-notes"); }}
                  >
                    Private
                  </button>
                </div>
                <button
                  type="button"
                  className={showShare ? `${s.shareBtn} ${s.shareBtnOpen}` : s.shareBtn}
                  aria-expanded={showShare}
                  onClick={() => {
                    const next = !showShare;
                    setShowShare(next);
                    setShowTemplates(false);
                    onStateChange(next ? "share" : "enhanced-notes");
                  }}
                >
                  <IcoLock size={10} /> Share
                </button>
                <button type="button" className={s.toolbarBtn} aria-label="Copy link" onClick={handleCopyLink}>
                  <IcoLink />
                </button>
              </div>
            )}
          </>
        )}

        {/* Content */}
        {isBrief ? (
          <div className={s.notesScroll}>
            <div className={s.briefHeader}>
              <div className={s.briefHeaderTitle}>{PRE_MEETING_BRIEF.meetingTitle}</div>
              <div className={s.briefHeaderMeta}>
                <span className={s.noteChip}>📅 Today · {PRE_MEETING_BRIEF.meetingTime}</span>
                <div className={s.briefHeaderAvatars}>
                  {PRE_MEETING_BRIEF.attendees.map((a) => (
                    <div key={a.name} className={s.notifAvatar}>{a.initials}</div>
                  ))}
                </div>
              </div>
            </div>
            <BriefContent />
          </div>
        ) : isEnhancing ? (
          <EnhancerView
            onComplete={onEnhancerComplete}
            onCancel={onEnhancerCancel}
          />
        ) : (
          <div ref={notesScrollRef} className={s.notesScroll}>
            {/* Brief: always pill+toggle, never auto-expanded */}
            {showBriefThread && (
              <>
                <div className={s.viewBriefPillWrap}>
                  <button
                    type="button"
                    className={s.viewBriefPill}
                    onClick={() => setBriefExpanded((v) => !v)}
                    aria-expanded={briefExpanded}
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ transform: briefExpanded ? "rotate(180deg)" : undefined, transition: "transform 200ms ease" }}>
                      <path d="M2 7L5 4l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {briefExpanded ? "Hide pre-meeting brief" : "View pre-meeting brief"}
                  </button>
                </div>
                {briefExpanded && (
                  <div className={s.briefThreadWrap}>
                    <BriefContent />
                  </div>
                )}
              </>
            )}

            <div ref={meetingTitleRef}>
              <div className={s.noteTitle}>{MEETING.title}</div>
              <div className={s.noteMeta}>
                <span className={s.noteChip}>📅 {MEETING.date}</span>
                <span className={s.noteChip}>👥 Me</span>
                <span className={s.noteChip}>+ Add to folder</span>
              </div>
            </div>

            {state === "empty-editor" && (
              <div className={s.notePlaceholder}>Write notes...</div>
            )}

            {isGeneratePrompt && (
              <div className={s.generatePromptArea}>
                <div className={s.meetingEndedBadge}>
                  <IcoStop size={10} /> Meeting ended · {MEETING.duration}
                </div>
                <div className={s.notePlaceholder}>
                  Generate notes or write your own...
                </div>
              </div>
            )}

            {isPrivate && (
              <ul className={s.privateNotesList}>
                {PRIVATE_NOTES.map((note, i) => (
                  <li key={i} className={s.privateNoteItem}>{note}</li>
                ))}
              </ul>
            )}

            {isEnhanced && (
              <>
                <EnhancedNotesContent
                  activeSourceId={activeSourceId}
                  onSourceClick={(id) => {
                    setActiveSourceId(id);
                    onStateChange("source-popover");
                  }}
                  onSourceClose={() => {
                    setActiveSourceId(null);
                    onStateChange("enhanced-notes");
                  }}
                />
                <div ref={actionsRef}>
                  <ActionsBar />
                </div>
              </>
            )}
          </div>
        )}

        {useFloatingActions && isEnhanced && !actionsVisible && (
          <>
            <div className={s.bottomFade} aria-hidden="true" />
            <button type="button" className={s.viewActionsFloat} onClick={scrollToActions}>
              <IcoSparkle size={12} /> View actions <IcoChevronRight size={10} />
            </button>
          </>
        )}

        {/* Generate Button */}
        {showGenerateBtn && (
          <div className={s.generateBtnWrap}>
            <button
              type="button"
              className={s.generateBtn}
              onClick={() => onStateChange("enhancing")}
            >
              <IcoSparkle size={14} /> Generate notes
            </button>
          </div>
        )}

        {/* Transcript / Chat overlays */}
        {showTranscript && <TranscriptPanel onClose={() => onStateChange("enhanced-notes")} />}
        {showChat && <ChatPanel onClose={() => onStateChange("enhanced-notes")} />}

        {/* Start Meeting button for brief state */}
        {isBrief && onStartMeeting && (
          <div className={s.briefBottomBar}>
            <button
              type="button"
              className={meetingReady
                ? `${s.briefStartBtn} ${briefFlash ? s.briefStartFlash : ""}`
                : s.briefCountdownBtn}
              onClick={onStartMeeting}
              onMouseEnter={() => setBriefFlash(false)}
            >
              {meetingReady
                ? <><IcoPlay size={12} /> Start Meeting</>
                : `Meeting starts in ${briefCountdown} min`}
            </button>
          </div>
        )}

        {/* Bottom Bar -- visible for notes states, hidden during brief */}
        {!isBrief && (
          <BottomBar
            onTranscript={() => onStateChange(showTranscript ? "enhanced-notes" : "transcript")}
            onResume={() => onStateChange("pill-expanded")}
            onChat={() => onStateChange(showChat ? "enhanced-notes" : "chat")}
            onFollowUp={() => {}}
            showResume={state === "empty-editor" || state === "generate-prompt"}
            askLabel={isEnhancing ? "Continue chat" : "Ask anything"}
            transcriptActive={showTranscript}
            chatActive={showChat}
            useGranolaLayout={useGranolaBottomBar}
          />
        )}
      </div>

      {/* Click-outside backdrop to dismiss dropdowns */}
      {hasOpenOverlay && (
        <div className={s.dropdownBackdrop} onClick={dismissOverlays} />
      )}

      {/* Toolbar dropdowns -- rendered outside .notesPanel to escape overflow:hidden */}
      {showTemplates && (
        <div className={s.toolbarDropdownOverlay}>
          <TemplatesDropdown onSelect={() => {
            setShowTemplates(false);
            onStateChange("enhancing");
          }} />
        </div>
      )}
      {showShare && (
        <div className={s.shareDropdownOverlay}>
          <ShareDropdown onAction={() => {
            setShowShare(false);
            onStateChange("enhanced-notes");
          }} />
        </div>
      )}

      {/* Copy link toast */}
      {copyToast && (
        <div className={s.sageToast}>✓ Link copied</div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Sage Overlay — floats on top of the main app
   ═══════════════════════════════════════════════════════════ */

export function SageOverlay() {
  const [state, setState] = useState<SageState>("landing");
  const [elapsed, setElapsed] = useState(0);
  const [briefThreadVisible, setBriefThreadVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const demoTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const meetingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearAllTimeouts = useCallback(() => {
    if (demoTimeoutRef.current) { clearTimeout(demoTimeoutRef.current); demoTimeoutRef.current = null; }
    if (meetingTimeoutRef.current) { clearTimeout(meetingTimeoutRef.current); meetingTimeoutRef.current = null; }
  }, []);

  const startRecordingTimer = useCallback(() => {
    setElapsed(0);
    timerRef.current = setInterval(() => setElapsed((e) => e + 1), 1000);
  }, []);

  const stopRecordingTimer = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  }, []);

  useEffect(() => {
    return () => { stopRecordingTimer(); clearAllTimeouts(); };
  }, [stopRecordingTimer, clearAllTimeouts]);

  const handleStateChange = useCallback(
    (newState: SageState) => {
      clearAllTimeouts();
      if (newState === "pill-collapsed" || newState === "pill-expanded" || newState === "meeting-active") {
        if (!timerRef.current) startRecordingTimer();
      } else {
        stopRecordingTimer();
      }
      setState(newState);
    },
    [startRecordingTimer, stopRecordingTimer, clearAllTimeouts],
  );

  // Auto-start the demo when mounted (window just opened)
  useEffect(() => {
    setBriefThreadVisible(false);
    setState("desktop-idle");
    demoTimeoutRef.current = setTimeout(() => setState("pre-meeting-notif"), 1500);
    return () => clearAllTimeouts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleViewBrief = useCallback(() => {
    clearAllTimeouts();
    setState("pre-meeting-brief");
  }, [clearAllTimeouts]);

  const handleStartMeeting = useCallback(() => {
    clearAllTimeouts();
    startRecordingTimer();
    setBriefThreadVisible(true);
    setState("meeting-active");
    demoTimeoutRef.current = setTimeout(() => {
      setState("pill-collapsed");
      meetingTimeoutRef.current = setTimeout(() => {
        stopRecordingTimer();
        setState("generate-prompt");
      }, 4000);
    }, 3000);
  }, [startRecordingTimer, stopRecordingTimer, clearAllTimeouts]);

  const handleLaunchMeeting = useCallback(() => {
    clearAllTimeouts();
    startRecordingTimer();
    setState("pill-collapsed");
    meetingTimeoutRef.current = setTimeout(() => {
      stopRecordingTimer();
      setState("empty-editor");
    }, 6000);
  }, [startRecordingTimer, stopRecordingTimer, clearAllTimeouts]);

  const isNotesPanel = NEEDS_NOTES_PANEL.has(state);
  const isIdle = state === "landing" || state === "desktop-idle";

  // Nothing to show
  if (isIdle) return null;

  return (
    <>
      {/* Floating notification — top right, tucked near macOS menu bar */}
      {state === "pre-meeting-notif" && (
        <div style={{ position: "fixed", top: 16, right: 16, zIndex: 9999 }}>
          <PreMeetingNotification
            onViewBrief={handleViewBrief}
            onDismiss={() => handleStateChange("desktop-idle")}
          />
        </div>
      )}

      {/* Meeting start notification — top right */}
      {state === "notification" && (
        <div style={{ position: "fixed", top: 16, right: 16, zIndex: 9999 }}>
          <Notification onLaunch={handleLaunchMeeting} />
        </div>
      )}

      {/* Recording pill — top center */}
      {state === "meeting-active" && (
        <div style={{ position: "fixed", top: 4, left: "50%", transform: "translateX(-50%)", zIndex: 9999 }}>
          <PillCollapsed onClick={() => {}} useNewPill />
        </div>
      )}
      {state === "pill-collapsed" && (
        <div style={{ position: "fixed", top: 4, left: "50%", transform: "translateX(-50%)", zIndex: 9999 }}>
          <PillCollapsed onClick={() => handleStateChange("pill-expanded")} useNewPill />
        </div>
      )}
      {state === "pill-expanded" && (
        <div style={{ position: "fixed", top: 4, left: "50%", transform: "translateX(-50%)", zIndex: 9999 }}>
          <PillExpanded
            onCollapse={() => handleStateChange("pill-collapsed")}
            onStop={() => handleStateChange("generate-prompt")}
            elapsed={elapsed}
            useNewPill
          />
        </div>
      )}

      {/* Notes Panel — right-aligned */}
      {isNotesPanel && (
        <div style={{
          position: "fixed",
          top: 16,
          right: 16,
          bottom: 16,
          width: 660,
          zIndex: 9998,
        }}>
          <div style={{
            width: "100%",
            height: "100%",
            borderRadius: 12,
            overflow: "hidden",
            boxShadow: "0 25px 60px rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.08)",
          }}>
            <NotesPanel
              state={state}
              onStateChange={handleStateChange}
              showBriefThread={briefThreadVisible && state !== "pre-meeting-brief"}
              onStartMeeting={handleStartMeeting}
              useGranolaBottomBar
              useFloatingActions
              useCompactToolbar
            />
          </div>
        </div>
      )}
    </>
  );
}
