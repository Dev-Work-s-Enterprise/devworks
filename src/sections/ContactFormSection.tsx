import { useRef, useLayoutEffect, useState } from 'react';
import emailjs from '@emailjs/browser';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Mail, Phone, Globe, Send,
  CalendarDays, ArrowRight,
  CheckCircle, AlertCircle, Loader2
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

gsap.registerPlugin(ScrollTrigger);

// ─── CONFIG (loaded from .env — never hardcode secrets in source) ────────────
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;
const PAYSTACK_PAYMENT_LINK = import.meta.env.VITE_PAYSTACK_PAYMENT_LINK as string;
// ─────────────────────────────────────────────────────────────────────────────

interface ContactFormSectionProps {
  className?: string;
}

// ─── Validation helpers ───────────────────────────────────────────────────────
const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const sanitize = (str: string) =>
  str.trim().replace(/[<>]/g, '');   // strip raw HTML angle brackets

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const budgetOptions = [
  'Under $5,000',
  '$5,000 – $15,000',
  '$15,000 – $50,000',
  '$50,000+',
  'Not sure yet',
];

// ─── Component ────────────────────────────────────────────────────────────────
const ContactFormSection = ({ className = '' }: ContactFormSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '', email: '', company: '', budget: '', message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorDetail, setErrorDetail] = useState<string>('');
  const [showDialog, setShowDialog] = useState(false);

  // ── GSAP scroll animation ──
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      const trigger = { trigger: section, start: 'top 70%', end: 'top 40%', scrub: true };
      gsap.fromTo(leftRef.current, { x: -60, opacity: 0 }, { x: 0, opacity: 1, scrollTrigger: trigger });
      gsap.fromTo(formRef.current, { x: 60, opacity: 0 }, { x: 0, opacity: 1, scrollTrigger: trigger });
    }, section);
    return () => ctx.revert();
  }, []);

  // ── Field change ──
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  // ── Validate ──
  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!sanitize(formData.name)) newErrors.name = 'Name is required.';
    if (!sanitize(formData.email)) newErrors.email = 'Email is required.';
    else if (!isValidEmail(formData.email)) newErrors.email = 'Please enter a valid email address.';
    if (!sanitize(formData.message)) newErrors.message = 'Please describe your project.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ── Submit ──
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('sending');

    const templateParams = {
      from_name: sanitize(formData.name),
      from_email: sanitize(formData.email),
      company: sanitize(formData.company) || 'N/A',
      budget: formData.budget || 'Not specified',
      message: sanitize(formData.message),
      reply_to: sanitize(formData.email),
      to_email: 'devworks.ent@gmail.com',
    };


    // Guard: ensure env vars loaded (fails silently if .env wasn't picked up)
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      console.error('[EmailJS] Missing env vars. Restart the dev server after adding .env');
      setStatus('error');
      setErrorDetail('Configuration error — please contact us directly by email.');
      return;
    }

    try {
      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );
      console.log('[EmailJS] Success:', result.status, result.text);
      setStatus('success');
      setShowDialog(true);
      setFormData({ name: '', email: '', company: '', budget: '', message: '' });
    } catch (err: unknown) {
      // EmailJS rejects with { status, text } — surface the exact message
      const ejsErr = err as { status?: number; text?: string };
      const detail = ejsErr?.text ?? (err instanceof Error ? err.message : String(err));
      console.error('[EmailJS] Send failed:', ejsErr?.status, detail);
      setErrorDetail(detail);
      setStatus('error');
    }
  };

  // ── Shared input class ──
  const inputCls = (field?: string) =>
    `w-full px-4 py-3 bg-white/5 border rounded-lg text-[#F4F6FA] text-sm placeholder:text-cool-gray/50 focus:outline-none transition-colors ${field
      ? 'border-red-500/60 focus:border-red-500'
      : 'border-white/10 focus:border-mint/50'
    }`;

  return (
    <section
      ref={sectionRef}
      id="contact"
      className={`relative min-h-screen bg-primary-dark pt-24 pb-16 px-6 lg:py-[10vh] lg:px-[7vw] ${className}`}
    >
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20">

        {/* ── Left Column ── */}
        <div ref={leftRef} className="lg:pt-[5vh]">
          <h2 className="font-display font-bold text-[clamp(32px,4vw,64px)] tracking-[-0.02em] text-[#F4F6FA] uppercase">
            START A<br /><span className="text-mint">PROJECT</span>
          </h2>
          <p className="mt-6 text-cool-gray leading-relaxed max-w-md">
            Share a brief. We'll reply within 24 hours with a clear plan, timeline, and estimate.
          </p>

          <div className="mt-10 space-y-4">
            <a href="mailto:devworks.ent@gmail.com" className="flex items-center gap-3 text-[#F4F6FA] hover:text-mint transition-colors group">
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-mint/10 transition-colors">
                <Mail size={18} className="text-mint" />
              </div>
              <span className="text-sm">devworks.ent@gmail.com</span>
            </a>
            <a href="tel:+2348081617247" className="flex items-center gap-3 text-[#F4F6FA] hover:text-mint transition-colors group">
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-mint/10 transition-colors">
                <Phone size={18} className="text-mint" />
              </div>
              <span className="text-sm">+234 (808) 161-7247</span>
            </a>
            <div className="flex items-center gap-3 text-cool-gray">
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                <Globe size={18} className="text-mint" />
              </div>
              <span className="text-sm">Remote-first · UTC-5 to UTC+3</span>
            </div>
          </div>

          {/* ── Booking CTA Card ── */}
          <div className="mt-10 p-6 rounded-2xl border border-mint/20 bg-mint/[0.04] relative overflow-hidden">
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-mint/10 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-mint/10 flex items-center justify-center shrink-0">
                <CalendarDays size={18} className="text-mint" />
              </div>
              <div>
                <p className="font-mono text-[10px] tracking-widest text-mint uppercase">Paid Session</p>
                <h3 className="font-display font-semibold text-[#F4F6FA] text-base leading-tight">Discovery Call</h3>
              </div>
            </div>
            <p className="text-cool-gray text-sm leading-relaxed mb-5">
              Book a focused 60-minute strategy session. We'll scope your project, map a technical roadmap, and answer every question.
            </p>
            <a
              href={PAYSTACK_PAYMENT_LINK}
              target="_blank"
              rel="noopener noreferrer"
              id="book-discovery-call-btn"
              className="group inline-flex items-center gap-2 px-5 py-3 bg-mint text-[#0B0C0F] font-mono text-xs font-medium tracking-wider rounded hover:opacity-90 transition-opacity btn-hover"
            >
              BOOK &amp; PAY NOW
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <p className="mt-3 font-mono text-[10px] text-cool-gray/50 tracking-wide">
              Secure checkout via Paystack · Cal link sent after payment
            </p>
          </div>
        </div>

        {/* ── Right Column — Form ── */}
        <div ref={formRef} className="form-card-dark p-6 lg:p-10">
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>

            {/* Name */}
            <div>
              <label className="block font-mono text-[11px] tracking-wider text-cool-gray uppercase mb-2">
                Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                maxLength={100}
                className={inputCls(errors.name)}
                placeholder="Your name"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name && (
                <p id="name-error" className="mt-1 flex items-center gap-1 text-red-400 text-xs">
                  <AlertCircle size={11} /> {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block font-mono text-[11px] tracking-wider text-cool-gray uppercase mb-2">
                Email <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                maxLength={200}
                className={inputCls(errors.email)}
                placeholder="you@company.com"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <p id="email-error" className="mt-1 flex items-center gap-1 text-red-400 text-xs">
                  <AlertCircle size={11} /> {errors.email}
                </p>
              )}
            </div>

            {/* Company (optional) */}
            <div>
              <label className="block font-mono text-[11px] tracking-wider text-cool-gray uppercase mb-2">
                Company <span className="text-cool-gray/40">(optional)</span>
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                maxLength={120}
                className={inputCls()}
                placeholder="Your company"
              />
            </div>

            {/* Budget */}
            <div>
              <label className="block font-mono text-[11px] tracking-wider text-cool-gray uppercase mb-2">
                Budget Range
              </label>
              <select
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className={inputCls() + ' appearance-none cursor-pointer'}
              >
                <option value="" className="bg-[#0B0C0F]">Select a range</option>
                {budgetOptions.map(o => (
                  <option key={o} value={o} className="bg-[#0B0C0F]">{o}</option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="block font-mono text-[11px] tracking-wider text-cool-gray uppercase mb-2">
                Message <span className="text-red-400">*</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                maxLength={2000}
                rows={4}
                className={inputCls(errors.message) + ' resize-none'}
                placeholder="Tell us about your project..."
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'message-error' : undefined}
              />
              {errors.message && (
                <p id="message-error" className="mt-1 flex items-center gap-1 text-red-400 text-xs">
                  <AlertCircle size={11} /> {errors.message}
                </p>
              )}
              <p className="mt-1 text-[10px] text-cool-gray/40 text-right">
                {formData.message.length}/2000
              </p>
            </div>

            {/* Error banner */}
            {status === 'error' && (
              <div className="flex flex-col gap-1 px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-xs">
                <span className="flex items-center gap-2 font-medium">
                  <AlertCircle size={14} />
                  {errorDetail || 'Something went wrong — please try again or email us directly.'}
                </span>
                {errorDetail && (
                  <span className="pl-6 text-red-400/60">
                    Check the browser console for full details, or email us at devworks.ent@gmail.com
                  </span>
                )}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-mint text-[#0B0C0F] font-mono text-sm font-medium tracking-wider rounded micro-hover disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none disabled:active:scale-100 disabled:hover:filter-none"
            >
              {status === 'sending' ? (
                <><Loader2 size={16} className="animate-spin" /> SENDING…</>
              ) : (
                <><Send size={16} /> SEND INQUIRY</>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* ── Success Dialog ── */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="bg-[#11131A] border border-white/10 text-[#F4F6FA]">
          <DialogHeader>
            <DialogTitle className="font-display text-xl flex items-center gap-2">
              <CheckCircle className="text-mint" size={20} /> Inquiry Received!
            </DialogTitle>
            <DialogDescription className="text-cool-gray">
              Thanks for reaching out! We've received your message and will reply to{' '}
              <strong className="text-[#F4F6FA]">{formData.email || 'your email'}</strong>{' '}
              within 24 hours with a clear plan and estimate.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <button
              onClick={() => { setShowDialog(false); setStatus('idle'); }}
              className="w-full px-4 py-3 bg-mint text-[#0B0C0F] font-mono text-sm font-medium rounded"
            >
              GOT IT
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ContactFormSection;
