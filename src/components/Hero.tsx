import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import { useRef, useState } from 'react';
import { ChevronDown, ArrowRight, Pause, Play } from 'lucide-react';
import { heroPortrait, heroVideo } from '@/config/media';
import { useReducedMotion } from '@/hooks/useReveal';

type Props = { onBook: () => void; onExplore: () => void };

export default function Hero({ onBook, onExplore }: Props) {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  const [videoPlaying, setVideoPlaying] = useState(!reduced);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const toggleVideo = async () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      try {
        await video.play();
        setVideoPlaying(true);
      } catch (error) {
        console.error('Hero video playback could not start.', error);
      }
    } else {
      video.pause();
      setVideoPlaying(false);
    }
  };

  const lineParent: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduced ? 0 : 0.18, delayChildren: reduced ? 0 : 0.3 } },
  };
  const lineChild: Variants = {
    hidden: { y: '110%' },
    show: { y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
  };
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  };

  return (
    <section ref={ref} id="home" className="relative h-auto min-h-[100svh] w-full overflow-hidden bg-ivory md:h-[100svh] md:min-h-[640px]">
      {/* Split editorial layout */}
      <div className="relative grid min-h-[100svh] grid-cols-1 md:absolute md:inset-0 md:grid-cols-12">
        {/* Image — ~2/3 on desktop, full on mobile */}
        <motion.div
          className="relative h-[55svh] md:col-span-7 md:h-full lg:col-span-7 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          <motion.div
            style={reduced ? undefined : { y: imgY, scale: imgScale }}
            className="absolute inset-0"
          >
            <video
              ref={videoRef}
              src={heroVideo}
              poster={heroPortrait}
              autoPlay={!reduced}
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="A bride having her makeup done"
              className="w-full h-full object-cover object-[center_32%] md:object-center"
              onPlay={() => setVideoPlaying(true)}
              onPause={() => setVideoPlaying(false)}
            />
          </motion.div>
          <span className="absolute bottom-5 left-5 z-10 bg-espresso/60 px-3 py-1.5 text-[9px] uppercase tracking-widest text-ivory backdrop-blur-sm">
            Bridal beauty, in the making
          </span>
          <button
            type="button"
            onClick={toggleVideo}
            aria-label={videoPlaying ? 'Pause bridal preparation video' : 'Play bridal preparation video'}
            className="absolute bottom-5 right-5 z-10 flex h-10 w-10 items-center justify-center border border-ivory/60 bg-espresso/55 text-ivory backdrop-blur-sm transition-colors hover:bg-espresso/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ivory"
          >
            {videoPlaying ? <Pause size={15} /> : <Play size={15} />}
          </button>
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/40 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-espresso/10" />
        </motion.div>

        {/* Text column */}
        <motion.div
          style={reduced ? undefined : { y: textY, opacity }}
          className="relative min-h-[45svh] md:col-span-5 md:h-full flex flex-col justify-center px-6 sm:px-10 lg:px-12 bg-ivory lg:col-span-5"
        >
          <motion.div variants={lineParent} initial="hidden" animate="show">
            <motion.p variants={fadeUp} className="eyebrow mb-6 md:mb-8">
              Makeup Artistry by Keshav Gupta
            </motion.p>

            <div className="overflow-hidden">
              <motion.h1
                variants={lineChild}
                className="display-headline text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.02]"
              >
                Your Beauty.
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                variants={lineChild}
                className="display-headline text-[clamp(2.5rem,6vw,4.5rem)] italic text-burgundy leading-[1.02]"
              >
                Your Moment.
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                variants={lineChild}
                className="display-headline text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.02]"
              >
                Your Story.
              </motion.h1>
            </div>

            <motion.p
              variants={fadeUp}
              className="mt-6 md:mt-8 text-sm text-taupe leading-relaxed max-w-xs"
            >
              Makeup artistry designed to bring your vision to life, with every detail thoughtfully considered.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-8 md:mt-10 flex flex-col gap-3 xl:flex-row"
            >
              <button onClick={onBook} className="btn-primary group">
                Book Your Appointment
                <ArrowRight size={14} strokeWidth={1.5} className="transition-transform group-hover:translate-x-1" />
              </button>
              <button onClick={onExplore} className="btn-outline">
                Explore the Looks
              </button>
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="mt-8 md:mt-10 eyebrow !tracking-widest"
            >
              Crafted with care. Worn with confidence.
            </motion.p>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={onExplore}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-espresso/50 hover:text-burgundy transition-colors z-10"
        aria-label="Scroll down"
      >
        <span className="text-[9px] uppercase tracking-ultra">Scroll</span>
        <motion.span
          animate={reduced ? undefined : { y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ChevronDown size={16} strokeWidth={1.5} />
        </motion.span>
      </motion.button>
    </section>
  );
}
