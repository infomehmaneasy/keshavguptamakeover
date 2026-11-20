import { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from '@/components/icons';
import { useReducedMotion } from '@/hooks/useReveal';

type Props = { onPortfolio: () => void };

export default function Transformation({ onPortfolio }: Props) {
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  const onMove = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(2, Math.min(98, pct)));
  }, []);

  const startDrag = () => { dragging.current = true; };
  const stopDrag = () => { dragging.current = false; };

  const onMouseMove = (e: React.MouseEvent) => dragging.current && onMove(e.clientX);
  const onTouchMove = (e: React.TouchEvent) => dragging.current && onMove(e.touches[0].clientX);

  return (
    <section className="py-24 md:py-36 bg-espresso text-ivory relative overflow-hidden">
      <div className="max-w-editorial mx-auto px-5 sm:px-8">
        <header className="text-center mb-14 md:mb-20">
          <p className="eyebrow !text-champagne/70 mb-5">A Difference You Can Feel</p>
          <h2 className="display-headline !text-ivory text-5xl md:text-6xl lg:text-7xl text-balance">
            The transformation,
            <span className="italic text-champagne"> revealed.</span>
          </h2>
          <p className="text-sm text-ivory/60 mt-6 max-w-lg mx-auto">
            A cinematic two-image composition — inspiration beside the finished look. When genuine paired before-and-after photographs are available, this slider will compare them directly.
          </p>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: reduced ? 0 : 0.7, ease: 'easeOut' }}
          ref={containerRef}
          onMouseMove={onMouseMove}
          onMouseUp={stopDrag}
          onMouseLeave={stopDrag}
          onTouchMove={onTouchMove}
          onTouchEnd={stopDrag}
          className="relative w-full aspect-[4/3] md:aspect-[16/9] max-w-4xl mx-auto overflow-hidden select-none cursor-ew-resize"
        >
          {/* Replaceable design references; not a before/after pairing. */}
          <img
            src="https://images.pexels.com/photos/29354292/pexels-photo-29354292.jpeg?auto=compress&cs=tinysrgb&w=1400"
            alt="Editorial bridal portrait reference"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <span className="absolute bottom-4 right-4 text-[10px] uppercase tracking-widest bg-espresso/60 px-3 py-1 backdrop-blur-sm">
            Reference image 02
          </span>

          {/* Overlay (inspiration) clipped */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${pos}%` }}
          >
            <img
              src="https://images.pexels.com/photos/30825631/pexels-photo-30825631.jpeg?auto=compress&cs=tinysrgb&w=1400"
              alt="Editorial makeup portrait reference"
              loading="lazy"
              className="absolute inset-0 h-full object-cover"
              style={{ width: `${(100 / pos) * 100}%`, maxWidth: 'none' }}
            />
            <span className="absolute bottom-4 left-4 text-[10px] uppercase tracking-widest bg-espresso/60 px-3 py-1 backdrop-blur-sm">
              Reference image 01
            </span>
          </div>

          {/* Divider */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-champagne cursor-ew-resize"
            style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}
            onMouseDown={startDrag}
            onTouchStart={startDrag}
            role="slider"
            aria-label="Compare editorial reference images"
            aria-valuemin={2}
            aria-valuemax={98}
            aria-valuenow={Math.round(pos)}
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === 'ArrowLeft') setPos((value) => Math.max(2, value - 2));
              if (event.key === 'ArrowRight') setPos((value) => Math.min(98, value + 2));
            }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-champagne flex items-center justify-center shadow-lg">
              <ArrowRight size={16} strokeWidth={2} className="text-espresso rotate-0" />
              <ArrowRight size={16} strokeWidth={2} className="text-espresso rotate-180 -ml-1" />
            </div>
          </div>
        </motion.div>

        <p className="text-xs text-ivory/40 text-center mt-6">
          Drag the divider to explore two independent editorial references. They are not before-and-after photographs or verified client work.
        </p>

        <div className="text-center mt-10">
          <button onClick={onPortfolio} className="btn-outline !border-ivory/30 !text-ivory hover:!bg-ivory hover:!text-espresso">
            View the Full Lookbook
            <ArrowRight size={14} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </section>
  );
}
