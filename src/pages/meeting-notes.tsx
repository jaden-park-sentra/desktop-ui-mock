import { useState, useCallback, useRef, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputActions,
  PromptInputAction,
} from '../components/prompt-kit/prompt-input';
import {
  Message,
  MessageContent,
  MessageActions,
  MessageAction,
} from '../components/prompt-kit/message';

interface Meeting {
  id: string;
  title: string;
  attendees: string;
  time: string;
  icon: 'multi' | 'single' | 'lock';
}

interface MeetingGroup {
  label: string;
  meetings: Meeting[];
}

interface ResearchMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const MEETING_GROUPS: MeetingGroup[] = [
  {
    label: 'Today',
    meetings: [
      { id: 'standup', title: 'Weekly Team Standup', attendees: 'Ashwin, Andrey, Justin & 3 others', time: '2:00 PM', icon: 'multi' },
      { id: 'roadmap', title: 'Product Roadmap Review', attendees: 'Andrey, Justin', time: '4:30 PM', icon: 'lock' },
      { id: 'oneonone', title: 'Ashwin / Justin 1:1', attendees: 'Ashwin Gopinath', time: '11:30 AM', icon: 'single' },
    ],
  },
  {
    label: 'Tue, Feb 25',
    meetings: [
      { id: 'relay', title: 'Customer Discovery — Relay', attendees: 'Sarah Chen, Justin', time: '3:00 PM', icon: 'single' },
      { id: 'gtm', title: 'GTM Strategy Sync', attendees: 'Ashwin, Justin, Kristina', time: '10:00 AM', icon: 'multi' },
    ],
  },
  {
    label: 'Mon, Feb 24',
    meetings: [
      { id: 'investor', title: 'Investor Update Prep', attendees: 'Ashwin, Justin', time: '4:00 PM', icon: 'lock' },
      { id: 'design', title: 'Design Review — Pill v2', attendees: 'Andrey, Justin', time: '1:30 PM', icon: 'single' },
      { id: 'sxsw', title: 'SXSW Launch Planning', attendees: 'Ashwin, Andrey, Justin, Kristina', time: '9:30 AM', icon: 'multi' },
      { id: 'api', title: 'API Integration Review', attendees: 'Andrey, Justin', time: '8:30 AM', icon: 'multi' },
    ],
  },
];



interface UpcomingDay {
  label: string;
  weekday: string;
  date: string;
  meetings: Meeting[];
}

const UPCOMING_DAYS: UpcomingDay[] = [
  {
    label: 'today',
    weekday: 'Wed',
    date: '26',
    meetings: MEETING_GROUPS[0].meetings,
  },
  {
    label: 'tomorrow',
    weekday: 'Thu',
    date: '27',
    meetings: [
      { id: 'eng-sync', title: 'Sentra Eng Sync', attendees: 'Andrey, Justin', time: '3:15 PM', icon: 'multi' },
      { id: 'design-review', title: 'Design Review — Pill v3', attendees: 'Andrey, Justin', time: '11:00 AM', icon: 'single' },
    ],
  },
  {
    label: 'friday',
    weekday: 'Fri',
    date: '28',
    meetings: [
      { id: 'all-hands', title: 'All Hands', attendees: 'Ashwin, Andrey, Justin, Kristina & 8 others', time: '3:00 PM', icon: 'multi' },
      { id: 'investor-call', title: 'Investor Call — Series A', attendees: 'Ashwin, Justin', time: '10:30 AM', icon: 'lock' },
    ],
  },
];

const RESEARCH_SUGGESTIONS = [
  'Summarize recent meetings',
  'What decisions were made this week?',
  'What action items are outstanding?',
  'Who was in the last standup?',
];

