import { Link } from 'react-router-dom';

interface PageLink {
  label: string;
  path: string;
}

const pages: PageLink[] = [
  { label: 'Home', path: '/home' },
  { label: 'Meeting Notes', path: '/meeting-notes' },
  { label: 'Meeting Detail', path: '/meeting-detail' },
  { label: 'Meeting Detail Transcript', path: '/meeting-detail-transcript' },
  { label: 'Meeting Detail Video', path: '/meeting-detail-video' },
  { label: 'Deep Research', path: '/deep-research' },
  { label: 'Commitments', path: '/commitments' },
  { label: 'Weekly Reports', path: '/weekly-reports' },
  { label: 'Reports Expanded', path: '/reports-expanded' },
  { label: 'Report Detail', path: '/report-detail' },
  { label: 'Radar', path: '/radar' },
  { label: 'Integrations', path: '/integrations' },
  { label: 'Connections', path: '/connections' },
  { label: 'Connection Detail', path: '/connection-detail' },
  { label: 'Settings', path: '/settings' },
];

const PagePickerPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-screen-4xl mx-auto w-full px-8 py-16">
        <h1 className="text-3xl font-semibold mb-2">UI Mocks</h1>
        <p className="text-foreground/50 mb-10">Select a page to preview</p>
        <div className="grid grid-cols-3 gap-3">
          {pages.map((page) => (
            <Link
              key={page.path}
              to={page.path}
              className="flex items-center gap-3 px-4 py-3 rounded-lg border border-foreground/10 hover:border-foreground/30 hover:bg-foreground/5 transition-colors"
            >
              <span className="text-sm font-medium">{page.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PagePickerPage;
