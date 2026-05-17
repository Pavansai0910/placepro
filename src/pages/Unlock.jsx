import { useState } from 'react'
import { Link, useSearchParams, Navigate } from 'react-router-dom'
import { content, packAccess, companyMeta } from '../data/content'
import { hasAccess, getAccess } from '../utils/access'
import BuyButton from '../components/BuyButton'

const DEV = import.meta.env.DEV

const PACK_DETAILS = {
  starter: { label: 'Starter Pack', price: '₹199', amount: 199, companies: ['TCS', 'Infosys', 'Wipro'] },
  full:    { label: 'Full Pack',    price: '₹299', amount: 299, companies: ['TCS', 'Infosys', 'Wipro', 'Accenture', 'Cognizant'] },
  premium: { label: 'Premium Pack', price: '₹499', amount: 499, companies: ['All 7 companies'] },
}

function AccordionSection({ title, children }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
      <button
        className="w-full text-left px-5 py-4 flex justify-between items-center transition-colors"
        style={{ backgroundColor: open ? 'rgba(245,158,11,0.08)' : '#1E293B' }}
        onClick={() => setOpen(!open)}
      >
        <span className="font-semibold text-white text-sm">{title}</span>
        <span style={{ color: '#F59E0B', fontSize: '18px' }}>{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div className="border-t border-slate-700" style={{ backgroundColor: 'rgba(30,41,59,0.5)' }}>
          {children}
        </div>
      )}
    </div>
  )
}