const RESEARCH_RESPONSES: Record<number, string> = {
  0: `Here's a summary of your recent meetings:

**Today**
- Weekly Team Standup (2:00 PM) — 6 attendees; reviewed sprint blockers and Q2 priorities
- Product Roadmap Review (4:30 PM) — Andrey & Justin; roadmap finalization
- Ashwin / Justin 1:1 (11:30 AM) — leadership sync

**Tue, Feb 25**
- Customer Discovery — Relay: Sarah Chen flagged onboarding friction
- GTM Strategy Sync: Q2 launch sequencing discussion

*Based on 9 meetings across the past 3 days.*`,

  1: `Decisions made this week:

1. **Ship API v2 by March 14** — agreed in API Integration Review
2. **Pause SMB self-serve** until SOC 2 is complete — GTM Strategy Sync
3. **Design freeze for Pill v2** this Friday — Design Review
4. **SXSW demo targets Relay and Meridian** as anchor accounts — SXSW Planning

*Sources: 5 meeting transcripts*`,

  2: `Outstanding action items as of today:

**Eng**
- [ ] Andrey: complete auth refactor by Fri
- [ ] Justin: respond to Relay API proposal

**Design**
- [ ] Andrey: finalize Pill v2 screens before design freeze

**GTM**
- [ ] Kristina: draft SXSW one-pager
- [ ] Ashwin: schedule investor update call

*Sources: 4 meeting notes · 2 follow-up threads*`,

  3: `Last standup attendees (Today, 2:00 PM):

- **Ashwin Gopinath** — engineering lead
- **Andrey Ivanov** — design
- **Justin Park** — product
- **Sarah Chen** — customer success
- **Kristina Lee** — marketing
- **Marcus Webb** — backend eng

6 attendees total. Ashwin ran the meeting. Duration: 22 minutes.`,
};

const getResearchResponse = (index: number): string =>
  RESEARCH_RESPONSES[index % Object.keys(RESEARCH_RESPONSES).length];

const DEFAULT_PANEL_WIDTH = 300;
const MIN_PANEL_WIDTH = 240;
const MAX_PANEL_WIDTH = 480;

type MeetingIconType = 'multi' | 'single' | 'lock';

const MEETING_COLOR: Record<MeetingIconType, string> = {
  multi: '#2B7FFF',
  single: '#10B981',
  lock: '#8B5CF6',
};

const MeetingIcon = ({ type }: { type: MeetingIconType }) => {
  if (type === 'multi') return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C4CDD5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
  if (type === 'lock') return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C4CDD5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C4CDD5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  );
};

const DotsLoader = () => (
  <div className="items-center flex gap-1 h-4 px-0.5">
    {[0, 1, 2].map((dotIndex) => (
      <span
        key={dotIndex}
        className="[animation-duration:1.1s] [animation-fill-mode:both] [animation-iteration-count:infinite] [animation-name:mnDotBounce] bg-[#A1A1AA] rounded-full block h-1 w-1"
        style={{ animationDelay: `${dotIndex * 0.18}s` }}
      />
    ))}
    <style>{`
      @keyframes mnDotBounce {
        0%, 80%, 100% { transform: scale(0.7); opacity: 0.4; }
        40% { transform: scale(1); opacity: 1; }
      }
    `}</style>
  </div>
);

