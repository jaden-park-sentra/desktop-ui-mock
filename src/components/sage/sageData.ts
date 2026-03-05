export interface SageMeeting {
  title: string;
  date: string;
  time: string;
  duration: string;
  participants: { name: string; initials: string }[];
  videoApp: string;
}

export interface SageNoteSection {
  heading: string;
  items: SageNoteItem[];
}

export interface SageNoteItem {
  text: string;
  children?: string[];
  sourceId?: string;
}

export interface SageTranscriptLine {
  speaker: string;
  isUser: boolean;
  text: string;
  time: string;
}

export interface SageTemplate {
  id: string;
  icon: string;
  label: string;
  shortcut?: string;
}

export interface SageSourceData {
  summary: string;
  quotes: string[];
  interpretation: string;
}

export interface SageQuickAction {
  id: string;
  type: "email" | "schedule" | "task";
  label: string;
  description: string;
  draft: string;
}

export const MEETING: SageMeeting = {
  title: "Sentra product interface prototype review with user feedback",
  date: "Today",
  time: "1:00 PM",
  duration: "37m",
  participants: [
    { name: "Ashwin", initials: "A" },
    { name: "Shaurya", initials: "S" },
  ],
  videoApp: "Google Meet",
};

export const ENHANCED_NOTES: SageNoteSection[] = [
  {
    heading: "Product Interface Feedback Session",
    items: [
      {
        text: "User tested Sentra prototype with non-engineering perspective",
        sourceId: "src-1",
      },
      {
        text: "Overall reaction: interface is self-explanatory and intuitive",
        children: [
          "Likes brain icon and visual elements",
          "Labels make functionality clear without explanation",
        ],
        sourceId: "src-2",
      },
      {
        text: "Font preferences tested",
        children: [
          'Prefers "Inter" font family over default',
          "Grayscale color scheme preferred over pure white",
          'Reasoning: grayscale accentuates readable content like "outline in coloring book"',
        ],
        sourceId: "src-3",
      },
      {
        text: "Visual hierarchy feedback",
        children: [
          "Some elements feel too small (memory section with bubble + label + number)",
          "Other identical-sized elements appear fine due to different visual context",
          "Color coding helps navigation - blue highlights make action areas obvious",
          'Green accent color "very soothing" and "badass" - easier on eyes',
        ],
      },
    ],
  },
  {
    heading: "Feature Consolidation Insights",
    items: [
      {
        text: "Reports section combines risk reports + weekly reports",
        children: [
          "User initially confused by consolidation",
          "After explanation, sees value in unified approach",
        ],
      },
      {
        text: "Market reality check on feature adoption",
        children: [
          "Weekly business reports + swim lanes are most popular with customers",
          "Risk radar has low adoption despite technical value",
          'Users say "we have meetings and OKRs" - too abstracted from daily workflow',
        ],
      },
      {
        text: "Chat functionality preferences",
        children: [
          "Strongly prefers in-context chat over separate chat interface",
          "Wants to ask questions while reviewing specific data points",
        ],
      },
    ],
  },
  {
    heading: "Enterprise Sales Implications",
    items: [
      {
        text: "Interface significantly better for enterprise demos than current version",
        children: [
          "Target demographic (35-55 age group) prefers professional, clear design",
          "Previous Twilio demo had visibility issues with current interface",
        ],
      },
      {
        text: "Market segmentation validated",
        children: [
          'Startups don\'t feel pain point - want "purple website with cartoon brain"',
          "Enterprise (Series B+) experiences real problems, needs professional tools",
          "Technology and financial services sectors show strongest pain points",
        ],
      },
      {
        text: 'Demo confidence increase: "100% or more" for enterprise sales with new interface',
      },
    ],
  },
  {
    heading: "Next Steps & Action Items",
    items: [
      {
        text: "Schedule follow-up design review with broader team",
        children: [
          "Include sales team for go-to-market perspective",
          "Prioritize enterprise demo flow refinement",
        ],
      },
      {
        text: "Iterate on size and spacing feedback for memory section elements",
      },
      {
        text: "Prepare enterprise-specific demo script incorporating feedback",
      },
    ],
  },
];

