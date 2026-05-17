import { useState } from 'react'
import { Link } from 'react-router-dom'
import BuyButton from '../components/BuyButton'
import { getAccess } from '../utils/access'

const DEV = import.meta.env.DEV

const pricingPlans = [
  {
    name: 'Starter',
    pack: 'starter',
    price: '₹199',
    amountRupees: 199,
    companies: ['TCS', 'Infosys', 'Wipro'],
    description: 'Perfect for mass recruiters',
    highlighted: false,
  },
  {
    name: 'Full',
    pack: 'full',
    price: '₹299',
    amountRupees: 299,
    companies: ['TCS', 'Infosys', 'Wipro', 'Accenture', 'Cognizant'],
    description: 'Best value — 5 companies covered',
    highlighted: true,
  },
  {
    name: 'Premium',
    pack: 'premium',
    price: '₹499',
    amountRupees: 499,
    companies: ['TCS', 'Infosys', 'Wipro', 'Accenture', 'Cognizant', 'Zoho', 'Freshworks'],
    description: 'All 7 companies including product companies',
    highlighted: false,
  },
]

const testimonials = [
  {
    name: 'Priya Sharma',
    college: 'VIT Vellore, 2025 Batch',
    text: 'Got TCS Digital offer after using the 7-day cheat sheet. The round-by-round breakdown was exactly what I needed — no wasted time on irrelevant topics.',
    company: 'Now at TCS Digital',
  },
  {
    name: 'Rahul Menon',
    college: 'NIT Trichy, 2025 Batch',
    text: "The top 30 questions for Accenture were almost identical to what I faced. Cleared Cognitive + Coding in one shot. Placed in Accenture ASE role.",
    company: 'Now at Accenture',
  },
  {
    name: 'Sneha Patel',
    college: 'RVCE Bangalore, 2025 Batch',
    text: "Off-campus, no connections, just used the Infosys kit. Their aptitude section predictions were spot on. Infosys Systems Engineer offer in 3 weeks.",
    company: 'Now at Infosys',
  },
]

const faqs = [
  {
    q: 'Is this useful for off-campus placements too?',
    a: 'Yes — all content is designed for both campus and off-campus drives. The company-specific question banks and round patterns are sourced from real interview experiences from both routes.',
  },
  {
    q: 'What format is the content in?',
    a: 'All content is structured in an accordion layout: Process Overview → Round-by-Round Breakdown → Top 30 Questions → 7-Day Cheat Sheet. Mobile-friendly, no PDF downloads needed.',
  },
  {
    q: 'How do I access the content after payment?',
    a: 'After payment on Razorpay, you\'ll be shown an unlock code or redirected to the unlock page. Enter your pack code at placepro.in/unlock?pack=starter (or full/premium). Instant access, no login required.',
  },
  {
    q: 'Is the content updated for 2025-2026 drives?',
    a: 'Yes. The question banks, round structures, and salary data are based on 2025-2026 placement season experiences sourced from PrepInsta, Glassdoor, and AmbitionBox.',
  },
  {
    q: 'What if I\'m from a tier-3 college or have a low CGPA?',
    a: 'Our content covers eligibility cutoffs for each company and includes strategies for candidates below the standard cutoff. Many companies hire off-campus without GPA filters — we cover those paths too.',
  },
]

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-slate-700 rounded-xl overflow-hidden">
      <button
        className="w-full text-left px-6 py-4 flex justify-between items-center hover:bg-slate-800 transition-colors"
        onClick={() => setOpen(!open)}
      >
        <span className="font-semibold text-white pr-4">{q}</span>
        <span className="text-amber-400 text-xl flex-shrink-0">{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div className="px-6 pb-4 text-slate-300 text-sm leading-relaxed border-t border-slate-700 pt-4">
          {a}
        </div>
      )}
    </div>
  )
}

