import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import ChatWidget from './components/ChatWidget';
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  FileCheck2,
  FileText,
  Gauge,
  Leaf,
  Mail,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  SunMedium,
  X,
  Zap,
} from 'lucide-react';
import brandMark from './assets/logo/brand-mark.svg';
import { company, navItems, socialLinks } from './data/company';
import { faqs } from './data/faqs';
import { pricingPlans } from './data/pricing';
import { projectCategories, projects } from './data/projects';
import { iconMap, services } from './data/services';
import { testimonials } from './data/testimonials';

const processSteps = [
  'Contact',
  'Site Survey',
  'Solar Planning',
  'Quotation',
  'Installation',
  'System Setup',
  'Support',
];

const featureCards = [
  { icon: ShieldCheck, title: 'Professional Installation', text: 'Orchestrated execution from planning through completion.' },
  { icon: SunMedium, title: 'Quality Components', text: 'Energy products selected for practical long-term performance.' },
  { icon: Gauge, title: 'Expert Guidance', text: 'Smart recommendations tailored to usage and available space.' },
  { icon: Sparkles, title: 'Transparent Process', text: 'Straightforward communication and easy-to-follow steps.' },
  { icon: Leaf, title: 'Complete Solar Solutions', text: 'Support for assessment, design, setup, and upkeep.' },
  { icon: Phone, title: 'After-Sales Support', text: 'Helpful maintenance guidance after installation and handover.' },
];

const maharashtraCities = [
  { name: 'Mumbai', landmark: 'Gateway of India' },
  { name: 'Pune', landmark: 'Shaniwar Wada' },
  { name: 'Nashik', landmark: 'Trimbakeshwar Temple' },
  { name: 'Nagpur', landmark: 'Deekshabhoomi' },
  { name: 'Thane', landmark: 'Lakeside Gateway' },
  { name: 'Chhatrapati Sambhajinagar', landmark: 'Bibi Ka Maqbara' },
  { name: 'Solapur', landmark: 'Siddheshwar Temple' },
  { name: 'Amravati', landmark: 'Ambadevi Temple' },
  { name: 'Kolhapur', landmark: 'Mahalaxmi Temple' },
  { name: 'Navi Mumbai', landmark: 'Palm Beach Skyline' },
];