export const QUICK_ACTIONS: SageQuickAction[] = [
  {
    id: "email-followup",
    type: "email",
    label: "Draft follow-up email to Ashwin",
    description: "Summarize feedback and confirm next steps",
    draft: `Subject: Follow-up — Sentra Prototype Review

Hi Ashwin,

Thanks for the great feedback session today. Here's what I captured:

• Interface is intuitive and self-explanatory — strong validation for enterprise direction
• Moving forward with Inter font + grayscale color scheme per your preference
• Memory section elements need size/spacing refinement
• Enterprise demo confidence significantly higher with the new design

Next steps:
1. Schedule a broader design review including the sales team
2. Refine the enterprise demo flow based on your feedback
3. Address the sizing issues for smaller UI elements

I'll send a calendar invite for the follow-up. Let me know if I missed anything.

Best,
Shaurya`,
  },
  {
    id: "schedule-review",
    type: "schedule",
    label: "Schedule design review with sales team",
    description: "Follow-up review including go-to-market perspective",
    draft: `Design Review — Enterprise Demo Flow

Attendees: Ashwin, Sales Team
Duration: 45 min
Suggested: Next Tuesday or Wednesday

Agenda:
• Review updated enterprise demo flow
• Sales team input on go-to-market positioning
• Finalize interface decisions from prototype feedback
• Prioritize enterprise demo refinements`,
  },
  {
    id: "task-sizing",
    type: "task",
    label: "Fix memory section element sizing",
    description: "Address size and spacing feedback from Ashwin",
    draft: `Priority: High

Elements in the memory section (bubble + label + number) feel too small. Adjust sizing and spacing while preserving the visual context that makes similar-sized elements elsewhere feel appropriate.

Acceptance criteria:
• Increase touch targets for memory section items
• Maintain visual consistency with surrounding elements
• Validate with Ashwin in follow-up review`,
  },
];

export const PRIVATE_NOTES = [
  "Check font rendering on Windows",
  "Ashwin likes grayscale - maybe make it default?",
  "Enterprise demo improvements - high priority",
  'Think about "Reports" consolidation UX more',
  "In-context chat is a must-have for enterprise",
];

