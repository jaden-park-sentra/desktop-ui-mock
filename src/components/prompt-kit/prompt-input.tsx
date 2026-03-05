import { cn } from '../../lib/utils';
import React, {
  createContext,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

interface PromptInputContextType {
  isLoading: boolean;
  value: string;
  setValue: (value: string) => void;
  maxHeight: number | string;
  onSubmit?: () => void;
  disabled?: boolean;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
}

const PromptInputContext = createContext<PromptInputContextType>({
  isLoading: false,
  value: '',
  setValue: () => {},
  maxHeight: 240,
  onSubmit: undefined,
  disabled: false,
  textareaRef: React.createRef<HTMLTextAreaElement>(),
});

const usePromptInput = () => useContext(PromptInputContext);

export interface PromptInputProps extends React.ComponentProps<'div'> {
  isLoading?: boolean;
  value?: string;
  onValueChange?: (value: string) => void;
  maxHeight?: number | string;
  onSubmit?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

const PromptInput = ({
  className,
  isLoading = false,
  maxHeight = 240,
  value,
  onValueChange,
  onSubmit,
  children,
  disabled = false,
  onClick,
  ...props
}: PromptInputProps) => {
  const [internalValue, setInternalValue] = useState(value ?? '');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (newValue: string) => {
    setInternalValue(newValue);
    onValueChange?.(newValue);
  };

  const handleClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
    if (!disabled) textareaRef.current?.focus();
    onClick?.(event);
  };

  return (
    <PromptInputContext.Provider
      value={{
        isLoading,
        value: value ?? internalValue,
        setValue: handleChange,
        maxHeight,
        onSubmit,
        disabled,
        textareaRef,
      }}
    >
      <div
        className={cn(
          'flex flex-col rounded-xl border border-border bg-background',
          'shadow-[0_2px_4px_rgba(0,0,0,0.04),0_1px_2px_-1px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.04)]',
          disabled && 'opacity-60 cursor-not-allowed',
          className
        )}
        onClick={handleClick}
        {...props}
      >
        {children}
      </div>
    </PromptInputContext.Provider>
  );
};

export interface PromptInputTextareaProps extends React.ComponentProps<'textarea'> {
  disableAutosize?: boolean;
}

const PromptInputTextarea = ({
  className,
  onKeyDown,
  disableAutosize = false,
  ...props
}: PromptInputTextareaProps) => {
  const { value, setValue, maxHeight, onSubmit, disabled, textareaRef } = usePromptInput();

  const adjustHeight = (element: HTMLTextAreaElement | null) => {
    if (!element || disableAutosize) return;
    element.style.height = 'auto';
    if (typeof maxHeight === 'number') {
      element.style.height = `${Math.min(element.scrollHeight, maxHeight)}px`;
    } else {
      element.style.height = `min(${element.scrollHeight}px, ${maxHeight})`;
    }
  };

  const handleRef = (element: HTMLTextAreaElement | null) => {
    (textareaRef as React.MutableRefObject<HTMLTextAreaElement | null>).current = element;
    adjustHeight(element);
  };

  useLayoutEffect(() => {
    if (!textareaRef.current || disableAutosize) return;
    const element = textareaRef.current;
    element.style.height = 'auto';
    if (typeof maxHeight === 'number') {
      element.style.height = `${Math.min(element.scrollHeight, maxHeight)}px`;
    } else {
      element.style.height = `min(${element.scrollHeight}px, ${maxHeight})`;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, maxHeight, disableAutosize]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    adjustHeight(event.target);
    setValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      onSubmit?.();
    }
    onKeyDown?.(event);
  };

  return (
    <textarea
      ref={handleRef}
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      rows={1}
      className={cn(
        'w-full resize-none bg-transparent px-3 py-2.5 text-sm leading-relaxed text-foreground',
        'placeholder:text-disabled-foreground outline-none border-none',
        'min-h-[40px] overflow-y-auto',
        disabled && 'cursor-not-allowed',
        className
      )}
      {...props}
    />
  );
};

export type PromptInputActionsProps = React.HTMLAttributes<HTMLDivElement>;

const PromptInputActions = ({ children, className, ...props }: PromptInputActionsProps) => (
  <div className={cn('flex items-center gap-1 px-2 pb-2', className)} {...props}>
    {children}
  </div>
);

export interface PromptInputActionProps extends React.ComponentProps<'div'> {
  tooltip: React.ReactNode;
  children: React.ReactNode;
  side?: 'top' | 'bottom' | 'left' | 'right';
}

const PromptInputAction = ({
  tooltip,
  children,
  className,
  side: _side = 'top',
  ...props
}: PromptInputActionProps) => {
  const { disabled } = usePromptInput();

  return (
    <div
      title={typeof tooltip === 'string' ? tooltip : undefined}
      className={cn('inline-flex', disabled && 'pointer-events-none opacity-50', className)}
      onClick={(event) => event.stopPropagation()}
      {...props}
    >
      {children}
    </div>
  );
};

export { PromptInput, PromptInputTextarea, PromptInputActions, PromptInputAction };
