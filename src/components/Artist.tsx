import { motion, type Variants } from 'framer-motion';
import { CalendarDays, Instagram } from '@/components/icons';
import { artist } from '@/config/artist';
import { artistPortrait } from '@/config/media';
import { useReducedMotion } from '@/hooks/useReveal';

type Props = { onBook: () => void };

export default function Artist({ onBook }: Props) {
  const reduced = useReducedMotion();
  const fade: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: reduced ? 0 : 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section id="about" className="py-24 md:py-36 bg-ivory grain">
      <div className="max-w-editorial mx-auto px-5 sm:px-8">
        <header className="text-center mb-16 md:mb-24">
          <p className="eyebrow mb-5">The Artist Behind the Look</p>
          <div className="section-divider mx-auto" />
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Images — overlapping editorial */}
          <motion.div
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="lg:col-span-6 relative"
          >
            <div className="relative aspect-[4/5] max-w-md mx-auto lg:mx-0">
              <img
                src={artistPortrait}
                alt="Keshav Gupta, makeup artist"
                loading="lazy"
                className="w-full h-full object-cover object-[center_28%]"
              />
            </div>
            <div className="hidden md:block absolute -bottom-12 -right-2 lg:right-8 w-44 lg:w-56 aspect-[3/4] overflow-hidden border-8 border-ivory shadow-xl">
              <img
                src="https://images.pexels.com/photos/3886313/pexels-photo-3886313.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Makeup application detail used as a replaceable editorial reference"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="lg:col-span-6 lg:pl-8"
          >
            <h2 className="display-headline text-4xl md:text-5xl lg:text-6xl mb-8 text-balance">
              Beauty is personal.
              <span className="italic text-burgundy"> Every look begins with you.</span>
            </h2>

            <blockquote className="text-lg md:text-xl text-espresso/80 font-display italic leading-relaxed border-l-2 border-champagne pl-6 mb-8">
              &ldquo;Every look begins with understanding your vision, your style, and the moment you want to remember. The goal is to create a look that feels beautifully yours.&rdquo;
            </blockquote>

            <p className="text-sm text-taupe leading-relaxed mb-10 max-w-md">
              This introduction focuses on the approach to makeup rather than unsupported achievements. Biographical details, training, and experience will appear here once verified.
            </p>

            {/* Signature */}
            <div className="mb-10">
              <p className="font-display text-3xl text-espresso italic mb-1" style={{ fontStyle: 'italic' }}>
                {artist.name}
              </p>
              <p className="eyebrow">Makeup Artist</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={onBook} className="btn-primary">
                <CalendarDays size={14} strokeWidth={1.5} />
                Book Your Appointment
              </button>
              <a
                href={artist.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                <Instagram size={14} strokeWidth={1.5} />
                Follow the Work
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
