import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import {
  X, Check, ChevronLeft, ChevronRight, Loader2, AlertCircle,
  CalendarDays, MessageCircle, Phone, Edit3, Copy,
} from '@/components/icons';
import { services } from '@/config/services';
import {
  eventTypes, makeupStyles, contactPreferences, bookingSettings,
} from '@/config/content';
import {
  emptyBooking, submitBooking, bookingSummary,
  type BookingData, type BookingResult,
} from '@/services/booking';
import { useReducedMotion } from '@/hooks/useReveal';

type Props = {
  open: boolean;
  onClose: () => void;
  initialServiceId?: string;
};

const steps = ['Occasion', 'Event Details', 'Contact Preference', 'Review', 'Done'] as const;

export default function BookingForm({ open, onClose, initialServiceId }: Props) {
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<BookingData>(emptyBooking);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<Extract<BookingResult, { ok: true }> | null>(null);
  const [copyStatus, setCopyStatus] = useState('');
  const submittingRef = useRef(false);

  // Reset / prefill when opened
  useEffect(() => {
    if (open) {
      setStep(0);
      setResult(null);
      setErrors({});
      setSubmitting(false);
      setCopyStatus('');
      submittingRef.current = false;
      if (initialServiceId) {
        const svc = services.find((s) => s.id === initialServiceId);
        if (svc) {
          setData({ ...emptyBooking, serviceId: svc.id, serviceLabel: svc.name, eventType: svc.category });
          setStep(1);
        }
      } else {
        setData(emptyBooking);
      }
    }
  }, [open, initialServiceId]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const update = (patch: Partial<BookingData>) => setData((d) => ({ ...d, ...patch }));

  const validateStep = (s: number): boolean => {
    const e: Record<string, string> = {};
    if (s === 0 && !data.serviceId) e.serviceId = 'Please choose a service.';
    if (s === 1) {
      if (!data.fullName.trim()) e.fullName = 'Full name is required.';
      if (!data.mobile.trim()) e.mobile = 'Mobile number is required.';
      else if (!/^\+?\d[\d\s-]{7,}$/.test(data.mobile)) e.mobile = 'Enter a valid mobile number with country code.';
      if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = 'Enter a valid email or leave blank.';
      if (!/^[1-9]\d*$/.test(data.peopleCount)) e.peopleCount = 'Enter a whole number of at least 1.';
      if (!data.eventType) e.eventType = 'Choose an event type.';
      if (!data.eventDate) e.eventDate = 'Choose a preferred date.';
      else if (data.eventDate < bookingSettings.minDate) e.eventDate = 'Date cannot be in the past.';
      if (!data.city.trim()) e.city = 'City is required.';
    }
    if (s === 2 && !data.contactPreference) e.contactPreference = 'Choose a contact method.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (!validateStep(step)) return;
    setStep((s) => Math.min(s + 1, steps.length - 1));
  };
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const submit = async () => {
    if (submittingRef.current) return;
    if (!validateStep(1)) { setStep(1); return; }
    submittingRef.current = true;
    setSubmitting(true);
    setErrors({});
    const res = await submitBooking(data);
    setSubmitting(false);
    submittingRef.current = false;
    if (res.ok) {
      setResult(res);
      setStep(4);
    } else {
      setErrors({ submit: res.error });
    }
  };

  const editFromReview = (target: number) => setStep(target);
  const copyEnquiry = async () => {
    try {
      await navigator.clipboard.writeText(bookingSummary(data));
      setCopyStatus('Enquiry details copied.');
    } catch (error) {
      console.error('Could not copy the appointment enquiry.', error);
      setCopyStatus('Copy was blocked. Open the details below to copy them manually.');
    }
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[90] flex items-start sm:items-center justify-center p-0 sm:p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute inset-0 bg-espresso/80 backdrop-blur-sm" onClick={onClose} />

        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Appointment booking"
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.98 }}
          transition={{ duration: reduced ? 0.1 : 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-ivory w-full max-w-2xl max-h-[100svh] sm:max-h-[90svh] overflow-y-auto no-scrollbar"
        >
          {/* Header */}
          <div className="sticky top-0 z-10 bg-ivory/95 backdrop-blur-md border-b border-espresso/10 px-5 sm:px-8 py-4 flex items-center justify-between">
            <div>
              <p className="eyebrow">Appointment Enquiry</p>
              <h2 className="font-display text-xl">Book Your Date</h2>
            </div>
            <button onClick={onClose} aria-label="Close" className="p-2 hover:bg-espresso/5">
              <X size={20} strokeWidth={1.5} />
            </button>
          </div>

          {/* Progress */}
          {step < 4 && (
            <div className="px-5 sm:px-8 pt-5">
              <div className="flex items-center gap-2">
                {steps.slice(0, 4).map((label, i) => (
                  <div key={label} className="flex-1">
                    <div className={`h-0.5 transition-colors duration-300 ${i <= step ? 'bg-burgundy' : 'bg-espresso/10'}`} />
                    <p className={`mt-1.5 text-[9px] uppercase tracking-widest ${i <= step ? 'text-espresso' : 'text-taupe/50'}`}>
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="p-5 sm:p-8">
            <AnimatePresence mode="wait">
              {/* STEP 0 — Occasion */}
              {step === 0 && (
                <motion.div key="s0" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: reduced ? 0 : 0.3 }}>
                  <h3 className="font-display text-2xl mb-1">Choose Your Service</h3>
                  <p className="text-sm text-taupe mb-6">Select the service you are enquiring about.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {services.map((svc) => {
                      const Icon = svc.icon;
                      const selected = data.serviceId === svc.id;
                      return (
                        <button
                          key={svc.id}
                          onClick={() => update({ serviceId: svc.id, serviceLabel: svc.name, eventType: svc.category })}
                          className={`text-left p-4 border transition-all flex items-start gap-3 ${
                            selected ? 'border-burgundy bg-burgundy/5' : 'border-espresso/15 hover:border-espresso/40'
                          }`}
                        >
                          <Icon className={selected ? 'text-burgundy' : 'text-taupe'} size={18} strokeWidth={1.5} />
                          <div>
                            <p className="text-[10px] uppercase tracking-widest text-taupe mb-1">{svc.number}</p>
                            <p className="font-display text-base">{svc.name}</p>
                          </div>
                          {selected && <Check size={16} className="text-burgundy ml-auto" strokeWidth={2} />}
                        </button>
                      );
                    })}
                  </div>
                  {errors.serviceId && <p className="text-xs text-burgundy mt-3">{errors.serviceId}</p>}
                </motion.div>
              )}

              {/* STEP 1 — Event details */}
              {step === 1 && (
                <motion.div key="s1" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: reduced ? 0 : 0.3 }}>
                  <h3 className="font-display text-2xl mb-1">Event Details</h3>
                  <p className="text-sm text-taupe mb-6">Tell us about your occasion.</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="form-label" htmlFor="bf-name">Full Name *</label>
                      <input id="bf-name" className="form-field" value={data.fullName} onChange={(e) => update({ fullName: e.target.value })} placeholder="Your full name" />
                      {errors.fullName && <p className="text-xs text-burgundy mt-1">{errors.fullName}</p>}
                    </div>
                    <div>
                      <label className="form-label" htmlFor="bf-mobile">Mobile Number * <span className="normal-case text-taupe/60">(with country code)</span></label>
                      <input id="bf-mobile" type="tel" className="form-field" value={data.mobile} onChange={(e) => update({ mobile: e.target.value })} placeholder="+91 98765 43210" />
                      {errors.mobile && <p className="text-xs text-burgundy mt-1">{errors.mobile}</p>}
                    </div>
                    <div>
                      <label className="form-label" htmlFor="bf-email">Email <span className="normal-case text-taupe/60">(optional)</span></label>
                      <input id="bf-email" type="email" className="form-field" value={data.email} onChange={(e) => update({ email: e.target.value })} placeholder="you@email.com" />
                      {errors.email && <p className="text-xs text-burgundy mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <label className="form-label" htmlFor="bf-etype">Event Type *</label>
                      <select id="bf-etype" className="form-field" value={data.eventType} onChange={(e) => update({ eventType: e.target.value })}>
                        <option value="">Select…</option>
                        {eventTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                      {errors.eventType && <p className="text-xs text-burgundy mt-1">{errors.eventType}</p>}
                    </div>
                    <div>
                      <label className="form-label" htmlFor="bf-date">Preferred Date *</label>
                      <input id="bf-date" type="date" min={bookingSettings.minDate} className="form-field" value={data.eventDate} onChange={(e) => update({ eventDate: e.target.value })} />
                      {errors.eventDate && <p className="text-xs text-burgundy mt-1">{errors.eventDate}</p>}
                    </div>
                    <div>
                      <label className="form-label" htmlFor="bf-time">Preferred Time <span className="normal-case text-taupe/60">(optional)</span></label>
                      <input id="bf-time" type="time" className="form-field" value={data.eventTime} onChange={(e) => update({ eventTime: e.target.value })} />
                    </div>
                    <div>
                      <label className="form-label" htmlFor="bf-venue">Venue / Location</label>
                      <input id="bf-venue" className="form-field" value={data.venue} onChange={(e) => update({ venue: e.target.value })} placeholder="Venue name or address" />
                    </div>
                    <div>
                      <label className="form-label" htmlFor="bf-city">City *</label>
                      <input id="bf-city" className="form-field" value={data.city} onChange={(e) => update({ city: e.target.value })} placeholder="Your city" />
                      {errors.city && <p className="text-xs text-burgundy mt-1">{errors.city}</p>}
                    </div>
                    <div>
                      <label className="form-label" htmlFor="bf-people">People Requiring Makeup</label>
                      <input id="bf-people" type="number" min="1" className="form-field" value={data.peopleCount} onChange={(e) => update({ peopleCount: e.target.value })} />
                      {errors.peopleCount && <p className="text-xs text-burgundy mt-1">{errors.peopleCount}</p>}
                    </div>
                    <div>
                      <label className="form-label" htmlFor="bf-style">Preferred Makeup Style</label>
                      <select id="bf-style" className="form-field" value={data.makeupStyle} onChange={(e) => update({ makeupStyle: e.target.value })}>
                        <option value="">Select…</option>
                        {makeupStyles.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="form-label" htmlFor="bf-budget">Estimated Budget <span className="normal-case text-taupe/60">(optional)</span></label>
                      <input id="bf-budget" className="form-field" value={data.budget} onChange={(e) => update({ budget: e.target.value })} placeholder="e.g. ₹10,000 – ₹15,000" />
                    </div>
                  </div>

                  {/* Wedding extras */}
                  {data.eventType === 'Wedding' && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 overflow-hidden">
                      <div>
                        <label className="form-label" htmlFor="bf-wtime">Wedding Ceremony Time</label>
                        <input id="bf-wtime" type="time" className="form-field" value={data.weddingTime} onChange={(e) => update({ weddingTime: e.target.value })} />
                      </div>
                      <div className="flex items-end">
                        <label className="flex items-center gap-3 cursor-pointer pb-3">
                          <input type="checkbox" checked={data.needsTravel} onChange={(e) => update({ needsTravel: e.target.checked })} className="w-4 h-4 accent-burgundy" />
                          <span className="text-sm text-espresso">Artist needs to travel to venue</span>
                        </label>
                      </div>
                    </motion.div>
                  )}

                  <div className="mt-4">
                    <label className="form-label" htmlFor="bf-add">Additional Requirements</label>
                    <textarea id="bf-add" rows={3} className="form-field resize-none" value={data.additional} onChange={(e) => update({ additional: e.target.value })} placeholder="Anything else we should know…" />
                  </div>
                </motion.div>
              )}

              {/* STEP 2 — Contact preference */}
              {step === 2 && (
                <motion.div key="s2" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: reduced ? 0 : 0.3 }}>
                  <h3 className="font-display text-2xl mb-1">Contact Preference</h3>
                  <p className="text-sm text-taupe mb-6">How would you like the artist to reach you?</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {contactPreferences.map((pref) => {
                      const Icon = pref === 'WhatsApp' ? MessageCircle : Phone;
                      const selected = data.contactPreference === pref;
                      return (
                        <button
                          key={pref}
                          onClick={() => update({ contactPreference: pref })}
                          className={`p-5 border text-left flex items-center gap-4 transition-all ${
                            selected ? 'border-burgundy bg-burgundy/5' : 'border-espresso/15 hover:border-espresso/40'
                          }`}
                        >
                          <Icon size={20} strokeWidth={1.5} className={selected ? 'text-burgundy' : 'text-taupe'} />
                          <div className="flex-1">
                            <p className="font-display text-lg">{pref}</p>
                            <p className="text-xs text-taupe">
                              {pref === 'WhatsApp'
                                ? 'Request a follow-up through WhatsApp.'
                                : 'Request a follow-up phone call.'}
                            </p>
                          </div>
                          {selected && <Check size={16} className="text-burgundy" strokeWidth={2} />}
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-xs text-taupe mt-5">
                    This prototype does not send or store your details. They are only shared if you choose to copy them or continue in WhatsApp.
                  </p>
                </motion.div>
              )}

              {/* STEP 3 — Review */}
              {step === 3 && (
                <motion.div key="s3" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: reduced ? 0 : 0.3 }}>
                  <h3 className="font-display text-2xl mb-1">Review Your Enquiry</h3>
                  <p className="text-sm text-taupe mb-6">Check everything before submitting. You can edit any section.</p>

                  <div className="border border-espresso/15 divide-y divide-espresso/10">
                    {[
                      { label: 'Service', value: data.serviceLabel, step: 0 },
                      { label: 'Name', value: data.fullName, step: 1 },
                      { label: 'Mobile', value: data.mobile, step: 1 },
                      { label: 'Email', value: data.email || '—', step: 1 },
                      { label: 'Event Type', value: data.eventType, step: 1 },
                      { label: 'Date', value: data.eventDate, step: 1 },
                      { label: 'Time', value: data.eventTime || '—', step: 1 },
                      { label: 'Venue', value: data.venue || '—', step: 1 },
                      { label: 'City', value: data.city, step: 1 },
                      { label: 'People', value: data.peopleCount, step: 1 },
                      { label: 'Style', value: data.makeupStyle || '—', step: 1 },
                      { label: 'Budget', value: data.budget || '—', step: 1 },
                      ...(data.eventType === 'Wedding' ? [
                        { label: 'Ceremony Time', value: data.weddingTime || '—', step: 1 },
                        { label: 'Travel Needed', value: data.needsTravel ? 'Yes' : 'No', step: 1 },
                      ] : []),
                      { label: 'Additional', value: data.additional || '—', step: 1 },
                      { label: 'Contact via', value: data.contactPreference, step: 2 },
                    ].map((row) => (
                      <div key={row.label} className="flex items-start justify-between gap-3 px-4 py-3">
                        <div>
                          <p className="text-[10px] uppercase tracking-widest text-taupe">{row.label}</p>
                          <p className="text-sm text-espresso mt-0.5">{row.value || '—'}</p>
                        </div>
                        <button onClick={() => editFromReview(row.step)} className="text-taupe hover:text-burgundy p-1" aria-label={`Edit ${row.label}`}>
                          <Edit3 size={13} strokeWidth={1.5} />
                        </button>
                      </div>
                    ))}
                  </div>

                  {errors.submit && (
                    <div className="flex items-center gap-2 text-sm text-burgundy mt-4">
                      <AlertCircle size={16} /> {errors.submit}
                    </div>
                  )}
                </motion.div>
              )}

              {/* STEP 4 — Done */}
              {step === 4 && result && (
                <motion.div key="s4" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: reduced ? 0.1 : 0.5, ease: 'easeOut' }} className="text-center py-8">
                  <motion.div
                    initial={reduced ? false : { scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.1, stiffness: 200, damping: 12 }}
                    className="w-16 h-16 rounded-full bg-burgundy/10 flex items-center justify-center mx-auto mb-6"
                  >
                    <Check size={28} strokeWidth={1.5} className="text-burgundy" />
                  </motion.div>
                  <h3 className="font-display text-3xl mb-3">
                    {result.demo ? 'Enquiry Prepared' : 'Enquiry Received'}
                  </h3>
                  <p className="text-sm text-taupe max-w-sm mx-auto mb-6">
                    {result.demo
                      ? 'This is demo mode: your request has not been sent or saved. Use the options below to copy the details or open a configured WhatsApp enquiry.'
                      : `Your request has been delivered and is awaiting confirmation. The artist will contact you via ${data.contactPreference} to discuss availability and details. This is not a confirmed appointment.`}
                  </p>

                  {result.demo && (
                    <p className="text-[11px] uppercase tracking-widest text-taupe/60 mb-6 bg-espresso/5 inline-block px-3 py-1.5">
                      Demo mode — enquiry not sent
                    </p>
                  )}

                  {result.demo && result.whatsappUrl && (
                    <a href={result.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-primary w-full max-w-xs mx-auto mb-3">
                      <MessageCircle size={14} strokeWidth={1.5} />
                      Continue in WhatsApp
                    </a>
                  )}

                  {result.demo && (
                    <div className="flex flex-col items-center gap-3">
                      <button onClick={copyEnquiry} className="btn-outline w-full max-w-xs">
                        <Copy size={14} strokeWidth={1.5} />
                        Copy Enquiry Details
                      </button>
                      {copyStatus && <p role="status" className="text-xs text-taupe">{copyStatus}</p>}
                      <details className="w-full max-w-xs text-left">
                        <summary className="cursor-pointer text-xs text-taupe underline underline-offset-4">
                          View details for manual copying
                        </summary>
                        <textarea
                          readOnly
                          aria-label="Appointment enquiry details"
                          value={bookingSummary(data)}
                          rows={10}
                          className="form-field mt-3 text-xs"
                          onFocus={(event) => event.currentTarget.select()}
                        />
                      </details>
                    </div>
                  )}

                  <div className="mt-2">
                    <button onClick={onClose} className="btn-ghost mx-auto">Close</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Footer nav */}
            {step < 4 && (
              <div className="flex items-center justify-between mt-8 pt-5 border-t border-espresso/10">
                <button
                  onClick={back}
                  disabled={step === 0}
                  className="btn-ghost disabled:opacity-30 disabled:pointer-events-none"
                >
                  <ChevronLeft size={14} strokeWidth={1.5} />
                  Back
                </button>
                {step < 3 ? (
                  <button onClick={next} className="btn-primary">
                    Continue
                    <ChevronRight size={14} strokeWidth={1.5} />
                  </button>
                ) : (
                  <button onClick={submit} disabled={submitting} className="btn-primary disabled:opacity-60">
                    {submitting ? (
                      <><Loader2 size={14} className="animate-spin" /> {bookingSettings.demoMode ? 'Preparing…' : 'Submitting…'}</>
                    ) : (
                    <><CalendarDays size={14} strokeWidth={1.5} /> {bookingSettings.demoMode ? 'Prepare Enquiry' : 'Submit Enquiry'}</>
                    )}
                  </button>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
