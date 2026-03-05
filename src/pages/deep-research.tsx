import { useState, useRef, useEffect, useLayoutEffect, useCallback } from 'react';
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
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </svg>
);

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ShareIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
    <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
  </svg>
);

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const WORD_INTERVAL_MS = 15;

const StreamingMarkdown = ({ content, onReveal }: { content: string; onReveal?: () => void }) => {
  const words = content.split(/(\s+)/);
  const [visibleCount, setVisibleCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const prevCountRef = useRef(0);

  useEffect(() => {
    setVisibleCount(0);
    prevCountRef.current = 0;
    if (words.length === 0) return;

    let frame: number;
    let count = 0;
    const start = performance.now();

    const tick = () => {
      const elapsed = performance.now() - start;
      const target = Math.min(Math.floor(elapsed / WORD_INTERVAL_MS) + 1, words.length);
      if (target !== count) {
        count = target;
        setVisibleCount(count);
      }
      if (count < words.length) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [content]);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const walker = document.createTreeWalker(containerRef.current, NodeFilter.SHOW_TEXT);
    let wordIndex = 0;
    const node = walker.nextNode();
    const processNode = (textNode: Node) => {
      const parent = textNode.parentElement;
      if (!parent) return;
      const textContent = textNode.textContent || '';
      const parts = textContent.split(/(\s+)/);
      const fragment = document.createDocumentFragment();
      for (const part of parts) {
        if (part === '') continue;
        const span = document.createElement('span');
        span.textContent = part;
        if (wordIndex >= prevCountRef.current && part.trim()) {
          span.style.animation = 'wordFadeIn 0.3s ease-out forwards';
          span.style.opacity = '0';
        }
        fragment.appendChild(span);
        if (part.trim()) wordIndex++;
      }
      parent.replaceChild(fragment, textNode);
    };

    if (node) {
      const textNodes: Node[] = [];
      let current: Node | null = node;
      while (current) {
        textNodes.push(current);
        current = walker.nextNode();
      }
      textNodes.forEach(processNode);
    }
    prevCountRef.current = visibleCount;
    onReveal?.();
  }, [visibleCount]);

  const visibleText = words.slice(0, visibleCount).join('');

  return (
    <div className="prose prose-sm max-w-none text-foreground [&_p]:my-1 [&_p:first-child]:mt-0 [&_p:last-child]:mb-0 [&_ul]:my-1 [&_ul]:pl-4 [&_li]:my-0.5 [&_ol]:my-1 [&_ol]:pl-4 [&_strong]:font-semibold [&_h1]:text-base [&_h1]:font-semibold [&_h1]:mt-2 [&_h1]:mb-1 [&_h2]:text-base [&_h2]:font-semibold [&_h2]:mt-2 [&_h2]:mb-1 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:mt-2 [&_h3]:mb-1 text-[15px] leading-[1.6] [&_p]:text-[15px] [&_p]:leading-[1.6] [&_li]:text-[15px] [&_li]:leading-[1.6]">
      <style>{`
        @keyframes wordFadeIn {
          from { opacity: 0; filter: blur(4px); }
          to { opacity: 1; filter: blur(0px); }
        }
      `}</style>
      <div ref={containerRef}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{visibleText}</ReactMarkdown>
      </div>
    </div>
  );
};

const DeepResearchPage = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const messageCountRef = useRef(0);
  const inputAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

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
    setTimeout(() => {
      inputAreaRef.current?.querySelector('textarea')?.focus();
    }, 0);
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
      <div ref={scrollContainerRef} className={`flex-1 min-h-0 overflow-y-auto ${hasMessages ? 'pt-[24px] pb-[8px]' : 'p-0'}`}>
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
                  <div className="bg-secondary rounded-[18px_18px_4px_18px] text-foreground text-[15px] leading-relaxed max-w-[72%] px-[16px] py-[10px]">
                    {message.content}
                  </div>
                </Message>
              ) : (
                <Message key={message.id} className="items-start">
                  <div className="flex flex-col gap-[8px] flex-1 min-w-0 group">
                    <StreamingMarkdown content={message.content} onReveal={scrollToBottom} />
                    <MessageActions className="flex items-center gap-1 mt-1">
                      <button
                        title="Copy"
                        onClick={() => handleCopy(message.id, message.content)}
                        className={`inline-flex items-center justify-center size-6 rounded-md text-muted-foreground hover:bg-gray-100 hover:text-foreground transition-colors cursor-pointer border-none bg-transparent ${copiedId === message.id ? 'text-success hover:text-success' : ''}`}
                      >
                        {copiedId === message.id ? (
                          <CheckIcon />
                        ) : (
                          <CopyIcon />
                        )}
                      </button>
                      <button
                        title="Share"
                        onClick={() => {}}
                        className="inline-flex items-center justify-center size-6 rounded-md text-muted-foreground hover:bg-gray-100 hover:text-foreground transition-colors cursor-pointer border-none bg-transparent"
                      >
                        <ShareIcon />
                      </button>
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
        <div ref={inputAreaRef} className="mx-auto max-w-[680px]">
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
