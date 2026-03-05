import { useState } from 'react';

type View = 'reports' | 'radar';

interface ReportGroup {
  id: string;
  name: string;
  count: number;
  latestDate: string;
  reports: string[];
}

interface RadarGroup {
  id: string;
  name: string;
  itemCount: number;
  latestDate: string;
  priority: { level: 'High' | 'Med' | 'Low'; count: number } | null;
  items: string[];
}

const REPORT_GROUPS: ReportGroup[] = [
  {
    id: 'company',
    name: 'Company Overview',
    count: 4,
    latestDate: 'Feb 24 – 28',
    reports: ['Feb 24 – 28', 'Feb 17 – 21', 'Feb 10 – 14', 'Feb 3 – 7'],
  },
  {
    id: 'gtm',
    name: 'GTM Status',
    count: 3,
    latestDate: 'Feb 24 – 28',
    reports: ['Feb 24 – 28', 'Feb 17 – 21', 'Feb 10 – 14'],
  },
  {
    id: 'product',
    name: 'Product Strategy',
    count: 2,
    latestDate: 'Feb 17 – 21',
    reports: ['Feb 17 – 21', 'Feb 10 – 14'],
  },
  {
    id: 'engineering',
    name: 'Engineering',
    count: 3,
    latestDate: 'Feb 24 – 28',
    reports: ['Feb 24 – 28', 'Feb 17 – 21', 'Feb 10 – 14'],
  },
];

const RADAR_GROUPS: RadarGroup[] = [
  {
    id: 'sxsw',
    name: 'Q2 Launch',
    itemCount: 5,
    latestDate: 'Feb 24',
    priority: { level: 'High', count: 2 },
    items: ['Feb 24', 'Feb 17'],
  },
  {
    id: 'product-dev',
    name: 'Product Development',
    itemCount: 3,
    latestDate: 'Feb 24',
    priority: { level: 'Med', count: 1 },
    items: ['Feb 24', 'Feb 17'],
  },
  {
    id: 'partnerships',
    name: 'Partnerships',
    itemCount: 2,
    latestDate: 'Feb 25',
    priority: { level: 'Med', count: 1 },
    items: ['Feb 25'],
  },
];


