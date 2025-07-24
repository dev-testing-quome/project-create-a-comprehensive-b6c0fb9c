import React, {{ forwardRef, ButtonHTMLAttributes }} from 'react';
import {{ motion, HTMLMotionProps }} from 'framer-motion';
import {{ useTheme }} from '../../hooks/useTheme';

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'size'> {{
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  animate?: boolean;
}}

type MotionButtonProps = ButtonProps & HTMLMotionProps<'button'>;

export const Button = forwardRef<HTMLButtonElement, MotionButtonProps>(
  ({{
    variant = 'primary',
    size = 'md',
    loading = false,
    leftIcon,
    rightIcon,
    fullWidth = false,
    animate = true,
    children,
    className = '',
    disabled,
    ...props
  }}, ref) => {{
    const theme = useTheme();

    const baseStyles = {{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: theme.spacing(2),
      fontFamily: theme.font('sans'),
      fontWeight: theme.weight('medium'),
      borderRadius: theme.radius('md'),
      border: 'none',
      cursor: disabled || loading ? 'not-allowed' : 'pointer',
      transition: theme.transition('all'),
      textDecoration: 'none',
      outline: 'none',
      width: fullWidth ? '100%' : 'auto',
      opacity: disabled ? 0.6 : 1,
    }};

    const sizeStyles = {{
      xs: {{
        padding: `${{theme.spacing(1)}} ${{theme.spacing(2)}}`,
        fontSize: theme.text('xs'),
        minHeight: '24px',
      }},
      sm: {{
        padding: `${{theme.spacing(1.5)}} ${{theme.spacing(3)}}`,
        fontSize: theme.text('sm'),
        minHeight: '32px',
      }},
      md: {{
        padding: `${{theme.spacing(2)}} ${{theme.spacing(4)}}`,
        fontSize: theme.text('base'),
        minHeight: '40px',
      }},
      lg: {{
        padding: `${{theme.spacing(2.5)}} ${{theme.spacing(6)}}`,
        fontSize: theme.text('lg'),
        minHeight: '48px',
      }},
      xl: {{
        padding: `${{theme.spacing(3)}} ${{theme.spacing(8)}}`,
        fontSize: theme.text('xl'),
        minHeight: '56px',
      }},
    }};

    const variantStyles = {{
      primary: {{
        backgroundColor: theme.colors.primary(),
        color: 'white',
        '&:hover': {{
          backgroundColor: theme.colors.primary('600'),
        }},
        '&:focus': {{
          backgroundColor: theme.colors.primary('600'),
          boxShadow: `0 0 0 3px ${{theme.colors.primary('200')}}`,
        }},
      }},
      secondary: {{
        backgroundColor: theme.colors.neutral('200'),
        color: theme.colors.neutral('900'),
        '&:hover': {{
          backgroundColor: theme.colors.neutral('300'),
        }},
        '&:focus': {{
          backgroundColor: theme.colors.neutral('300'),
          boxShadow: `0 0 0 3px ${{theme.colors.neutral('400')}}`,
        }},
      }},
      outline: {{
        backgroundColor: 'transparent',
        color: theme.colors.primary(),
        border: `1px solid ${{theme.colors.primary()}}`,
        '&:hover': {{
          backgroundColor: theme.colors.primary('50'),
          borderColor: theme.colors.primary('600'),
        }},
        '&:focus': {{
          backgroundColor: theme.colors.primary('50'),
          boxShadow: `0 0 0 3px ${{theme.colors.primary('200')}}`,
        }},
      }},
      ghost: {{
        backgroundColor: 'transparent',
        color: theme.colors.neutral('700'),
        '&:hover': {{
          backgroundColor: theme.colors.neutral('100'),
        }},
        '&:focus': {{
          backgroundColor: theme.colors.neutral('100'),
          boxShadow: `0 0 0 3px ${{theme.colors.neutral('300')}}`,
        }},
      }},
      destructive: {{
        backgroundColor: theme.colors.error(),
        color: 'white',
        '&:hover': {{
          backgroundColor: theme.colors.error('600'),
        }},
        '&:focus': {{
          backgroundColor: theme.colors.error('600'),
          boxShadow: `0 0 0 3px ${{theme.colors.error('200')}}`,
        }},
      }},
    }};

    const buttonVariants = {{
      hover: animate ? {{ scale: 1.02 }} : {{}},
      tap: animate ? {{ scale: 0.98 }} : {{}},
    }};

    return (
      <motion.button
        ref={{ref}}
        variants={{buttonVariants}}
        whileHover="hover"
        whileTap="tap"
        style={{{{
          ...baseStyles,
          ...sizeStyles[size],
          ...variantStyles[variant],
        }}}}
        className={{className}}
        disabled={{disabled || loading}}
        {{...props}}
      >
        {{leftIcon && !loading && leftIcon}}
        {{loading && (
          <motion.div
            animate={{{{ rotate: 360 }}}}
            transition={{{{ duration: 1, repeat: Infinity, ease: 'linear' }}}}
            style={{{{
              width: '1em',
              height: '1em',
              border: '2px solid currentColor',
              borderTopColor: 'transparent',
              borderRadius: '50%',
            }}}}
          />
        )}}
        {{children}}
        {{rightIcon && !loading && rightIcon}}
      </motion.button>
    );
  }}
);

Button.displayName = 'Button';