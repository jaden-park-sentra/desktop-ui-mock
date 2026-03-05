import { useEffect } from 'react';
import { SageOverlay } from './SageOverlay';

/**
 * Root component for the Sage Electron window.
 * Transparent + frameless — popups float above the desktop.
 */
export function SageWindow() {
  useEffect(() => {
    // Make the entire page transparent so the frameless window shows through
    document.documentElement.style.background = 'transparent';
    document.body.style.background = 'transparent';
    return () => {
      document.documentElement.style.background = '';
      document.body.style.background = '';
    };
  }, []);

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: 'transparent',
      overflow: 'hidden',
    }}>
      <SageOverlay />
    </div>
  );
}
