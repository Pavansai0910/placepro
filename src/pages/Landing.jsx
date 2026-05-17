import { useState } from 'react'
import { Link } from 'react-router-dom'
import BuyButton from '../components/BuyButton'
import { getAccess } from '../utils/access'

const DEV = import.meta.env.DEV

const pricingPlans = [
  {
    name: 'Starter',
    pack: 'starter',
    price: '₹99',
    amountRupees: 99,
    tag: null,
    companies: ['TCS', 'Infosys', 'Wipro'],
    note: 'The 3 highest-volume campus recruiters every season.',
    highlighted: false,
  },
  {
    name: 'Full',
    pack: 'full',
    price: '₹149',
    amountRupees: 149,
    tag: 'Best Value',
    companies: ['TCS', 'Infosys', 'Wipro', 'Accenture', 'Cognizant'],
    note: 'Adds Accenture & Cognizant — both rely on cognitive assessments, not pure DSA.',
    highlighted: true,
  },
  {
    name: 'Premium',
    pack: 'premium',
    price: '₹499',
    amountRupees: 499,
    tag: 'Product Companies',
    companies: ['All 5 above', 'Zoho', 'Freshworks'],
    note: 'Zoho & Freshworks run 6–7 rounds with heavy C/DSA focus — a completely different process. Separate round-by-round breakdown + 20+ additional questions each.',
    highlighted: false,
  },
]

const faqs = [
  {
    q: "Is this useful if I'm applying off-campus?",
    a: "Yes — most of the interview data I collected was from off-campus candidates in WhatsApp groups and LinkedIn posts. The question patterns don't change whether you're on-campus or off.",
  },
  {
    q: 'How is this different from PrepInsta or GeeksforGeeks?',
    a: "Those sites give you massive question banks with no structure. This gives you the exact pattern for one specific company — what round comes first, how long it takes, what the real cutoffs are, and a 7-day plan so you're not guessing what to study.",
  },
  {
    q: 'What format is the content? Do I need to download anything?',
    a: "Everything is in-browser — accordion layout per company. No PDFs, no downloads, no app. Works on mobile too. Pay once, access anytime on the same browser.",
  },
  {
    q: 'Is the content updated for 2025–26 drives?',
    a: "Yes. I've been tracking placement patterns since early 2024. The question banks, round structures, and salary ranges reflect the most recent drives — not 2020 data.",
  },
  {
    q: "What if I'm from a tier-3 college with a low CGPA?",
    a: "I've included the exact eligibility cutoffs per company (some are 60%, some are stricter). I've also noted which companies do off-campus hiring without GPA filters. That information is in the Process Overview for each company.",
  },
]


function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      className="rounded-2xl overflow-hidden transition-all"
      style={{
        border: `1px solid ${open ? '#DDD6FE' : '#E2E0DA'}`,
        backgroundColor: open ? '#F5F3FF' : '#FFFFFF',
      }}
    >
      <button
        className="w-full text-left px-6 py-5 flex justify-between items-center gap-4"
        onClick={() => setOpen(!open)}
      >
        <span className="font-semibold text-sm leading-snug" style={{ color: '#0F0A1E' }}>{q}</span>
        <span
          className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold"
          style={{ backgroundColor: open ? '#7C3AED' : '#EDE9FE', color: open ? '#FFFFFF' : '#7C3AED' }}
        >
          {open ? '−' : '+'}
        </span>
      </button>
      {open && (
        <div className="px-6 pb-5 text-sm leading-relaxed border-t pt-4" style={{ color: '#64748B', borderColor: '#DDD6FE' }}>
          {a}
        </div>
      )}
    </div>
  )
}

