import React, {{ forwardRef, HTMLAttributes }} from 'react';
import {{ motion, HTMLMotionProps }} from 'framer-motion';
import {{ useTheme }} from '../../hooks/useTheme';

interface CardProps extends HTMLAttributes<HTMLDivElement> {{
  variant?: 'default' | 'elevated' | 'outline' | 'glass';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  hoverable?: boolean;
  animate?: boolean;
}}

type MotionCardProps = CardProps & HTMLMotionProps<'div'>;

export const Card = forwardRef<HTMLDivElement, MotionCardProps>(
  ({{
    variant = 'default',
    padding = 'md',
    hoverable = false,
    animate = true,
    children,
    className = '',
    ...props
  }}, ref) => {{
    const theme = useTheme();

    const baseStyles = {{
      borderRadius: theme.radius('lg'),
      transition: theme.transition('all'),
      overflow: 'hidden',
    }};

    const paddingStyles = {{
      none: {{ padding: 0 }},
      sm: {{ padding: theme.spacing(3) }},
      md: {{ padding: theme.spacing(4) }},
      lg: {{ padding: theme.spacing(6) }},
      xl: {{ padding: theme.spacing(8) }},
    }};

    const variantStyles = {{
      default: {{
        backgroundColor: theme.isDark ? theme.colors.neutral('800') : theme.colors.neutral('0'),
        border: `1px solid ${{theme.colors.neutral('300')}}`,
        boxShadow: theme.shadow('sm'),
      }},
      elevated: {{
        backgroundColor: theme.isDark ? theme.colors.neutral('800') : theme.colors.neutral('0'),
        border: `1px solid ${{theme.colors.neutral('200')}}`,
        boxShadow: theme.shadow('lg'),
      }},
      outline: {{
        backgroundColor: 'transparent',
        border: `1px solid ${{theme.colors.neutral('300')}}`,
      }},
      glass: {{
        backgroundColor: theme.isDark 
          ? 'rgba(255, 255, 255, 0.05)' 
          : 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        border: `1px solid ${{theme.isDark 
          ? 'rgba(255, 255, 255, 0.1)' 
          : 'rgba(255, 255, 255, 0.2)'
        }}`,
      }},
    }};

    const cardVariants = {{
      hover: hoverable && animate 
        ? {{ 
            y: -5, 
            boxShadow: theme.shadow('xl'),
            transition: {{ type: 'spring', stiffness: 300, damping: 30 }}
          }} 
        : {{}},
      tap: hoverable && animate ? {{ scale: 0.98 }} : {{}},
    }};

    return (
      <motion.div
        ref={{ref}}
        variants={{cardVariants}}
        whileHover={{hoverable ? "hover" : undefined}}
        whileTap={{hoverable ? "tap" : undefined}}
        style={{{{
          ...baseStyles,
          ...variantStyles[variant],
          ...paddingStyles[padding],
        }}}}
        className={{className}}
        {{...props}}
      >
        {{children}}
      </motion.div>
    );
  }}
);

Card.displayName = 'Card';

// Card composition components
export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({{ children, className = '', ...props }}, ref) => {{
    const theme = useTheme();
    
    return (
      <div
        ref={{ref}}
        className={{className}}
        style={{{{
          padding: `${{theme.spacing(4)}} ${{theme.spacing(4)}} 0`,
          borderBottom: `1px solid ${{theme.colors.neutral('200')}}`,
          marginBottom: theme.spacing(4),
          paddingBottom: theme.spacing(4),
        }}}}
        {{...props}}
      >
        {{children}}
      </div>
    );
  }}
);

CardHeader.displayName = 'CardHeader';

export const CardBody = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({{ children, className = '', ...props }}, ref) => {{
    const theme = useTheme();
    
    return (
      <div
        ref={{ref}}
        className={{className}}
        style={{{{ flex: 1 }}}}
        {{...props}}
      >
        {{children}}
      </div>
    );
  }}
);

CardBody.displayName = 'CardBody';

export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({{ children, className = '', ...props }}, ref) => {{
    const theme = useTheme();
    
    return (
      <div
        ref={{ref}}
        className={{className}}
        style={{{{
          padding: `0 ${{theme.spacing(4)}} ${{theme.spacing(4)}}`,
          borderTop: `1px solid ${{theme.colors.neutral('200')}}`,
          marginTop: theme.spacing(4),
          paddingTop: theme.spacing(4),
        }}}}
        {{...props}}
      >
        {{children}}
      </div>
    );
  }}
);

CardFooter.displayName = 'CardFooter';