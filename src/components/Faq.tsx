import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Plus } from '@/components/icons';
import { faqs } from '@/config/content';
import { useReducedMotion } from '@/hooks/useReveal';

export default function Faq() {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-24 md:py-36 bg-ivory grain">
      <div className="max-w-editorial mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <header className="lg:col-span-4 lg:sticky lg:top-28 self-start">
            <p className="eyebrow mb-5">Questions &amp; Answers</p>
            <h2 className="display-headline text-4xl md:text-5xl text-balance">
              Everything you might
              <span className="italic text-burgundy"> want to know.</span>
            </h2>
            <p className="text-sm text-taupe mt-6 max-w-xs">
              Answers reflect general guidance. For specifics about your occasion, please contact the artist directly.
            </p>
          </header>

          <div className="lg:col-span-8 divide-y divide-espresso/10 border-y border-espresso/10">
            {faqs.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={i}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-lg md:text-xl pr-4">{item.q}</span>
                    <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.3 }} className="shrink-0 text-burgundy">
                      <Plus size={20} strokeWidth={1.5} />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: reduced ? 0.1 : 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="text-sm text-taupe leading-relaxed pb-6 pr-10 max-w-2xl">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
