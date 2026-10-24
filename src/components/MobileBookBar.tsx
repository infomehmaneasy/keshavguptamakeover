import { motion, AnimatePresence } from 'framer-motion';
import { CalendarDays, PhoneCall } from 'lucide-react';
import { artist, contact, phoneLink } from '@/config/artist';

type Props = { visible: boolean; onBook: () => void };

export default function MobileBookBar({ visible, onBook }: Props) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-ivory/95 backdrop-blur-md border-t border-espresso/10 px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] flex items-center gap-3"
        >
          <div className="flex-1">
            <p className="text-[10px] uppercase tracking-widest text-taupe">Ready to begin?</p>
            <p className="font-display text-base text-espresso leading-none mt-0.5">Book Your Date</p>
          </div>
          {contact.phone && (
            <a
              href={phoneLink()}
              aria-label={`Call ${artist.name} at ${contact.phone}`}
              className="flex h-11 w-11 shrink-0 items-center justify-center border border-espresso/20 text-espresso hover:border-burgundy hover:text-burgundy"
            >
              <PhoneCall size={17} strokeWidth={1.5} />
            </a>
          )}
          <button onClick={onBook} className="btn-primary !px-5 !py-3">
            <CalendarDays size={14} strokeWidth={1.5} />
            Enquire
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
