import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { useState } from 'react';
import { X, ArrowRight, CalendarDays } from '@/components/icons';
import { services } from '@/config/services';
import type { Service } from '@/config/services';
import { useReducedMotion } from '@/hooks/useReveal';

type Props = { onBook: (service: Service) => void };

export default function Services({ onBook }: Props) {
  const reduced = useReducedMotion();
  const [active, setActive] = useState<Service | null>(null);

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: reduced ? 0 : 0.6, delay: reduced ? 0 : i * 0.08, ease: [0.16, 1, 0.3, 1] },
    }),
  };

  return (
    <section id="services" className="py-24 md:py-36 bg-white">
      <div className="max-w-editorial mx-auto px-5 sm:px-8">
        <header className="text-center mb-16 md:mb-24">
          <p className="eyebrow mb-5">The Art of the Occasion</p>
          <h2 className="display-headline text-5xl md:text-6xl lg:text-7xl max-w-3xl mx-auto text-balance">
            From intimate celebrations to unforgettable wedding moments,
            <span className="italic text-burgundy"> discover the look that feels like you.</span>
          </h2>
          <div className="section-divider mx-auto mt-8" />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.id}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-60px' }}
                className="group relative bg-ivory overflow-hidden flex flex-col"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    loading="lazy"
                    className="w-full h-full object-cover object-[center_24%] transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 text-champagne font-display text-3xl font-light drop-shadow-md">
                    {service.number}
                  </div>
                  <div className="absolute top-4 right-4 bg-ivory/90 backdrop-blur-sm p-2">
                    <Icon className="text-burgundy" size={16} strokeWidth={1.5} />
                  </div>
                </div>

                <div className="p-6 md:p-7 flex flex-col flex-1">
                  <h3 className="font-display text-2xl mb-2">{service.name}</h3>
                  <p className="text-sm text-taupe leading-relaxed mb-5 flex-1">
                    {service.shortDescription}
                  </p>
                  <div className="flex items-center justify-between gap-3 pt-2 border-t border-espresso/10">
                    <button
                      onClick={() => setActive(service)}
                      className="btn-ghost"
                    >
                      Learn More
                      <ArrowRight size={12} strokeWidth={1.5} />
                    </button>
                    <button
                      onClick={() => onBook(service)}
                      className="text-[11px] uppercase tracking-widest font-medium text-burgundy hover:text-espresso transition-colors flex items-center gap-1.5"
                    >
                      <CalendarDays size={12} strokeWidth={1.5} />
                      Book
                    </button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        <p className="text-center text-xs text-taupe mt-12 max-w-xl mx-auto">
          Services shown are a proposed offering. Availability, pricing, and inclusions are confirmed during your enquiry. Where details are unknown, we show &ldquo;Enquire for details&rdquo; rather than inventing them.
        </p>
      </div>

      {/* Service detail modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-espresso/80 backdrop-blur-sm" onClick={() => setActive(null)} />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={`${active.name} details`}
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-ivory max-w-4xl w-full max-h-[88vh] overflow-y-auto no-scrollbar grid grid-cols-1 md:grid-cols-2"
            >
              <button
                onClick={() => setActive(null)}
                aria-label="Close"
                className="absolute top-4 right-4 z-10 bg-ivory/90 p-2 hover:bg-white transition-colors"
              >
                <X size={20} strokeWidth={1.5} />
              </button>

              <div className="h-56 md:h-full relative overflow-hidden md:min-h-[400px]">
                <img src={active.image} alt={active.name} className="w-full h-full object-cover" />
              </div>

              <div className="p-7 md:p-10 flex flex-col">
                <p className="eyebrow mb-3">Service {active.number}</p>
                <h3 className="font-display text-3xl md:text-4xl mb-4">{active.name}</h3>
                <p className="text-sm text-espresso/80 leading-relaxed mb-6">{active.longDescription}</p>

                <div className="space-y-4 mb-8 text-sm">
                  <div>
                    <p className="form-label">Preparation</p>
                    <p className="text-espresso/80">{active.preparation}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="form-label">Duration</p>
                      <p className="text-espresso/80">{active.duration ?? 'Enquire for details'}</p>
                    </div>
                    <div>
                      <p className="form-label">Starting Price</p>
                      <p className="text-espresso/80">{active.startingPrice ?? 'Enquire for details'}</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onBook(active);
                    setActive(null);
                  }}
                  className="btn-primary mt-auto"
                >
                  <CalendarDays size={14} strokeWidth={1.5} />
                  Book This Service
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