const MeetingNotesPage = () => {
  const navigate = useNavigate();

  const [panelWidth, setPanelWidth] = useState(DEFAULT_PANEL_WIDTH);
  const [showPanel, setShowPanel] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredMeetingId, setHoveredMeetingId] = useState<string | null>(null);

  const [researchInput, setResearchInput] = useState('');
  const [researchMessages, setResearchMessages] = useState<ResearchMessage[]>([]);
  const [researchLoading, setResearchLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const researchMessageCountRef = useRef(0);
  const researchEndRef = useRef<HTMLDivElement>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const [isDraggingActive, setIsDraggingActive] = useState(false);
  const [isHandleHovered, setIsHandleHovered] = useState(false);

  useEffect(() => {
    researchEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [researchMessages, researchLoading]);

  const filteredGroups = useMemo(() => {
    if (!searchQuery.trim()) return MEETING_GROUPS;
    const query = searchQuery.toLowerCase();
    return MEETING_GROUPS
      .map((group) => ({
        ...group,
        meetings: group.meetings.filter(
          (meeting) =>
            meeting.title.toLowerCase().includes(query) ||
            meeting.attendees.toLowerCase().includes(query)
        ),
      }))
      .filter((group) => group.meetings.length > 0);
  }, [searchQuery]);

  const handleDragStart = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    isDragging.current = true;
    setIsDraggingActive(true);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';

    const onMove = (moveEvent: MouseEvent) => {
      if (!isDragging.current || !containerRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const newWidth = Math.round(containerRect.right - moveEvent.clientX);
      setPanelWidth(Math.max(MIN_PANEL_WIDTH, Math.min(MAX_PANEL_WIDTH, newWidth)));
    };

    const onUp = () => {
      isDragging.current = false;
      setIsDraggingActive(false);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  }, []);

  const handleDragDoubleClick = useCallback(() => {
    setPanelWidth(DEFAULT_PANEL_WIDTH);
  }, []);

  const handleResearchSubmit = useCallback(() => {
    const trimmed = researchInput.trim();
    if (!trimmed || researchLoading) return;

    const userMessage: ResearchMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: trimmed,
    };

    const responseIndex = researchMessageCountRef.current;
    researchMessageCountRef.current += 1;

    setResearchMessages((previous) => [...previous, userMessage]);
    setResearchInput('');
    setResearchLoading(true);

    setTimeout(() => {
      setResearchMessages((previous) => [
        ...previous,
        { id: `assistant-${Date.now()}`, role: 'assistant', content: getResearchResponse(responseIndex) },
      ]);
      setResearchLoading(false);
    }, 1600);
  }, [researchInput, researchLoading]);

  const handleSuggestionClick = useCallback((suggestion: string) => {
    setResearchInput(suggestion);
  }, []);

  const handleCopy = useCallback((messageId: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(messageId);
    setTimeout(() => setCopiedId(null), 2000);
  }, []);

  const hasResearchMessages = researchMessages.length > 0;
  const canSubmit = researchInput.trim().length > 0 && !researchLoading;

  return (
    <div ref={containerRef} className="bg-background flex h-full text-xs [font-synthesis:none] antialiased overflow-clip">

      {/* ── Main content ── */}
      <div className="flex basis-0 flex-col grow shrink h-full overflow-clip items-center pb-0 px-6 pt-14 relative">

        {/* Top bar */}
        <div className="items-center flex justify-end left-5 absolute right-5 top-3">
          <div className="items-center flex gap-1.5">
            <div className="items-center bg-secondary-hover rounded-lg flex gap-1.5 py-1.5 px-2.5">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--fg-disabled)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search meetings..."
                className="border-none outline-none bg-transparent text-foreground font-[Inter,system-ui,sans-serif] text-[13px] leading-4 w-[160px]"
              />
            </div>
            <div className="items-center flex h-[30px] justify-center w-[30px]">
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                <path d="M2 4h12M4 8h8M6 12h4" stroke="var(--fg-subtle)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div className="items-center flex h-[30px] justify-center w-[30px]">
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                <path d="M8 2V10" stroke="var(--fg-muted)" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M4.5 5.5L8 2L11.5 5.5" stroke="var(--fg-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2.5 14H13.5" stroke="var(--fg-muted)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            {!showPanel && (
              <button
                type="button"
                onClick={() => setShowPanel(true)}
                className="items-center bg-info-subtle border-none rounded-md text-primary cursor-pointer flex font-[Inter,system-ui,sans-serif] text-[11px] font-medium gap-1 leading-none px-[9px] py-[5px]"
              >
                <svg width="11" height="11" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="7.5" cy="7.5" r="6" /><path d="M5 7.5h5M7.5 5v5" />
                </svg>
                Research
              </button>
            )}
          </div>
        </div>

        <div className="pt-6 w-full" />

        {/* Upcoming — single card with all days */}
        <div className="bg-background border-border rounded-xl border-solid border flex flex-col shrink-0 w-full max-w-[680px]">
          {UPCOMING_DAYS.map((day) => (
            <div key={day.label} className="flex items-start gap-4 px-5 py-4">
              <div className="bg-secondary flex flex-col items-center rounded-lg shrink-0 w-12 pt-2 pb-2 gap-0.5">
                <div className="text-muted-foreground font-[Inter,system-ui,sans-serif] text-[10px] leading-none uppercase tracking-wide">
                  {day.weekday}
                </div>
                <div className="text-foreground font-[Inter,system-ui,sans-serif] text-xl leading-none">
                  {day.date}
                </div>
              </div>
              <div className="flex flex-col gap-2.5 flex-1 min-w-0 pt-1">
                {day.meetings.map((meeting) => (
                  <button
                    key={meeting.id}
                    type="button"
                    onClick={() => navigate('/meeting-detail')}
                    className="bg-transparent border-none cursor-pointer flex items-center gap-3 p-0 text-left w-full"
                  >
                    <div className="rounded-full shrink-0 w-[3px] self-stretch" style={{ backgroundColor: MEETING_COLOR[meeting.icon] }} />
                    <div className="text-foreground font-[Inter,system-ui,sans-serif] text-sm leading-5 flex-1 min-w-0 truncate">
                      {meeting.title}
                    </div>
                    <div className="text-muted-foreground font-[Inter,system-ui,sans-serif] text-xs leading-4 shrink-0">
                      {meeting.time}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Meeting list */}
        <div className="flex basis-0 flex-col grow shrink mt-2 w-full max-w-[680px] overflow-y-auto">
          {filteredGroups.length === 0 ? (
            <div className="items-center text-disabled-foreground flex font-[Inter,system-ui,sans-serif] text-[13px] justify-center py-10">
              No meetings match "{searchQuery}"
            </div>
          ) : (
            filteredGroups.map((group) => (
              <div key={group.label} className={`flex flex-col ${group.label === 'Today' ? 'mt-0' : 'mt-1'}`}>
                <div className="items-center flex py-2">
                  <div className="text-disabled-foreground font-[Inter,system-ui,sans-serif] text-xs font-medium tracking-[0.06em] leading-4">
                    {group.label}
                  </div>
                </div>
                {group.meetings.map((meeting) => (
                  <button
                    key={meeting.id}
                    type="button"
                    onClick={() => navigate('/meeting-detail')}
                    onMouseEnter={() => setHoveredMeetingId(meeting.id)}
                    onMouseLeave={() => setHoveredMeetingId(null)}
                    className={`items-center ${hoveredMeetingId === meeting.id ? 'bg-[var(--bg-base-hover)]' : 'bg-transparent'} border-none rounded-lg cursor-pointer flex gap-3 py-2.5 px-3 text-left w-full`}
                  >
                    <div className="flex basis-0 flex-col grow shrink gap-0.5">
                      <div className="text-foreground font-[Inter,system-ui,sans-serif] text-sm font-medium leading-[18px]">
                        {meeting.title}
                      </div>
                      <div className="text-disabled-foreground font-[Inter,system-ui,sans-serif] text-xs leading-4">
                        {meeting.attendees}
                      </div>
                    </div>
                    <div className="items-center flex flex-row-reverse gap-2">
                      <div className="text-disabled-foreground font-[Inter,system-ui,sans-serif] text-xs leading-4">
                        {meeting.time}
                      </div>
                      <MeetingIcon type={meeting.icon} />
                    </div>
                  </button>
                ))}
              </div>
            ))
          )}
        </div>
      </div>

      {showPanel && (
        <>
          {/* ── Drag handle ── */}
          {/* HACK: needs pointer events on a narrow hit area; 1px visual + 8px hover zone via negative margins */}
          <div
            onMouseDown={handleDragStart}
            onDoubleClick={handleDragDoubleClick}
            onMouseEnter={() => setIsHandleHovered(true)}
            onMouseLeave={() => setIsHandleHovered(false)}
            role="separator"
            aria-orientation="vertical"
            className="cursor-col-resize shrink-0 w-2 mx-[-3px] z-10 relative flex items-center justify-center"
          >
            <div className={`${isDraggingActive ? 'bg-primary' : isHandleHovered ? 'bg-disabled-foreground' : 'bg-border-subtle'} rounded-full inset-y-0 absolute [transition:background_120ms_ease,width_120ms_ease] ${isDraggingActive ? 'w-0.5' : 'w-px'}`} />
            <div className={`items-center ${isDraggingActive ? 'bg-primary' : 'bg-border'} rounded-full flex flex-col gap-[3px] ${isHandleHovered || isDraggingActive ? 'opacity-100' : 'opacity-0'} px-0.5 py-[5px] relative [transition:opacity_120ms_ease,background_120ms_ease] z-1`}>
              {[0, 1, 2].map((dotIndex) => (
                <div
                  key={dotIndex}
                  className={`${isDraggingActive ? 'bg-white' : 'bg-disabled-foreground'} rounded-full h-[3px] w-[3px]`}
                />
              ))}
            </div>
          </div>

          {/* ── Research panel ── */}
          <div className="flex flex-col shrink-0 h-full bg-background overflow-hidden" style={{ width: panelWidth }}>
            {/* Header */}
            <div className="items-center border-b border-b-border-subtle flex gap-2 h-11 px-4 shrink-0">
              <span className="text-foreground flex-1 font-[Inter,system-ui,sans-serif] text-[13px] font-semibold leading-4">Research</span>
              {hasResearchMessages && (
                <button
                  type="button"
                  onClick={() => { setResearchMessages([]); researchMessageCountRef.current = 0; }}
                  className="items-center bg-transparent border border-solid border-border-subtle rounded text-muted-foreground cursor-pointer flex font-[Inter,system-ui,sans-serif] text-[10px] gap-[3px] leading-none px-[7px] py-[3px]"
                >
                  New chat
                </button>
              )}
              <button
                type="button"
                onClick={() => setShowPanel(false)}
                className="items-center bg-transparent border-none rounded text-muted-foreground cursor-pointer flex h-[22px] justify-center p-0 w-[22px]"
              >
                <svg width="13" height="13" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4.5 4.5L10.5 10.5M10.5 4.5L4.5 10.5" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className={`bg-muted flex flex-1 flex-col min-h-0 overflow-y-auto ${hasResearchMessages ? 'pt-4 px-0 pb-2' : 'py-8 px-4'}`}>
              {!hasResearchMessages ? (
                <div className="items-center flex flex-col gap-2 text-center">
                  <h3 className="text-foreground font-[Inter,system-ui,sans-serif] text-[13px] font-semibold leading-4 m-0">Ask anything</h3>
                  <p className="text-muted-foreground font-[Inter,system-ui,sans-serif] text-xs leading-[18px] m-0">
                    Research across your meetings, documents, and the web.
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center mt-3">
                    {RESEARCH_SUGGESTIONS.map((suggestion) => (
                      <button
                        key={suggestion}
                        type="button"
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="items-center bg-background border border-solid border-border-subtle rounded-[20px] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_0_0_1px_rgba(0,0,0,0.06)] text-[var(--fg-subtle)] cursor-pointer inline-flex font-[Inter,system-ui,sans-serif] text-xs leading-4 px-3 py-1.5 whitespace-nowrap"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-4 px-4">
                  {researchMessages.map((researchMessage) =>
                    researchMessage.role === 'user' ? (
                      <Message key={researchMessage.id} className="justify-end">
                        <MessageContent className="bg-secondary rounded-[16px_16px_4px_16px] text-foreground text-xs max-w-[85%] px-3 py-2">
                          {researchMessage.content}
                        </MessageContent>
                      </Message>
                    ) : (
                      <Message key={researchMessage.id} className="items-start group">
                        <div className="flex flex-col gap-1 flex-1 min-w-0">
                          <MessageContent markdown className="p-0 text-xs">
                            {researchMessage.content}
                          </MessageContent>
                          <MessageActions className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <MessageAction
                              tooltip="Copy"
                              onClick={() => handleCopy(researchMessage.id, researchMessage.content)}
                              className={copiedId === researchMessage.id ? 'text-success' : ''}
                            >
                              <svg width="11" height="11" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="4" y="4" width="8" height="8" rx="1" /><path d="M3 10V3h7" />
                              </svg>
                            </MessageAction>
                          </MessageActions>
                        </div>
                      </Message>
                    )
                  )}
                  {researchLoading && (
                    <Message className="items-center">
                      <DotsLoader />
                    </Message>
                  )}
                  <div ref={researchEndRef} />
                </div>
              )}
            </div>

            {/* Input */}
            <div className="bg-background border-t border-t-border-subtle shrink-0 px-3 py-2.5">
              <PromptInput
                value={researchInput}
                onValueChange={setResearchInput}
                isLoading={researchLoading}
                onSubmit={handleResearchSubmit}
                maxHeight={100}
                className="rounded-lg border-border-subtle"
              >
                <PromptInputTextarea
                  placeholder="Ask a question..."
                  className="text-xs px-3 py-2 min-h-[32px]"
                />
                <PromptInputActions className="justify-between px-2 pb-1.5">
                  <span className="text-disabled-foreground font-[Inter,system-ui,sans-serif] text-[11px] leading-none">
                    Meetings &amp; web
                  </span>
                  <PromptInputAction tooltip={canSubmit ? 'Send' : 'Type to send'}>
                    <button
                      type="button"
                      onClick={handleResearchSubmit}
                      disabled={!canSubmit}
                      className={`items-center ${canSubmit ? 'bg-primary' : 'bg-disabled-foreground'} border-none rounded-full ${canSubmit ? 'shadow-[0_0_0_1px_var(--brand-800),0_1px_2px_rgba(0,0,0,0.3)]' : 'shadow-none'} text-white ${canSubmit ? 'cursor-pointer' : 'cursor-not-allowed'} flex shrink-0 h-6 justify-center p-0 w-6`}
                    >
                      {researchLoading ? (
                        <svg width="10" height="10" viewBox="0 0 15 15" fill="currentColor">
                          <rect x="4" y="4" width="7" height="7" rx="1" />
                        </svg>
                      ) : (
                        <svg width="11" height="11" viewBox="0 0 15 15" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M7.5 12V3M3.5 7L7.5 3L11.5 7" />
                        </svg>
                      )}
                    </button>
                  </PromptInputAction>
                </PromptInputActions>
              </PromptInput>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MeetingNotesPage;
