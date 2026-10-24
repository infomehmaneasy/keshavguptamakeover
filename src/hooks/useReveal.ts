import { useEffect, useState } from 'react';

// Tracks whether the user prefers reduced motion.
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return reduced;
}

// Tracks when a section is in view for staggered reveals.
export function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const [ref, setRef] = useState<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, options ?? { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });
    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, options]);
  return [setRef, inView] as const;
}
