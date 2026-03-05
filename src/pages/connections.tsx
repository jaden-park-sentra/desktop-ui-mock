import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

interface Connection {
  id: string;
  name: string;
  role: string;
  company: string;
  metAt: string;
  lastInteraction: string;
  avatarColor: string;
}

const CONNECTIONS: Connection[] = [
  { id: 'ashwin', name: 'Alex Rivera', role: 'Engineering Lead', company: 'Sentra', metAt: 'Co-founder', lastInteraction: 'Today', avatarColor: '#6366F1' },
  { id: 'andrey', name: 'Jordan Kim', role: 'Design Lead', company: 'Sentra', metAt: 'Co-founder', lastInteraction: 'Today', avatarColor: '#2563EB' },
  { id: 'sarah', name: 'Casey Morgan', role: 'Head of Customer Success', company: 'Vantage', metAt: 'Customer Discovery — Vantage', lastInteraction: 'Feb 25', avatarColor: '#DB2777' },
  { id: 'kristina', name: 'Sam Patel', role: 'Marketing Lead', company: 'Sentra', metAt: 'GTM Strategy Sync', lastInteraction: 'Feb 25', avatarColor: '#059669' },
  { id: 'marcus', name: 'Riley Chen', role: 'Backend Engineer', company: 'Sentra', metAt: 'Weekly Team Standup', lastInteraction: 'Feb 24', avatarColor: '#D97706' },
  { id: 'david', name: 'David Park', role: 'Partner', company: 'Horizon Ventures', metAt: 'Investor Update Prep', lastInteraction: 'Feb 22', avatarColor: '#7C3AED' },
  { id: 'elena', name: 'Elena Vasquez', role: 'VP Product', company: 'Nexus', metAt: 'Q2 Launch Planning', lastInteraction: 'Feb 20', avatarColor: '#0891B2' },
  { id: 'james', name: 'James Liu', role: 'CTO', company: 'Vantage', metAt: 'API Integration Review', lastInteraction: 'Feb 18', avatarColor: '#4F46E5' },
  { id: 'liam', name: 'Liam Foster', role: 'Head of Eng', company: 'Plaid', metAt: 'Fintech Forum', lastInteraction: 'Feb 17', avatarColor: '#1D4ED8' },
  { id: 'maya', name: 'Maya Washington', role: 'Chief of Staff', company: 'Scale AI', metAt: 'AI Summit SF', lastInteraction: 'Feb 15', avatarColor: '#C026D3' },
  { id: 'derek', name: 'Derek Cho', role: 'Principal PM', company: 'Figma', metAt: 'Design Tools Happy Hour', lastInteraction: 'Feb 14', avatarColor: '#0369A1' },
  { id: 'sophie', name: 'Sophie Andersen', role: 'VP Engineering', company: 'Vercel', metAt: 'Next.js Conf', lastInteraction: 'Feb 12', avatarColor: '#7E22CE' },
  { id: 'raj', name: 'Raj Mehta', role: 'Founder', company: 'Cobalt Security', metAt: 'YC Demo Day', lastInteraction: 'Feb 10', avatarColor: '#EA580C' },
  { id: 'nina', name: 'Nina Patel', role: 'Head of Sales', company: 'Dataweave', metAt: 'SaaS Connect Conference', lastInteraction: 'Jan 30', avatarColor: '#BE185D' },
  { id: 'tom', name: 'Tom Nguyen', role: 'Staff Engineer', company: 'Stripe', metAt: 'Intro via Alex', lastInteraction: 'Jan 28', avatarColor: '#15803D' },
  { id: 'rachel', name: 'Rachel Kim', role: 'Product Designer', company: 'Linear', metAt: 'Design Systems Meetup', lastInteraction: 'Jan 25', avatarColor: '#9333EA' },
  { id: 'alex', name: 'Alex Morrison', role: 'Founder', company: 'Trellis AI', metAt: 'YC Batch W24', lastInteraction: 'Jan 22', avatarColor: '#0D9488' },
  { id: 'priya', name: 'Priya Sharma', role: 'Head of Partnerships', company: 'Notion', metAt: 'API Partners Summit', lastInteraction: 'Jan 18', avatarColor: '#E11D48' },
  { id: 'victor', name: 'Victor Okonkwo', role: 'Sr. Engineer', company: 'Databricks', metAt: 'Data Eng Meetup', lastInteraction: 'Jan 16', avatarColor: '#B45309' },
  { id: 'hannah', name: 'Hannah Reeves', role: 'Director of Product', company: 'Airtable', metAt: 'ProductCon SF', lastInteraction: 'Jan 14', avatarColor: '#DC2626' },
  { id: 'carlos', name: 'Carlos Gutierrez', role: 'Founding Engineer', company: 'Warp', metAt: 'Dev Tools Meetup', lastInteraction: 'Jan 12', avatarColor: '#4338CA' },
  { id: 'emily', name: 'Emily Zhang', role: 'GP', company: 'Greylock Partners', metAt: 'Fundraise Intro', lastInteraction: 'Jan 10', avatarColor: '#0F766E' },
  { id: 'kenji', name: 'Kenji Tanaka', role: 'Head of AI', company: 'Adobe', metAt: 'AI Research Dinner', lastInteraction: 'Jan 8', avatarColor: '#9F1239' },
  { id: 'lisa', name: 'Lisa Wu', role: 'VP Sales', company: 'Snowflake', metAt: 'SaaStr Annual', lastInteraction: 'Dec 20', avatarColor: '#2563EB' },
  { id: 'nathan', name: 'Nathan Brooks', role: 'CTO', company: 'Retool', metAt: 'Internal Tools Summit', lastInteraction: 'Dec 18', avatarColor: '#7C3AED' },
  { id: 'amara', name: 'Amara Osei', role: 'Design Director', company: 'Canva', metAt: 'Config 2025', lastInteraction: 'Dec 15', avatarColor: '#059669' },
  { id: 'sam', name: 'Sam Rivera', role: 'Founder', company: 'CommandBar', metAt: 'PLG Meetup', lastInteraction: 'Dec 12', avatarColor: '#CA8A04' },
  { id: 'diana', name: 'Diana Petrov', role: 'Principal Engineer', company: 'Cloudflare', metAt: 'Edge Computing Talk', lastInteraction: 'Dec 10', avatarColor: '#DB2777' },
  { id: 'oliver', name: 'Oliver Grant', role: 'Head of Growth', company: 'Loom', metAt: 'Growth Summit', lastInteraction: 'Dec 5', avatarColor: '#6366F1' },
  { id: 'yuki', name: 'Yuki Sato', role: 'Staff ML Engineer', company: 'OpenAI', metAt: 'NeurIPS Social', lastInteraction: 'Dec 3', avatarColor: '#0891B2' },
  { id: 'michael', name: 'Michael Torres', role: 'VP Engineering', company: 'Coinbase', metAt: 'Crypto Builders Night', lastInteraction: 'Nov 22', avatarColor: '#1D4ED8' },
  { id: 'grace', name: 'Grace Liu', role: 'Partner', company: 'a16z', metAt: 'Portfolio Dinner', lastInteraction: 'Nov 15', avatarColor: '#C026D3' },
  { id: 'ben', name: 'Ben Hartley', role: 'Founder', company: 'Railway', metAt: 'YC Alumni Event', lastInteraction: 'Nov 8', avatarColor: '#15803D' },
  { id: 'zara', name: 'Zara Ibrahim', role: 'Head of Design', company: 'Stripe', metAt: 'Design Leadership Offsite', lastInteraction: 'Oct 30', avatarColor: '#E11D48' },
  { id: 'jason', name: 'Jason Kang', role: 'Sr. PM', company: 'Slack', metAt: 'Enterprise Connect', lastInteraction: 'Oct 18', avatarColor: '#4F46E5' },
  { id: 'kate', name: 'Kate Sullivan', role: 'CEO', company: 'Pylon', metAt: 'YC Batch W24', lastInteraction: 'Oct 5', avatarColor: '#EA580C' },
  { id: 'daniel', name: 'Daniel Russo', role: 'Eng Manager', company: 'Linear', metAt: 'Dev Productivity Conf', lastInteraction: 'Sep 20', avatarColor: '#0369A1' },
  { id: 'anita', name: 'Anita Desai', role: 'CPO', company: 'Hex', metAt: 'Data Council', lastInteraction: 'Sep 12', avatarColor: '#7E22CE' },
];

