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
    note: 'Adds Accenture & Cognizant — both love cognitive assessments over pure DSA.',
    highlighted: true,
  },
  {
    name: 'Premium',
    pack: 'premium',
    price: '₹499',
    amountRupees: 499,
    tag: 'Product Companies',
    companies: ['All 5 above', 'Zoho', 'Freshworks'],
    note: 'Zoho and Freshworks hire differently. 6-7 rounds, strong C/DSA focus. Covered separately.',
    highlighted: false,
  },
]

const faqs = [
  {
    q: 'Is this useful if I\'m applying off-campus?',
    a: 'Yes — most of the interview data I collected was from off-campus candidates in WhatsApp groups and LinkedIn posts. The question patterns don\'t change whether you\'re on-campus or off.',
  },
  {
    q: 'How is this different from PrepInsta or GeeksforGeeks?',
    a: 'Those sites give you massive question banks with no structure. This gives you the exact pattern for one specific company — what round comes first, how long it takes, what the real cutoffs are, and a 7-day plan so you\'re not guessing what to study.',
  },
  {
    q: 'What format is the content? Do I need to download anything?',
    a: 'Everything is in-browser — accordion layout per company. No PDFs, no downloads, no app. Works on mobile too. Pay once, access anytime on the same browser.',
  },
  {
    q: 'Is the content updated for 2025-26 drives?',
    a: 'Yes. I\'ve been tracking placement patterns since early 2024. The question banks, round structures, and salary ranges reflect the most recent drives — not 2020 data.',
  },
  {
    q: 'What if I\'m from a tier-3 college with a low CGPA?',
    a: 'I\'ve included the exact eligibility cutoffs per company (some are 60%, some are stricter). I\'ve also noted which companies do off-campus hiring without GPA filters. That information is in the Process Overview for each company.',
  },
]

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      className="rounded-2xl overflow-hidden transition-all"
      style={{ border: `1px solid ${open ? 'rgba(245,158,11,0.3)' : 'rgba(255,255,255,0.07)'}`, backgroundColor: open ? 'rgba(245,158,11,0.04)' : 'transparent' }}
    >
      <button
        className="w-full text-left px-6 py-5 flex justify-between items-center gap-4"
        onClick={() => setOpen(!open)}
      >
        <span className="font-semibold text-white text-sm leading-snug">{q}</span>
        <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold transition-all"
          style={{ backgroundColor: open ? '#F59E0B' : 'rgba(245,158,11,0.15)', color: open ? '#0A0F1E' : '#F59E0B' }}>
          {open ? '−' : '+'}
        </span>
      </button>
      {open && (
        <div className="px-6 pb-5 text-slate-300 text-sm leading-relaxed border-t border-slate-800 pt-4">
          {a}
        </div>
      )}
    </div>
  )
}

const dotGrid = {
  backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)',
  backgroundSize: '28px 28px',
}

