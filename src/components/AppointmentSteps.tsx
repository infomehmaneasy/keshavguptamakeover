import { motion } from 'framer-motion';
import { appointmentSteps } from '@/config/content';
import { useReducedMotion } from '@/hooks/useReveal';

type Props = { onBook: () => void };

export default function AppointmentSteps({ onBook }: Props) {
  const reduced = useReducedMotion();

  return (
    <section className="py-24 md:py-36 bg-ivory">
      <div className="max-w-editorial mx-auto px-5 sm:px-8">
        <header className="text-center mb-16 md:mb-24">
          <p className="eyebrow mb-5">How Appointments Work</p>
          <h2 className="display-headline text-4xl md:text-5xl lg:text-6xl text-balance">
            A simple, considered path
            <span className="italic text-burgundy"> to your look.</span>
          </h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-espresso/10 border border-espresso/10">
          {appointmentSteps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : i * 0.15, ease: 'easeOut' }}
              className="bg-ivory p-8 md:p-10 lg:p-12 relative"
            >
              <span className="font-display text-6xl text-champagne/50 leading-none block mb-6">{s.step}</span>
              <h3 className="font-display text-2xl mb-3">{s.title}</h3>
              <p className="text-sm text-taupe leading-relaxed">{s.description}</p>
              {i < 2 && (
                <div className="hidden md:block absolute top-1/2 right-0 w-8 h-px bg-champagne/40 -translate-y-1/2 translate-x-1/2" />
              )}
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button onClick={onBook} className="btn-primary">
            Begin Your Enquiry
          </button>
        </div>
      </div>
    </section>
  );
}