export const TRANSCRIPT: SageTranscriptLine[] = [
  { speaker: "Ashwin", isUser: false, text: "So I'm looking at this for the first time without any engineering context, and honestly it's pretty self-explanatory.", time: "0:32" },
  { speaker: "Shaurya", isUser: true, text: "That's great to hear. What stands out to you first?", time: "0:45" },
  { speaker: "Ashwin", isUser: false, text: "The brain icon is cute but effective. And the labels make everything clear without needing explanation.", time: "0:58" },
  { speaker: "Shaurya", isUser: true, text: "What about the font? We've been testing a few options.", time: "1:12" },
  { speaker: "Ashwin", isUser: false, text: "I like Inter. It feels more professional. And the grayscale version is better than pure white.", time: "1:28" },
  { speaker: "Shaurya", isUser: true, text: "Why grayscale specifically?", time: "1:35" },
  { speaker: "Ashwin", isUser: false, text: "It accentuates the stuff that I'm actually trying to read. I likened it to coloring in a book, where you do the outline dark and the inside's less, and it kind of accentuates the inside.", time: "1:52" },
  { speaker: "Shaurya", isUser: true, text: "That's a really good way to put it. What about the visual hierarchy?", time: "2:05" },
  { speaker: "Ashwin", isUser: false, text: "Some elements feel too small, particularly when multiple visual elements compete. Like the memory section with the bubble, label, and number.", time: "2:22" },
  { speaker: "Shaurya", isUser: true, text: "But the same size works elsewhere?", time: "2:30" },
  { speaker: "Ashwin", isUser: false, text: "Yeah, other identical-sized elements appear fine because the visual context is different. Color coding helps a lot - the blue highlights make action areas obvious.", time: "2:48" },
  { speaker: "Shaurya", isUser: true, text: "And the green accent?", time: "2:55" },
  { speaker: "Ashwin", isUser: false, text: 'Very soothing. And badass. Easier on the eyes. I like it.', time: "3:08" },
  { speaker: "Shaurya", isUser: true, text: "Let's talk about the Reports section. We combined risk reports and weekly reports.", time: "3:22" },
  { speaker: "Ashwin", isUser: false, text: "I was initially confused by that. But after you explained it, I see the value in a unified approach.", time: "3:40" },
  { speaker: "Shaurya", isUser: true, text: "What's the market reality on these features?", time: "3:50" },
  { speaker: "Ashwin", isUser: false, text: "Weekly business reports and swim lanes are the most popular with customers. Risk radar has low adoption despite the technical value.", time: "4:08" },
  { speaker: "Shaurya", isUser: true, text: "Why do you think that is?", time: "4:15" },
  { speaker: "Ashwin", isUser: false, text: 'People say "oh we have meetings and OKRs" - it\'s too far abstracted from their daily workflow.', time: "4:32" },
  { speaker: "Shaurya", isUser: true, text: "And the chat functionality?", time: "4:40" },
  { speaker: "Ashwin", isUser: false, text: "Strongly prefer in-context chat. I want to ask questions while I'm reviewing specific data points. That's just how my brain works... very organized.", time: "4:58" },
  { speaker: "Shaurya", isUser: true, text: "How much more confident would you feel coming with something that looks like this for enterprise?", time: "5:12" },
  { speaker: "Ashwin", isUser: false, text: "For me, the enterprise, if there's such a thing, 100% or more, for sure. Cool.", time: "5:28" },
  { speaker: "Shaurya", isUser: true, text: "Be super honest.", time: "5:32" },
  { speaker: "Ashwin", isUser: false, text: "Helpful. Cool, man. There's any other. Also, there's any other feedback, let me know. Oh, man. Appreciate you, man. You're the man.", time: "5:48" },
  { speaker: "Shaurya", isUser: true, text: "We're lucky to have you, man.", time: "5:55" },
];

export const TEMPLATES: SageTemplate[] = [
  { id: "auto", icon: "sparkle", label: "Auto", shortcut: undefined },
  { id: "1to1", icon: "people", label: "1 to 1", shortcut: "2" },
  { id: "discovery", icon: "search", label: "Customer: Discovery", shortcut: "3" },
  { id: "hiring", icon: "briefcase", label: "Hiring", shortcut: "4" },
  { id: "standup", icon: "bolt", label: "Stand-Up", shortcut: "5" },
  { id: "weekly", icon: "calendar", label: "Weekly Team Meeting", shortcut: "6" },
  { id: "all", icon: "grid", label: "All Templates...", shortcut: "7" },
];

