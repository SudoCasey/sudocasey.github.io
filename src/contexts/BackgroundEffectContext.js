"use client";
import * as React from 'react';

const BackgroundEffectContext = React.createContext({
  enabled: true,
  toggle: () => {},
});

export function BackgroundEffectProvider({ children }) {
  // Must match SSR and first client render; read localStorage after mount only.
  const [enabled, setEnabled] = React.useState(true);

  React.useEffect(() => {
    try {
      const saved = localStorage.getItem('backgroundEffectEnabled');
      if (saved !== null) {
        setEnabled(saved === 'true');
      }
    } catch {
      // ignore (private mode, blocked storage)
    }
  }, []);

  const toggle = React.useCallback(() => {
    setEnabled((prev) => {
      const newValue = !prev;
      if (typeof window !== 'undefined') {
        localStorage.setItem('backgroundEffectEnabled', String(newValue));
      }
      return newValue;
    });
  }, []);

  return (
    <BackgroundEffectContext.Provider value={{ enabled, toggle }}>
      {children}
    </BackgroundEffectContext.Provider>
  );
}

export function useBackgroundEffect() {
  const context = React.useContext(BackgroundEffectContext);
  if (!context) {
    throw new Error('useBackgroundEffect must be used within BackgroundEffectProvider');
  }
  return context;
}
