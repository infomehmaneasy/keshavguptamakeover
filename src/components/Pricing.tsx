import { CalendarDays } from '@/components/icons';
import { pricingGroups } from '@/config/pricing';

type Props = { onBook: () => void };

export default function Pricing({ onBook }: Props) {
  return (
    <section id="pricing" className="py-24 md:py-32 bg-ivory grain">
      <div className="max-w-editorial mx-auto px-5 sm:px-8">
        <header className="text-center mb-12 md:mb-16">
          <p className="eyebrow mb-4">The Price List</p>
          <h2 className="display-headline text-5xl md:text-6xl">
            The details, <span className="italic text-burgundy">beautifully clear.</span>
          </h2>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pricingGroups.map((group) => (
            <article key={group.title} className="bg-white/80 p-6 md:p-8 border border-espresso/10">
              <h3 className="font-display text-2xl text-burgundy border-b border-champagne/70 pb-3 mb-4">
                {group.title}
              </h3>
              <dl className="space-y-3">
                {group.options.map((option) => (
                  <div key={option.label} className="flex items-start justify-between gap-4 text-sm">
                    <dt className="text-espresso/75">{option.label}</dt>
                    <dd className="shrink-0 font-medium text-espresso">{option.price}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
          <article className="bg-espresso p-6 md:p-8 text-ivory flex flex-col justify-between">
            <div>
              <h3 className="font-display text-2xl text-champagne border-b border-ivory/20 pb-3 mb-4">
                Venue &amp; Travel
              </h3>
              <p className="text-sm leading-relaxed text-ivory/70">
                Venue and travelling charges are quoted based on your location and event details.
              </p>
            </div>
            <button onClick={onBook} className="btn-primary !bg-champagne !text-espresso hover:!bg-ivory mt-8 w-full">
              <CalendarDays size={14} strokeWidth={1.5} />
              Enquire for a Quote
            </button>
          </article>
        </div>
        <p className="text-center text-xs text-taupe mt-8">
          Share your event date and location to confirm availability and final arrangements.
        </p>
      </div>
    </section>
  );
}
