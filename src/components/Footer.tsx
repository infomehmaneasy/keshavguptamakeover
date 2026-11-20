import { Instagram, ArrowUp, PhoneCall } from '@/components/icons';
import { artist, contact, phoneLink, whatsappLink } from '@/config/artist';

type Props = {
  onBook: () => void;
  onNav: (id: string) => void;
};

const links = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'contact', label: 'Contact' },
];

export default function Footer({ onBook, onNav }: Props) {
  const year = new Date().getFullYear();
  const whatsappHref = whatsappLink(`Hello ${artist.name}, I'd like to enquire about an appointment.`);

  return (
    <footer className="bg-espresso text-ivory">
      <div className="max-w-editorial mx-auto px-5 sm:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand */}
          <div className="md:col-span-5">
            <p className="font-display text-2xl tracking-[0.12em]">{artist.brand}</p>
            <p className="text-[9px] uppercase tracking-ultra text-champagne mt-1">{artist.subBrand}</p>
            <p className="text-sm text-ivory/50 mt-5 max-w-xs leading-relaxed">
              {artist.tagline}. Premium makeup artistry for the moments that matter most.
            </p>
          </div>

          {/* Nav */}
          <div className="md:col-span-3">
            <p className="text-[10px] uppercase tracking-widest text-champagne/70 mb-4">Explore</p>
            <ul className="space-y-2">
              {links.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => onNav(l.id)}
                    className="text-sm text-ivory/60 hover:text-ivory transition-colors"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="md:col-span-4">
            <p className="text-[10px] uppercase tracking-widest text-champagne/70 mb-4">Connect</p>
            <div className="flex flex-col gap-3">
              <button onClick={onBook} className="btn-primary !bg-champagne !text-espresso hover:!bg-ivory w-fit">
                Book Your Date
              </button>
              {contact.phone && (
                <a
                  href={phoneLink()}
                  className="inline-flex items-center gap-2 text-sm text-ivory/60 hover:text-ivory transition-colors"
                >
                  <PhoneCall size={15} strokeWidth={1.5} />
                  {contact.phone}
                </a>
              )}
              {whatsappHref && (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-ivory/60 hover:text-ivory transition-colors"
                >
                  WhatsApp Enquiry
                </a>
              )}
              <a
                href={artist.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-ivory/60 hover:text-ivory transition-colors"
              >
                <Instagram size={15} strokeWidth={1.5} />
                @{artist.instagramHandle}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-ivory/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-ivory/40">
            &copy; {year} {artist.name} Makeover. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <details className="relative">
              <summary className="cursor-pointer list-none text-xs text-ivory/40 hover:text-ivory/70 transition-colors">
                Privacy note
              </summary>
              <p className="absolute bottom-full right-0 mb-3 w-72 max-w-[calc(100vw-2.5rem)] bg-ivory text-espresso p-4 text-xs leading-relaxed shadow-lg">
                This is a demonstration booking form. Enquiry details are not sent or stored by this site in demo mode. A live launch requires a configured booking service and a complete privacy policy.
              </p>
            </details>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-1.5 text-xs text-ivory/40 hover:text-ivory/70 transition-colors"
            >
              Back to top <ArrowUp size={12} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
