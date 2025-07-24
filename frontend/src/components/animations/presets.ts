import {{ Variants, Transition }} from 'framer-motion';

// === TRANSITION PRESETS === //

export const transitions: Record<string, Transition> = {{
  spring: {{
    type: 'spring',
    stiffness: 300,
    damping: 30,
  }},
  smooth: {{
    type: 'tween',
    duration: 0.3,
    ease: [0.4, 0, 0.2, 1],
  }},
  bouncy: {{
    type: 'spring',
    stiffness: 400,
    damping: 20,
  }},
  slow: {{
    type: 'tween',
    duration: 0.6,
    ease: 'easeInOut',
  }},
}};

// === ANIMATION VARIANTS === //

export const fadeIn: Variants = {{
  initial: {{ opacity: 0 }},
  animate: {{ opacity: 1 }},
  exit: {{ opacity: 0 }},
}};

export const slideUp: Variants = {{
  initial: {{ opacity: 0, y: 20 }},
  animate: {{ opacity: 1, y: 0 }},
  exit: {{ opacity: 0, y: -20 }},
}};

export const slideDown: Variants = {{
  initial: {{ opacity: 0, y: -20 }},
  animate: {{ opacity: 1, y: 0 }},
  exit: {{ opacity: 0, y: 20 }},
}};

export const slideLeft: Variants = {{
  initial: {{ opacity: 0, x: 20 }},
  animate: {{ opacity: 1, x: 0 }},
  exit: {{ opacity: 0, x: -20 }},
}};

export const slideRight: Variants = {{
  initial: {{ opacity: 0, x: -20 }},
  animate: {{ opacity: 1, x: 0 }},
  exit: {{ opacity: 0, x: 20 }},
}};

export const scale: Variants = {{
  initial: {{ opacity: 0, scale: 0.95 }},
  animate: {{ opacity: 1, scale: 1 }},
  exit: {{ opacity: 0, scale: 0.95 }},
}};

export const scaleUp: Variants = {{
  initial: {{ opacity: 0, scale: 0.8 }},
  animate: {{ opacity: 1, scale: 1 }},
  exit: {{ opacity: 0, scale: 1.1 }},
}};

export const rotate: Variants = {{
  initial: {{ opacity: 0, rotate: -10 }},
  animate: {{ opacity: 1, rotate: 0 }},
  exit: {{ opacity: 0, rotate: 10 }},
}};

// === BUTTON ANIMATIONS === //

export const buttonHover: Variants = {{
  hover: {{
    scale: 1.02,
    transition: transitions.spring,
  }},
  tap: {{
    scale: 0.98,
    transition: transitions.spring,
  }},
}};

export const buttonPress: Variants = {{
  whileTap: {{ scale: 0.95 }},
  whileHover: {{ scale: 1.05 }},
}};

// === CARD ANIMATIONS === //

export const cardHover: Variants = {{
  hover: {{
    y: -5,
    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    transition: transitions.spring,
  }},
}};

export const cardPress: Variants = {{
  tap: {{ scale: 0.98 }},
}};

// === LIST ANIMATIONS === //

export const staggerContainer: Variants = {{
  animate: {{
    transition: {{
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }},
  }},
}};

export const staggerItem: Variants = {{
  initial: {{ opacity: 0, y: 20 }},
  animate: {{ opacity: 1, y: 0 }},
}};

// === MODAL ANIMATIONS === //

export const modalBackdrop: Variants = {{
  initial: {{ opacity: 0 }},
  animate: {{ opacity: 1 }},
  exit: {{ opacity: 0 }},
}};

export const modalContent: Variants = {{
  initial: {{ opacity: 0, scale: 0.95, y: 20 }},
  animate: {{ opacity: 1, scale: 1, y: 0 }},
  exit: {{ opacity: 0, scale: 0.95, y: 20 }},
}};

// === PAGE TRANSITIONS === //

export const pageTransition: Variants = {{
  initial: {{ opacity: 0, x: -20 }},
  animate: {{ opacity: 1, x: 0 }},
  exit: {{ opacity: 0, x: 20 }},
}};

export const pageSlide: Variants = {{
  initial: {{ opacity: 0, y: 20 }},
  animate: {{ opacity: 1, y: 0 }},
  exit: {{ opacity: 0, y: -20 }},
}};

// === LOADING ANIMATIONS === //

export const spinner: Variants = {{
  animate: {{
    rotate: 360,
    transition: {{
      duration: 1,
      repeat: Infinity,
      ease: 'linear',
    }},
  }},
}};

export const pulse: Variants = {{
  animate: {{
    scale: [1, 1.05, 1],
    transition: {{
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    }},
  }},
}};

export const bounce: Variants = {{
  animate: {{
    y: [0, -10, 0],
    transition: {{
      duration: 0.6,
      repeat: Infinity,
      ease: 'easeInOut',
    }},
  }},
}};

// === UTILITY FUNCTIONS === //

export const createStagger = (staggerDelay: number = 0.1, delayChildren: number = 0) => ({{
  animate: {{
    transition: {{
      staggerChildren: staggerDelay,
      delayChildren,
    }},
  }},
}});

export const createSlide = (direction: 'up' | 'down' | 'left' | 'right', distance: number = 20): Variants => {{
  const getTransform = () => {{
    switch (direction) {{
      case 'up': return {{ y: distance }};
      case 'down': return {{ y: -distance }};
      case 'left': return {{ x: distance }};
      case 'right': return {{ x: -distance }};
    }}
  }};

  const getExitTransform = () => {{
    switch (direction) {{
      case 'up': return {{ y: -distance }};
      case 'down': return {{ y: distance }};
      case 'left': return {{ x: -distance }};
      case 'right': return {{ x: distance }};
    }}
  }};

  return {{
    initial: {{ opacity: 0, ...getTransform() }},
    animate: {{ opacity: 1, x: 0, y: 0 }},
    exit: {{ opacity: 0, ...getExitTransform() }},
  }};
}};

export const createScale = (initialScale: number = 0.95, exitScale: number = 0.95): Variants => ({{
  initial: {{ opacity: 0, scale: initialScale }},
  animate: {{ opacity: 1, scale: 1 }},
  exit: {{ opacity: 0, scale: exitScale }},
}});