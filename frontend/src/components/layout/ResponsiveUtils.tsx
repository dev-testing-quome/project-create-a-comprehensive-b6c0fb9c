import {{ useState, useEffect }} from 'react';

// === BREAKPOINT HOOKS === //

export const useBreakpoint = () => {{
  const [breakpoint, setBreakpoint] = useState<string>('');

  useEffect(() => {{
    const getBreakpoint = () => {{
      const width = window.innerWidth;
      if (width < 640) return 'xs';
      if (width < 768) return 'sm';
      if (width < 1024) return 'md';
      if (width < 1280) return 'lg';
      if (width < 1536) return 'xl';
      return '2xl';
    }};

    const handleResize = () => {{
      setBreakpoint(getBreakpoint());
    }};

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }}, []);

  return breakpoint;
}};

export const useMediaQuery = (query: string): boolean => {{
  const [matches, setMatches] = useState(false);

  useEffect(() => {{
    const media = window.matchMedia(query);
    const updateMatches = () => setMatches(media.matches);
    
    updateMatches();
    media.addEventListener('change', updateMatches);
    return () => media.removeEventListener('change', updateMatches);
  }}, [query]);

  return matches;
}};

export const useIsMobile = () => useMediaQuery('(max-width: 768px)');
export const useIsTablet = () => useMediaQuery('(min-width: 769px) and (max-width: 1023px)');
export const useIsDesktop = () => useMediaQuery('(min-width: 1024px)');

// === RESPONSIVE COMPONENTS === //

interface ResponsiveProps {{
  children: React.ReactNode;
  breakpoint?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  direction?: 'up' | 'down';
}}

export const Responsive: React.FC<ResponsiveProps> = ({{
  children,
  breakpoint = 'md',
  direction = 'up',
}}) => {{
  const currentBreakpoint = useBreakpoint();
  
  const breakpointOrder = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
  const currentIndex = breakpointOrder.indexOf(currentBreakpoint);
  const targetIndex = breakpointOrder.indexOf(breakpoint);
  
  const shouldShow = direction === 'up' 
    ? currentIndex >= targetIndex 
    : currentIndex <= targetIndex;

  return shouldShow ? <>{children}</> : null;
}};

// === CONTAINER COMPONENTS === //

interface ContainerProps {{
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  className?: string;
}}

export const Container: React.FC<ContainerProps> = ({{
  children,
  maxWidth = 'lg',
  className = '',
}}) => {{
  const maxWidths = {{
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
    full: '100%',
  }};

  return (
    <div
      className={{className}}
      style={{{{
        width: '100%',
        maxWidth: maxWidths[maxWidth],
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingLeft: 'var(--space-4)',
        paddingRight: 'var(--space-4)',
      }}}}
    >
      {{children}}
    </div>
  );
}};

// === GRID SYSTEM === //

interface GridProps {{
  children: React.ReactNode;
  cols?: number | {{ xs?: number; sm?: number; md?: number; lg?: number; xl?: number }};
  gap?: number;
  className?: string;
}}

export const Grid: React.FC<GridProps> = ({{
  children,
  cols = 1,
  gap = 4,
  className = '',
}}) => {{
  const breakpoint = useBreakpoint();
  
  const getColumns = () => {{
    if (typeof cols === 'number') return cols;
    
    const breakpointCols = cols[breakpoint as keyof typeof cols];
    if (breakpointCols) return breakpointCols;
    
    // Fallback to largest available breakpoint
    const availableBreakpoints = ['xl', 'lg', 'md', 'sm', 'xs'];
    for (const bp of availableBreakpoints) {{
      if (cols[bp as keyof typeof cols]) {{
        return cols[bp as keyof typeof cols];
      }}
    }}
    
    return 1;
  }};

  return (
    <div
      className={{className}}
      style={{{{
        display: 'grid',
        gridTemplateColumns: `repeat(${{getColumns()}}, 1fr)`,
        gap: `var(--space-${{gap}})`,
      }}}}
    >
      {{children}}
    </div>
  );
}};

// === FLEX UTILITIES === //

interface FlexProps {{
  children: React.ReactNode;
  direction?: 'row' | 'column' | {{ xs?: string; sm?: string; md?: string; lg?: string }};
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  wrap?: boolean;
  gap?: number;
  className?: string;
}}

export const Flex: React.FC<FlexProps> = ({{
  children,
  direction = 'row',
  justify = 'start',
  align = 'start',
  wrap = false,
  gap = 0,
  className = '',
}}) => {{
  const breakpoint = useBreakpoint();
  
  const getDirection = () => {{
    if (typeof direction === 'string') return direction;
    return direction[breakpoint as keyof typeof direction] || 'row';
  }};

  const justifyMap = {{
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    between: 'space-between',
    around: 'space-around',
    evenly: 'space-evenly',
  }};

  const alignMap = {{
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    stretch: 'stretch',
    baseline: 'baseline',
  }};

  return (
    <div
      className={{className}}
      style={{{{
        display: 'flex',
        flexDirection: getDirection() as any,
        justifyContent: justifyMap[justify],
        alignItems: alignMap[align],
        flexWrap: wrap ? 'wrap' : 'nowrap',
        gap: gap > 0 ? `var(--space-${{gap}})` : undefined,
      }}}}
    >
      {{children}}
    </div>
  );
}};

// === ASPECT RATIO === //

interface AspectRatioProps {{
  children: React.ReactNode;
  ratio?: number | string;
  className?: string;
}}

export const AspectRatio: React.FC<AspectRatioProps> = ({{
  children,
  ratio = 1,
  className = '',
}}) => {{
  const paddingTop = typeof ratio === 'number' 
    ? `${{(1 / ratio) * 100}}%` 
    : ratio;

  return (
    <div
      className={{className}}
      style={{{{
        position: 'relative',
        width: '100%',
        paddingTop,
      }}}}
    >
      <div
        style={{{{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}}}
      >
        {{children}}
      </div>
    </div>
  );
}};

// === VISIBILITY UTILITIES === //

interface ShowProps {{
  children: React.ReactNode;
  above?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  below?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}}

export const Show: React.FC<ShowProps> = ({{ children, above, below }}) => {{
  const breakpoint = useBreakpoint();
  const breakpointOrder = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
  const currentIndex = breakpointOrder.indexOf(breakpoint);
  
  let shouldShow = true;
  
  if (above) {{
    const aboveIndex = breakpointOrder.indexOf(above);
    shouldShow = shouldShow && currentIndex >= aboveIndex;
  }}
  
  if (below) {{
    const belowIndex = breakpointOrder.indexOf(below);
    shouldShow = shouldShow && currentIndex <= belowIndex;
  }}
  
  return shouldShow ? <>{children}</> : null;
}};

export const Hide: React.FC<ShowProps> = ({{ children, above, below }}) => {{
  const breakpoint = useBreakpoint();
  const breakpointOrder = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
  const currentIndex = breakpointOrder.indexOf(breakpoint);
  
  let shouldHide = false;
  
  if (above) {{
    const aboveIndex = breakpointOrder.indexOf(above);
    shouldHide = shouldHide || currentIndex >= aboveIndex;
  }}
  
  if (below) {{
    const belowIndex = breakpointOrder.indexOf(below);
    shouldHide = shouldHide || currentIndex <= belowIndex;
  }}
  
  return shouldHide ? null : <>{children}</>;
}};