export default function Landing() {
  const existingAccess = getAccess()
  return (
    <div style={{ backgroundColor: '#0A0F1E', minHeight: '100vh' }}>
      {/* Dev mode banner */}
      {DEV && (
        <div className="text-center py-2 text-xs font-semibold" style={{ backgroundColor: '#1a3a1a', color: '#4ade80', borderBottom: '1px solid #166534' }}>
          🛠 DEV MODE — Buy buttons go to /unlock pages directly (no Razorpay)
          &nbsp;|&nbsp;
          <Link to="/unlock?pack=starter" style={{ color: '#86efac', textDecoration: 'underline' }}>Starter</Link>
          {' · '}
          <Link to="/unlock?pack=full" style={{ color: '#86efac', textDecoration: 'underline' }}>Full</Link>
          {' · '}
          <Link to="/unlock?pack=premium" style={{ color: '#86efac', textDecoration: 'underline' }}>Premium</Link>
        </div>
      )}

      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-slate-800 backdrop-blur-md" style={{ backgroundColor: 'rgba(10,15,30,0.9)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Place<span style={{ color: '#F59E0B' }}>Pro</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            {existingAccess && (
              <Link
                to={`/unlock?pack=${existingAccess.pack}`}
                className="text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                style={{ backgroundColor: '#F59E0B', color: '#0A0F1E' }}
              >
                My Pack →
              </Link>
            )}
            <Link
              to="/accenture-roadmap"
              className="text-sm font-medium px-4 py-2 rounded-lg transition-colors"
              style={{ color: '#F59E0B', border: '1px solid #F59E0B' }}
            >
              Free Roadmap
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-24 text-center">
        <div className="animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
            style={{ backgroundColor: 'rgba(245,158,11,0.15)', color: '#F59E0B', border: '1px solid rgba(245,158,11,0.3)' }}>
            🇮🇳 Built for Indian Engineering Freshers
          </div>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            Crack Your Placement{' '}
            <span style={{ background: 'linear-gradient(135deg, #F59E0B 0%, #FCD34D 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              in 7 Days
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Company-specific prep kits built for Indian freshers. Real questions, real patterns, zero fluff.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/accenture-roadmap"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-bold transition-all amber-glow"
              style={{ backgroundColor: '#F59E0B', color: '#0A0F1E' }}
            >
              Get Free Accenture Roadmap →
            </Link>
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-semibold border border-slate-600 text-slate-300 hover:border-amber-400 hover:text-amber-400 transition-all"
            >
              View Paid Packs
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mt-16 max-w-lg mx-auto animate-fade-in-up delay-300">
          {[
            { number: '7', label: 'Companies Covered' },
            { number: '30+', label: 'Questions Per Company' },
            { number: '7-Day', label: 'Study Plan Each' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-extrabold" style={{ color: '#F59E0B' }}>{stat.number}</div>
              <div className="text-xs sm:text-sm text-slate-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Pick Your Pack
          </h2>
          <p className="text-slate-400">One-time payment. Instant access. No subscriptions.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pricingPlans.map((plan, i) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-6 card-hover animate-fade-in-up delay-${(i + 1) * 100}`}
              style={{
                backgroundColor: plan.highlighted ? 'rgba(245,158,11,0.08)' : '#1E293B',
                border: plan.highlighted ? '2px solid #F59E0B' : '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold"
                  style={{ backgroundColor: '#F59E0B', color: '#0A0F1E' }}>
                  MOST POPULAR
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-1" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{plan.name}</h3>
                <p className="text-slate-400 text-sm mb-4">{plan.description}</p>
                <div className="text-4xl font-extrabold mb-2" style={{ color: plan.highlighted ? '#F59E0B' : '#ffffff' }}>
                  {plan.price}
                </div>
                <div className="text-slate-500 text-xs">one-time · instant access</div>
              </div>
              <ul className="space-y-2 mb-8">
                {plan.companies.map((c) => (
                  <li key={c} className="flex items-center gap-2 text-sm text-slate-300">
                    <span style={{ color: '#F59E0B' }}>✓</span>
                    {c} full prep kit
                  </li>
                ))}
                <li className="flex items-center gap-2 text-sm text-slate-300">
                  <span style={{ color: '#F59E0B' }}>✓</span>
                  7-day study plan each
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-300">
                  <span style={{ color: '#F59E0B' }}>✓</span>
                  Top 30 interview Q&amp;A
                </li>
              </ul>
              <BuyButton
                pack={plan.pack}
                amountRupees={plan.amountRupees}
                packName={plan.name}
                className="block w-full text-center py-3 rounded-xl font-bold text-sm transition-all cursor-pointer"
                style={plan.highlighted
                  ? { backgroundColor: '#F59E0B', color: '#0A0F1E' }
                  : { border: '1px solid #F59E0B', color: '#F59E0B', backgroundColor: 'transparent' }
                }
              >
                {DEV ? 'Preview Content →' : 'Buy Now →'}
              </BuyButton>
            </div>
          ))}
        </div>
      </section>

      {/* What's Inside */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            What's Inside Each Kit
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: '🗺️', title: 'Process Overview', desc: 'Every round, duration, eligibility cutoff, and salary range for that specific company.' },
            { icon: '🔍', title: 'Round-by-Round Breakdown', desc: 'What each round tests, how long it runs, and insider tips from real candidates.' },
            { icon: '❓', title: 'Top 30 Questions', desc: 'Real aptitude, technical, and HR questions categorized and answered for each company.' },
            { icon: '📅', title: '7-Day Cheat Sheet', desc: 'Day-by-day study plan with exact topics and resources — no ambiguity, just action.' },
          ].map((item) => (
            <div key={item.title} className="rounded-xl p-5 card-hover" style={{ backgroundColor: '#1E293B', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="font-bold text-white mb-2 text-sm">{item.title}</h3>
              <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Real Results from Real Students
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="rounded-2xl p-6 card-hover" style={{ backgroundColor: '#1E293B', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => <span key={i} style={{ color: '#F59E0B' }}>★</span>)}
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-5">"{t.text}"</p>
              <div>
                <div className="font-semibold text-white text-sm">{t.name}</div>
                <div className="text-slate-500 text-xs">{t.college}</div>
                <div className="text-xs font-medium mt-1" style={{ color: '#F59E0B' }}>{t.company}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Frequently Asked Questions
          </h2>
        </div>
        <div className="space-y-3">
          {faqs.map((faq) => (
            <FaqItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="rounded-2xl p-10 text-center" style={{ backgroundColor: '#1E293B', border: '1px solid rgba(245,158,11,0.2)' }}>
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Start for free — get the Accenture roadmap
          </h2>
          <p className="text-slate-400 mb-8 max-w-md mx-auto">No email. No login. Just the roadmap. Then decide if you want the full pack.</p>
          <Link
            to="/accenture-roadmap"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-bold transition-all"
            style={{ backgroundColor: '#F59E0B', color: '#0A0F1E' }}
          >
            Get Free Accenture Roadmap →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <div className="text-xl font-bold mb-3" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Place<span style={{ color: '#F59E0B' }}>Pro</span>
          </div>
          <p className="text-slate-500 text-sm mb-2">Built for Indian freshers 🇮🇳</p>
          <p className="text-slate-600 text-xs">
            Questions? Email us at{' '}
            <a href="mailto:hello@placepro.in" style={{ color: '#F59E0B' }}>hello@placepro.in</a>
          </p>
          <p className="text-slate-700 text-xs mt-4">© 2025 PlacePro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