export default function Landing() {
  const existingAccess = getAccess()

  return (
    <div style={{ backgroundColor: '#0A0F1E', minHeight: '100vh' }}>

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
      <nav className="sticky top-0 z-50 border-b border-slate-800 backdrop-blur-md" style={{ backgroundColor: 'rgba(10,15,30,0.92)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <span className="text-2xl font-extrabold tracking-tight" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Place<span style={{ color: '#F59E0B' }}>Pro</span>
          </span>
          <div className="flex items-center gap-3">
            {existingAccess && (
              <Link to={`/unlock?pack=${existingAccess.pack}`}
                className="text-sm font-bold px-4 py-2 rounded-lg"
                style={{ backgroundColor: '#F59E0B', color: '#0A0F1E' }}>
                My Pack →
              </Link>
            )}
            <Link to="/accenture-roadmap"
              className="text-sm font-medium px-4 py-2 rounded-lg"
              style={{ color: '#F59E0B', border: '1px solid rgba(245,158,11,0.4)' }}>
              Free Roadmap
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden" style={{ ...dotGrid }}>
        {/* Amber glow blob */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(245,158,11,0.12) 0%, transparent 70%)', filter: 'blur(40px)' }} />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-28 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-8 tracking-wide uppercase"
            style={{ backgroundColor: 'rgba(245,158,11,0.12)', color: '#F59E0B', border: '1px solid rgba(245,158,11,0.25)' }}>
            🇮🇳 Built for Indian Engineering Freshers · 2025–26 Drives
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.08] tracking-tight mb-6"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Stop guessing.<br />
            <span style={{ background: 'linear-gradient(135deg, #F59E0B 0%, #FDE68A 60%, #F59E0B 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Know exactly
            </span>{' '}
            what to prepare.
          </h1>

          <p className="text-lg text-slate-400 max-w-xl mx-auto mb-4 leading-relaxed">
            I spent a year tracking placement patterns across 7 companies — mapping every round, every repeated question, every mistake.
          </p>
          <p className="text-base text-slate-500 max-w-lg mx-auto mb-10">
            This is the structured kit I wish I had when I was prepping.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/accenture-roadmap"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-bold transition-all"
              style={{ backgroundColor: '#F59E0B', color: '#0A0F1E', boxShadow: '0 0 24px rgba(245,158,11,0.3)' }}>
              Try Free — Accenture Roadmap →
            </Link>
            <a href="#pricing"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-semibold transition-all"
              style={{ border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8' }}>
              See all packs ↓
            </a>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap justify-center gap-8 mt-16">
            {[
              { n: '7', sub: 'companies mapped' },
              { n: '210+', sub: 'questions per kit' },
              { n: '1 year', sub: 'of data collection' },
              { n: '7-day', sub: 'plan per company' },
            ].map(s => (
              <div key={s.sub} className="text-center">
                <div className="text-3xl font-extrabold" style={{ color: '#F59E0B' }}>{s.n}</div>
                <div className="text-xs text-slate-500 mt-1 uppercase tracking-wider">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW I BUILT THIS ── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#F59E0B' }}>The origin</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-5 leading-tight" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              I collected this over 12 months.<br />Not overnight.
            </h2>
            <p className="text-slate-400 leading-relaxed mb-4">
              Starting early 2024, I joined 40+ placement WhatsApp groups, read through hundreds of Glassdoor interview reviews, and cross-referenced them with PrepInsta and AmbitionBox data.
            </p>
            <p className="text-slate-400 leading-relaxed mb-4">
              The goal was simple: for each company, what are the <em className="text-slate-300">exact</em> rounds, the <em className="text-slate-300">exact</em> question types that repeat, and the <em className="text-slate-300">exact</em> 7 days of prep that cover 80% of what gets asked.
            </p>
            <p className="text-slate-500 leading-relaxed text-sm">
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
              <div key={item.label}
                className="flex items-center gap-4 px-5 py-4 rounded-xl"
                style={{ backgroundColor: '#1E293B', border: '1px solid rgba(255,255,255,0.06)' }}>
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div className="flex-1 text-sm text-slate-300">{item.label}</div>
                <div className="text-lg font-bold flex-shrink-0" style={{ color: '#F59E0B' }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT'S IN EACH KIT ── */}
      <section className="py-24" style={{ ...dotGrid, borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="mb-14">
            <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#F59E0B' }}>What you get</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              4 sections per company.<br />Everything that actually matters.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              {
                num: '01',
                title: 'Process Overview',
                desc: 'Every round listed in order, how long the whole thing takes, exact eligibility cutoffs (not the generic "60%+" you see everywhere — the real ones), and current salary packages.',
              },
              {
                num: '02',
                title: 'Round-by-Round Breakdown',
                desc: 'For each round: what exactly it tests, duration, section weights, and the one tip that separates people who clear it from people who don\'t.',
              },
              {
                num: '03',
                title: 'Top 30 Questions',
                desc: 'Split into Aptitude, Technical, and HR — with answers. These aren\'t random samples. These are the ones that showed up in 3+ separate interview reports for that company.',
              },
              {
                num: '04',
                title: '7-Day Study Plan',
                desc: 'Day-by-day: what to study, in what order, with which resources. Designed for someone who has one week and a job to crack. No fluff days.',
              },
            ].map(item => (
              <div key={item.num}
                className="rounded-2xl p-6 group transition-all card-hover"
                style={{ backgroundColor: '#1E293B', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="text-4xl font-extrabold mb-4 leading-none" style={{ color: 'rgba(245,158,11,0.2)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  {item.num}
                </div>
                <h3 className="text-base font-bold text-white mb-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="max-w-5xl mx-auto px-4 sm:px-6 py-24">
        <div className="mb-14">
          <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#F59E0B' }}>Pricing</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-3 leading-tight" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            One-time. No subscription. No login.
          </h2>
          <p className="text-slate-500 text-sm">Access saved in your browser. Yours to keep.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {pricingPlans.map((plan) => (
            <div key={plan.name} className="relative flex flex-col rounded-2xl p-6 transition-all card-hover"
              style={{
                backgroundColor: plan.highlighted ? 'rgba(245,158,11,0.06)' : '#111827',
                border: plan.highlighted ? '1.5px solid rgba(245,158,11,0.5)' : '1px solid rgba(255,255,255,0.07)',
              }}>
              {plan.tag && (
                <div className="absolute -top-3 left-5 px-3 py-1 rounded-full text-xs font-bold"
                  style={{ backgroundColor: plan.highlighted ? '#F59E0B' : 'rgba(255,255,255,0.1)', color: plan.highlighted ? '#0A0F1E' : '#fff' }}>
                  {plan.tag}
                </div>
              )}

              <div className="mb-5">
                <div className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">{plan.name}</div>
                <div className="text-4xl font-extrabold mb-1" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: plan.highlighted ? '#F59E0B' : '#fff' }}>
                  {plan.price}
                </div>
                <div className="text-slate-600 text-xs">one-time payment</div>
              </div>

              <ul className="space-y-2 mb-4 flex-1">
                {plan.companies.map(c => (
                  <li key={c} className="flex items-center gap-2 text-sm" style={{ color: '#cbd5e1' }}>
                    <span style={{ color: '#F59E0B', fontSize: '10px' }}>▶</span> {c}
                  </li>
                ))}
                <li className="flex items-center gap-2 text-sm text-slate-400">
                  <span style={{ color: '#F59E0B', fontSize: '10px' }}>▶</span> 7-day plan per company
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-400">
                  <span style={{ color: '#F59E0B', fontSize: '10px' }}>▶</span> Top 30 Q&A per company
                </li>
              </ul>

              <p className="text-slate-600 text-xs leading-relaxed mb-5 italic border-t border-slate-800 pt-4">{plan.note}</p>

              <BuyButton
                pack={plan.pack}
                amountRupees={plan.amountRupees}
                packName={plan.name}
                className="block w-full text-center py-3 rounded-xl font-bold text-sm transition-all cursor-pointer"
                style={plan.highlighted
                  ? { backgroundColor: '#F59E0B', color: '#0A0F1E' }
                  : { border: '1px solid rgba(245,158,11,0.35)', color: '#F59E0B', backgroundColor: 'transparent' }}
              >
                {DEV ? 'Preview →' : 'Get Access →'}
              </BuyButton>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="max-w-2xl mx-auto px-4 sm:px-6 py-24">
        <div className="mb-12">
          <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#F59E0B' }}>Questions</div>
          <h2 className="text-3xl font-extrabold" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            The ones I get asked most
          </h2>
        </div>
        <div className="space-y-2">
          {faqs.map(faq => <FaqItem key={faq.q} q={faq.q} a={faq.a} />)}
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-24">
        <div className="relative rounded-2xl px-8 py-14 overflow-hidden text-center"
          style={{ backgroundColor: '#111827', border: '1px solid rgba(245,158,11,0.2)' }}>
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center top, rgba(245,158,11,0.08) 0%, transparent 60%)' }} />
          <div className="relative">
            <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#F59E0B' }}>Start for free</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-3" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Try the Accenture roadmap first.
            </h2>
            <p className="text-slate-400 text-sm mb-8 max-w-sm mx-auto">
              Full roadmap, no email, no login. If it helps, the paid packs are the same structure — just for all 7 companies.
            </p>
            <Link to="/accenture-roadmap"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-base transition-all"
              style={{ backgroundColor: '#F59E0B', color: '#0A0F1E', boxShadow: '0 0 24px rgba(245,158,11,0.25)' }}>
              Read the Free Accenture Roadmap →
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t py-10" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-lg font-extrabold" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Place<span style={{ color: '#F59E0B' }}>Pro</span>
          </span>
          <p className="text-slate-600 text-xs">Built for Indian freshers 🇮🇳 · Questions: <a href="mailto:hello@placepro.in" style={{ color: '#F59E0B' }}>hello@placepro.in</a></p>
          <p className="text-slate-700 text-xs">© 2025 PlacePro</p>
        </div>
      </footer>
    </div>
  )
}
