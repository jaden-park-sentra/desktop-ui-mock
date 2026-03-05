import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
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

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const SUGGESTIONS = [
  'How is our pipeline trending this quarter?',
  "Summarize last week's customer calls",
  'What are our top blockers right now?',
  'Who are our main competitors?',
];

const MOCK_RESPONSES: Record<number, string> = {
  0: `Based on your recent meetings and CRM data, here's what I found:

**Pipeline Overview (Q1 2026)**
- Total pipeline value: **$4.2M** (↑18% vs last quarter)
- Deals in negotiation: 12 opportunities
- Average deal size: **$87K**

**Top Insights**
- Enterprise segment grew 23% — driven by 3 new logos from the Q2 launch campaign
- SMB conversion rate dropped 4pts; likely tied to pricing feedback from discovery calls
- Highest win rate in the Financial Services vertical (64%)

---
*Sources: Salesforce sync · 8 meeting transcripts · Q4 pipeline report*`,

  1: `Here's a synthesis of last week's customer calls:

**Common Themes (7 calls reviewed)**
- 5 of 7 customers mentioned integration complexity as a top concern
- Positive sentiment around the new reporting dashboard — mentioned in 4 calls
- 3 enterprise prospects asked about SSO/SAML support timeline

**Notable Calls**
- **Vantage (Casey Morgan)** — Strong interest in API tier; asked for custom SLA
- **Nexus** — Evaluating against Gong; price-sensitive
- **Flux Labs** — Ready to expand seats if mobile app ships by Q2

---
*Sources: 7 call transcripts · 2 follow-up emails · CRM notes*`,

  2: `Here are the top blockers surfaced across your meetings this week:

**Engineering**
1. Auth service refactor blocking 3 downstream features (assigned: Jordan)
2. Mobile push notification reliability — reported in 2 customer calls

**Sales**
1. Lack of SOC 2 Type II certification blocking 4 enterprise deals
2. No self-serve onboarding flow — slowing SMB pipeline velocity

**Product**
1. Figma designs for v2 dashboard still in review (due: this Friday)
2. Conflicting prioritization between roadmap commitments and inbound requests

---
*Sources: Eng Sync · GTM Strategy call · Standup transcripts*`,

  3: `Here's a competitive overview based on recent market intel:

**Primary Competitors**

| Company | Strength | Weakness |
|---|---|---|
| Gong | Brand recognition, data | Expensive, rigid |
| Chorus | Strong integrations | Dated UX |
| Fireflies | Low price | Limited analytics |

**Key Differentiators for Dynamis**
- Real-time commitment tracking (unique)
- Cross-meeting relationship graph
- Proactive nudges vs reactive reporting

---
*Sources: 3 competitive mentions in call transcripts · G2 reviews · Web research*`,
};

const getMockResponse = (index: number): string =>
  MOCK_RESPONSES[index % Object.keys(MOCK_RESPONSES).length];


const DotsLoader = () => (
  <div className="items-center flex gap-[4px] h-[20px] px-[2px]">
    {[0, 1, 2].map((dotIndex) => (
      <span
        key={dotIndex}
        className="[animation-duration:1.1s] [animation-fill-mode:both] [animation-iteration-count:infinite] [animation-name:drDotBounce] bg-disabled-foreground rounded-full block h-[5px] w-[5px]"
        style={{ animationDelay: `${dotIndex * 0.18}s` }}
      />
    ))}
    <style>{`
      @keyframes drDotBounce {
        0%, 80%, 100% { transform: scale(0.7); opacity: 0.4; }
        40% { transform: scale(1); opacity: 1; }
      }
    `}</style>
  </div>
);

const CopyIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="8" height="8" rx="1" />
    <path d="M3 10V3h7" />
  </svg>
);

const ShareIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 7.5L10 5M5 7.5L10 10" />
    <circle cx="3.5" cy="7.5" r="1.5" />
    <circle cx="11.5" cy="4.5" r="1.5" />
    <circle cx="11.5" cy="10.5" r="1.5" />
  </svg>
);

