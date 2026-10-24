import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReveal';

type Props = { onBook: () => void };

export default function Testimonials({ onBook }: Props) {
  const reduced = useReducedMotion();

  return (
    <section className="py-24 md:py-36 bg-espresso text-ivory relative overflow-hidden">
      <div className="max-w-editorial mx-auto px-5 sm:px-8 text-center">
        <p className="eyebrow !text-champagne/70 mb-5">A Thoughtful Experience</p>

        <motion.div
          key={0}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: reduced ? 0 : 0.7, ease: 'easeOut' }}
          className="max-w-3xl mx-auto"
        >
          <span className="font-display text-7xl text-champagne/40 leading-none block mb-4">&ldquo;</span>
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-light leading-snug italic text-ivory text-balance">
            Your vision comes first. The conversation starts with you.
          </h2>
          <p className="mt-6 text-[10px] uppercase tracking-ultra text-champagne/60">
            A personal approach to every enquiry
          </p>
        </motion.div>

        <div className="mt-12 max-w-2xl mx-auto border-t border-ivory/10 pt-10">
          <p className="text-sm text-ivory/60 leading-relaxed mb-6">
            Client reviews will be added when genuine feedback is available. No ratings or stories are fabricated.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            {[
              { title: 'Clear process', text: 'A transparent enquiry flow with honest status at every stage.' },
              { title: 'Real work', text: 'A portfolio built from actual looks, not stock imagery presented as proof.' },
              { title: 'Private by design', text: 'Your booking details are used only to respond to your enquiry.' },
            ].map((item) => (
              <div key={item.title} className="flex flex-col gap-2">
                <ShieldCheck size={16} strokeWidth={1.5} className="text-champagne" />
                <p className="text-[11px] uppercase tracking-widest text-ivory">{item.title}</p>
                <p className="text-xs text-ivory/50 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <button onClick={onBook} className="btn-primary !bg-champagne !text-espresso hover:!bg-ivory">
            Start Your Enquiry
          </button>
        </div>
      </div>
    </section>
  );
}
