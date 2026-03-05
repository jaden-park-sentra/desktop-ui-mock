import { cn } from '../../lib/utils';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export interface MessageProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const Message = ({ children, className, ...props }: MessageProps) => (
  <div className={cn('flex gap-3 group', className)} {...props}>
    {children}
  </div>
);

export interface MessageAvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  className?: string;
  children?: React.ReactNode;
}

const MessageAvatar = ({ src, alt, fallback, children, className }: MessageAvatarProps) => (
  <div
    className={cn(
      'flex h-7 w-7 shrink-0 items-center justify-center rounded-full',
      'bg-info-subtle mt-0.5',
      className
    )}
  >
    {children ?? (src ? (
      <img src={src} alt={alt ?? ''} className="h-full w-full rounded-full object-cover" />
    ) : (
      <span className="text-xs font-medium text-primary">{fallback}</span>
    ))}
  </div>
);

export interface MessageContentProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
  markdown?: boolean;
  className?: string;
}

const MessageContent = ({ children, markdown = false, className, ...props }: MessageContentProps) => {
  if (markdown) {
    return (
      <div
        className={cn(
          'prose prose-sm max-w-none text-foreground',
          '[&_p]:my-1 [&_p:first-child]:mt-0 [&_p:last-child]:mb-0',
          '[&_ul]:my-1 [&_ul]:pl-4 [&_li]:my-0.5',
          '[&_ol]:my-1 [&_ol]:pl-4',
          '[&_strong]:font-semibold',
          '[&_h1]:text-sm [&_h1]:font-semibold [&_h1]:mt-2 [&_h1]:mb-1',
          '[&_h2]:text-sm [&_h2]:font-semibold [&_h2]:mt-2 [&_h2]:mb-1',
          '[&_h3]:text-sm [&_h3]:font-semibold [&_h3]:mt-2 [&_h3]:mb-1',
          '[&_table]:w-full [&_table]:border-collapse [&_table]:text-xs',
          '[&_th]:bg-secondary [&_th]:px-2.5 [&_th]:py-1.5 [&_th]:text-left [&_th]:font-semibold [&_th]:text-subtle-foreground',
          '[&_td]:px-2.5 [&_td]:py-1.5 [&_td]:border-t [&_td]:border-border-subtle',
          '[&_hr]:my-2 [&_hr]:border-border-subtle',
          '[&_blockquote]:border-l-2 [&_blockquote]:border-border [&_blockquote]:pl-3 [&_blockquote]:text-muted-foreground',
          '[&_code]:rounded [&_code]:bg-secondary [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-xs [&_code]:font-mono',
          '[&_pre]:rounded-lg [&_pre]:bg-secondary [&_pre]:p-3 [&_pre]:overflow-x-auto',
          '[&_pre_code]:bg-transparent [&_pre_code]:p-0',
          '[&_em]:text-muted-foreground',
          className
        )}
        {...props}
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {children as string}
        </ReactMarkdown>
      </div>
    );
  }

  return (
    <div className={cn('rounded-2xl p-2.5 text-sm leading-relaxed', className)} {...props}>
      {children}
    </div>
  );
};

export interface MessageActionsProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const MessageActions = ({ children, className, ...props }: MessageActionsProps) => (
  <div className={cn('flex items-center gap-1 mt-1', className)} {...props}>
    {children}
  </div>
);

export interface MessageActionProps extends React.ComponentProps<'button'> {
  tooltip: React.ReactNode;
  children: React.ReactNode;
  side?: 'top' | 'bottom' | 'left' | 'right';
}

const MessageAction = ({
  tooltip,
  children,
  className,
  side: _side = 'top',
  ...props
}: MessageActionProps) => (
  <button
    type="button"
    title={typeof tooltip === 'string' ? tooltip : undefined}
    className={cn(
      'inline-flex h-7 w-7 items-center justify-center rounded-full',
      'text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground',
      className
    )}
    {...props}
  >
    {children}
  </button>
);

export { Message, MessageAvatar, MessageContent, MessageActions, MessageAction };