const ChevronSmall = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M4.5 2.5L8 6L4.5 9.5" stroke="#8A8A85" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M6 4L10 8L6 12" stroke="#C5C5C0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const WeeklyReportsPage = () => {
  const [view, setView] = useState<View>('reports');
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const toggleGroup = (groupId: string) => {
    setExpandedGroups((previous) => {
      const next = new Set(previous);
      if (next.has(groupId)) {
        next.delete(groupId);
      } else {
        next.add(groupId);
      }
      return next;
    });
  };

  return (
    <div className="items-center bg-background flex basis-0 flex-col grow shrink h-full overflow-clip px-[48px] pt-[56px] relative">

      <div className="items-center flex gap-[4px] absolute top-[10px] right-[20px]">
        <button
          type="button"
          onClick={() => setView('reports')}
          className={`appearance-none border-none rounded-full cursor-pointer font-[Geist,system-ui,sans-serif] text-[14px] font-medium leading-[18px] outline-none py-[6px] px-[14px] ${view === 'reports' ? 'bg-[#1A1D21] text-white' : 'bg-transparent text-[#8A8A85]'}`}
        >
          Reports
        </button>
        <button
          type="button"
          onClick={() => setView('radar')}
          className={`appearance-none border-none rounded-full cursor-pointer font-[Geist,system-ui,sans-serif] text-[14px] font-medium leading-[18px] outline-none py-[6px] px-[14px] ${view === 'radar' ? 'bg-[#1A1D21] text-white' : 'bg-transparent text-[#8A8A85]'}`}
        >
          Radar
        </button>
      </div>

      <div className="mb-[8px] max-w-[680px] w-full">
        <div className="text-[#1A1D21] font-[Inter,system-ui,sans-serif] text-[28px] font-medium tracking-[-0.02em] leading-[34px] whitespace-nowrap">
          {view === 'reports' ? 'Reports' : 'Radar'}
        </div>
      </div>

      <div className="flex flex-col max-w-[680px] w-full">
        {view === 'reports' ? (
          REPORT_GROUPS.map((group) => {
            const isExpanded = expandedGroups.has(group.id);
            return (
              <div key={group.id} className="border-b border-b-[#D5D5D1] flex flex-col">
                <button
                  type="button"
                  onClick={() => toggleGroup(group.id)}
                  className="items-center appearance-none bg-transparent border-none cursor-pointer flex justify-between outline-none py-[16px] text-left w-full"
                >
                  <div className="items-center flex gap-[8px]">
                    <span className={`flex shrink-0 transition-transform duration-150 ${isExpanded ? 'rotate-90' : 'rotate-0'}`}>
                      <ChevronSmall />
                    </span>
                    <span className="text-[#6A6A65] font-[Geist,system-ui,sans-serif] text-[13px] font-semibold leading-[16px]">
                      {group.name}
                    </span>
                  </div>
                  <span className="text-[#A1A19A] font-[Geist,system-ui,sans-serif] text-[13px] leading-[16px]">
                    {group.count} reports
                  </span>
                </button>

                {!isExpanded ? (
                  <button
                    type="button"
                    className="items-center appearance-none bg-transparent border-none cursor-pointer flex justify-between outline-none pb-[18px] pl-[20px] pt-[14px] w-full"
                  >
                    <span className="text-[#3C3C3A] font-[Geist,system-ui,sans-serif] text-[15px] font-medium leading-[18px]">
                      {group.latestDate}
                    </span>
                    <div className="items-center flex gap-[8px]">
                      <span className="text-[#A1A19A] font-[Geist,system-ui,sans-serif] text-[13px] leading-[16px]">Latest</span>
                      <ChevronRight />
                    </div>
                  </button>
                ) : (
                  <div className="pl-[20px]">
                    {group.reports.map((reportDate) => (
                      <button
                        key={reportDate}
                        type="button"
                        className="items-center appearance-none bg-transparent border-none cursor-pointer flex justify-between outline-none py-[10px] w-full"
                      >
                        <span className="text-[#3C3C3A] font-[Geist,system-ui,sans-serif] text-[15px] font-medium leading-[18px]">
                          {reportDate}
                        </span>
                        <ChevronRight />
                      </button>
                    ))}
                    <div className="h-[8px]" />
                  </div>
                )}
              </div>
            );
          })
        ) : (
          RADAR_GROUPS.map((group) => {
            const isExpanded = expandedGroups.has(group.id);
            return (
              <div key={group.id} className="border-b border-b-[#D5D5D1] flex flex-col">
                <button
                  type="button"
                  onClick={() => toggleGroup(group.id)}
                  className="items-center appearance-none bg-transparent border-none cursor-pointer flex justify-between outline-none py-[16px] text-left w-full"
                >
                  <div className="items-center flex gap-[8px]">
                    <span className={`flex shrink-0 transition-transform duration-150 ${isExpanded ? 'rotate-90' : 'rotate-0'}`}>
                      <ChevronSmall />
                    </span>
                    <span className="text-[#6A6A65] font-[Geist,system-ui,sans-serif] text-[13px] font-semibold leading-[16px]">
                      {group.name}
                    </span>
                  </div>
                  <div className="items-center flex gap-[12px]">
                    {group.priority && (
                      <div className="items-end flex gap-[2px]">
                        {[
                          { height: 4, filled: true },
                          { height: 7, filled: group.priority.level === 'Med' || group.priority.level === 'High' },
                          { height: 10, filled: group.priority.level === 'High' },
                        ].map((bar, barIndex) => (
                          <div
                            key={barIndex}
                            className={`rounded-[1px] shrink-0 w-[3px] ${bar.filled ? 'bg-[#6A6A65]' : 'bg-[#D0D0CC]'}`}
                            style={{ height: `${bar.height}px` }}
                          />
                        ))}
                      </div>
                    )}
                    <span className="text-[#A1A19A] font-[Geist,system-ui,sans-serif] text-[13px] leading-[16px]">
                      {group.itemCount} items
                    </span>
                  </div>
                </button>

                {!isExpanded ? (
                  <button
                    type="button"
                    className="items-center appearance-none bg-transparent border-none cursor-pointer flex justify-between outline-none pb-[18px] pl-[20px] pt-[14px] w-full"
                  >
                    <span className="text-[#3C3C3A] font-[Geist,system-ui,sans-serif] text-[15px] font-medium leading-[18px]">
                      {group.latestDate}
                    </span>
                    <div className="items-center flex gap-[8px]">
                      <span className="text-[#A1A19A] font-[Geist,system-ui,sans-serif] text-[13px] leading-[16px]">Latest</span>
                      <ChevronRight />
                    </div>
                  </button>
                ) : (
                  <div className="pl-[20px]">
                    {group.items.map((itemDate) => (
                      <button
                        key={itemDate}
                        type="button"
                        className="items-center appearance-none bg-transparent border-none cursor-pointer flex justify-between outline-none py-[10px] w-full"
                      >
                        <span className="text-[#3C3C3A] font-[Geist,system-ui,sans-serif] text-[15px] font-medium leading-[18px]">
                          {itemDate}
                        </span>
                        <ChevronRight />
                      </button>
                    ))}
                    <div className="h-[8px]" />
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default WeeklyReportsPage;
