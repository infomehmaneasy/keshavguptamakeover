import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, CalendarDays, Play } from '@/components/icons';
import { portfolioItems, portfolioCategories } from '@/config/portfolio';
import type { PortfolioCategory, PortfolioItem } from '@/config/portfolio';
import { useReducedMotion } from '@/hooks/useReveal';

type Props = { onBook: (service: PortfolioItem) => void };

export default function Portfolio({ onBook }: Props) {
  const reduced = useReducedMotion();
  const [filter, setFilter] = useState<PortfolioCategory | 'All'>('All');
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = portfolioItems.filter((i) => filter === 'All' || i.category === filter);

  const closeLightbox = useCallback(() => setLightbox(null), []);
  const next = useCallback(() => {
    setLightbox((cur) => (cur === null ? null : (cur + 1) % filtered.length));
  }, [filtered.length]);
  const prev = useCallback(() => {
    setLightbox((cur) => (cur === null ? null : (cur - 1 + filtered.length) % filtered.length));
  }, [filtered.length]);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightbox, closeLightbox, next, prev]);

  return (
    <section id="portfolio" className="py-24 md:py-36 bg-ivory grain">
      <div className="max-w-editorial mx-auto px-5 sm:px-8">
        <header className="mb-14 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="eyebrow mb-4">The Lookbook</p>
            <h2 className="display-headline text-5xl md:text-6xl lg:text-7xl">
              Every face tells
              <span className="italic text-burgundy"> a different story.</span>
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-taupe max-w-xs">
            A closer look at Keshav's artistry — from bridal celebrations to evenings in the spotlight.
          </p>
        </header>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 md:mb-14">
          {portfolioCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              aria-pressed={filter === cat.id}
              className={`px-4 py-2 text-[11px] uppercase tracking-widest font-medium border transition-all duration-300 ${
                filter === cat.id
                  ? 'bg-espresso text-ivory border-espresso'
                  : 'border-espresso/20 text-espresso/70 hover:border-espresso/50 hover:text-espresso'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <LayoutGroup>
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-12 md:gap-x-7 md:gap-y-16"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((item, idx) => (
                <motion.button
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: reduced ? 0 : 0.4, ease: 'easeOut' }}
                  onClick={() => setLightbox(idx)}
                  aria-label={`View ${item.title}`}
                  className="group block w-full text-left"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-espresso/5">
                    {item.media.type === 'video' ? (
                      <>
                        <img
                          src={item.media.poster}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover object-[center_22%] transition-transform duration-700 group-hover:scale-105"
                        />
                        <span className="absolute inset-0 flex items-center justify-center">
                          <span className="grid size-12 place-items-center rounded-full border border-ivory/75 bg-espresso/35 text-ivory backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                            <Play size={16} fill="currentColor" strokeWidth={1.5} />
                          </span>
                        </span>
                        <span className="absolute top-3 right-3 bg-espresso/65 px-2 py-1 text-[8px] uppercase tracking-widest text-ivory">
                          Film
                        </span>
                      </>
                    ) : (
                      <img
                        src={item.media.src}
                        alt={item.caption}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-[center_22%] transition-transform duration-700 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <div className="pt-4">
                    <p className="eyebrow !text-[10px] !tracking-widest">{item.category}</p>
                    <h3 className="mt-1 font-display text-2xl text-espresso transition-colors duration-300 group-hover:text-burgundy">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-taupe">{item.caption}</p>
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
          {filtered.length === 0 && (
            <p className="py-16 text-center font-display text-2xl text-taupe">
              New {filter} looks are coming to the lookbook.
            </p>
          )}
        </LayoutGroup>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            className="fixed inset-0 z-[80] bg-espresso/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              aria-label="Close"
              className="absolute top-5 right-5 text-ivory/80 hover:text-ivory p-2 z-10"
            >
              <X size={24} strokeWidth={1.5} />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Previous"
              className="absolute left-3 sm:left-6 text-ivory/80 hover:text-champagne p-2 z-10"
            >
              <ChevronLeft size={28} strokeWidth={1.5} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Next"
              className="absolute right-3 sm:right-6 text-ivory/80 hover:text-champagne p-2 z-10"
            >
              <ChevronRight size={28} strokeWidth={1.5} />
            </button>

            <motion.div
              key={filtered[lightbox].id}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-5xl w-full max-h-[calc(100svh-2rem)] overflow-y-auto no-scrollbar flex flex-col"
            >
              <div className="relative max-h-[55svh] sm:max-h-[72vh] overflow-hidden">
                {filtered[lightbox].media.type === 'video' ? (
                  <video
                    src={filtered[lightbox].media.src}
                    controls
                    autoPlay
                    playsInline
                    aria-label={`${filtered[lightbox].title} video`}
                    className="w-full max-h-[55svh] sm:max-h-[72vh] object-contain"
                  />
                ) : (
                  <img
                    src={filtered[lightbox].media.src}
                    alt={filtered[lightbox].caption}
                    className="w-full max-h-[55svh] sm:max-h-[72vh] object-contain"
                  />
                )}
              </div>
              <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-ivory">
                <div className="text-left">
                  <p className="text-[10px] uppercase tracking-ultra text-champagne mb-1">
                    {filtered[lightbox].category}
                  </p>
                  <h3 className="font-display text-2xl">{filtered[lightbox].title}</h3>
                  <p className="text-sm text-ivory/60 mt-1">{filtered[lightbox].caption}</p>
                  {filtered[lightbox].media.type === 'video' && (
                    <p className="text-[9px] uppercase tracking-widest text-champagne/70 mt-2">Lookbook film</p>
                  )}
                </div>
                <button
                  onClick={() => onBook(filtered[lightbox])}
                  className="btn-primary !bg-champagne !text-espresso hover:!bg-ivory whitespace-nowrap"
                >
                  <CalendarDays size={14} strokeWidth={1.5} />
                  Book This Look
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
