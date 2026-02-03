"use client";
import * as React from 'react';

const BackgroundEffectContext = React.createContext({
  enabled: true,
  toggle: () => {},
});

export function BackgroundEffectProvider({ children }) {
  const [enabled, setEnabled] = React.useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('backgroundEffectEnabled');
      return saved !== null ? saved === 'true' : true; // Default to enabled
    }
    return true;
  });

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
