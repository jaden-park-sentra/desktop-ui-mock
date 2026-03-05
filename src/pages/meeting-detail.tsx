import { useState, useRef, useEffect, useCallback } from 'react';

type Tab = 'summary' | 'transcript' | 'video' | 'participants';

interface TranscriptEntry {
  id: string;
  speaker: string;
  initials: string;
  timestamp: string;
  text: string;
}

const MEETING = {
  title: 'Weekly Team Standup',
  date: 'Wed, Mar 4, 2026',
  time: '2:00 PM',
  duration: '22 min',
  attendees: [
    { name: 'Alex Rivera', initials: 'AR' },
    { name: 'Jordan Kim', initials: 'JK' },
    { name: 'Taylor Brooks', initials: 'TB' },
    { name: 'Casey Morgan', initials: 'CM' },
    { name: 'Sam Patel', initials: 'SP' },
    { name: 'Riley Chen', initials: 'RC' },
  ],
};

const OVERVIEW = 'Team reviewed Q2 launch readiness and aligned on engineering priorities heading into the release sprint. Members shared progress on the API v2 rollout, dashboard performance improvements, and upcoming customer pilots.';

const KEY_POINTS = [
  'API v2 rollout: Jordan confirmed the auth service refactor is nearly complete; expects to unblock the notification system and dashboard refresh by end of week.',
  'Push notification reliability: Riley traced a 12% failure rate on Android to a token expiry bug and is shipping a fix today.',
  'Q2 launch prep: Taylor noted Vantage is waiting on the API v2 spec; will send by Wednesday. Sam is drafting the launch one-pager and targeting a Thursday morning draft.',
  'Module v2 design freeze: Jordan confirmed final screens will be ready Thursday night ahead of Friday\u2019s freeze.',
  'Enterprise pipeline: Casey flagged that Nexus is still evaluating against Gong and SOC 2 compliance came up again as a deciding factor.',
];

const NEXT_STEPS = [
  'Send API v2 spec to Vantage: Taylor to finalize and share the API v2 spec with Vantage by Wednesday.',
  'Fix push notification bug: Riley to ship the token expiry fix and verify Android notification delivery rates.',
  'Draft Q2 launch one-pager: Sam to have a draft ready by Thursday morning, leading with the commitment tracking use case.',
  'Complete Module v2 screens: Jordan to finalize all design screens before Friday\u2019s freeze at 5 PM.',
  'Document SOC 2 status for prospects: Taylor to add current SOC 2 audit timeline to the sales deck today.',
  'Monitor deploy pipeline: Riley to keep an eye on backend deploy flakiness and escalate if it starts blocking releases.',
];

const TRANSCRIPT: TranscriptEntry[] = [
  { id: '1', speaker: 'Alex Rivera', initials: 'AR', timestamp: '0:00', text: "Alright, let's get started. Quick round of updates — who wants to kick off?" },
  { id: '2', speaker: 'Jordan Kim', initials: 'JK', timestamp: '0:18', text: "I'll go. Auth refactor is still in progress but I'm about 70% done. Should unblock the notification system and the dashboard refresh. Targeting to have it merged by Friday EOD." },
  { id: '3', speaker: 'Riley Chen', initials: 'RC', timestamp: '0:52', text: "On the push notification side — we're seeing about a 12% failure rate on Android. I've traced it to a token expiry bug. Working on a fix today." },
  { id: '4', speaker: 'Taylor Brooks', initials: 'TB', timestamp: '1:24', text: "Good to know. On the product side — Vantage is waiting on the API v2 spec. I'll get that to them by Wednesday. Also, Q2 demo prep is top of mind. Sam, how's the one-pager coming?" },
  { id: '5', speaker: 'Sam Patel', initials: 'SP', timestamp: '1:55', text: "I'll have a draft by Thursday morning. Planning to lead with the commitment tracking angle since that's what resonated most with Vantage last week." },
  { id: '6', speaker: 'Alex Rivera', initials: 'AR', timestamp: '2:18', text: "Perfect. And reminder — Jordan, design freeze for Module v2 is Friday at 5. Can you make that?" },
  { id: '7', speaker: 'Jordan Kim', initials: 'JK', timestamp: '2:28', text: "Yes, I'll have the final screens done Thursday night." },
  { id: '8', speaker: 'Casey Morgan', initials: 'CM', timestamp: '2:41', text: "Quick customer update — I had a call with Nexus yesterday. They're still evaluating us against Gong but mentioned our roadmap timeline is a deciding factor. SOC 2 came up again." },
  { id: '9', speaker: 'Alex Rivera', initials: 'AR', timestamp: '3:04', text: "SOC 2 audit is tracking for mid-April completion. Once that's done we can move all four enterprise deals forward. Taylor, do we have that documented for prospects?" },
  { id: '10', speaker: 'Taylor Brooks', initials: 'TB', timestamp: '3:19', text: "I'll add it to the sales deck today. Anything else before we close?" },
  { id: '11', speaker: 'Riley Chen', initials: 'RC', timestamp: '3:31', text: "Just flagging — the backend deploy pipeline has been flaky since yesterday. Not blocking anyone yet, but keeping an eye on it." },
  { id: '12', speaker: 'Alex Rivera', initials: 'AR', timestamp: '3:44', text: "Noted. Alright, that's everything. See everyone Thursday at the roadmap review." },
];


const PlayIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5.14v14l11-7-11-7z" />
  </svg>
);

const SummaryTab = () => (
  <div className="mx-auto max-w-[900px] px-[32px] py-[28px]">
  <div className="flex flex-col gap-[24px]">

    <section>
      <h2 className="text-foreground font-[Inter,system-ui,sans-serif] text-[14px] font-semibold leading-[20px] m-0 mb-[10px]">
        Overview
      </h2>
      <p className="text-[var(--fg-subtle)] font-[Inter,system-ui,sans-serif] text-[14px] leading-[1.65] m-0">
        {OVERVIEW}
      </p>
    </section>

    <div className="bg-border-subtle h-px" />

    <section>
      <h2 className="text-foreground font-[Inter,system-ui,sans-serif] text-[14px] font-semibold leading-[20px] m-0 mb-3">
        Key Points &amp; Decisions
      </h2>
      <ul className="flex flex-col gap-[10px] list-none m-0 p-0">
        {KEY_POINTS.map((point, pointIndex) => (
          <li key={pointIndex} className="items-start text-[var(--fg-subtle)] flex font-[Inter,system-ui,sans-serif] text-[14px] gap-[10px] leading-[1.65]">
            <span className="text-disabled-foreground shrink-0 mt-px">·</span>
            <span>
              <strong className="text-foreground font-medium">{point.split(':')[0]}:</strong>
              {point.slice(point.indexOf(':') + 1)}
            </span>
          </li>
        ))}
      </ul>
    </section>

    <div className="bg-border-subtle h-px" />

    <section>
      <h2 className="text-foreground font-[Inter,system-ui,sans-serif] text-[14px] font-semibold leading-[20px] m-0 mb-3">
        Next Steps &amp; Action Items
      </h2>
      <ul className="flex flex-col gap-[10px] list-none m-0 p-0">
        {NEXT_STEPS.map((step, stepIndex) => (
          <li key={stepIndex} className="items-start text-[var(--fg-subtle)] flex font-[Inter,system-ui,sans-serif] text-[14px] gap-[10px] leading-[1.65]">
            <span className="text-disabled-foreground shrink-0 mt-px">·</span>
            <span>
              <strong className="text-foreground font-medium">{step.split(':')[0]}:</strong>
              {step.slice(step.indexOf(':') + 1)}
            </span>
          </li>
        ))}
      </ul>
    </section>
  </div>
  </div>
);