function ProcessOverviewContent({ data }) {
  return (
    <div className="p-5 space-y-4">
      <div>
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Selection Rounds</div>
        <div className="space-y-2">
          {data.rounds.map((r, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                style={{ backgroundColor: '#F59E0B', color: '#0A0F1E' }}>{i + 1}</span>
              <span className="text-slate-300 text-sm">{r}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { label: 'Total Duration', value: data.duration },
          { label: 'Eligibility', value: data.eligibility },
          { label: 'Salary Package', value: data.salary },
        ].map((item) => (
          <div key={item.label} className="rounded-lg p-3" style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="text-xs text-slate-500 mb-1">{item.label}</div>
            <div className="text-sm text-white font-medium">{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function RoundBreakdownContent({ rounds }) {
  return (
    <div className="p-5 space-y-5">
      {rounds.map((r, i) => (
        <div key={i} className="rounded-lg p-4" style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ backgroundColor: 'rgba(245,158,11,0.2)', color: '#F59E0B' }}>
              Round {i + 1}
            </span>
            <h4 className="font-semibold text-white text-sm">{r.round}</h4>
            <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.06)', color: '#94a3b8' }}>
              ⏱ {r.duration}
            </span>
          </div>
          <div className="mb-3">
            <div className="text-xs font-semibold text-slate-500 mb-1.5">What's Tested</div>
            <p className="text-slate-300 text-sm leading-relaxed">{r.tests}</p>
          </div>
          <div className="rounded-lg p-3" style={{ backgroundColor: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.15)' }}>
            <div className="text-xs font-semibold mb-1.5" style={{ color: '#F59E0B' }}>💡 Insider Tip</div>
            <p className="text-slate-300 text-sm leading-relaxed">{r.tips}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function QuestionsContent({ questions }) {
  const sections = [
    { key: 'aptitude', label: 'Aptitude Questions', color: '#3B82F6' },
    { key: 'technical', label: 'Technical Questions', color: '#10B981' },
    { key: 'hr', label: 'HR Questions', color: '#8B5CF6' },
  ]
  return (
    <div className="p-5 space-y-6">
      {sections.map(({ key, label, color }) => (
        <div key={key}>
          <div className="font-semibold text-sm mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: color }}></span>
            {label}
          </div>
          <ol className="space-y-2 list-decimal list-inside">
            {questions[key].map((q, i) => (
              <li key={i} className="text-slate-300 text-sm leading-relaxed pl-1">
                {q}
              </li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  )
}

function SevenDayPlanContent({ plan }) {
  return (
    <div className="p-5 space-y-4">
      {plan.map((day) => (
        <div key={day.day} className="rounded-lg p-4" style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex items-center gap-3 mb-3">
            <span className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
              style={{ backgroundColor: '#F59E0B', color: '#0A0F1E' }}>
              D{day.day}
            </span>
            <h4 className="font-semibold text-white text-sm">{day.focus}</h4>
          </div>
          <ul className="space-y-1.5 mb-3">
            {day.topics.map((t, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                <span style={{ color: '#F59E0B' }} className="flex-shrink-0 mt-0.5">→</span>
                {t}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-2">
            {day.resources.map((r, i) => (
              <span key={i} className="text-xs px-2 py-1 rounded-full"
                style={{ backgroundColor: 'rgba(255,255,255,0.06)', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.08)' }}>
                {r}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function CompanyContent({ companyId }) {
  const data = content[companyId]?.full
  if (!data) return null
  return (
    <div className="space-y-3">
      <AccordionSection title="📋 Process Overview">
        <ProcessOverviewContent data={data.processOverview} />
      </AccordionSection>
      <AccordionSection title="🔍 Round-by-Round Breakdown">
        <RoundBreakdownContent rounds={data.roundBreakdown} />
      </AccordionSection>
      <AccordionSection title="❓ Top 30 Questions (Aptitude + Technical + HR)">
        <QuestionsContent questions={data.top30Questions} />
      </AccordionSection>
      <AccordionSection title="📅 7-Day Cheat Sheet">
        <SevenDayPlanContent plan={data.sevenDayPlan} />
      </AccordionSection>
    </div>
  )
}

function Navbar({ packLabel, packPrice }) {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800 backdrop-blur-md" style={{ backgroundColor: 'rgba(10,15,30,0.9)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          Place<span style={{ color: '#F59E0B' }}>Pro</span>
        </Link>
        {packLabel && (
          <span className="text-xs px-3 py-1 rounded-full font-medium"
            style={{ backgroundColor: 'rgba(245,158,11,0.15)', color: '#F59E0B', border: '1px solid rgba(245,158,11,0.3)' }}>
            {packLabel} — {packPrice}
          </span>
        )}
      </div>
    </nav>
  )
}

function PurchasePrompt({ pack }) {
  const details = PACK_DETAILS[pack]
  return (
    <div style={{ backgroundColor: '#0A0F1E', minHeight: '100vh' }}>
      <Navbar />
      <div className="max-w-lg mx-auto px-4 py-24 text-center">
        <div className="text-5xl mb-6">🔒</div>
        <h1 className="text-2xl font-extrabold mb-3" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          This content is locked
        </h1>
        <p className="text-slate-400 mb-2">
          You need the <strong style={{ color: '#fff' }}>{details.label}</strong> to access this content.
        </p>
        <p className="text-slate-500 text-sm mb-8">
          Includes: {details.companies.join(', ')}
        </p>
        <BuyButton
          pack={pack}
          amountRupees={details.amount}
          packName={details.label}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-base cursor-pointer transition-all"
          style={{ backgroundColor: '#F59E0B', color: '#0A0F1E' }}
        >
          {DEV ? 'Preview Content →' : `Buy ${details.label} — ${details.price} →`}
        </BuyButton>
        <div className="mt-6">
          <Link to="/" className="text-slate-500 text-sm hover:text-slate-300 transition-colors">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function Unlock() {
  const [searchParams] = useSearchParams()
  const pack = searchParams.get('pack')

  if (!pack || !packAccess[pack]) {
    return <Navigate to="/" replace />
  }

  // Gate: must have paid for this pack (or higher) — DEV bypasses
  if (!DEV && !hasAccess(pack)) {
    return <PurchasePrompt pack={pack} />
  }

  const access = DEV ? { pack } : getAccess()
  const companies = packAccess[pack]
  const [activeCompany, setActiveCompany] = useState(companies[0])
  const details = PACK_DETAILS[pack]

  return (
    <div style={{ backgroundColor: '#0A0F1E', minHeight: '100vh' }}>
      <Navbar packLabel={details.label} packPrice={details.price} />

      {/* Browser-storage notice */}
      <div className="border-b border-slate-800 py-2 px-4 text-center text-xs text-slate-400" style={{ backgroundColor: 'rgba(245,158,11,0.05)' }}>
        🔖 Your access is saved in this browser.{' '}
        <strong className="text-slate-300">Bookmark this page</strong> to come back anytime — no login needed.
        {access?.paymentId && (
          <span className="ml-2 text-slate-600">Payment ID: {access.paymentId}</span>
        )}
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold mb-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Your Placement Kit
          </h1>
          <p className="text-slate-400 text-sm">
            {companies.length} compan{companies.length > 1 ? 'ies' : 'y'} unlocked · Select a company to view its full prep kit
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar — Company Tabs */}
          <aside className="lg:w-56 flex-shrink-0">
            <div className="flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 lg:overflow-visible">
              {companies.map((id) => {
                const meta = companyMeta[id]
                const isActive = activeCompany === id
                return (
                  <button
                    key={id}
                    onClick={() => setActiveCompany(id)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all whitespace-nowrap lg:whitespace-normal flex-shrink-0 lg:flex-shrink w-full"
                    style={{
                      backgroundColor: isActive ? 'rgba(245,158,11,0.12)' : '#1E293B',
                      border: isActive ? '1px solid rgba(245,158,11,0.4)' : '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    <span className="text-xl">{meta.emoji}</span>
                    <div className="text-left">
                      <div className="font-semibold text-sm" style={{ color: isActive ? '#F59E0B' : '#ffffff' }}>
                        {meta.name}
                      </div>
                      <div className="text-xs" style={{ color: '#475569' }}>
                        {meta.fullName.split(' ').slice(0, 2).join(' ')}
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <div className="mb-6 flex items-center gap-3">
              <span className="text-3xl">{companyMeta[activeCompany].emoji}</span>
              <div>
                <h2 className="text-xl font-bold" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  {companyMeta[activeCompany].fullName}
                </h2>
                <p className="text-slate-400 text-xs">Full placement prep kit · 4 sections</p>
              </div>
            </div>
            <CompanyContent companyId={activeCompany} />
          </main>
        </div>
      </div>

      <footer className="border-t border-slate-800 py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-slate-600 text-xs">© 2025 PlacePro. Built for Indian freshers 🇮🇳</p>
        </div>
      </footer>
    </div>
  )
}
