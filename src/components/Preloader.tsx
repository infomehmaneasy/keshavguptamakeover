import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { artist } from '@/config/artist';
import { heroPortrait } from '@/config/media';
import { useReducedMotion } from '@/hooks/useReveal';

type Props = { onComplete: () => void };

const letters = artist.subBrand.split('');

export default function Preloader({ onComplete }: Props) {
  const reduced = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduced) {
      setProgress(100);
      setDone(true);
      return;
    }
    let finished = false;
    const image = new Image();
    const finish = () => {
      if (finished) return;
      finished = true;
      setProgress(100);
      setDone(true);
    };
    const fallback = window.setTimeout(finish, 2500);
    image.onload = () => {
      window.clearTimeout(fallback);
      finish();
    };
    image.onerror = () => {
      window.clearTimeout(fallback);
      finish();
    };
    image.src = heroPortrait;
    if (image.complete) {
      window.clearTimeout(fallback);
      finish();
    }
    return () => {
      window.clearTimeout(fallback);
      image.onload = null;
      image.onerror = null;
    };
  }, [reduced]);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-espresso"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.7, 0, 0.3, 1] }}
        >
          <div className="flex flex-col items-center px-6">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-[10px] uppercase tracking-ultra text-champagne/60 mb-8"
            >
              {artist.tagline}
            </motion.p>

            <h1 className="font-display text-ivory text-4xl sm:text-5xl tracking-[0.15em] font-light text-center">
              {artist.brand}
            </h1>

            <div className="mt-3 flex overflow-hidden">
              {letters.map((l, i) => (
                <motion.span
                  key={i}
                  className="font-display text-champagne text-xl tracking-[0.4em] font-light"
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.2 + i * 0.06,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                >
                  {l === ' ' ? '\u00A0' : l}
                </motion.span>
              ))}
            </div>

            <div className="mt-10 h-px w-40 bg-ivory/15 overflow-hidden">
              <div
                className="h-full bg-champagne origin-left transition-[width] duration-100 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: progress > 70 ? 1 : 0 }}
              transition={{ duration: 0.4 }}
              className="mt-6 text-[10px] uppercase tracking-widest text-taupe/70"
            >
              Preparing the portrait
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