const getInitials = (name: string): string => {
  const parts = name.split(' ');
  return parts.length >= 2
    ? `${parts[0][0]}${parts[parts.length - 1][0]}`
    : parts[0][0];
};

const ConnectionsPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConnections = useMemo(() => {
    if (!searchQuery.trim()) return CONNECTIONS;
    const query = searchQuery.toLowerCase();
    return CONNECTIONS.filter(
      (connection) =>
        connection.name.toLowerCase().includes(query) ||
        connection.role.toLowerCase().includes(query) ||
        connection.company.toLowerCase().includes(query) ||
        connection.metAt.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <div className="bg-background flex flex-col h-full text-[12px] [font-synthesis:none] leading-[16px] antialiased overflow-clip items-center pb-0 px-[24px] pt-[56px] relative">
      
      {/* Top bar — search */}
      <div className="items-center flex justify-end left-[20px] absolute right-[20px] top-[12px]">
        <div className="items-center flex gap-[6px]">
          <div className="items-center bg-secondary rounded-[8px] flex gap-[6px] py-[6px] px-[10px] border border-transparent focus-within:border-border-subtle focus-within:bg-background transition-colors duration-200">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-muted-foreground">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search connections..."
              className="border-none outline-none bg-transparent text-foreground font-[Inter,system-ui,sans-serif] text-[13px] leading-[16px] w-[160px] placeholder:text-muted-foreground"
            />
          </div>
          <button className="items-center flex h-[30px] justify-center w-[30px] rounded-[6px] hover:bg-secondary-hover transition-colors cursor-pointer text-subtle-foreground">
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <path d="M2 4h12M4 8h8M6 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      <div className="pt-[8px] w-full max-w-[640px]" />

      {/* Page header */}
      <div className="flex flex-col gap-[8px] w-full max-w-[640px] shrink-0 pb-[24px]">
        <h1 className="text-foreground font-[Inter,system-ui,sans-serif] text-[28px] font-medium tracking-[-0.02em] leading-[34px] m-0">
          Connections
        </h1>
        <p className="text-subtle-foreground font-[Inter,system-ui,sans-serif] text-[14px] leading-[20px] m-0">
          Your personal CRM. Manage and track interactions with {CONNECTIONS.length} people in your network.
        </p>
      </div>

      {/* Connection list */}
      <div className="flex basis-0 flex-col grow shrink w-full max-w-[640px] overflow-y-auto pb-[48px] gap-[8px] no-scrollbar">
        {filteredConnections.length === 0 ? (
          <div className="items-center text-muted-foreground flex font-[Inter,system-ui,sans-serif] text-[13px] justify-center py-[40px] border border-dashed border-border-subtle rounded-[12px] bg-secondary/50">
            No connections match &ldquo;{searchQuery}&rdquo;
          </div>
        ) : (
          filteredConnections.map((connection) => (
            <button
              key={connection.id}
              type="button"
              onClick={() => navigate(`/connection-detail?id=${connection.id}`)}
              className="group w-full flex items-center justify-between p-3 rounded-[12px] border border-border-subtle bg-secondary hover:bg-secondary-hover transition-colors duration-200 cursor-pointer text-left"
            >
              <div className="flex items-center gap-[16px] min-w-0">
                <div
                  className="w-[36px] h-[36px] rounded-full flex items-center justify-center shrink-0 font-[Inter,system-ui,sans-serif] text-[12px] font-medium tracking-[0.02em] shadow-sm bg-shell border border-border-strong text-foreground"
                >
                  {getInitials(connection.name)}
                </div>

                <div className="flex flex-col gap-[2px] min-w-0">
                  <span className="text-[14px] font-medium text-foreground font-[Inter,system-ui,sans-serif] leading-[18px] truncate">
                    {connection.name}
                  </span>
                  <div className="flex items-center gap-[6px] text-[13px] text-subtle-foreground font-[Inter,system-ui,sans-serif] leading-[16px] truncate">
                    <span className="font-medium">{connection.company}</span>
                    <span className="w-[3px] h-[3px] rounded-full bg-border-strong shrink-0" />
                    <span className="truncate">{connection.role}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end shrink-0 gap-[4px] ml-4 hidden sm:flex">
                <div className="flex items-center gap-[6px]">
                  <span className="w-[6px] h-[6px] rounded-full shrink-0" style={{ backgroundColor: connection.lastInteraction === 'Today' ? 'var(--status-green)' : 'var(--color-border-strong)' }} />
                  <span className="text-[12px] font-medium text-foreground font-[Inter,system-ui,sans-serif] leading-[16px] whitespace-nowrap">
                    {connection.lastInteraction}
                  </span>
                </div>
                <span className="text-[12px] text-muted-foreground font-[Inter,system-ui,sans-serif] leading-[16px] whitespace-nowrap">
                  {connection.metAt}
                </span>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default ConnectionsPage;