const requiredDocuments = [
  {
    title: 'Identity Proof',
    desc: 'Aadhaar Card or PAN Card of property owner',
    icon: ShieldCheck,
  },
  {
    title: 'Electricity Bill',
    desc: 'Latest electricity bill (past 1–2 months) with consumer number',
    icon: Zap,
  },
  {
    title: 'Property Ownership Proof',
    desc: 'Municipal property tax receipt, registry, or Index-II copy',
    icon: Building2,
  },
  {
    title: 'Bank Passbook / Cheque',
    desc: 'Cancelled cheque or passbook copy for direct DBT subsidy deposit',
    icon: FileText,
  },
  {
    title: 'Rooftop Photos & Layout',
    desc: 'Recent photos of shade-free rooftop area for site evaluation',
    icon: SunMedium,
  },
  {
    title: 'Passport Size Photos',
    desc: 'Recent color passport-sized photographs of applicant',
    icon: FileCheck2,
  },
];

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<(typeof services)[number] | null>(null);
  const [activeProjectCategory, setActiveProjectCategory] = useState<(typeof projectCategories)[number]>('All');
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[number] | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const [submitted, setSubmitted] = useState(false);

  // Contact / Enquiry form state
  const OWNER_WHATSAPP = '919112432313';
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [monthlyBillContact, setMonthlyBillContact] = useState<number | ''>('');

  const liveRecommendation = useMemo(() => {
    if (typeof monthlyBillContact !== 'number' || isNaN(monthlyBillContact) || monthlyBillContact <= 0) {
      return null;
    }
    const bill = monthlyBillContact;
    if (bill <= 3000) {
      return {
        plan: '3 kW System',
        details: '6 × 540W panels • ~330–390 units/month • ~240–300 sq.ft roof area',
        type: '3kw',
      };
    }
    if (bill <= 5000) {
      return {
        plan: '5 kW System',
        details: '9–10 × 540W panels • ~550–650 units/month • ~400–500 sq.ft roof area',
        type: '5kw',
      };
    }
    return {
      plan: 'Custom Solar Solution',
      details: 'Tailored commercial/high-capacity rooftop planning for heavy energy demand',
      type: 'custom',
    };
  }, [monthlyBillContact]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveTestimonial((previous) => (previous + 1) % testimonials.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeProjectCategory === 'All') {
      return projects;
    }
    return projects.filter((project) => project.category === activeProjectCategory);
  }, [activeProjectCategory]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let recName = 'Custom Solar Solution';
    if (typeof monthlyBillContact === 'number' && !isNaN(monthlyBillContact)) {
      if (monthlyBillContact <= 3000) recName = '3 kW System (6×540W, ~330-390 units/mo)';
      else if (monthlyBillContact <= 5000) recName = '5 kW System (9-10×540W, ~550-650 units/mo)';
      else recName = 'Custom Solar Plan';
    }

    setSubmitted(true);

    const billText = typeof monthlyBillContact === 'number' && !isNaN(monthlyBillContact)
      ? `₹${monthlyBillContact}`
      : 'Not specified';

    const msg = `Hello Maharudra Solar, I am ${contactName}. Mobile: ${contactPhone}. My monthly bill is ${billText}. Recommendation: ${recName}. Please contact me.`;
    const url = `https://wa.me/${OWNER_WHATSAPP}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#f5faf6] text-slate-900">
      {/* Header */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 shadow-md backdrop-blur-xl' : 'bg-white/70 backdrop-blur-md'}`}>
        <div className="section-shell flex h-20 items-center justify-between gap-4">
          <a href="#home" className="flex items-center gap-3" aria-label="Maha Rudra Solar Home">
            <img src={brandMark} alt="Maha Rudra logo" className="h-12 w-12 rounded-2xl shadow-sm" />
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-solar-700">Maha Rudra</p>
              <p className="text-sm font-extrabold text-solar-900">Solar Services</p>
            </div>
          </a>

          <nav className="hidden items-center gap-6 lg:flex">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} className="text-sm font-semibold text-slate-700 transition hover:text-solar-700">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a href={company.contact.whatsappLink} target="_blank" rel="noopener noreferrer" className="secondary-button">
              Call Now
            </a>
            <a href="#contact" className="primary-button">
              Get Free Quote
            </a>
          </div>

          <button
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-solar-200 bg-white text-solar-800 shadow-sm lg:hidden"
            aria-label="Toggle mobile menu"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="border-t border-solar-100 bg-white lg:hidden">
            <div className="section-shell flex flex-col space-y-4 py-5">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm font-semibold text-slate-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="flex flex-col gap-3 pt-2">
                <a href={company.contact.whatsappLink} target="_blank" rel="noopener noreferrer" className="secondary-button justify-center" onClick={() => setIsMenuOpen(false)}>
                  Call Now
                </a>
                <a href="#contact" className="primary-button justify-center" onClick={() => setIsMenuOpen(false)}>
                  Get Free Quote
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* Hero Section */}
        <section id="home" className="relative overflow-hidden pt-10 pb-16 sm:pt-16 lg:pb-24">
          <div className="section-shell grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="section-badge">Premium solar solutions</span>
              <h1 className="mt-6 max-w-xl text-4xl font-extrabold tracking-tight text-solar-900 sm:text-5xl lg:text-6xl">
                {company.heroTitle}
              </h1>
              <p className="mt-6 max-w-lg text-lg text-slate-700">{company.heroSubtitle}</p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a href="#contact" className="primary-button">
                  Get Free Quote <ArrowRight className="h-4 w-4" />
                </a>
                <a href="#services" className="secondary-button">
                  Explore Services
                </a>
              </div>

              <div className="mt-10 grid max-w-lg grid-cols-3 gap-4">
                {company.stats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-solar-100 bg-white/80 p-4 shadow-sm backdrop-blur-sm">
                    <p className="text-2xl font-extrabold text-solar-800">{stat.value}</p>
                    <p className="mt-1 text-xs text-slate-600">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }} className="relative">
              <div className="absolute -left-10 top-8 h-28 w-28 rounded-full bg-solar-yellow/30 blur-3xl" />
              <div className="absolute -right-8 bottom-8 h-32 w-32 rounded-full bg-solar-400/20 blur-3xl" />
              <div className="glass-panel relative overflow-hidden rounded-[2rem] p-3 shadow-soft">
                <div className="rounded-[1.6rem] bg-gradient-to-br from-solar-100 via-white to-white p-2">
                  <picture>
                    <source type="image/webp" srcSet="/hero-custom-400.webp 400w, /hero-custom-800.webp 800w" sizes="(min-width:1024px) 800px, 100vw" />
                    <img src="/hero-custom-800.webp" alt="Solar rooftop system by Maharudra Solar" className="h-[480px] w-full rounded-[1.4rem] object-cover" loading="eager" />
                  </picture>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20">
          <div className="section-shell grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="overflow-hidden rounded-[2rem] border border-solar-100 bg-white p-3 shadow-soft">
              <img
                src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1200&q=80"
                alt="Solar consulting and inspection"
                className="h-full min-h-[420px] w-full rounded-[1.5rem] object-cover"
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="section-badge">About us</span>
              <h2 className="section-heading mt-5">Complete solar planning from concept to support.</h2>
              <p className="mt-5 text-lg leading-8 text-slate-700">{company.aboutText}</p>
              <div className="mt-8 space-y-4">
                {[
                  'Energy consultation and feasibility review',
                  'System design and rooftop planning',
                  'Installation coordination and after-sales support',
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-solar-100">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-solar-600" />
                    <p className="text-slate-700">{point}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <a href="#contact" className="primary-button">
                  Request a Consultation <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="bg-solar-900 py-20 text-white">
          <div className="section-shell">
            <div className="mx-auto max-w-2xl text-center">
              <span className="section-badge border-solar-700 bg-solar-800 text-solar-100">Our services</span>
              <h2 className="section-heading mt-5 text-white">Premium solar service for every phase of the project.</h2>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {services.map((service, index) => {
                const Icon = iconMap[service.icon as keyof typeof iconMap] ?? SunMedium;
                return (
                  <motion.article
                    key={service.id}
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.35, delay: index * 0.06 }}
                    whileHover={{ y: -8 }}
                    className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 shadow-soft"
                  >
                    <div className="relative overflow-hidden">
                      <img src={service.image} alt={service.title} className="h-52 w-full object-cover transition duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-solar-900 via-solar-900/10 to-transparent" />
                    </div>
                    <div className="p-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-solar-700 text-solar-100">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="mt-5 text-2xl font-bold text-white">{service.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-solar-100/80">{service.description}</p>
                      <button
                        type="button"
                        onClick={() => setSelectedService(service)}
                        className="mt-6 inline-flex items-center gap-2 rounded-full border border-solar-100/30 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
                      >
                        Learn More <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Solar Solutions & Pricing Section */}
        <section id="solutions" className="py-20 scroll-mt-10">
          <div id="pricing" className="section-shell scroll-mt-20">
            <div className="mx-auto max-w-2xl text-center">
              <span className="section-badge">Solar solutions & pricing</span>
              <h2 className="section-heading mt-5">Flexible solar system options for different energy goals.</h2>
            </div>

            <div className="mt-12 grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
              {pricingPlans.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.08 }}
                  className={`flex flex-col justify-between rounded-[2rem] border p-7 shadow-soft ${
                    plan.id === '5kw'
                      ? 'border-solar-300 bg-solar-50/60 ring-2 ring-solar-500/20'
                      : plan.id === 'custom'
                        ? 'border-emerald-300 bg-emerald-50/50'
                        : 'border-solar-100 bg-white'
                  }`}
                >
                  <div>
                    <span className="inline-block rounded-full bg-solar-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-solar-800">
                      {plan.capacity}
                    </span>
                    <h3 className="mt-4 text-2xl font-extrabold text-solar-900 sm:text-3xl">{plan.name}</h3>
                    <p className="mt-3 text-sm text-slate-600 leading-6">{plan.subtitle}</p>
                    
                    <div className="mt-6 border-y border-solar-100 py-4">
                      <div className="text-3xl sm:text-4xl font-extrabold text-solar-900">{plan.price}</div>
                    </div>

                    <ul className="mt-6 space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-sm text-slate-700">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-solar-600" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a href="#contact" className="primary-button mt-8 w-full">
                    {plan.id === 'custom' ? 'Book Custom Design' : 'Request a Quote'}
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Documents Required Section */}
        <section id="documents" className="bg-[#f0f8f1] py-20">
          <div className="section-shell">
            <div className="mx-auto max-w-2xl text-center">
              <span className="section-badge">Checklist</span>
              <h2 className="section-heading mt-5">Documents for Government Solar Scheme</h2>
              <p className="mt-4 text-base leading-7 text-slate-700">
                Keep these documents ready to fast-track your rooftop solar application and subsidy approvals under PM Surya Ghar & DISCOM schemes.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {requiredDocuments.map((doc, idx) => {
                const Icon = doc.icon;
                return (
                  <motion.div
                    key={doc.title}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="flex flex-col rounded-2xl border border-solar-100 bg-white p-6 shadow-sm transition hover:shadow-md"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-solar-100 text-solar-800">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-solar-900">{doc.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{doc.desc}</p>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-10 rounded-2xl border border-solar-200 bg-white/90 p-6 text-center shadow-sm">
              <p className="text-sm font-medium text-slate-700">
                Need assistance with document scanning or DISCOM paperwork? Our dedicated support team handles complete document verification and portal submission.
              </p>
              <div className="mt-4 flex justify-center gap-3">
                <a href="#contact" className="primary-button text-sm">
                  Get Free Consultation
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* PM Surya Ghar Government Scheme Promo Banner */}
        <section className="py-20">
          <div className="section-shell">
            <div className="mx-auto max-w-2xl text-center">
              <span className="section-badge">Government scheme portal</span>
              <h2 className="section-heading mt-5">PM Surya Ghar: Muft Bijli Yojana</h2>
              <p className="mt-4 text-base leading-7 text-slate-700">
                Avail central government subsidies up to ₹78,000 for residential rooftop solar systems. Click below to explore the official government portal.
              </p>
            </div>

            <div className="mt-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="group relative overflow-hidden rounded-[2rem] border border-solar-200 bg-white shadow-soft transition hover:shadow-lg"
              >
                <a
                  href="https://pmsuryaghar.gov.in/#/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open PM Surya Ghar official portal"
                  className="block relative overflow-hidden"
                >
                  <img
                    src="/pm-surya-ghar.png"
                    alt="PM Surya Ghar Muft Bijli Yojana official portal"
                    className="w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                  />
                  <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-solar-900/90 px-5 py-2.5 text-sm font-bold text-white shadow-lg backdrop-blur-md transition group-hover:bg-solar-800">
                    <span>Visit Official Portal</span>
                    <ExternalLink className="h-4 w-4" />
                  </div>
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="bg-[#fbfdfb] py-20">
          <div className="section-shell">
            <div className="mx-auto max-w-2xl text-center">
              <span className="section-badge">Why choose us</span>
              <h2 className="section-heading mt-5">Focused on smooth, reliable solar journeys.</h2>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {featureCards.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: index * 0.08 }}
                    whileHover={{ y: -8 }}
                    className="rounded-[1.75rem] border border-solar-100 bg-white p-6 shadow-soft"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-solar-100 text-solar-700">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 text-xl font-extrabold text-solar-900">{feature.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-700">{feature.text}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Our Process */}
        <section className="py-20">
          <div className="section-shell">
            <div className="mx-auto max-w-2xl text-center">
              <span className="section-badge">Our process</span>
              <h2 className="section-heading mt-5">A simple and clearly structured solar workflow.</h2>
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-3">
              {processSteps.map((step, index) => (
                <div key={step} className="flex items-center gap-3">
                  <div className="rounded-2xl border border-solar-200 bg-white px-5 py-3 text-center shadow-sm">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-solar-700">0{index + 1}</p>
                    <p className="mt-1 text-sm font-extrabold text-solar-900">{step}</p>
                  </div>
                  {index < processSteps.length - 1 && <ChevronDown className="h-5 w-5 -rotate-90 text-solar-400" />}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Showcase */}
        <section id="projects" className="bg-solar-900 py-20 text-white">
          <div className="section-shell">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-xl">
                <span className="section-badge border-solar-700 bg-solar-800 text-solar-100">Projects</span>
                <h2 className="section-heading mt-5 text-white">Solar project showcase with real installations.</h2>
              </div>

              <div className="flex flex-wrap gap-2">
                {projectCategories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveProjectCategory(category)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      activeProjectCategory === category ? 'bg-solar-yellow text-solar-900' : 'border border-white/20 bg-white/5 text-white hover:bg-white/10'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                  className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 shadow-soft"
                >
                  <div className="relative overflow-hidden">
                    <img src={project.image} alt={project.title} className="h-64 w-full object-cover transition duration-500 group-hover:scale-105" />
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="absolute inset-0 flex items-center justify-center bg-solar-900/40 opacity-0 transition group-hover:opacity-100"
                    >
                      <span className="rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-solar-900 shadow-md">View project</span>
                    </button>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between gap-3">
                      <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-solar-100">
                        {project.category}
                      </span>
                      <span className="text-sm text-solar-100">{project.location}</span>
                    </div>
                    <h3 className="mt-4 text-2xl font-bold text-white">{project.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-solar-100/80">{project.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Presence Across Maharashtra */}
        <section className="bg-[#f2f9f3] py-20">
          <div className="section-shell">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="section-heading mt-5">We Are Present Here</h2>
              <p className="mt-5 text-base leading-8 text-slate-700">
                We proudly serve the key cities of Maharashtra with reliable and efficient solar energy solutions for homes and businesses.
              </p>
            </div>

            <div className={`city-marquee relative mt-14 ${prefersReducedMotion ? 'motion-reduced' : ''}`}>
              <div className="city-marquee-track">
                {[...maharashtraCities, ...maharashtraCities].map((city, index) => (
                  <button
                    key={`${city.name}-${index}`}
                    type="button"
                    aria-label={`Highlight ${city.name}`}
                    onClick={() => setSelectedCity(city.name)}
                    className={`city-marquee-name ${index % 2 ? 'city-outline-blue' : 'city-outline-green'} ${selectedCity === city.name ? 'is-selected' : ''}`}
                  >
                    {city.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-[#f2f9f3] py-20">
          <div className="section-shell">
            <div className="mx-auto max-w-2xl text-center">
              <span className="section-badge">Client Testimonials</span>
              <h2 className="section-heading mt-5">What our happy customers say about Maharudra Solar.</h2>
            </div>

            <div className="mt-12 rounded-[2rem] border border-solar-100 bg-white p-8 shadow-soft">
              <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-solar-700">{testimonials[activeTestimonial].role}</p>
                  <h3 className="mt-3 text-3xl font-extrabold text-solar-900">{testimonials[activeTestimonial].name}</h3>
                </div>
                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setActiveTestimonial(index)}
                      className={`h-3 w-3 rounded-full transition ${index === activeTestimonial ? 'bg-solar-700 scale-125' : 'bg-solar-200'}`}
                      aria-label={`Set testimonial ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-8 rounded-[1.5rem] bg-solar-50 p-8">
                <div className="flex items-center gap-1 text-solar-yellow">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className="mt-5 text-xl leading-9 text-slate-700">“{testimonials[activeTestimonial].quote}”</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20">
          <div className="section-shell">
            <div className="mx-auto max-w-2xl text-center">
              <span className="section-badge">FAQ</span>
              <h2 className="section-heading mt-5">Questions people often ask about solar planning and installation.</h2>
            </div>

            <div className="mx-auto mt-12 max-w-4xl space-y-4">
              {faqs.map((faq, index) => (
                <div key={faq.question} className="overflow-hidden rounded-[1.25rem] border border-solar-100 bg-white shadow-sm">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  >
                    <span className="text-base font-semibold text-solar-900 sm:text-lg">{faq.question}</span>
                    <ChevronDown className={`h-5 w-5 shrink-0 text-solar-700 transition ${expandedFaq === index ? 'rotate-180' : ''}`} />
                  </button>
                  {expandedFaq === index && (
                    <div className="border-t border-solar-100 px-6 py-5 text-sm leading-7 text-slate-700">{faq.answer}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact & WhatsApp Enquiry Section */}
        <section id="contact" className="py-20">
          <div className="section-shell">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="rounded-[2rem] bg-solar-900 p-8 text-white shadow-soft">
                <span className="section-badge border-solar-700 bg-solar-800 text-solar-100">Contact Us</span>
                <h2 className="mt-5 text-3xl font-extrabold sm:text-4xl">Request your free solar quote & recommendation.</h2>
                <p className="mt-4 text-solar-100/80">
                  Fill in your details below. We will calculate the optimal system recommendation for your monthly bill and connect you directly with our solar engineers on WhatsApp.
                </p>

                <div className="mt-8 space-y-4 text-sm text-solar-100/80">
                  <div className="flex items-start gap-3">
                    <Phone className="mt-1 h-5 w-5 text-solar-yellow" />
                    <span>{company.contact.phone}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-1 h-5 w-5 text-solar-yellow" />
                    <span>{company.contact.address}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="mt-1 h-5 w-5 text-solar-yellow" />
                    <span>{company.contact.email}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="mt-1 h-5 w-5 text-solar-yellow" />
                    <span>GSTIN: {company.gstin}</span>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="rounded-[2rem] border border-solar-100 bg-white p-7 shadow-soft">
                <h3 className="text-2xl font-bold text-solar-900">Enquiry & System Sizing</h3>
                <p className="mt-1 text-sm text-slate-600">Enter your electricity bill to see the recommended capacity.</p>

                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  <label className="block text-sm font-semibold text-slate-700 md:col-span-2">
                    Full Name <span className="text-red-500">*</span>
                    <input
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      type="text"
                      placeholder="Enter your name"
                      className="mt-2 w-full rounded-2xl border border-solar-200 bg-solar-50 px-4 py-3 text-base text-solar-900 outline-none ring-offset-2 transition focus:border-solar-400 focus:ring-2 focus:ring-solar-200"
                    />
                  </label>
                  
                  <label className="block text-sm font-semibold text-slate-700">
                    Mobile Number <span className="text-red-500">*</span>
                    <input
                      required
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      type="tel"
                      placeholder="+91 98765 43210"
                      className="mt-2 w-full rounded-2xl border border-solar-200 bg-solar-50 px-4 py-3 text-base text-solar-900 outline-none ring-offset-2 transition focus:border-solar-400 focus:ring-2 focus:ring-solar-200"
                    />
                  </label>

                  <label className="block text-sm font-semibold text-slate-700">
                    Monthly electricity bill (₹)
                    <input
                      type="number"
                      min={0}
                      value={monthlyBillContact === '' ? '' : monthlyBillContact}
                      onChange={(e) => {
                        const v = e.target.value;
                        setMonthlyBillContact(v === '' ? '' : Number(v));
                      }}
                      placeholder="e.g. 2500"
                      className="mt-2 w-full rounded-2xl border border-solar-200 bg-solar-50 px-4 py-3 text-base text-solar-900 outline-none ring-offset-2 transition focus:border-solar-400 focus:ring-2 focus:ring-solar-200"
                    />
                  </label>
                </div>

                {liveRecommendation && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 rounded-2xl border border-solar-200 bg-solar-50 p-4"
                  >
                    <div className="flex items-center gap-2 text-solar-800">
                      <Sparkles className="h-5 w-5 text-solar-600" />
                      <span className="text-xs font-bold uppercase tracking-wider">Recommended Setup</span>
                    </div>
                    <p className="mt-2 text-lg font-extrabold text-solar-900">{liveRecommendation.plan}</p>
                    <p className="mt-1 text-sm text-slate-700">{liveRecommendation.details}</p>
                  </motion.div>
                )}

                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <button type="submit" className="primary-button w-full sm:w-auto">
                    Send via WhatsApp <ArrowRight className="h-4 w-4" />
                  </button>
                  {submitted && (
                    <p className="text-sm font-semibold text-solar-700">
                      Opening WhatsApp to send your enquiry...
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-solar-100 bg-white/90">
        <div className="section-shell grid gap-10 py-12 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <img src={brandMark} alt="Maha Rudra logo" className="h-12 w-12 rounded-2xl" />
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-solar-700">Maha Rudra</p>
                <p className="text-lg font-extrabold text-solar-900">Solar Services</p>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-7 text-slate-600">{company.description}</p>
            <p className="mt-2 text-xs font-semibold text-slate-500">GSTIN: {company.gstin}</p>
          </div>

          <div>
            <h3 className="text-lg font-extrabold text-solar-900">Services</h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              {services.slice(0, 5).map((service) => (
                <li key={service.title}>
                  <button
                    type="button"
                    onClick={() => setSelectedService(service)}
                    className="text-left transition hover:text-solar-700"
                  >
                    {service.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-extrabold text-solar-900">Navigation</h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="transition hover:text-solar-700">{item.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-extrabold text-solar-900">Contact</h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li>{company.contact.phone}</li>
              <li>{company.contact.email}</li>
              <li>{company.contact.address}</li>
            </ul>
            <div className="mt-4 flex gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-solar-200 bg-solar-50 text-xs font-bold text-solar-700 transition hover:bg-solar-100"
                >
                  {link.label.slice(0, 2)}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-solar-100 py-5">
          <div className="section-shell flex flex-col gap-2 text-center text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
            <a
              href="https://suraj-sasane-portfolio.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-slate-700 transition hover:text-solar-700 hover:underline"
            >
              © copyright 2021 by suraj sasane
            </a>
            <span>Maharudra Solar & Traders • Maharashtra</span>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href={company.contact.whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition hover:scale-105"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
          <path d="M20.5 3.5C18.5 1.5 16 0.75 13.4 0.75C6.8 0.75 1.5 6.1 1.5 12.7C1.5 14.8 2.1 16.8 3.1 18.5L1.4 22.6L5.7 20.9C7.3 21.9 9.2 22.4 11.2 22.4H11.3C17.9 22.4 23.2 17.1 23.2 10.5C23.2 8 22.5 5.5 20.5 3.5ZM16.9 15.1C16.7 15.7 15.7 16.2 15.1 16.3C14.8 16.3 14.4 16.3 14.1 16.2C13.7 16.1 13.2 16 12.7 15.8C10.4 14.9 8.9 12.7 8.7 12.3C8.6 12.1 7.9 11.1 7.9 10C7.9 9 8.5 8.5 8.7 8.2C8.9 8 9.3 8 9.5 8H9.8C10 8 10.2 8 10.3 8.3C10.5 8.8 11 9.9 11.1 10.1C11.2 10.3 11.2 10.5 11.1 10.7C11 10.9 10.9 11.1 10.8 11.3C10.6 11.5 10.5 11.6 10.3 11.8C10.1 12 10 12.2 10.2 12.5C10.4 12.8 10.9 13.6 11.5 14.2C12.4 15.1 13.1 15.4 13.4 15.6C13.7 15.8 13.9 15.8 14.2 15.6C14.5 15.5 15.3 14.8 15.6 14.5C15.9 14.2 16.1 14.2 16.4 14.3C16.7 14.4 17.8 15 18.1 15.2C18.4 15.4 18.6 15.5 18.7 15.7C18.9 16 18.6 16.6 16.9 15.1Z" />
        </svg>
      </a>

      {/* Floating Rudra AI Chatbot */}
      <React.Suspense fallback={null}>
        <ChatWidget />
      </React.Suspense>

      {/* Service Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 p-4"
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ duration: 0.2 }}
              onClick={(event) => event.stopPropagation()}
              className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] border border-solar-100 bg-white shadow-soft"
            >
              <button type="button" onClick={() => setSelectedService(null)} className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-solar-900 shadow-md">
                <X className="h-5 w-5" />
              </button>
              <img src={selectedService.image} alt={selectedService.title} className="h-64 w-full object-cover" />
              <div className="p-7">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-solar-100 text-solar-700">
                    {(() => {
                      const Icon = iconMap[selectedService.icon as keyof typeof iconMap] ?? SunMedium;
                      return <Icon className="h-5 w-5" />;
                    })()}
                  </div>
                  <h3 className="text-3xl font-extrabold text-solar-900">{selectedService.title}</h3>
                </div>
                <p className="mt-5 text-base leading-8 text-slate-700">{selectedService.fullDescription}</p>
                <ul className="mt-6 space-y-3">
                  {selectedService.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-slate-700">
                      <CheckCircle2 className="h-5 w-5 text-solar-600" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a href="#contact" className="primary-button mt-8" onClick={() => setSelectedService(null)}>
                  Get a Free Quote
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/70 p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              onClick={(event) => event.stopPropagation()}
              className="relative w-full max-w-3xl overflow-hidden rounded-[2rem] border border-solar-100 bg-white shadow-soft"
            >
              <button type="button" onClick={() => setSelectedProject(null)} className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-solar-900 shadow-md">
                <X className="h-5 w-5" />
              </button>
              <img src={selectedProject.image} alt={selectedProject.title} className="h-80 w-full object-cover" />
              <div className="p-7">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="rounded-full border border-solar-200 bg-solar-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-solar-700">{selectedProject.category}</span>
                  <span className="text-sm font-semibold text-slate-600">{selectedProject.location}</span>
                </div>
                <h3 className="mt-5 text-3xl font-extrabold text-solar-900">{selectedProject.title}</h3>
                <p className="mt-4 text-base leading-8 text-slate-700">{selectedProject.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
