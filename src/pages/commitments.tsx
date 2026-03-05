import { useState } from 'react';

type CommitmentStatus = 'open' | 'completed';
type FilterTab = 'all' | 'open' | 'completed';

interface Commitment {
  id: string;
  title: string;
  meetingName: string;
  date: string;
  dueLabel: string | null;
  status: CommitmentStatus;
}

const COMMITMENTS: Commitment[] = [
  {
    id: '1',
    title: 'Ship Module v2 for pre-launch testing',
    meetingName: 'Q2 Launch Planning',
    date: 'Feb 24',
    dueLabel: 'Due Mar 10',
    status: 'open',
  },
  {
    id: '2',
    title: 'Coordinate press kit and media outreach',
    meetingName: 'Q2 Launch Planning',
    date: 'Feb 24',
    dueLabel: 'Due Mar 5',
    status: 'open',
  },
  {
    id: '3',
    title: 'Send Vantage team the integration API docs',
    meetingName: 'Customer Discovery — Vantage',
    date: 'Feb 25',
    dueLabel: 'Due Feb 28',
    status: 'open',
  },
  {
    id: '4',
    title: 'Draft outbound sequence for Series A founders',
    meetingName: 'GTM Strategy Sync',
    date: 'Feb 25',
    dueLabel: 'Due Mar 3',
    status: 'open',
  },
  {
    id: '5',
    title: "Review Jordan's Module v2 design mockups",
    meetingName: 'Design Review — Module v2',
    date: 'Feb 24',
    dueLabel: null,
    status: 'completed',
  },
];

const FILTER_TABS: { id: FilterTab; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'open', label: 'Open' },
  { id: 'completed', label: 'Completed' },
];

const CheckCircleIcon = ({ checked }: { checked: boolean }) => {
  if (checked) {
    return (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="9" fill="#3B82F6" />
        <path d="M5.5 9L7.5 11L12.5 6.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="8.25" stroke="#D1D5DB" strokeWidth="1.5" />
    </svg>
  );
};

const CommitmentsPage = () => {
  const [activeFilter, setActiveFilter] = useState<FilterTab>('open');
  const [commitments, setCommitments] = useState<Commitment[]>(COMMITMENTS);
  const toggleCommitment = (id: string) => {
    setCommitments((previous) =>
      previous.map((commitment) =>
        commitment.id === id
          ? { ...commitment, status: commitment.status === 'completed' ? 'open' : 'completed' }
          : commitment
      )
    );
  };

  const filteredCommitments = commitments.filter((commitment) => {
    if (activeFilter === 'all') return true;
    return commitment.status === activeFilter;
  });

  return (
    <div className="bg-background min-h-full pt-[56px] px-[40px] pb-[40px] relative">
      <div className="flex items-center gap-[4px] absolute top-[10px] right-[20px]">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveFilter(tab.id)}
            className={`appearance-none border-none rounded-full cursor-pointer font-[Geist,system-ui,sans-serif] text-[14px] font-medium leading-[18px] outline-none py-[6px] px-[14px] ${activeFilter === tab.id ? 'bg-[#1A1D21] text-white' : 'bg-transparent text-[#8A8A85]'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mx-auto max-w-[680px] w-full">
        <h1 className="text-foreground font-[Inter,system-ui,sans-serif] text-[28px] font-medium tracking-[-0.02em] leading-[34px] m-0 mb-[24px]">
          Commitments
        </h1>

        {/* Commitments list */}
        <div className="flex flex-col gap-[8px]">
          {filteredCommitments.length === 0 ? (
            <div className="flex items-center justify-center text-disabled-foreground font-[Inter,system-ui,sans-serif] text-[13px] p-[40px]">
              No commitments
            </div>
          ) : (
            filteredCommitments.map((commitment) => (
              <div
                key={commitment.id}
                className="flex items-center bg-background border border-solid border-border rounded-[12px] gap-[14px] py-[16px] px-[20px]"
              >
                {/* Checkbox */}
                <button
                  type="button"
                  onClick={() => toggleCommitment(commitment.id)}
                  className="appearance-none bg-transparent border-none cursor-pointer shrink-0 p-0"
                >
                  <CheckCircleIcon checked={commitment.status === 'completed'} />
                </button>

                {/* Text content */}
                <div className="flex flex-col basis-0 grow shrink gap-[3px]">
                  <span className={`font-[Inter,system-ui,sans-serif] text-[14px] font-medium leading-[20px] ${commitment.status === 'completed' ? 'text-disabled-foreground line-through' : 'text-foreground no-underline'}`}>
                    {commitment.title}
                  </span>
                  <span className="text-disabled-foreground font-[Inter,system-ui,sans-serif] text-[12px] leading-[16px]">
                    {commitment.meetingName}
                    <span className="text-border mx-[5px]">·</span>
                    {commitment.date}
                  </span>
                </div>

                {/* Due date / status */}
                <div className="text-disabled-foreground shrink-0 font-[Inter,system-ui,sans-serif] text-[13px] leading-[16px]">
                  {commitment.status === 'completed' ? 'Done' : commitment.dueLabel}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CommitmentsPage;
