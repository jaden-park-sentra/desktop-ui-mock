import { useState } from 'react';

import slackLogo from '../assets/logos/slack.svg';
import asanaLogo from '../assets/logos/asana.svg';
import githubLogo from '../assets/logos/github.svg';
import linearLogo from '../assets/logos/linear.svg';
import discordLogo from '../assets/logos/discord.svg';
import googleLogo from '../assets/logos/google.svg';

interface Integration {
  id: string;
  name: string;
  description: string;
  logo: string;
  connected: boolean;
}

const WORKSPACE_INTEGRATIONS: Integration[] = [
  { id: 'slack', name: 'Slack', description: 'Get notifications and create tasks from Slack messages.', logo: slackLogo, connected: true },
  { id: 'linear', name: 'Linear', description: 'Sync issues, projects, and cycles automatically.', logo: linearLogo, connected: false },
  { id: 'github', name: 'GitHub', description: 'Link pull requests and commits to your tasks.', logo: githubLogo, connected: true },
  { id: 'asana', name: 'Asana', description: 'Import and sync your Asana tasks and projects.', logo: asanaLogo, connected: false },
  { id: 'discord', name: 'Discord', description: 'Receive updates and manage tasks via Discord bot.', logo: discordLogo, connected: false },
];

const PERSONAL_CONNECTIONS: Integration[] = [
  { id: 'google', name: 'Google Workspace', description: 'Connect your calendar and email for smart scheduling.', logo: googleLogo, connected: true },
  { id: 'github-personal', name: 'GitHub (Personal)', description: 'Connect your personal GitHub account.', logo: githubLogo, connected: false },
];

const IntegrationsPage = () => {
  const [workspaceIntegrations, setWorkspaceIntegrations] = useState(WORKSPACE_INTEGRATIONS);
  const [personalConnections, setPersonalConnections] = useState(PERSONAL_CONNECTIONS);

  const toggleWorkspace = (id: string) => {
    setWorkspaceIntegrations(prev => prev.map(item => item.id === id ? { ...item, connected: !item.connected } : item));
  };

  const togglePersonal = (id: string) => {
    setPersonalConnections(prev => prev.map(item => item.id === id ? { ...item, connected: !item.connected } : item));
  };

  const renderIntegrationCard = (integration: Integration, onToggle: (id: string) => void) => (
    <div key={integration.id} className="flex items-center justify-between p-4 rounded-[12px] border border-border-subtle bg-secondary hover:bg-secondary-hover transition-colors duration-200">
      <div className="flex items-center gap-[16px]">
        <div className="w-[40px] h-[40px] rounded-[8px] bg-background border border-border-subtle flex items-center justify-center shrink-0 overflow-hidden shadow-sm">
          <img src={integration.logo} alt={`${integration.name} logo`} className="w-[24px] h-[24px] object-contain" />
        </div>
        <div className="flex flex-col gap-[2px]">
          <span className="text-[14px] font-medium text-foreground font-[Inter,system-ui,sans-serif] leading-[18px]">{integration.name}</span>
          <span className="text-[13px] text-subtle-foreground font-[Inter,system-ui,sans-serif] leading-[16px]">{integration.description}</span>
        </div>
      </div>
      <button
        onClick={() => onToggle(integration.id)}
        className={`px-[12px] py-[6px] rounded-[6px] text-[13px] font-medium font-[Inter,system-ui,sans-serif] transition-colors cursor-pointer ${
          integration.connected
            ? 'bg-background border border-border text-foreground hover:bg-base-hover shadow-sm'
            : 'bg-primary text-primary-foreground hover:opacity-90 border border-transparent shadow-sm'
        }`}
      >
        {integration.connected ? 'Configure' : 'Connect'}
      </button>
    </div>
  );

  return (
    <div className="bg-background flex flex-col h-full text-[12px] [font-synthesis:none] leading-[16px] antialiased overflow-clip items-center pb-0 px-[24px] pt-[56px] relative">
      <div className="pt-[8px] w-full max-w-[680px]" />

      {/* Page header */}
      <div className="flex flex-col gap-[8px] w-full max-w-[680px] shrink-0 pb-[24px]">
        <h1 className="text-foreground font-[Inter,system-ui,sans-serif] text-[28px] font-medium tracking-[-0.02em] leading-[34px] m-0">
          Integrations
        </h1>
        <p className="text-subtle-foreground font-[Inter,system-ui,sans-serif] text-[14px] leading-[20px] m-0">
          Connect your tools to sync data and automate your workflow.
        </p>
      </div>

      <div className="flex basis-0 flex-col grow shrink w-full max-w-[680px] overflow-y-auto pb-[48px] gap-[32px] no-scrollbar">
        {/* Workspace Integrations */}
        <section className="flex flex-col gap-[12px]">
          <h2 className="text-[12px] font-medium text-muted-foreground font-[Inter,system-ui,sans-serif] m-0">
            Workspace Integrations
          </h2>
          <div className="flex flex-col gap-[8px]">
            {workspaceIntegrations.map(integration => renderIntegrationCard(integration, toggleWorkspace))}
          </div>
        </section>

        {/* Personal Connections */}
        <section className="flex flex-col gap-[12px]">
          <h2 className="text-[12px] font-medium text-muted-foreground font-[Inter,system-ui,sans-serif] m-0">
            Personal Connections
          </h2>
          <div className="flex flex-col gap-[8px]">
            {personalConnections.map(integration => renderIntegrationCard(integration, togglePersonal))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default IntegrationsPage;
