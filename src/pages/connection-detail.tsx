import { useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';

interface ConnectionDetail {
  id: string;
  name: string;
  role: string;
  company: string;
  email: string;
  metAt: string;
  metDate: string;
  avatarColor: string;
  bio: string;
  meetings: ConnectionMeeting[];
  notes: string;
}

interface ConnectionMeeting {
  id: string;
  title: string;
  date: string;
}

const CONNECTIONS: Record<string, ConnectionDetail> = {
  ashwin: {
    id: 'ashwin',
    name: 'Ashwin Gopinath',
    role: 'Engineering Lead',
    company: 'Sentra',
    email: 'ashwin@sentra.co',
    metAt: 'Co-founder',
    metDate: 'Since founding',
    avatarColor: '#6366F1',
    bio: 'Co-founder and engineering lead. Oversees platform architecture and infrastructure. Previously at Google (L5) and Stripe.',
    meetings: [
      { id: '1', title: 'Weekly Team Standup', date: 'Today' },
      { id: '2', title: 'Ashwin / Justin 1:1', date: 'Today' },
      { id: '3', title: 'Investor Update Prep', date: 'Feb 24' },
      { id: '4', title: 'SXSW Launch Planning', date: 'Feb 24' },
    ],
    notes: 'Wants to ship auth refactor by EOW. Excited about Relay integration. Prefers async over standup format.',
  },
  andrey: {
    id: 'andrey',
    name: 'Andrey Ivanov',
    role: 'Design Lead',
    company: 'Sentra',
    email: 'andrey@sentra.co',
    metAt: 'Co-founder',
    metDate: 'Since founding',
    avatarColor: '#2563EB',
    bio: 'Co-founder and design lead. Owns product design, design systems, and brand. Previously at Figma and Airbnb.',
    meetings: [
      { id: '1', title: 'Weekly Team Standup', date: 'Today' },
      { id: '2', title: 'Product Roadmap Review', date: 'Today' },
      { id: '3', title: 'Design Review — Pill v2', date: 'Feb 24' },
      { id: '4', title: 'API Integration Review', date: 'Feb 24' },
    ],
    notes: 'Finalizing Pill v2 screens before design freeze Friday. Wants to push more opinionated defaults in the product.',
  },
  sarah: {
    id: 'sarah',
    name: 'Sarah Chen',
    role: 'Head of Customer Success',
    company: 'Relay',
    email: 'sarah.chen@relay.io',
    metAt: 'Customer Discovery — Relay',
    metDate: 'Feb 25',
    avatarColor: '#DB2777',
    bio: 'Leads customer success at Relay. Key contact for our integration partnership. Flagged onboarding friction as the top barrier to adoption.',
    meetings: [
      { id: '1', title: 'Customer Discovery — Relay', date: 'Feb 25' },
      { id: '2', title: 'Weekly Team Standup', date: 'Today' },
    ],
    notes: "Very responsive over email. Relay's team is evaluating three vendors — we need to move fast on API docs. She reports to James Liu (CTO).",
  },
  kristina: {
    id: 'kristina',
    name: 'Kristina Lee',
    role: 'Marketing Lead',
    company: 'Sentra',
    email: 'kristina@sentra.co',
    metAt: 'GTM Strategy Sync',
    metDate: 'Feb 25',
    avatarColor: '#059669',
    bio: 'Marketing lead at Sentra. Owns GTM strategy, content, and SXSW launch planning. Previously at HubSpot.',
    meetings: [
      { id: '1', title: 'GTM Strategy Sync', date: 'Feb 25' },
      { id: '2', title: 'SXSW Launch Planning', date: 'Feb 24' },
    ],
    notes: 'Drafting SXSW one-pager. Wants to align messaging with the Relay and Meridian use cases before launch.',
  },
  marcus: {
    id: 'marcus',
    name: 'Marcus Webb',
    role: 'Backend Engineer',
    company: 'Sentra',
    email: 'marcus@sentra.co',
    metAt: 'Weekly Team Standup',
    metDate: 'Feb 24',
    avatarColor: '#D97706',
    bio: 'Backend engineer focused on API infrastructure and data pipelines. Joined Sentra three months ago from Datadog.',
    meetings: [
      { id: '1', title: 'Weekly Team Standup', date: 'Today' },
      { id: '2', title: 'API Integration Review', date: 'Feb 24' },
    ],
    notes: 'Solid on infra. Pair with Ashwin on auth refactor. Ramps fast.',
  },
  david: {
    id: 'david',
    name: 'David Park',
    role: 'Partner',
    company: 'Sequoia Capital',
    email: 'david@sequoiacap.com',
    metAt: 'Investor Update Prep',
    metDate: 'Feb 22',
    avatarColor: '#7C3AED',
    bio: 'Partner at Sequoia focused on enterprise SaaS and AI infrastructure. Led our seed round. Meets monthly.',
    meetings: [
      { id: '1', title: 'Investor Update Prep', date: 'Feb 22' },
    ],
    notes: 'Wants to see ARR trajectory and Relay case study before next board meeting. Very metric-driven.',
  },
  elena: {
    id: 'elena',
    name: 'Elena Rodriguez',
    role: 'VP Product',
    company: 'Meridian',
    email: 'elena@meridian.com',
    metAt: 'SXSW Planning',
    metDate: 'Feb 20',
    avatarColor: '#0891B2',
    bio: 'VP Product at Meridian. Anchor account target for the SXSW demo. Interested in meeting intelligence for their distributed team.',
    meetings: [
      { id: '1', title: 'SXSW Launch Planning', date: 'Feb 20' },
    ],
    notes: 'Their team has 200+ meetings per week. Pain point is action item tracking. Demo the commitments feature first.',
  },
  james: {
    id: 'james',
    name: 'James Liu',
    role: 'CTO',
    company: 'Relay',
    email: 'james.liu@relay.io',
    metAt: 'API Integration Review',
    metDate: 'Feb 18',
    avatarColor: '#4F46E5',
    bio: 'CTO at Relay. Technical decision-maker for the integration. Very detail-oriented on security and data handling.',
    meetings: [
      { id: '1', title: 'API Integration Review', date: 'Feb 18' },
    ],
    notes: 'Needs SOC 2 compliance docs before signing. Sarah reports to him. Prefers technical deep-dives over sales calls.',
  },
  nina: {
    id: 'nina',
    name: 'Nina Patel',
    role: 'Head of Sales',
    company: 'Dataweave',
    email: 'nina@dataweave.io',
    metAt: 'SaaS Connect Conference',
    metDate: 'Feb 8',
    avatarColor: '#BE185D',
    bio: 'Head of Sales at Dataweave. Met at SaaS Connect. Interested in using Sentra for their sales team call reviews.',
    meetings: [
      { id: '1', title: 'SaaS Connect Follow-up', date: 'Feb 8' },
    ],
    notes: 'Warm lead. Team of 30 sales reps. Follow up after SXSW launch with a personalized demo.',
  },
  tom: {
    id: 'tom',
    name: 'Tom Nguyen',
    role: 'Staff Engineer',
    company: 'Stripe',
    email: 'tom.nguyen@stripe.com',
    metAt: 'Intro via Ashwin',
    metDate: 'Feb 3',
    avatarColor: '#15803D',
    bio: 'Staff engineer at Stripe. Ashwin\'s former colleague. Exploring Sentra for their internal engineering syncs.',
    meetings: [
      { id: '1', title: 'Intro Call — Stripe', date: 'Feb 3' },
    ],
    notes: 'Large potential account. Their eng org has 500+ engineers. Needs enterprise features (SSO, audit log) before trial.',
  },
  rachel: {
    id: 'rachel',
    name: 'Rachel Kim',
    role: 'Product Designer',
    company: 'Linear',
    email: 'rachel@linear.app',
    metAt: 'Design Systems Meetup',
    metDate: 'Jan 28',
    avatarColor: '#9333EA',
    bio: 'Product designer at Linear. Met at SF Design Systems Meetup. Interested in Sentra for design critique sessions.',
    meetings: [
      { id: '1', title: 'Design Systems Meetup', date: 'Jan 28' },
    ],
    notes: 'Great design sense. Could be a strong champion internally. Connected on LinkedIn.',
  },
  alex: {
    id: 'alex',
    name: 'Alex Morrison',
    role: 'Founder',
    company: 'Trellis AI',
    email: 'alex@trellis.ai',
    metAt: 'YC Batch W24',
    metDate: 'Jan 15',
    avatarColor: '#0D9488',
    bio: 'Founder of Trellis AI, a YC W24 batchmate. Building AI-native project management. Good for co-marketing.',
    meetings: [
      { id: '1', title: 'YC Batch Dinner', date: 'Jan 15' },
    ],
    notes: 'Open to co-marketing at SXSW. Their product complements ours. Explore integration later.',
  },
  priya: {
    id: 'priya',
    name: 'Priya Sharma',
    role: 'Head of Partnerships',
    company: 'Notion',
    email: 'priya@makenotion.com',
    metAt: 'API Partners Summit',
    metDate: 'Jan 10',
    avatarColor: '#E11D48',
    bio: 'Head of Partnerships at Notion. Met at their API Partners Summit. Exploring a Sentra x Notion integration.',
    meetings: [
      { id: '1', title: 'Notion API Partners Summit', date: 'Jan 10' },
    ],
    notes: 'Integration opportunity: auto-sync meeting notes to Notion pages. She can fast-track us through their review.',
  },
};

const FALLBACK: ConnectionDetail = {
  id: 'unknown',
  name: 'Unknown Contact',
  role: 'Unknown',
  company: 'Unknown',
  email: '',
  metAt: '',
  metDate: '',
  avatarColor: '#71717A',
  bio: '',
  meetings: [],
  notes: '',
};

const getInitials = (name: string): string => {
  const parts = name.split(' ');
  return parts.length >= 2
    ? `${parts[0][0]}${parts[parts.length - 1][0]}`
    : parts[0][0];
};

const ConnectionDetailPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const connectionId = searchParams.get('id') ?? '';
  const connection = CONNECTIONS[connectionId] ?? FALLBACK;
  const [hoveredMeetingId, setHoveredMeetingId] = useState<string | null>(null);
  const [personalNotes, setPersonalNotes] = useState(connection.notes);

  return (
    <div className="bg-[var(--bg-base)] flex flex-col h-full text-[12px] [font-synthesis:none] leading-[16px] antialiased overflow-auto items-center pb-[40px] px-[24px] pt-[56px] relative">

      {/* Breadcrumb */}
      <div className="items-center flex gap-[6px] left-[20px] absolute top-[16px]">
        <button
          type="button"
          onClick={() => navigate('/connections')}
          className="appearance-none bg-transparent border-none text-[#9CA3AF] cursor-pointer font-[Geist,system-ui,sans-serif] text-[12px] font-medium leading-[16px] p-0"
        >
          Connections
        </button>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M3.5 2L6.5 5L3.5 8" stroke="#9CA3AF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div className="text-[var(--fg-base)] font-[Geist,system-ui,sans-serif] text-[12px] font-medium leading-[16px]">
          {connection.name}
        </div>
      </div>

      <div className="w-full max-w-[520px]">

        {/* Profile header */}
        <div className="items-center flex flex-col gap-[12px] pt-[16px] pb-[28px]">
          <div
            className="items-center rounded-full text-white flex font-[Inter,system-ui,sans-serif] text-[24px] font-semibold h-[72px] justify-center tracking-[0.02em] w-[72px]"
            style={{ backgroundColor: connection.avatarColor }}
          >
            {getInitials(connection.name)}
          </div>
          <div className="items-center flex flex-col gap-[4px]">
            <h1 className="text-[var(--fg-base)] font-[Inter,system-ui,sans-serif] text-[22px] font-semibold tracking-[-0.01em] leading-[28px] m-0">
              {connection.name}
            </h1>
            <div className="text-[var(--fg-subtle)] font-[Inter,system-ui,sans-serif] text-[14px] leading-[20px]">
              {connection.role} at {connection.company}
            </div>
            {connection.email && (
              <div className="text-[var(--fg-disabled)] font-[Inter,system-ui,sans-serif] text-[13px] leading-[16px]">
                {connection.email}
              </div>
            )}
          </div>
        </div>

        {/* Met context */}
        <div className="bg-[var(--bg-subtle)] rounded-[10px] flex gap-[24px] py-[16px] px-[20px] mb-[24px]">
          <div className="flex flex-col gap-[2px]">
            <div className="text-[var(--fg-disabled)] font-[Inter,system-ui,sans-serif] text-[11px] font-medium tracking-[0.06em] leading-[14px] uppercase">
              Met through
            </div>
            <div className="text-[var(--fg-base)] font-[Inter,system-ui,sans-serif] text-[13px] font-medium leading-[18px]">
              {connection.metAt}
            </div>
          </div>
          <div className="flex flex-col gap-[2px]">
            <div className="text-[var(--fg-disabled)] font-[Inter,system-ui,sans-serif] text-[11px] font-medium tracking-[0.06em] leading-[14px] uppercase">
              First contact
            </div>
            <div className="text-[var(--fg-base)] font-[Inter,system-ui,sans-serif] text-[13px] font-medium leading-[18px]">
              {connection.metDate}
            </div>
          </div>
          <div className="flex flex-col gap-[2px]">
            <div className="text-[var(--fg-disabled)] font-[Inter,system-ui,sans-serif] text-[11px] font-medium tracking-[0.06em] leading-[14px] uppercase">
              Meetings
            </div>
            <div className="text-[var(--fg-base)] font-[Inter,system-ui,sans-serif] text-[13px] font-medium leading-[18px]">
              {connection.meetings.length}
            </div>
          </div>
        </div>

        {/* About */}
        {connection.bio && (
          <div className="mb-[24px]">
            <div className="text-[var(--fg-disabled)] font-[Inter,system-ui,sans-serif] text-[11px] font-medium tracking-[0.06em] leading-[14px] mb-[8px] uppercase">
              About
            </div>
            <div className="text-[var(--fg-subtle)] font-[Inter,system-ui,sans-serif] text-[13px] leading-[20px]">
              {connection.bio}
            </div>
          </div>
        )}

        {/* Personal notes */}
        <div className="mb-[24px]">
          <div className="text-[var(--fg-disabled)] font-[Inter,system-ui,sans-serif] text-[11px] font-medium tracking-[0.06em] leading-[14px] mb-[8px] uppercase">
            Personal notes
          </div>
          <textarea
            value={personalNotes}
            onChange={(event) => setPersonalNotes(event.target.value)}
            placeholder="Add notes about this person..."
            rows={4}
            className="appearance-none bg-[var(--bg-subtle)] border border-solid border-transparent rounded-[8px] text-[var(--fg-subtle)] font-[Inter,system-ui,sans-serif] text-[13px] leading-[20px] outline-none py-[12px] px-[16px] resize-y transition-[border-color] duration-150 ease-in-out w-full"
            onFocus={(event) => { event.currentTarget.style.borderColor = 'var(--border-base)'; }}
            onBlur={(event) => { event.currentTarget.style.borderColor = 'transparent'; }}
          />
        </div>

        {/* Shared meetings */}
        {connection.meetings.length > 0 && (
          <div>
            <div className="text-[var(--fg-disabled)] font-[Inter,system-ui,sans-serif] text-[11px] font-medium tracking-[0.06em] leading-[14px] mb-[8px] uppercase">
              Shared meetings
            </div>
            <div className="flex flex-col">
              {connection.meetings.map((meeting) => (
                <button
                  key={meeting.id}
                  type="button"
                  onClick={() => navigate('/meeting-detail')}
                  onMouseEnter={() => setHoveredMeetingId(meeting.id)}
                  onMouseLeave={() => setHoveredMeetingId(null)}
                  className={`items-center ${hoveredMeetingId === meeting.id ? 'bg-[var(--bg-base-hover)]' : 'bg-transparent'} border-none rounded-[8px] cursor-pointer flex gap-[12px] py-[10px] px-[12px] text-left w-full`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--fg-disabled)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <div className="text-[var(--fg-base)] flex-1 font-[Inter,system-ui,sans-serif] text-[13px] font-medium leading-[18px]">
                    {meeting.title}
                  </div>
                  <div className="text-[var(--fg-disabled)] font-[Inter,system-ui,sans-serif] text-[12px] leading-[16px]">
                    {meeting.date}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConnectionDetailPage;
