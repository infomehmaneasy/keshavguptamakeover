import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';
import { artist } from '@/config/artist';
import { instagramPosts } from '@/config/content';
import { useReducedMotion } from '@/hooks/useReveal';

export default function InstagramFeed() {
  const reduced = useReducedMotion();

  return (
    <section className="py-24 md:py-36 bg-white">
      <div className="max-w-editorial mx-auto px-5 sm:px-8">
        <header className="text-center mb-14 md:mb-20">
          <p className="eyebrow mb-5">Follow the Artistry</p>
          <h2 className="display-headline text-4xl md:text-5xl lg:text-6xl text-balance">
            Discover more looks, behind the scenes,
            <span className="italic text-burgundy"> and the latest work.</span>
          </h2>
          <a
            href={artist.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 text-sm text-taupe hover:text-espresso transition-colors"
          >
            <Instagram size={16} strokeWidth={1.5} />
            @{artist.instagramHandle}
          </a>
        </header>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-3">
          {instagramPosts.map((post, i) => {
            const tile = (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : i * 0.05 }}
                className="group relative aspect-square overflow-hidden bg-espresso/5"
              >
                <img
                  src={post.image}
                  alt={post.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-x-0 bottom-0 bg-espresso/60 px-2 py-2 text-center">
                  <span className="text-[8px] uppercase tracking-widest text-ivory">
                    {post.url ? 'Instagram post' : 'Editorial reference'}
                  </span>
                </div>
              </motion.div>
            );
            return post.url ? (
              <a key={i} href={post.url} target="_blank" rel="noopener noreferrer" aria-label="Open original Instagram post">
                {tile}
              </a>
            ) : (
              <div key={i}>{tile}</div>
            );
          })}
        </div>

        <p className="text-center text-xs text-taupe mt-5">
          Reference photography shown for this prototype; it is not presented as verified Instagram content.
        </p>

        <div className="text-center mt-10">
          <a
            href={artist.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            <Instagram size={14} strokeWidth={1.5} />
            Follow on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