const StreamingMarkdown = ({ content }: { content: string }) => {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(content.slice(0, index));
      index += 3; // Reveal 3 chars at a time for smooth morphing
      if (index > content.length) {
        setDisplayedText(content);
        clearInterval(interval);
      }
    }, 10);
    
    return () => clearInterval(interval);
  }, [content]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <MessageContent markdown className="p-0 text-base [&_p]:text-base [&_li]:text-base [&_h1]:text-base [&_h2]:text-base [&_h3]:text-base">
        {displayedText}
      </MessageContent>
    </motion.div>
  );
};

const DeepResearchPage = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageCountRef = useRef(0);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSubmit = useCallback(() => {
    const trimmedInput = input.trim();
    if (!trimmedInput || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: trimmedInput,
    };

    const responseIndex = messageCountRef.current;
    messageCountRef.current += 1;

    setMessages((previous) => [...previous, userMessage]);
    setInput('');
    setIsLoading(true);

    setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: getMockResponse(responseIndex),
      };
      setMessages((previous) => [...previous, assistantMessage]);
      setIsLoading(false);
    }, 1800);
  }, [input, isLoading]);

  const handleSuggestionClick = useCallback((suggestion: string) => {
    setInput(suggestion);
  }, []);

  const handleCopy = useCallback((messageId: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(messageId);
    setTimeout(() => setCopiedId(null), 2000);
  }, []);

  const hasMessages = messages.length > 0;
  const canSubmit = input.trim().length > 0 && !isLoading;

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden">
      {/* Header */}
      <div className="items-center flex shrink-0 gap-[8px] h-[44px] justify-end px-[20px]">
        {hasMessages && (
          <button
            type="button"
            onClick={() => { setMessages([]); messageCountRef.current = 0; }}
            className="items-center bg-transparent border border-solid border-border-subtle rounded-[6px] text-muted-foreground cursor-pointer flex font-[Inter,system-ui,sans-serif] text-[11px] gap-[4px] leading-none py-[4px] px-[8px]"
          >
            <svg width="10" height="10" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
              <path d="M2 7.5C2 4.46 4.46 2 7.5 2c1.56 0 2.97.63 3.99 1.65M13 7.5c0 3.04-2.46 5.5-5.5 5.5-1.56 0-2.97-.63-3.99-1.65" />
              <path d="M11.5 1.5v3h-3M3.5 13.5v-3h3" />
            </svg>
            New chat
          </button>
        )}
      </div>

      {/* Messages area */}
      <div className={`flex-1 min-h-0 overflow-y-auto ${hasMessages ? 'pt-[24px] pb-[8px]' : 'p-0'}`}>
        {!hasMessages ? (
          <div className="items-center flex flex-col h-full justify-center py-[32px] px-[24px] text-center">
            <h2 className="text-foreground font-[Inter,system-ui,sans-serif] text-[15px] font-semibold leading-[20px] m-0 mb-[6px]">
              Deep Research
            </h2>
            <p className="text-muted-foreground font-[Inter,system-ui,sans-serif] text-[13px] leading-[1.6] m-0 mb-[24px] max-w-[320px]">
              Ask anything. Research across your meetings, documents, and the web in seconds.
            </p>
            <div className="flex flex-wrap gap-[8px] justify-center max-w-[420px]">
              {SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="items-center bg-background border border-solid border-border-subtle rounded-[20px] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_0_0_1px_rgba(0,0,0,0.06)] text-[var(--fg-subtle)] cursor-pointer inline-flex font-[Inter,system-ui,sans-serif] text-[12px] leading-[16px] py-[7px] px-[13px]"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-[20px] mx-auto max-w-[680px] px-[24px]">
            {messages.map((message) =>
              message.role === 'user' ? (
                <Message key={message.id} className="justify-end">
                  <div className="bg-secondary rounded-[18px_18px_4px_18px] text-foreground text-sm max-w-[72%] px-4 py-3 shadow-sm">
                    {message.content}
                  </div>
                </Message>
              ) : (
                <Message key={message.id} className="items-start">
                  <div className="flex flex-col gap-2 flex-1 min-w-0">
                    <StreamingMarkdown content={message.content} />
                    <MessageActions className="opacity-0 group-hover:opacity-100 transition-opacity gap-2">
                      <MessageAction
                        tooltip="Copy"
                        onClick={() => handleCopy(message.id, message.content)}
                        className={`h-9 w-9 hover:bg-transparent hover:text-foreground text-muted-foreground ${copiedId === message.id ? 'text-success' : ''}`}
                      >
                        <CopyIcon />
                      </MessageAction>
                      <MessageAction
                        tooltip="Share"
                        onClick={() => {}}
                        className="h-9 w-9 hover:bg-transparent hover:text-foreground text-muted-foreground"
                      >
                        <ShareIcon />
                      </MessageAction>
                    </MessageActions>
                  </div>
                </Message>
              )
            )}
            {isLoading && (
              <Message className="items-start">
                <DotsLoader />
              </Message>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input area */}
      <div className="bg-background shrink-0 pt-[12px] px-[16px] pb-[16px]">
        <div className="mx-auto max-w-[680px]">
          <PromptInput
            value={input}
            onValueChange={setInput}
            isLoading={isLoading}
            onSubmit={handleSubmit}
          >
            <PromptInputTextarea placeholder="Ask a research question..." />
            <PromptInputActions className="justify-between px-2 pb-2">
              <div className="flex items-center gap-1.5">
                <PromptInputAction tooltip="Search the web">
                  <span className="items-center bg-secondary rounded-[4px] text-muted-foreground inline-flex text-[11px] font-[Inter,system-ui,sans-serif] gap-[3px] leading-none py-[3px] px-[7px]">
                    <svg width="10" height="10" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="7.5" cy="7.5" r="6" /><path d="M7.5 4.5v3l2 2" />
                    </svg>
                    Web
                  </span>
                </PromptInputAction>
                <PromptInputAction tooltip="Search meetings">
                  <span className="items-center bg-secondary rounded-[4px] text-muted-foreground inline-flex text-[11px] font-[Inter,system-ui,sans-serif] gap-[3px] leading-none py-[3px] px-[7px]">
                    <svg width="10" height="10" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 3h11M2 7h11M2 11h7" />
                    </svg>
                    Meetings
                  </span>
                </PromptInputAction>
              </div>
              <PromptInputAction tooltip={isLoading ? 'Stop' : 'Send'}>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!canSubmit}
                  className={`items-center border-none rounded-full text-white flex shrink-0 h-[28px] justify-center p-0 w-[28px] ${canSubmit ? 'bg-primary shadow-[0_0_0_1px_#1e40af,0_1px_2px_rgba(0,0,0,0.4)] cursor-pointer' : 'bg-disabled-foreground shadow-none cursor-not-allowed'}`}
                >
                  {isLoading ? (
                    <svg width="12" height="12" viewBox="0 0 15 15" fill="currentColor">
                      <rect x="4" y="4" width="7" height="7" rx="1" />
                    </svg>
                  ) : (
                    <svg width="13" height="13" viewBox="0 0 15 15" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7.5 12V3M3.5 7L7.5 3L11.5 7" />
                    </svg>
                  )}
                </button>
              </PromptInputAction>
            </PromptInputActions>
          </PromptInput>
          <p className="text-disabled-foreground font-[Inter,system-ui,sans-serif] text-[11px] leading-[14px] mt-[8px] mx-[2px] mb-0 text-center">
            Press{' '}
            <kbd className="bg-secondary rounded-[3px] font-[inherit] text-[10px] py-px px-[4px]">Enter</kbd>
            {' '}to send ·{' '}
            <kbd className="bg-secondary rounded-[3px] font-[inherit] text-[10px] py-px px-[4px]">Shift+Enter</kbd>
            {' '}for new line
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeepResearchPage;
