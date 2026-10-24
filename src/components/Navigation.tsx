import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Menu, X, Instagram, CalendarDays, PhoneCall } from 'lucide-react';
import { artist, contact } from '@/config/artist';
import { phoneLink, whatsappLink } from '@/config/artist';
import { displayContact } from '@/config/artist';

type NavItem = { id: string; label: string };
const navItems: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'contact', label: 'Contact' },
];

type Props = {
  activeSection: string;
  onBook: () => void;
};

export default function Navigation({ activeSection, onBook }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);
  const menuCloseRef = useRef<HTMLButtonElement>(null);
  const whatsappHref = whatsappLink(`Hello ${artist.name}, I'd like to enquire about an appointment.`);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const menuTrigger = menuTriggerRef.current;
    document.body.style.overflow = 'hidden';
    menuCloseRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        return;
      }
      if (event.key !== 'Tab') return;
      const focusable = menuRef.current?.querySelectorAll<HTMLElement>('button:not([disabled]), a[href]');
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
      menuTrigger?.focus();
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-ivory/90 backdrop-blur-md border-b border-espresso/10 py-3'
            : 'bg-ivory/90 backdrop-blur-md border-b border-espresso/10 py-5'
        }`}
      >
        <div className="max-w-editorial mx-auto px-5 sm:px-8 flex items-center justify-between">
          <button
            onClick={() => go('home')}
            className="group text-left"
            aria-label="Go to home"
          >
            <span className="block font-display text-espresso text-lg leading-none tracking-[0.12em]">
              {artist.brand}
            </span>
            <span className="block text-[8px] uppercase tracking-ultra text-taupe mt-0.5">
              {artist.subBrand}
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {contact.phone && (
              <a
                href={phoneLink()}
                aria-label={`Call ${artist.name} at ${contact.phone}`}
                title={`Call ${contact.phone}`}
                className="text-espresso/70 hover:text-burgundy transition-colors"
              >
                <PhoneCall size={17} strokeWidth={1.5} />
              </a>
            )}
            <a
              href={artist.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-espresso/70 hover:text-burgundy transition-colors"
            >
              <Instagram size={18} strokeWidth={1.5} />
            </a>
            <button onClick={onBook} className="btn-primary !px-6 !py-3">
              <CalendarDays size={14} strokeWidth={1.5} />
              Book Your Date
            </button>
          </div>

          <button
            ref={menuTriggerRef}
            className="md:hidden text-espresso p-2 -mr-2"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-navigation"
          >
            <Menu size={22} strokeWidth={1.5} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="fixed inset-0 z-[60] bg-espresso flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center justify-between px-5 py-5">
              <span className="font-display text-ivory text-lg tracking-[0.12em]">
                {artist.brand}
              </span>
              <button
                ref={menuCloseRef}
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="text-ivory p-2"
              >
                <X size={22} strokeWidth={1.5} />
              </button>
            </div>

            <nav className="flex-1 flex flex-col justify-center px-6 gap-2">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.id}
                  onClick={() => go(item.id)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                  className="text-left font-display text-ivory text-4xl sm:text-5xl font-light py-3 border-b border-ivory/10"
                >
                  <span className="text-champagne text-sm align-top mr-3 font-sans tracking-widest">
                    0{i + 1}
                  </span>
                  {item.label}
                </motion.button>
              ))}
            </nav>

            <div className="px-6 pb-10 flex flex-col gap-4">
              <button
                onClick={() => {
                  setOpen(false);
                  onBook();
                }}
                className="btn-primary !bg-champagne !text-espresso hover:!bg-ivory w-full"
              >
                <CalendarDays size={14} strokeWidth={1.5} />
                Book Your Date
              </button>
              {whatsappHref && (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline !border-ivory/30 !text-ivory hover:!bg-ivory hover:!text-espresso w-full"
                >
                  Message on WhatsApp
                </a>
              )}
              {contact.phone && (
                <a
                  href={phoneLink()}
                  className="btn-outline !border-ivory/30 !text-ivory hover:!bg-ivory hover:!text-espresso w-full"
                >
                  <PhoneCall size={15} strokeWidth={1.5} />
                  Call {displayContact(contact.phone)}
                </a>
              )}
              <a
                href={artist.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 text-ivory/70 text-[12px] uppercase tracking-widest mt-2"
              >
                <Instagram size={16} strokeWidth={1.5} />
                {artist.instagramHandle}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
