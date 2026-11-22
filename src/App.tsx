import { useEffect, useState, useCallback } from 'react';
import Preloader from '@/components/Preloader';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Artist from '@/components/Artist';
import Portfolio from '@/components/Portfolio';
import Services from '@/components/Services';
import Pricing from '@/components/Pricing';
import Transformation from '@/components/Transformation';
import AppointmentSteps from '@/components/AppointmentSteps';
import InstagramFeed from '@/components/InstagramFeed';
import Testimonials from '@/components/Testimonials';
import Faq from '@/components/Faq';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import MobileBookBar from '@/components/MobileBookBar';
import BookingForm from '@/components/BookingForm';
import { services, type Service } from '@/config/services';
import type { PortfolioItem } from '@/config/portfolio';

const sectionIds = ['home', 'about', 'services', 'pricing', 'portfolio', 'contact'];

export default function App() {
  const [loading, setLoading] = useState(true);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingServiceId, setBookingServiceId] = useState<string | undefined>(undefined);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileBarVisible, setMobileBarVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const onScroll = () => setMobileBarVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [loading]);

  const openBooking = useCallback((serviceId?: string) => {
    setBookingServiceId(serviceId);
    setBookingOpen(true);
  }, []);

  const closeBooking = useCallback(() => setBookingOpen(false), []);

  const onBookFromService = useCallback((s: Service) => openBooking(s.id), [openBooking]);
  const onBookFromPortfolio = useCallback((p: PortfolioItem) => {
    const matchingService = services.find((service) => service.id === p.serviceId);
    openBooking(matchingService?.id);
  }, [openBooking]);

  const onNav = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const onExplore = useCallback(() => {
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  if (loading) {
    return <Preloader onComplete={() => setLoading(false)} />;
  }

  return (
    <div className={`min-h-screen bg-ivory ${mobileBarVisible ? 'pb-24 md:pb-0' : ''}`}>
      <Navigation activeSection={activeSection} onBook={() => openBooking()} />

      <main>
        <Hero onBook={() => openBooking()} onExplore={onExplore} />
        <Artist onBook={() => openBooking()} />
        <Services onBook={onBookFromService} />
        <Pricing onBook={() => openBooking()} />
        <Transformation onPortfolio={onExplore} />
        <Portfolio onBook={onBookFromPortfolio} />
        <AppointmentSteps onBook={() => openBooking()} />
        <Testimonials onBook={() => openBooking()} />
        <InstagramFeed />
        <Faq />
        <Contact onBook={() => openBooking()} />
      </main>

      <Footer onBook={() => openBooking()} onNav={onNav} />

      <MobileBookBar visible={mobileBarVisible} onBook={() => openBooking()} />

      <BookingForm open={bookingOpen} onClose={closeBooking} initialServiceId={bookingServiceId} />
    </div>
  );
}
