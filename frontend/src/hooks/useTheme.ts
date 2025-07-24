import {{ useTheme as useThemeContext }} from '../contexts/ThemeContext';
import {{ useMemo }} from 'react';

export const useTheme = () => {{
  const context = useThemeContext();
  
  const theme = useMemo(() => ({{
    // Color utilities
    colors: {{
      primary: (shade: keyof ColorScale = '500') => `var(--color-primary-${{shade}})`,
      secondary: (shade: keyof ColorScale = '500') => `var(--color-secondary-${{shade}})`,
      neutral: (shade: keyof ColorScale = '500') => `var(--color-neutral-${{shade}})`,
      success: (shade: '50' | '500' | '600' = '500') => `var(--color-success-${{shade}})`,
      warning: (shade: '50' | '500' | '600' = '500') => `var(--color-warning-${{shade}})`,
      error: (shade: '50' | '500' | '600' = '500') => `var(--color-error-${{shade}})`,
      info: (shade: '50' | '500' | '600' = '500') => `var(--color-info-${{shade}})`,
    }},
    
    // Spacing utilities
    spacing: (size: keyof Spacing) => `var(--space-${{size}})`,
    
    // Typography utilities
    text: (size: keyof Typography['fontSize']) => `var(--text-${{size}})`,
    font: (family: keyof Typography['fontFamily']) => `var(--font-${{family}})`,
    weight: (weight: keyof Typography['fontWeight']) => `var(--font-${{weight}})`,
    leading: (height: keyof Typography['lineHeight']) => `var(--leading-${{height}})`,
    
    // Border utilities
    radius: (size: keyof BorderRadius) => `var(--radius-${{size}})`,
    
    // Shadow utilities
    shadow: (size: keyof Shadows) => `var(--shadow-${{size}})`,
    
    // Transition utilities
    transition: (type: 'all' | 'colors' | 'opacity' | 'shadow' | 'transform' = 'all') => `var(--transition-${{type}})`,
    
    // Z-index utilities
    z: (index: keyof Theme['zIndex']) => `var(--z-${{index}})`,
    
    // Responsive utilities
    breakpoint: (size: keyof Theme['breakpoints']) => `var(--breakpoint-${{size}})`,
    
    // Theme state
    mode: context.mode,
    isDark: context.isDark,
    setMode: context.setMode,
    toggleMode: context.toggleMode,
  }})), [context]);
  
  return theme;
}};

// Typed CSS variables hook
export const useCSSVariables = () => {{
  const {{ isDark }} = useThemeContext();
  
  return {{
    '--theme-background': isDark ? 'var(--color-neutral-900)' : 'var(--color-neutral-0)',
    '--theme-surface': isDark ? 'var(--color-neutral-800)' : 'var(--color-neutral-50)',
    '--theme-text-primary': isDark ? 'var(--color-neutral-100)' : 'var(--color-neutral-900)',
    '--theme-text-secondary': isDark ? 'var(--color-neutral-400)' : 'var(--color-neutral-600)',
    '--theme-border': isDark ? 'var(--color-neutral-700)' : 'var(--color-neutral-300)',
  }} as React.CSSProperties;
}};

// Component variant utilities
export const useComponentVariants = () => {{
  const {{ isDark }} = useThemeContext();
  
  return {{
    button: {{
      primary: {{
        backgroundColor: 'var(--color-primary-500)',
        color: 'white',
        '&:hover': {{
          backgroundColor: 'var(--color-primary-600)',
        }},
      }},
      secondary: {{
        backgroundColor: 'var(--color-neutral-200)',
        color: 'var(--color-neutral-900)',
        '&:hover': {{
          backgroundColor: 'var(--color-neutral-300)',
        }},
      }},
      outline: {{
        backgroundColor: 'transparent',
        color: 'var(--color-primary-500)',
        border: '1px solid var(--color-primary-500)',
        '&:hover': {{
          backgroundColor: 'var(--color-primary-50)',
        }},
      }},
      ghost: {{
        backgroundColor: 'transparent',
        color: 'var(--color-neutral-700)',
        '&:hover': {{
          backgroundColor: 'var(--color-neutral-100)',
        }},
      }},
    }},
    
    card: {{
      default: {{
        backgroundColor: isDark ? 'var(--color-neutral-800)' : 'var(--color-neutral-0)',
        border: '1px solid var(--color-neutral-300)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-sm)',
      }},
      elevated: {{
        backgroundColor: isDark ? 'var(--color-neutral-800)' : 'var(--color-neutral-0)',
        border: '1px solid var(--color-neutral-300)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-lg)',
      }},
    }},
    
    input: {{
      default: {{
        backgroundColor: isDark ? 'var(--color-neutral-800)' : 'var(--color-neutral-0)',
        border: '1px solid var(--color-neutral-300)',
        borderRadius: 'var(--radius-md)',
        color: 'var(--color-neutral-900)',
        '&:focus': {{
          borderColor: 'var(--color-primary-500)',
          boxShadow: '0 0 0 3px var(--color-primary-100)',
        }},
      }},
    }},
  }};
}};