const TranscriptTab = () => {
  const [search, setSearch] = useState('');
  const [activeSpeaker, setActiveSpeaker] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownSearch, setDropdownSearch] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const speakers = Array.from(new Set(TRANSCRIPT.map((entry) => entry.speaker)));

  const filtered = TRANSCRIPT.filter((entry) => {
    const matchesSpeaker = activeSpeaker === null || entry.speaker === activeSpeaker;
    const matchesSearch = !search.trim() || entry.text.toLowerCase().includes(search.toLowerCase()) || entry.speaker.toLowerCase().includes(search.toLowerCase());
    return matchesSpeaker && matchesSearch;
  });

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setDropdownOpen(false);
    }
  }, []);

  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen, handleClickOutside]);

  return (
    <div className="flex flex-col overflow-hidden">
      {/* Controls */}
      <div className="sticky top-0 bg-background z-1">
        <div className="items-center flex gap-[10px] mx-auto max-w-[900px] px-[32px] py-[12px]">
          <div className="items-center bg-secondary-hover rounded-[8px] flex flex-1 gap-[6px] max-w-[320px] py-[6px] px-[10px]">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--fg-disabled)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search transcript..."
              className="appearance-none bg-transparent border-none text-foreground font-[Inter,system-ui,sans-serif] text-[12px] leading-[16px] outline-none w-full"
            />
          </div>

          {/* Speaker dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              type="button"
              onClick={() => { setDropdownOpen((previous) => !previous); setDropdownSearch(''); }}
              className={`items-center border-none rounded-[8px] cursor-pointer flex font-[Inter,system-ui,sans-serif] text-[12px] gap-[6px] outline-none px-[10px] py-[6px] ${activeSpeaker ? 'bg-primary text-white' : 'bg-secondary-hover text-[var(--fg-subtle)]'}`}
            >
              <svg width="12" height="12" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 4h11M4 8h7M6 12h3" />
              </svg>
              {activeSpeaker ? activeSpeaker.split(' ')[0] : 'All speakers'}
              <svg width="10" height="10" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 5l4.5 4.5L12 5" />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="bg-background border border-solid border-border rounded-[8px] shadow-[var(--shadow-md)] min-w-[200px] overflow-hidden absolute right-0 top-[calc(100%+4px)] z-10">
                {/* Search inside dropdown */}
                <div className="items-center border-b border-solid border-b-border-subtle flex gap-[6px] px-[12px] py-[8px]">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--fg-disabled)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <input
                    type="text"
                    value={dropdownSearch}
                    onChange={(event) => setDropdownSearch(event.target.value)}
                    placeholder="Search speakers..."
                    autoFocus
                    className="appearance-none bg-transparent border-none text-foreground font-[Inter,system-ui,sans-serif] text-[12px] leading-[16px] outline-none w-full"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => { setActiveSpeaker(null); setDropdownOpen(false); }}
                  className={`items-center border-none text-foreground cursor-pointer flex font-[Inter,system-ui,sans-serif] text-[13px] gap-[8px] px-[12px] py-[8px] text-left w-full ${activeSpeaker === null ? 'bg-secondary-hover' : 'bg-none'}`}
                >
                  <span className={`text-[10px] ${activeSpeaker === null ? 'text-primary' : 'text-transparent'}`}>✓</span>
                  All speakers
                </button>
                <div className="bg-border-subtle h-px" />
                {speakers
                  .filter((speaker) => !dropdownSearch.trim() || speaker.toLowerCase().includes(dropdownSearch.toLowerCase()))
                  .map((speaker) => (
                    <button
                      key={speaker}
                      type="button"
                      onClick={() => { setActiveSpeaker(speaker === activeSpeaker ? null : speaker); setDropdownOpen(false); }}
                      className={`items-center border-none text-foreground cursor-pointer flex font-[Inter,system-ui,sans-serif] text-[13px] gap-[8px] px-[12px] py-[8px] text-left w-full ${activeSpeaker === speaker ? 'bg-secondary-hover' : 'bg-none'}`}
                    >
                      <span className={`text-[10px] ${activeSpeaker === speaker ? 'text-primary' : 'text-transparent'}`}>✓</span>
                      {speaker}
                    </button>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Entries */}
      <div className="overflow-x-hidden">
        <div className="mx-auto max-w-[900px] px-[32px] py-[20px]">
        {filtered.length === 0 ? (
          <div className="text-disabled-foreground font-[Inter,system-ui,sans-serif] text-[13px] pt-[40px] text-center">
            No results found
          </div>
        ) : (
          <div className="flex flex-col gap-[2px]">
            {filtered.map((entry) => (
              <div key={entry.id} className="items-start rounded-[8px] flex gap-[14px] p-[10px]">
                <div className="items-center bg-disabled-foreground rounded-full text-white flex shrink-0 text-[10px] font-bold h-[28px] justify-center mt-px w-[28px]">
                  {entry.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="items-center flex gap-[8px] mb-[3px]">
                    <span className="text-foreground font-[Inter,system-ui,sans-serif] text-[13px] font-semibold leading-[16px]">
                      {entry.speaker}
                    </span>
                    <span className="text-disabled-foreground font-[Inter,system-ui,sans-serif] text-[11px] leading-[16px]">
                      {entry.timestamp}
                    </span>
                  </div>
                  <p className="text-[var(--fg-subtle)] font-[Inter,system-ui,sans-serif] text-[14px] leading-[1.6] m-0 wrap-break-word">
                    {entry.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

const VideoTab = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(18);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setProgress((previous) => {
          if (previous >= 100) { setIsPlaying(false); return 100; }
          return previous + 0.3;
        });
      }, 100);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isPlaying]);

  const totalSeconds = 22 * 60;
  const elapsed = Math.round((progress / 100) * totalSeconds);
  const elapsedMin = Math.floor(elapsed / 60);
  const elapsedSec = elapsed % 60;
  const formatTime = (seconds: number) => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;

  return (
    <div className="mx-auto max-w-[900px] px-[32px] py-[28px]">
    <div className="flex flex-col gap-[24px]">
      {/* Player */}
      <div className="rounded-[12px] overflow-hidden relative">
        {/* Video area */}
        <div
          className="items-center aspect-video bg-[#111113] cursor-pointer flex justify-center relative w-full"
          onClick={() => setIsPlaying((previous) => !previous)}
        >
          {/* Speaker thumbnails */}
          <div className="bottom-[52px] grid gap-[6px] grid-cols-3 left-1/2 max-w-[280px] absolute -translate-x-1/2 w-full">
            {MEETING.attendees.slice(0, 6).map((attendee) => (
              <div key={attendee.name} className="items-center aspect-4/3 bg-[#1c1c20] rounded-[6px] border-[1.5px] border-solid border-[rgba(255,255,255,0.06)] flex justify-center overflow-hidden relative">
                <div className="items-center bg-[rgba(255,255,255,0.15)] rounded-full text-white flex text-[13px] font-bold h-[36px] justify-center w-[36px]">
                  {attendee.initials}
                </div>
                <div className="bottom-[4px] text-[rgba(255,255,255,0.7)] font-[Inter,system-ui,sans-serif] text-[9px] left-[5px] absolute">
                  {attendee.name.split(' ')[0]}
                </div>
              </div>
            ))}
          </div>

          {/* Play/pause overlay */}
          <div className={`items-center bg-[rgba(0,0,0,0.5)] rounded-full text-white flex h-[48px] justify-center transition-opacity duration-200 ease-out w-[48px] z-2 ${isPlaying ? 'opacity-0' : 'opacity-100'}`}>
            <PlayIcon />
          </div>
        </div>

        {/* Controls bar */}
        <div className="bg-[#0f172a] px-[14px] pt-[8px] pb-[10px]">
          {/* Scrubber */}
          <div
            className="bg-[rgba(255,255,255,0.12)] rounded-full cursor-pointer h-[3px] mb-[8px] relative w-full"
            onClick={(event) => {
              const rect = event.currentTarget.getBoundingClientRect();
              setProgress(((event.clientX - rect.left) / rect.width) * 100);
            }}
          >
            <div className="bg-primary rounded-full h-full" style={{ width: `${progress}%` }} />
            <div className="bg-white rounded-full h-[10px] -ml-[5px] -mt-[3.5px] absolute top-0 w-[10px]" style={{ left: `${progress}%` }} />
          </div>

          <div className="items-center flex gap-[12px]">
            <button
              type="button"
              onClick={() => setIsPlaying((previous) => !previous)}
              className="items-center bg-none border-none text-white cursor-pointer flex p-0"
            >
              {isPlaying ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5.14v14l11-7-11-7z" />
                </svg>
              )}
            </button>
            <span className="text-[rgba(255,255,255,0.7)] font-[Inter,system-ui,sans-serif] text-[11px]">
              {`${elapsedMin}:${String(elapsedSec).padStart(2, '0')}`} / {formatTime(totalSeconds)}
            </span>
            <div className="flex-1" />
            <button type="button" className="items-center bg-none border-none text-[rgba(255,255,255,0.6)] cursor-pointer flex p-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
              </svg>
            </button>
          </div>
        </div>
      </div>

    </div>
    </div>
  );
};

const ParticipantsTab = () => (
  <div className="mx-auto max-w-[900px] px-[32px] py-[24px]">
    <div className="flex flex-col">
      {MEETING.attendees.map((attendee) => (
        <div key={attendee.name}>
          <div className="items-center flex gap-[12px] py-[12px]">
            <div className="items-center bg-disabled-foreground rounded-full text-white flex shrink-0 text-[11px] font-bold h-[32px] justify-center w-[32px]">
              {attendee.initials}
            </div>
            <span className="text-foreground font-[Inter,system-ui,sans-serif] text-[14px] leading-[20px]">
              {attendee.name}
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const MeetingDetailPage = () => {
  const [activeTab, setActiveTab] = useState<Tab>('summary');
  const [title, setTitle] = useState(MEETING.title);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const [chatInput, setChatInput] = useState('');

  const handleTitleClick = () => {
    setIsEditingTitle(true);
    setTimeout(() => titleInputRef.current?.select(), 0);
  };

  const handleTitleBlur = () => setIsEditingTitle(false);

  const handleTitleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' || event.key === 'Escape') {
      setIsEditingTitle(false);
    }
  };

  const tabs: { id: Tab; label: string }[] = [
    { id: 'summary', label: 'Summary' },
    { id: 'transcript', label: 'Transcript' },
    { id: 'video', label: 'Video' },
    { id: 'participants', label: 'People' },
  ];

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden">

      {/* Header */}
      <div className="shrink-0">

        {/* Centered content */}
        <div className="mx-auto max-w-[900px] px-[32px] pt-[32px]">

        {/* Editable title */}
        <div className="mb-[10px]">
          {isEditingTitle ? (
            <input
              ref={titleInputRef}
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              onBlur={handleTitleBlur}
              onKeyDown={handleTitleKeyDown}
              className="bg-transparent border-none border-b-[1.5px] border-b-solid border-b-primary text-foreground font-[Inter,system-ui,sans-serif] text-[18px] font-semibold leading-[24px] outline-none py-[2px] px-0 w-full"
            />
          ) : (
            <button
              type="button"
              onClick={handleTitleClick}
              className="bg-none border-none text-foreground cursor-text font-[Inter,system-ui,sans-serif] text-[18px] font-semibold leading-[24px] py-[2px] px-0 text-left w-full"
            >
              {title}
            </button>
          )}
        </div>

        {/* Meeting meta */}
        <div className="items-center flex gap-[14px] mb-[14px]">
          <span className="text-muted-foreground font-[Inter,system-ui,sans-serif] text-[13px]">
            {MEETING.date} · {MEETING.time} · {MEETING.duration}
          </span>
          <span className="text-disabled-foreground font-[Inter,system-ui,sans-serif] text-[13px]">
            {MEETING.attendees.length} people
          </span>
        </div>

        {/* Tabs */}
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`bg-none border-0 border-b-2 border-b-solid cursor-pointer font-[Inter,system-ui,sans-serif] text-[13px] -mb-px mr-[20px] px-[2px] pt-0 pb-[10px] transition-colors duration-120 ease-out ${activeTab === tab.id ? 'border-b-foreground text-foreground font-medium' : 'border-b-transparent text-muted-foreground font-normal'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        </div>{/* end centered wrapper */}
      </div>

      {/* Tab content */}
      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden">
        {activeTab === 'summary' && <SummaryTab />}
        {activeTab === 'transcript' && <TranscriptTab />}
        {activeTab === 'video' && <VideoTab />}
        {activeTab === 'participants' && <ParticipantsTab />}
      </div>

      {/* Chat input bar */}
      <div className="flex justify-center px-6 py-4 shrink-0">
        <div className="flex items-center gap-2 w-full max-w-xl bg-background border border-border rounded-full shadow-md pl-5 pr-2 py-2">
          <input
            type="text"
            value={chatInput}
            onChange={(event) => setChatInput(event.target.value)}
            onKeyDown={(event) => { if (event.key === 'Enter' && chatInput.trim()) setChatInput(''); }}
            placeholder="Ask about this meeting..."
            className="flex-1 bg-transparent border-none outline-none text-foreground text-sm placeholder:text-foreground/40"
          />
          <button
            type="button"
            onClick={() => { if (chatInput.trim()) setChatInput(''); }}
            className={`flex items-center justify-center w-8 h-8 rounded-full shrink-0 transition-opacity ${chatInput.trim() ? 'opacity-100 cursor-pointer' : 'opacity-30 cursor-default'}`}
          >
            <img src="/sentra.png" alt="Send" className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MeetingDetailPage;
