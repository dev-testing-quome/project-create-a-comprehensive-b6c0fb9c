export interface ThemeColors {{
  primary: ColorScale;
  secondary: ColorScale;
  neutral: ColorScale;
  success: SemanticColor;
  warning: SemanticColor;
  error: SemanticColor;
  info: SemanticColor;
}}

export interface ColorScale {{
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950?: string;
}}

export interface SemanticColor {{
  50: string;
  500: string;
  600: string;
}}

export interface Typography {{
  fontFamily: {{
    sans: string;
    serif: string;
    mono: string;
  }};
  fontSize: {{
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
    '5xl': string;
  }};
  fontWeight: {{
    thin: number;
    light: number;
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
    extrabold: number;
    black: number;
  }};
  lineHeight: {{
    none: number;
    tight: number;
    snug: number;
    normal: number;
    relaxed: number;
    loose: number;
  }};
}}

export interface Spacing {{
  0: string;
  px: string;
  0.5: string;
  1: string;
  1.5: string;
  2: string;
  2.5: string;
  3: string;
  3.5: string;
  4: string;
  5: string;
  6: string;
  7: string;
  8: string;
  10: string;
  12: string;
  16: string;
  20: string;
}}

export interface BorderRadius {{
  none: string;
  sm: string;
  base: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  full: string;
}}

export interface Shadows {{
  xs: string;
  sm: string;
  base: string;
  lg: string;
  xl: string;
  '2xl': string;
  inner: string;
}}

export interface Theme {{
  colors: ThemeColors;
  typography: Typography;
  spacing: Spacing;
  borderRadius: BorderRadius;
  shadows: Shadows;
  breakpoints: {{
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
  }};
  transitions: {{
    none: string;
    all: string;
    default: string;
    colors: string;
    opacity: string;
    shadow: string;
    transform: string;
  }};
  zIndex: {{
    0: number;
    10: number;
    20: number;
    30: number;
    40: number;
    50: number;
    auto: string;
  }};
}}

export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeContextValue {{
  theme: Theme;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
  isDark: boolean;
}}