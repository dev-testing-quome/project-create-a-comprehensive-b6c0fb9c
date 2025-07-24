import {{ useAnimation, useInView, AnimationControls }} from 'framer-motion';
import {{ useEffect, useRef }} from 'react';

// === SCROLL REVEAL HOOK === //

export const useScrollReveal = (threshold: number = 0.1, triggerOnce: boolean = true) => {{
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, {{ threshold, once: triggerOnce }});

  useEffect(() => {{
    if (inView) {{
      controls.start('animate');
    }} else if (!triggerOnce) {{
      controls.start('initial');
    }}
  }}, [controls, inView, triggerOnce]);

  return {{ ref, controls, inView }};
}};

// === STAGGER CHILDREN HOOK === //

export const useStaggerChildren = (delay: number = 0.1) => {{
  const controls = useAnimation();

  const startAnimation = () => {{
    controls.start((i) => ({{
      opacity: 1,
      y: 0,
      transition: {{ delay: i * delay }},
    }}));
  }};

  return {{ controls, startAnimation }};
}};

// === SEQUENCE ANIMATION HOOK === //

export const useSequence = () => {{
  const controls = useAnimation();

  const playSequence = async (sequence: Array<{{ target: any; duration?: number }}>) => {{
    for (const step of sequence) {{
      await controls.start(step.target);
      if (step.duration) {{
        await new Promise((resolve) => setTimeout(resolve, step.duration));
      }}
    }}
  }};

  return {{ controls, playSequence }};
}};

// === MOUSE TRACKING HOOK === //

export const useMouseTracking = () => {{
  const ref = useRef<HTMLElement>(null);
  const controls = useAnimation();

  useEffect(() => {{
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (event: MouseEvent) => {{
      const rect = element.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 20;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 20;

      controls.start({{
        rotateX: y,
        rotateY: x,
        transition: {{ type: 'spring', stiffness: 300, damping: 30 }},
      }});
    }};

    const handleMouseLeave = () => {{
      controls.start({{
        rotateX: 0,
        rotateY: 0,
        transition: {{ type: 'spring', stiffness: 300, damping: 30 }},
      }});
    }};

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {{
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    }};
  }}, [controls]);

  return {{ ref, controls }};
}};

// === PARALLAX HOOK === //

export const useParallax = (speed: number = 0.5) => {{
  const ref = useRef<HTMLElement>(null);
  const controls = useAnimation();

  useEffect(() => {{
    const handleScroll = () => {{
      if (!ref.current) return;

      const scrolled = window.pageYOffset;
      const parallax = scrolled * speed;

      controls.start({{
        y: parallax,
        transition: {{ type: 'tween', ease: 'linear', duration: 0 }},
      }});
    }};

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }}, [controls, speed]);

  return {{ ref, controls }};
}};

// === TYPING ANIMATION HOOK === //

export const useTypingAnimation = (text: string, speed: number = 50) => {{
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {{
    let currentIndex = 0;
    setDisplayText('');
    setIsComplete(false);

    const timer = setInterval(() => {{
      if (currentIndex < text.length) {{
        setDisplayText((prev) => prev + text[currentIndex]);
        currentIndex++;
      }} else {{
        setIsComplete(true);
        clearInterval(timer);
      }}
    }}, speed);

    return () => clearInterval(timer);
  }}, [text, speed]);

  return {{ displayText, isComplete }};
}};

// === WAVE ANIMATION HOOK === //

export const useWaveAnimation = (duration: number = 2000) => {{
  const controls = useAnimation();

  useEffect(() => {{
    const animateWave = () => {{
      controls.start({{
        scaleX: [1, 1.2, 1],
        scaleY: [1, 0.8, 1],
        transition: {{
          duration: duration / 1000,
          repeat: Infinity,
          ease: 'easeInOut',
        }},
      }});
    }};

    animateWave();
  }}, [controls, duration]);

  return controls;
}};