export default function Landing() {
  const existingAccess = getAccess()

  return (
    <div style={{ backgroundColor: '#FAFAF7', minHeight: '100vh' }}>

      {/* Dev banner */}
      {DEV && (
        <div className="text-center py-2 text-xs font-semibold" style={{ backgroundColor: '#1a3a1a', color: '#4ade80', borderBottom: '1px solid #166534' }}>
          🛠 DEV MODE &nbsp;|&nbsp;
          <Link to="/unlock?pack=starter" style={{ color: '#86efac', textDecoration: 'underline' }}>Starter</Link>
          {' · '}
          <Link to="/unlock?pack=full" style={{ color: '#86efac', textDecoration: 'underline' }}>Full</Link>
          {' · '}
          <Link to="/unlock?pack=premium" style={{ color: '#86efac', textDecoration: 'underline' }}>Premium</Link>
        </div>
      )}

      {/* Navbar */}
      <nav className="sticky top-0 z-50" style={{ backgroundColor: 'rgba(250,250,247,0.94)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #E2E0DA' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <span className="text-xl font-extrabold tracking-tight" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#0F0A1E' }}>
            Place<span style={{ color: '#7C3AED' }}>Pro</span>
          </span>
          <div className="flex items-center gap-3">
            {existingAccess && (
              <Link
                to={`/unlock?pack=${existingAccess.pack}`}
                className="text-sm font-bold px-4 py-2 rounded-lg"
                style={{ backgroundColor: '#7C3AED', color: '#FFFFFF' }}
              >
                My Pack →
              </Link>
            )}
            <Link
              to="/accenture-roadmap"
              className="text-sm font-medium px-4 py-2 rounded-lg"
              style={{ color: '#7C3AED', border: '1px solid #DDD6FE', backgroundColor: '#F5F3FF' }}
            >
              Free Roadmap
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ backgroundColor: '#0F0A1E', position: 'relative', overflow: 'hidden' }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'linear-gradient(rgba(124,58,237,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.07) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none" style={{
          width: '700px', height: '400px',
          background: 'radial-gradient(ellipse at center, rgba(124,58,237,0.22) 0%, transparent 70%)',
          filter: 'blur(48px)',
        }} />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-20 pb-24 text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-8 tracking-wide"
            style={{ backgroundColor: 'rgba(124,58,237,0.15)', color: '#C4B5FD', border: '1px solid rgba(124,58,237,0.3)' }}
          >
            🇮🇳 Built for Indian Engineering Freshers · 2025–26 Drives
          </div>

          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.08] tracking-tight mb-6"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#FFFFFF' }}
          >
            Stop guessing.<br />
            <span style={{
              background: 'linear-gradient(135deg, #A78BFA 0%, #7C3AED 50%, #C4B5FD 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              Know exactly
            </span>{' '}
            what to prepare.
          </h1>

          <p className="text-lg max-w-xl mx-auto mb-4 leading-relaxed" style={{ color: '#94A3B8' }}>
            I spent a year tracking placement patterns across 7 companies — mapping every round, every repeated question, every mistake.
          </p>
          <p className="text-base max-w-lg mx-auto mb-10" style={{ color: '#475569' }}>
            This is the structured kit I wish I had when I was prepping.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/accenture-roadmap"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-bold"
              style={{ backgroundColor: '#7C3AED', color: '#FFFFFF', boxShadow: '0 0 36px rgba(124,58,237,0.45)' }}
            >
              Try Free — Accenture Roadmap →
            </Link>
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-semibold"
              style={{ border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8' }}
            >
              See all packs ↓
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-8 mt-16">
            {[
              { n: '7', sub: 'companies mapped' },
              { n: '210+', sub: 'questions across kits' },
              { n: '1 year', sub: 'of data collection' },
              { n: '7-day', sub: 'plan per company' },
            ].map(s => (
              <div key={s.sub} className="text-center">
                <div className="text-3xl font-extrabold" style={{ color: '#A78BFA' }}>{s.n}</div>
                <div className="text-xs mt-1 uppercase tracking-wider" style={{ color: '#475569' }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPANY TIERS ── */}
      <section style={{ borderBottom: '1px solid #E2E0DA' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
          <p className="text-center text-xs font-bold uppercase tracking-widest mb-8" style={{ color: '#94A3B8' }}>
            7 companies · grouped by hiring style
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: 'Mass Recruiters', companies: 'TCS · Infosys · Wipro', desc: 'Volume-first. Aptitude + TR + HR. Predictable patterns, high seat count.' },
              { label: 'Cognitive-Assessment-Heavy', companies: 'Accenture · Cognizant', desc: 'Think fast. Verbal, logical, situational — less DSA, more reasoning.' },
              { label: 'Product / DSA-Heavy', companies: 'Zoho · Freshworks', desc: '6–7 rounds. Real coding problems. Systems thinking. Different beast.' },
            ].map(tier => (
              <div key={tier.label} className="rounded-2xl p-5" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E0DA', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                <div className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#7C3AED' }}>{tier.label}</div>
                <div className="font-bold text-sm mb-2" style={{ color: '#0F0A1E' }}>{tier.companies}</div>
                <div className="text-xs leading-relaxed" style={{ color: '#64748B' }}>{tier.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE ORIGIN ── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#7C3AED' }}>The origin</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-5 leading-tight" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#0F0A1E' }}>
              I collected this over 12 months.<br />Not overnight.
            </h2>
            <p className="leading-relaxed mb-4 text-sm" style={{ color: '#64748B' }}>
              Starting early 2024, I joined 40+ placement WhatsApp groups, read through hundreds of Glassdoor interview reviews, and cross-referenced them with PrepInsta and AmbitionBox data.
            </p>
            <p className="leading-relaxed mb-4 text-sm" style={{ color: '#64748B' }}>
              The goal was simple: for each company, what are the <em style={{ color: '#0F0A1E', fontStyle: 'normal', fontWeight: 600 }}>exact</em> rounds, the <em style={{ color: '#0F0A1E', fontStyle: 'normal', fontWeight: 600 }}>exact</em> question types that repeat, and the <em style={{ color: '#0F0A1E', fontStyle: 'normal', fontWeight: 600 }}>exact</em> 7 days of prep that cover 80% of what gets asked.
            </p>
            <p className="leading-relaxed text-sm" style={{ color: '#94A3B8' }}>
              What you're getting isn't a scraped article. It's structured notes from that year — organized so you can actually use them in a week.
            </p>
          </div>

          <div className="space-y-3">
            {[
              { label: 'WhatsApp groups monitored', value: '40+', icon: '💬' },
              { label: 'Glassdoor + AmbitionBox reviews read', value: '300+', icon: '📖' },
              { label: 'Unique question patterns mapped', value: '210+', icon: '🗂️' },
              { label: 'Placement drives tracked (2024–25)', value: '12+', icon: '📅' },
              { label: 'Companies with full round breakdown', value: '7', icon: '🏢' },
            ].map(item => (
              <div
                key={item.label}
                className="flex items-center gap-4 px-5 py-4 rounded-xl"
                style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E0DA', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
              >
                <span className="text-xl flex-shrink-0">{item.icon}</span>
                <div className="flex-1 text-sm" style={{ color: '#374151' }}>{item.label}</div>
                <div className="text-base font-extrabold flex-shrink-0" style={{ color: '#7C3AED' }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT'S IN EACH KIT ── */}
      <section className="py-24" style={{ backgroundColor: '#F4F4F1', borderTop: '1px solid #E2E0DA', borderBottom: '1px solid #E2E0DA' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="mb-14">
            <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#7C3AED' }}>What you get</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#0F0A1E' }}>
              4 sections per company.<br />Everything that actually matters.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              {
                num: '01',
                title: 'Process Overview',
                desc: "Every round listed in order, how long the whole thing takes, exact eligibility cutoffs (not the generic '60%+' you see everywhere — the real ones), and current salary packages.",
              },
              {
                num: '02',
                title: 'Round-by-Round Breakdown',
                desc: "For each round: what exactly it tests, duration, section weights, and the one tip that separates people who clear it from people who don't.",
              },
              {
                num: '03',
                title: 'Top 30 Questions',
                desc: "Split into Aptitude, Technical, and HR — with answers. Not random samples. These are the questions that showed up in 3+ separate interview reports for that company. Signal, not volume.",
              },
              {
                num: '04',
                title: '7-Day Study Plan',
                desc: "Day-by-day: what to study, in what order, with which resources. Designed for someone who has one week and a job to crack. No fluff days.",
              },
            ].map(item => (
              <div
                key={item.num}
                className="rounded-2xl p-7"
                style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E0DA', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
              >
                <div className="text-5xl font-extrabold mb-4 leading-none" style={{ color: '#EDE9FE', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  {item.num}
                </div>
                <h3 className="text-base font-bold mb-2" style={{ color: '#0F0A1E', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#64748B' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="py-24" style={{ backgroundColor: '#F4F4F1', borderTop: '1px solid #E2E0DA' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="mb-14">
            <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#7C3AED' }}>Pricing</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-3 leading-tight" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#0F0A1E' }}>
              One-time. No subscription. No login.
            </h2>
            <p className="text-sm" style={{ color: '#94A3B8' }}>
              Access saved in your browser — bookmark the page to return anytime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className="relative flex flex-col rounded-2xl p-7"
                style={{
                  backgroundColor: plan.highlighted ? '#0F0A1E' : '#FFFFFF',
                  border: plan.highlighted ? '2px solid #7C3AED' : '1px solid #E2E0DA',
                  boxShadow: plan.highlighted ? '0 8px 40px rgba(124,58,237,0.28)' : '0 2px 8px rgba(0,0,0,0.04)',
                }}
              >
                {plan.tag && (
                  <div
                    className="absolute -top-3.5 left-5 px-3 py-1 rounded-full text-xs font-bold"
                    style={{
                      backgroundColor: plan.highlighted ? '#7C3AED' : '#E2E0DA',
                      color: plan.highlighted ? '#FFFFFF' : '#374151',
                    }}
                  >
                    {plan.tag}
                  </div>
                )}

                <div className="mb-5">
                  <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: plan.highlighted ? '#A78BFA' : '#94A3B8' }}>
                    {plan.name}
                  </div>
                  <div className="text-4xl font-extrabold mb-1" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: plan.highlighted ? '#FFFFFF' : '#0F0A1E' }}>
                    {plan.price}
                  </div>
                  <div className="text-xs" style={{ color: plan.highlighted ? '#475569' : '#94A3B8' }}>one-time payment</div>
                </div>

                <ul className="space-y-2 mb-4 flex-1">
                  {plan.companies.map(c => (
                    <li key={c} className="flex items-center gap-2 text-sm" style={{ color: plan.highlighted ? '#C4B5FD' : '#374151' }}>
                      <span style={{ color: '#7C3AED', fontSize: '10px' }}>▶</span> {c}
                    </li>
                  ))}
                  <li className="flex items-center gap-2 text-sm" style={{ color: plan.highlighted ? '#94A3B8' : '#64748B' }}>
                    <span style={{ color: '#7C3AED', fontSize: '10px' }}>▶</span> 7-day plan per company
                  </li>
                  <li className="flex items-center gap-2 text-sm" style={{ color: plan.highlighted ? '#94A3B8' : '#64748B' }}>
                    <span style={{ color: '#7C3AED', fontSize: '10px' }}>▶</span> Top 30 Q&A per company
                  </li>
                </ul>

                <p className="text-xs leading-relaxed mb-5 border-t pt-4 italic"
                  style={{ color: plan.highlighted ? '#475569' : '#94A3B8', borderColor: plan.highlighted ? '#1E293B' : '#F1F0EB' }}>
                  {plan.note}
                </p>

                <BuyButton
                  pack={plan.pack}
                  amountRupees={plan.amountRupees}
                  packName={plan.name}
                  className="block w-full text-center py-3.5 rounded-xl font-bold text-sm cursor-pointer"
                  style={plan.highlighted
                    ? { backgroundColor: '#7C3AED', color: '#FFFFFF' }
                    : { border: '1px solid #DDD6FE', color: '#7C3AED', backgroundColor: '#F5F3FF' }}
                >
                  {DEV ? `Preview ${plan.name} →` : `Get ${plan.name} Pack — ${plan.price} →`}
                </BuyButton>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="max-w-2xl mx-auto px-4 sm:px-6 py-24">
        <div className="mb-12">
          <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#7C3AED' }}>Questions</div>
          <h2 className="text-3xl font-extrabold" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#0F0A1E' }}>
            The ones I get asked most
          </h2>
        </div>
        <div className="space-y-2">
          {faqs.map(faq => <FaqItem key={faq.q} q={faq.q} a={faq.a} />)}
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-24">
        <div
          className="relative rounded-2xl px-8 py-16 overflow-hidden text-center"
          style={{ backgroundColor: '#0F0A1E', border: '1px solid rgba(124,58,237,0.3)' }}
        >
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center top, rgba(124,58,237,0.18) 0%, transparent 60%)' }} />
          <div className="relative">
            <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#A78BFA' }}>Start for free</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-3" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#FFFFFF' }}>
              Try the Accenture roadmap first.
            </h2>
            <p className="text-sm mb-8 max-w-sm mx-auto" style={{ color: '#64748B' }}>
              Full roadmap, no email, no login. If it helps, the paid packs are the same structure — just for all 7 companies.
            </p>
            <Link
              to="/accenture-roadmap"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-base"
              style={{ backgroundColor: '#7C3AED', color: '#FFFFFF', boxShadow: '0 0 36px rgba(124,58,237,0.4)' }}
            >
              Read the Free Accenture Roadmap →
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t py-10" style={{ borderColor: '#E2E0DA' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-lg font-extrabold" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#0F0A1E' }}>
            Place<span style={{ color: '#7C3AED' }}>Pro</span>
          </span>
          <p className="text-xs" style={{ color: '#94A3B8' }}>
            Built for Indian freshers 🇮🇳 · Questions:{' '}
            <a href="mailto:hello@placepro.in" style={{ color: '#7C3AED' }}>hello@placepro.in</a>
          </p>
          <p className="text-xs" style={{ color: '#CBD5E1' }}>© 2026 PlacePro</p>
        </div>
      </footer>
    </div>
  )
}
