import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, MessageCircle, Instagram, ArrowRight, PhoneCall } from '@/components/icons';
import { artist, contact, phoneLink, mailLink, whatsappLink, displayContact } from '@/config/artist';
import { useReducedMotion } from '@/hooks/useReveal';

type Props = { onBook: () => void };

export default function Contact({ onBook }: Props) {
  const reduced = useReducedMotion();
  const whatsappHref = whatsappLink(`Hello ${artist.name}, I'd like to enquire about an appointment.`);

  const details = [
    { icon: Phone, label: 'Phone', value: displayContact(contact.phone), href: phoneLink() },
    { icon: MessageCircle, label: 'WhatsApp', value: contact.whatsapp ? displayContact(contact.phone) : displayContact(null), href: whatsappHref },
    { icon: Mail, label: 'Email', value: displayContact(contact.email), href: mailLink() },
    { icon: MapPin, label: 'Studio / Service Area', value: displayContact(contact.studioAddress ?? contact.serviceArea) },
    { icon: Clock, label: 'Business Hours', value: displayContact(contact.businessHours) },
    { icon: Instagram, label: 'Instagram', value: `@${artist.instagramHandle}`, href: artist.instagramUrl },
  ];

  return (
    <section id="contact" className="relative py-24 md:py-36 bg-ivory overflow-hidden">
      {/* Background portrait */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/3363204/pexels-photo-3363204.jpeg?auto=compress&cs=tinysrgb&w=1400"
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="w-full h-full object-cover opacity-[0.08]"
        />
      </div>

      <div className="relative max-w-editorial mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: reduced ? 0 : 0.7, ease: 'easeOut' }}
            className="lg:col-span-7"
          >
            <p className="eyebrow mb-5">Let&rsquo;s Begin</p>
            <h2 className="display-headline text-5xl md:text-6xl lg:text-7xl text-balance">
              Let&rsquo;s create
              <span className="italic text-burgundy"> your look.</span>
            </h2>
            <p className="text-sm md:text-base text-taupe mt-6 max-w-lg leading-relaxed">
              Your special moment deserves a look that feels uniquely yours. Tell us what you have in mind, and let&rsquo;s start planning.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <button onClick={onBook} className="btn-primary">
                Enquire About Your Date
                <ArrowRight size={14} strokeWidth={1.5} />
              </button>
              <a href={phoneLink()} className="btn-outline">
                <PhoneCall size={14} strokeWidth={1.5} />
                Call {displayContact(contact.phone)}
              </a>
              {whatsappHref && (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                >
                  <MessageCircle size={14} strokeWidth={1.5} />
                  Message on WhatsApp
                </a>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : 0.1, ease: 'easeOut' }}
            className="lg:col-span-5"
          >
            <div className="border border-espresso/15 bg-white/60 backdrop-blur-sm p-6 md:p-8">
              <p className="eyebrow mb-5">Contact Details</p>
              <ul className="space-y-4">
                {details.map((d) => {
                  const Icon = d.icon;
                  const content = (
                    <div className="flex items-start gap-3 group">
                      <Icon size={16} strokeWidth={1.5} className="text-burgundy mt-0.5 shrink-0" />
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-taupe">{d.label}</p>
                        <p className="text-sm text-espresso group-hover:text-burgundy transition-colors">{d.value}</p>
                      </div>
                    </div>
                  );
                  return (
                    <li key={d.label}>
                      {d.href && d.href !== '#' ? (
                        <a href={d.href} target={d.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="block">
                          {content}
                        </a>
                      ) : (
                        content
                      )}
                    </li>
                  );
                })}
              </ul>
              <p className="text-[11px] text-taupe/60 mt-6 pt-5 border-t border-espresso/10 leading-relaxed">
                Studio location, service area, email, and business hours can be added when confirmed.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
