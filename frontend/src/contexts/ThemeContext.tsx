import React, {{ createContext, useContext, useEffect, useState, ReactNode }} from 'react';
import type {{ ThemeMode, ThemeContextValue }} from '../types/theme';

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface ThemeProviderProps {{
  children: ReactNode;
  defaultMode?: ThemeMode;
}}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({{
  children,
  defaultMode = 'system',
}}) => {{
  const [mode, setMode] = useState<ThemeMode>(defaultMode);
  const [isDark, setIsDark] = useState(false);

  // Get system preference
  const getSystemPreference = (): boolean => {{
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }};

  // Initialize theme
  useEffect(() => {{
    const savedMode = localStorage.getItem('theme-mode') as ThemeMode;
    if (savedMode && ['light', 'dark', 'system'].includes(savedMode)) {{
      setMode(savedMode);
    }}
  }}, []);

  // Update dark mode state
  useEffect(() => {{
    const updateDarkMode = () => {{
      const shouldBeDark = mode === 'dark' || (mode === 'system' && getSystemPreference());
      setIsDark(shouldBeDark);
      
      // Update document
      if (typeof document !== 'undefined') {{
        document.documentElement.setAttribute('data-theme', shouldBeDark ? 'dark' : 'light');
        document.documentElement.classList.toggle('dark', shouldBeDark);
      }}
    }};

    updateDarkMode();

    // Listen for system preference changes
    if (mode === 'system') {{
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', updateDarkMode);
      return () => mediaQuery.removeEventListener('change', updateDarkMode);
    }}
  }}, [mode]);

  // Save mode to localStorage
  useEffect(() => {{
    localStorage.setItem('theme-mode', mode);
  }}, [mode]);

  const toggleMode = () => {{
    setMode((prev) => {{
      if (prev === 'light') return 'dark';
      if (prev === 'dark') return 'system';
      return 'light';
    }});
  }};

  const value: ThemeContextValue = {{
    theme: {{}} as any, // Theme object would be defined based on design tokens
    mode,
    setMode,
    toggleMode,
    isDark,
  }};

  return (
    <ThemeContext.Provider value={{value}}>
      <div
        className={{`theme-transition ${{isDark ? 'dark' : 'light'}}`}}
        style={{{{
          colorScheme: isDark ? 'dark' : 'light',
          transition: 'background-color 0.3s ease, color 0.3s ease',
        }}}}
      >
        {{children}}
      </div>
    </ThemeContext.Provider>
  );
}};

export const useTheme = (): ThemeContextValue => {{
  const context = useContext(ThemeContext);
  if (context === undefined) {{
    throw new Error('useTheme must be used within a ThemeProvider');
  }}
  return context;
}};

// Theme Toggle Component
export const ThemeToggle: React.FC<{{ className?: string }}> = ({{ className = '' }}) => {{
  const {{ mode, toggleMode, isDark }} = useTheme();

  const getIcon = () => {{
    switch (mode) {{
      case 'light':
        return '☀️';
      case 'dark':
        return '🌙';
      case 'system':
        return '🖥️';
      default:
        return '☀️';
    }}
  }};

  return (
    <button
      onClick={{toggleMode}}
      className={{`theme-toggle ${{className}}`}}
      aria-label="Toggle theme"
      style={{{{
        background: 'var(--color-neutral-100)',
        border: '1px solid var(--color-neutral-300)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-2) var(--space-3)',
        fontSize: 'var(--text-sm)',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-2)',
      }}}}
      onMouseEnter={{(e) => {{
        e.currentTarget.style.background = 'var(--color-neutral-200)';
        e.currentTarget.style.transform = 'scale(1.02)';
      }}}}
      onMouseLeave={{(e) => {{
        e.currentTarget.style.background = 'var(--color-neutral-100)';
        e.currentTarget.style.transform = 'scale(1)';
      }}}}
    >
      <span style={{{{ fontSize: '1.2em' }}}}>{{getIcon()}}</span>
      <span style={{{{ textTransform: 'capitalize' }}}}>{{mode}}</span>
    </button>
  );
}};

// CSS-in-JS Theme Variables Hook
export const useThemeVariables = () => {{
  const {{ isDark }} = useTheme();
  
  return {{
    // Primary colors
    primary: isDark ? 'var(--color-primary-400)' : 'var(--color-primary-600)',
    primaryHover: isDark ? 'var(--color-primary-300)' : 'var(--color-primary-700)',
    
    // Background colors
    background: isDark ? 'var(--color-neutral-900)' : 'var(--color-neutral-0)',
    surface: isDark ? 'var(--color-neutral-800)' : 'var(--color-neutral-50)',
    
    // Text colors
    textPrimary: isDark ? 'var(--color-neutral-100)' : 'var(--color-neutral-900)',
    textSecondary: isDark ? 'var(--color-neutral-400)' : 'var(--color-neutral-600)',
    
    // Border colors
    border: isDark ? 'var(--color-neutral-700)' : 'var(--color-neutral-300)',
    borderHover: isDark ? 'var(--color-neutral-600)' : 'var(--color-neutral-400)',
  }};
}};