export const SOURCE_DATA: Record<string, SageSourceData> = {
  "src-1": {
    summary: "During the meeting, Ashwin described his first impression of the Sentra prototype,",
    quotes: [
      "I'm looking at this for the first time without any engineering context, and honestly it's pretty self-explanatory.",
    ],
    interpretation: "highlighting that the interface communicates its purpose clearly without requiring technical background.",
  },
  "src-2": {
    summary: "Ashwin provided specific positive feedback about the interface elements,",
    quotes: [
      "The brain icon is cute but effective.",
      "the labels make everything clear without needing explanation.",
    ],
    interpretation: "indicating that both iconography and labeling contribute to the intuitive user experience.",
  },
  "src-3": {
    summary: "During the meeting, Ashwin expressed a preference for the grayscale option, explaining that it",
    quotes: [
      "accentuates the stuff that I'm actually trying to read.",
      "you do the outline dark and the inside's less, and it kind of accentuates the inside,",
    ],
    interpretation: "highlighting how this design choice enhances readability by making important content stand out more clearly.",
  },
  "src-4": {
    summary: "This insight was synthesized from multiple points discussed during the meeting,",
    quotes: [
      "We've been hearing this consistently from enterprise customers.",
    ],
    interpretation: "reflecting a pattern observed across several conversation threads in this session.",
  },
  "src-5": {
    summary: "Ashwin discussed market positioning and customer segmentation,",
    quotes: [
      "Startups don't feel the pain — they want a purple website with a cartoon brain.",
      "Enterprise, like Series B and beyond, that's where the real problems are.",
    ],
    interpretation: "distinguishing between startup and enterprise needs to validate the product's target market.",
  },
  "src-6": {
    summary: "Feedback on the reports consolidation was discussed at length,",
    quotes: [
      "I was confused at first, but now I see why you'd want it all in one place.",
    ],
    interpretation: "suggesting the unified reports view requires brief onboarding but ultimately improves workflow.",
  },
  "src-7": {
    summary: "The discussion touched on specific feature adoption metrics,",
    quotes: [
      "Weekly reports and swim lanes — that's what people actually use.",
      "Risk radar is cool tech but too abstracted from how people work.",
    ],
    interpretation: "indicating a gap between technical capability and day-to-day user workflows.",
  },
  "src-8": {
    summary: "Visual hierarchy feedback was provided while reviewing the prototype,",
    quotes: [
      "Some of these elements feel too small, like the memory section.",
      "The color coding really helps — blue highlights make it obvious where to click.",
    ],
    interpretation: "highlighting that sizing consistency and color-coded affordances are key to scannability.",
  },
  "src-9": {
    summary: "Enterprise demo readiness was evaluated in context of a recent client call,",
    quotes: [
      "The Twilio demo had visibility issues with the old interface.",
      "This version is significantly better for that demographic.",
    ],
    interpretation: "validating the redesign as an improvement for the 35-55 age group in enterprise sales.",
  },
};

/* ── Pre-Meeting Brief ── */

export interface BriefAttendee {
  name: string;
  role: string;
  initials: string;
  lastSpoke: string;
}

export interface BriefActionItem {
  text: string;
  fromDate: string;
  owner: string;
}

export interface BriefLastMeeting {
  date: string;
  title: string;
  keyPoints: string[];
}

export interface BriefContext {
  source: "slack" | "email" | "doc";
  label: string;
  snippet: string;
}

export interface PreMeetingBrief {
  meetingTitle: string;
  meetingTime: string;
  attendees: BriefAttendee[];
  actionItems: BriefActionItem[];
  lastMeeting: BriefLastMeeting;
  context: BriefContext[];
}

export const PRE_MEETING_BRIEF: PreMeetingBrief = {
  meetingTitle: "Sentra product interface prototype review with user feedback",
  meetingTime: "1:00 PM",
  attendees: [
    { name: "Ashwin", role: "Head of Sales", initials: "A", lastSpoke: "2 weeks ago" },
    { name: "Shaurya", role: "Design Lead", initials: "S", lastSpoke: "You" },
  ],
  actionItems: [
    { text: "Follow up on enterprise demo feedback from Twilio call", fromDate: "Feb 6", owner: "Shaurya" },
    { text: "Consolidate reports section UX — get sign-off from product", fromDate: "Feb 6", owner: "Ashwin" },
    { text: "Prepare revised font options for next review", fromDate: "Feb 6", owner: "Shaurya" },
  ],
  lastMeeting: {
    date: "Feb 6, 2026",
    title: "Product interface first-pass review",
    keyPoints: [
      "Agreed on grayscale approach over pure white for readability",
      "Enterprise demo confidence was flagged as a top priority",
      "Risk radar low adoption discussed — needs tighter workflow integration",
      "In-context chat preferred over separate chat interface",
    ],
  },
  context: [
    { source: "slack", label: "Slack #product", snippet: "Ashwin mentioned Q3 roadmap concerns and wants to discuss enterprise positioning in the next sync." },
    { source: "email", label: "Email thread", snippet: "Twilio follow-up: their team requested a second demo with the updated interface by end of month." },
    { source: "doc", label: "Product brief", snippet: "Interface redesign v2 spec updated with new size/spacing guidelines from last review." },
  ],
};

export const CHAT_SUGGESTIONS = [
  "What were the key decisions made?",
  "Summarize the enterprise feedback",
  "List all action items from this meeting",
  "What concerns were raised about feature adoption?",
];
