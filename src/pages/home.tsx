interface ActionItem {
  id: string;
  title: string;
  description: string;
  due: string;
}

interface RiskItem {
  id: string;
  title: string;
  description: string;
  severity: 'critical' | 'high';
}

interface MeetingItem {
  id: string;
  name: string;
  time: string;
  duration: string;
  participants: number;
  isNext: boolean;
}

const TODAYS_MEETINGS: MeetingItem[] = [
  { id: 'm1', name: 'Product Sync', time: '10:00 AM', duration: '30 min', participants: 4, isNext: true },
  { id: 'm2', name: 'Design System Review', time: '2:00 PM', duration: '60 min', participants: 3, isNext: false },
  { id: 'm3', name: 'Customer Feedback Session', time: '4:00 PM', duration: '45 min', participants: 2, isNext: false },
];

const ACTIONS: ActionItem[] = [
  { id: 'a1', title: 'Review Q1 hiring plan', description: 'Alice needs your input on the headcount budget before the next board meeting.', due: 'Today' },
  { id: 'a2', title: 'Approve design system migration', description: '70 components ready for final sign-off. Carol is waiting on your approval.', due: 'Today' },
  { id: 'a3', title: 'Respond to Acme Corp SSO request', description: 'Sales needs product confirmation on SSO timeline for the Acme deal.', due: 'Tomorrow' },
];

const RISKS: RiskItem[] = [
  { id: 'r1', title: 'SoftBank PoC timeline conflict', description: 'Design system migration deadline conflicts with the March product launch.', severity: 'critical' },
  { id: 'r2', title: 'Acme Corp deal at risk', description: 'SSO and audit logs required by March — not on the current sprint plan.', severity: 'critical' },
  { id: 'r3', title: 'Q2 hiring budget gap', description: '$180K gap between engineering hiring plan and finance projections.', severity: 'high' },
];

const ChevronRightIcon = ({ className }: { className?: string }) => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className={className}>
    <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const getGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
};

const HomePage = () => {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-background pt-[56px] px-[24px] pb-[48px] min-h-full">
      <div className="max-w-[780px] mx-auto flex flex-col">

        <header>
          <h1 className="text-foreground text-[28px] font-semibold leading-[1.2] tracking-tight m-0">
            {getGreeting()}, Jaden
          </h1>
          <p className="text-muted-foreground text-[14px] leading-normal mt-[8px] m-0">
            {today}
          </p>
        </header>

        <section className="flex flex-col mt-[40px]">
          <div className="flex items-center gap-[8px] pb-[16px]">
            <h2 className="text-foreground text-[13px] font-semibold leading-none m-0">Actions</h2>
            <span className="text-disabled-foreground text-[12px] font-medium leading-none font-mono">
              {ACTIONS.length}
            </span>
          </div>
          <div className="flex flex-col gap-[12px]">
            {ACTIONS.map((action) => (
              <button
                key={action.id}
                type="button"
                className="group flex items-center gap-[16px] py-[16px] px-[20px] bg-background rounded-lg border-none cursor-pointer text-left w-full overflow-hidden shadow-card transition-shadow duration-200 hover:shadow-md hover:ring-1 hover:ring-border-info focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
              >
                <div className="flex-1 min-w-0 flex flex-col gap-[3px]">
                  <h3 className="text-foreground text-[13px] font-semibold leading-[1.4] m-0">{action.title}</h3>
                  <p className="text-subtle-foreground text-[12px] leading-normal m-0 line-clamp-1">{action.description}</p>
                </div>
                <div className="flex items-center gap-[8px] shrink-0">
                  <span className="text-muted-foreground text-[12px] font-medium whitespace-nowrap">{action.due}</span>
                  <ChevronRightIcon className="text-disabled-foreground shrink-0 transition duration-200 group-hover:text-muted-foreground group-hover:translate-x-px" />
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="flex flex-col mt-[40px]">
          <div className="flex items-center gap-[8px] pb-[16px]">
            <h2 className="text-foreground text-[13px] font-semibold leading-none m-0">Risks to review</h2>
            <span className="text-disabled-foreground text-[12px] font-medium leading-none font-mono">
              {RISKS.length}
            </span>
          </div>
          <div className="flex flex-col gap-[12px]">
            {RISKS.map((risk) => (
              <button
                key={risk.id}
                type="button"
                className="group flex items-center gap-[16px] py-[16px] px-[20px] bg-background rounded-lg border-none cursor-pointer text-left w-full overflow-hidden shadow-card transition-shadow duration-200 hover:shadow-md hover:ring-1 hover:ring-border-info focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
              >
                <div className="flex-1 min-w-0 flex flex-col gap-[3px]">
                  <div className="flex items-center gap-[8px]">
                    <span
                      className={`w-[6px] h-[6px] rounded-full shrink-0 ${risk.severity === 'critical' ? 'bg-(--status-red)' : 'bg-(--status-yellow)'}`}
                    />
                    <h3 className="text-foreground text-[13px] font-semibold leading-[1.4] m-0">{risk.title}</h3>
                  </div>
                  <p className="text-subtle-foreground text-[12px] leading-normal m-0 line-clamp-1">{risk.description}</p>
                </div>
                <div className="flex items-center gap-[8px] shrink-0">
                  <ChevronRightIcon className="text-disabled-foreground shrink-0 transition duration-200 group-hover:text-muted-foreground group-hover:translate-x-px" />
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="flex flex-col mt-[40px]">
          <div className="flex items-center gap-[8px] pb-[16px]">
            <h2 className="text-foreground text-[13px] font-semibold leading-none m-0">Meetings today</h2>
            <span className="text-disabled-foreground text-[12px] font-medium leading-none font-mono">
              {TODAYS_MEETINGS.length}
            </span>
          </div>
          <div className="flex flex-col gap-[12px]">
            {TODAYS_MEETINGS.map((meeting) => (
              <button
                key={meeting.id}
                type="button"
                className={`group flex items-center gap-[16px] py-[16px] px-[20px] rounded-lg border-none cursor-pointer text-left w-full overflow-hidden shadow-card transition-shadow duration-200 hover:shadow-md focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 ${meeting.isNext ? 'bg-info-subtle ring-1 ring-border-info hover:ring-info' : 'bg-background hover:ring-1 hover:ring-border-info'}`}
              >
                <div
                  className={`w-[72px] shrink-0 text-right pr-[12px] border-r mr-[4px] ${meeting.isNext ? 'border-r-border-info' : 'border-r-border-subtle'}`}
                >
                  <span className="text-foreground text-[13px] font-semibold font-mono tabular-nums leading-none">
                    {meeting.time}
                  </span>
                </div>
                <div className="flex-1 min-w-0 flex flex-col gap-[3px]">
                  <h3 className="text-foreground text-[13px] font-semibold leading-[1.4] m-0">{meeting.name}</h3>
                  <p className="text-subtle-foreground text-[12px] leading-normal m-0">
                    {meeting.duration} · {meeting.participants} participants
                  </p>
                </div>
                <div className="flex items-center gap-[8px] shrink-0">
                  {meeting.isNext && (
                    <span className="bg-info-subtle text-(--fg-info) text-[11px] font-medium leading-none px-[8px] py-[4px] rounded-full">
                      Next
                    </span>
                  )}
                  <ChevronRightIcon className="text-disabled-foreground shrink-0 transition duration-200 group-hover:text-muted-foreground group-hover:translate-x-px" />
                </div>
              </button>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default HomePage;
