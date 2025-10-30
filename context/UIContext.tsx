'use client'

import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface UIContextType {
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  compactMode: boolean;
  toggleCompactMode: () => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider = ({ children }: { children: ReactNode }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [compactMode, setCompactMode] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Load preferences from localStorage
  useEffect(() => {
    const savedSidebar = localStorage.getItem('sidebarCollapsed');
    const savedCompact = localStorage.getItem('compactMode');
    const savedTheme = localStorage.getItem('theme');
    
    if (savedSidebar) setSidebarCollapsed(savedSidebar === 'true');
    if (savedCompact) setCompactMode(savedCompact === 'true');
    if (savedTheme) setTheme(savedTheme as 'dark' | 'light');
  }, []);

  const toggleSidebar = () => {
    setSidebarCollapsed(prev => {
      const newValue = !prev;
      localStorage.setItem('sidebarCollapsed', String(newValue));
      return newValue;
    });
  };

  const toggleCompactMode = () => {
    setCompactMode(prev => {
      const newValue = !prev;
      localStorage.setItem('compactMode', String(newValue));
      return newValue;
    });
  };

  const toggleTheme = () => {
    setTheme(prev => {
      const newValue = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', newValue);
      document.documentElement.setAttribute('data-theme', newValue);
      return newValue;
    });
  };

  // Apply theme and compact mode on mount
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-compact', String(compactMode));
  }, [theme, compactMode]);

  return (
    <UIContext.Provider
      value={{
        sidebarCollapsed,
        toggleSidebar,
        compactMode,
        toggleCompactMode,
        theme,
        toggleTheme,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};
