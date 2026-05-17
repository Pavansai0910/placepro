import { useState, useRef } from 'react'
import { Link, useSearchParams, Navigate } from 'react-router-dom'
import { content, packAccess, companyMeta } from '../data/content'
import { hasAccess, getAccess } from '../utils/access'
import BuyButton from '../components/BuyButton'

const DEV = import.meta.env.DEV

const PACK_DETAILS = {
  starter: { label: 'Starter Pack', price: '₹99',  amount: 99,  companies: ['TCS', 'Infosys', 'Wipro'] },
  full:    { label: 'Full Pack',    price: '₹149', amount: 149, companies: ['TCS', 'Infosys', 'Wipro', 'Accenture', 'Cognizant'] },
  premium: { label: 'Premium Pack', price: '₹499', amount: 499, companies: ['All 7 companies'] },
}

// ── Colour tokens (used everywhere below) ──────────────────────────────────
const C = {
  bg:       '#FAFAF7',
  card:     '#FFFFFF',
  cardAlt:  '#F5F3FF',
  border:   '#E2E0DA',
  borderV:  '#DDD6FE',
  text:     '#0F0A1E',
  sub:      '#374151',
  muted:    '#64748B',
  faint:    '#94A3B8',
  violet:   '#7C3AED',
  violetPl: '#EDE9FE',
  ink:      '#0F0A1E',
}

// ── Accordion ──────────────────────────────────────────────────────────────
function AccordionSection({ title, children }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${C.border}` }}>
      <button
        className="w-full text-left px-5 py-4 flex justify-between items-center"
        style={{ backgroundColor: open ? C.cardAlt : C.card }}
        onClick={() => setOpen(!open)}
      >
        <span className="font-semibold text-sm" style={{ color: C.text }}>{title}</span>
        <span style={{ color: C.violet, fontSize: '18px' }}>{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div className="border-t" style={{ backgroundColor: C.bg, borderColor: C.borderV }}>
          {children}
        </div>
      )}
    </div>
  )
}

// ── Content components (screen view) ──────────────────────────────────────
function ProcessOverviewContent({ data }) {
  return (
    <div className="p-5 space-y-4">
      <div>
        <div className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: C.muted }}>Selection Rounds</div>
        <div className="space-y-2">
          {data.rounds.map((r, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                style={{ backgroundColor: C.violet, color: '#fff' }}>{i + 1}</span>
              <span className="text-sm" style={{ color: C.sub }}>{r}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { label: 'Total Duration', value: data.duration },
          { label: 'Eligibility',    value: data.eligibility },
          { label: 'Salary Package', value: data.salary },
        ].map((item) => (
          <div key={item.label} className="rounded-lg p-3" style={{ backgroundColor: C.card, border: `1px solid ${C.border}` }}>
            <div className="text-xs mb-1" style={{ color: C.faint }}>{item.label}</div>
            <div className="text-sm font-semibold" style={{ color: C.text }}>{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function RoundBreakdownContent({ rounds }) {
  return (
    <div className="p-5 space-y-4">
      {rounds.map((r, i) => (
        <div key={i} className="rounded-xl p-4" style={{ backgroundColor: C.card, border: `1px solid ${C.border}` }}>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ backgroundColor: C.violetPl, color: C.violet }}>
              Round {i + 1}
            </span>
            <h4 className="font-semibold text-sm" style={{ color: C.text }}>{r.round}</h4>
            <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: '#F4F4F1', color: C.muted }}>
              ⏱ {r.duration}
            </span>
          </div>
          <div className="mb-3">
            <div className="text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: C.faint }}>What's Tested</div>
            <p className="text-sm leading-relaxed" style={{ color: C.sub }}>{r.tests}</p>
          </div>
          <div className="rounded-lg p-3" style={{ backgroundColor: C.cardAlt, border: `1px solid ${C.borderV}` }}>
            <div className="text-xs font-bold mb-1.5" style={{ color: C.violet }}>💡 Insider Tip</div>
            <p className="text-sm leading-relaxed" style={{ color: C.sub }}>{r.tips}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function QuestionsContent({ questions }) {
  const sections = [
    { key: 'aptitude', label: 'Aptitude Questions',  color: '#2563EB' },
    { key: 'technical', label: 'Technical Questions', color: '#059669' },
    { key: 'hr',        label: 'HR Questions',        color: C.violet  },
  ]
  return (
    <div className="p-5 space-y-6">
      {sections.map(({ key, label, color }) => (
        <div key={key}>
          <div className="font-semibold text-sm mb-3 flex items-center gap-2" style={{ color: C.text }}>
            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
            {label}
          </div>
          <ol className="space-y-2 list-decimal list-inside">
            {questions[key].map((q, i) => (
              <li key={i} className="text-sm leading-relaxed pl-1" style={{ color: C.sub }}>{q}</li>
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
        <div key={day.day} className="rounded-xl p-4" style={{ backgroundColor: C.card, border: `1px solid ${C.border}` }}>
          <div className="flex items-center gap-3 mb-3">
            <span className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
              style={{ backgroundColor: C.ink, color: '#fff' }}>
              D{day.day}
            </span>
            <h4 className="font-semibold text-sm" style={{ color: C.text }}>{day.focus}</h4>
          </div>
          <ul className="space-y-1.5 mb-3">
            {day.topics.map((t, i) => (
              <li key={i} className="flex items-start gap-2 text-sm" style={{ color: C.sub }}>
                <span style={{ color: C.violet }} className="flex-shrink-0 mt-0.5">→</span>
                {t}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-2">
            {day.resources.map((r, i) => (
              <span key={i} className="text-xs px-2 py-1 rounded-full"
                style={{ backgroundColor: C.violetPl, color: C.violet }}>
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
      <AccordionSection title="📅 7-Day Study Plan">
        <SevenDayPlanContent plan={data.sevenDayPlan} />
      </AccordionSection>
    </div>
  )
}

// ── Flat (non-accordion) view used only for PDF generation ─────────────────
function FlatCompanyContent({ companyId }) {
  const data = content[companyId]?.full
  const meta = companyMeta[companyId]
  if (!data) return null
  const sections = [
    { key: 'aptitude',  label: 'Aptitude Questions',  color: '#2563EB' },
    { key: 'technical', label: 'Technical Questions', color: '#059669' },
    { key: 'hr',        label: 'HR Questions',         color: '#7C3AED' },
  ]
  return (
    <div style={{ fontFamily: 'Inter, sans-serif', color: '#0F0A1E', padding: '32px', maxWidth: '800px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '4px' }}>
        {meta.emoji} {meta.fullName}
      </h1>
      <p style={{ fontSize: '12px', color: '#64748B', marginBottom: '32px' }}>PlacePro · Full Placement Prep Kit · placepro.vercel.app</p>

      {/* Process Overview */}
      <h2 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '12px', borderBottom: '2px solid #7C3AED', paddingBottom: '6px' }}>Process Overview</h2>
      {data.processOverview.rounds.map((r, i) => (
        <p key={i} style={{ fontSize: '13px', marginBottom: '6px', color: '#374151' }}>
          <strong style={{ color: '#7C3AED' }}>{i + 1}.</strong> {r}
        </p>
      ))}
      <div style={{ display: 'flex', gap: '16px', marginTop: '12px', marginBottom: '32px' }}>
        {[
          { l: 'Duration', v: data.processOverview.duration },
          { l: 'Eligibility', v: data.processOverview.eligibility },
          { l: 'Salary', v: data.processOverview.salary },
        ].map(x => (
          <div key={x.l} style={{ flex: 1, backgroundColor: '#F5F3FF', padding: '10px', borderRadius: '8px' }}>
            <div style={{ fontSize: '10px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{x.l}</div>
            <div style={{ fontSize: '12px', fontWeight: 600, marginTop: '2px', color: '#0F0A1E' }}>{x.v}</div>
          </div>
        ))}
      </div>

      {/* Round Breakdown */}
      <h2 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '12px', borderBottom: '2px solid #7C3AED', paddingBottom: '6px' }}>Round-by-Round Breakdown</h2>
      {data.roundBreakdown.map((r, i) => (
        <div key={i} style={{ marginBottom: '20px', backgroundColor: '#FAFAF7', padding: '14px', borderRadius: '10px', border: '1px solid #E2E0DA' }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ backgroundColor: '#EDE9FE', color: '#7C3AED', fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px' }}>Round {i + 1}</span>
            <span style={{ fontSize: '13px', fontWeight: 700 }}>{r.round}</span>
            <span style={{ fontSize: '11px', color: '#94A3B8' }}>⏱ {r.duration}</span>
          </div>
          <p style={{ fontSize: '12px', color: '#374151', marginBottom: '8px', lineHeight: 1.6 }}><strong>Tests:</strong> {r.tests}</p>
          <div style={{ backgroundColor: '#F5F3FF', padding: '10px', borderRadius: '8px', borderLeft: '3px solid #7C3AED' }}>
            <p style={{ fontSize: '12px', color: '#374151', margin: 0, lineHeight: 1.6 }}><strong style={{ color: '#7C3AED' }}>Tip:</strong> {r.tips}</p>
          </div>
        </div>
      ))}

      {/* Top 30 Questions */}
      <h2 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '12px', borderBottom: '2px solid #7C3AED', paddingBottom: '6px' }}>Top 30 Questions</h2>
      {sections.map(({ key, label, color }) => (
        <div key={key} style={{ marginBottom: '20px' }}>
          <h3 style={{ fontSize: '13px', fontWeight: 700, color, marginBottom: '8px' }}>{label}</h3>
          <ol style={{ margin: 0, paddingLeft: '20px' }}>
            {data.top30Questions[key].map((q, i) => (
              <li key={i} style={{ fontSize: '12px', color: '#374151', marginBottom: '5px', lineHeight: 1.5 }}>{q}</li>
            ))}
          </ol>
        </div>
      ))}

      {/* 7-Day Plan */}
      <h2 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '12px', borderBottom: '2px solid #7C3AED', paddingBottom: '6px' }}>7-Day Study Plan</h2>
      {data.sevenDayPlan.map((day) => (
        <div key={day.day} style={{ marginBottom: '16px', backgroundColor: '#FAFAF7', padding: '12px', borderRadius: '10px', border: '1px solid #E2E0DA' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <span style={{ backgroundColor: '#0F0A1E', color: '#fff', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, flexShrink: 0 }}>D{day.day}</span>
            <span style={{ fontSize: '13px', fontWeight: 700 }}>{day.focus}</span>
          </div>
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            {day.topics.map((t, i) => (
              <li key={i} style={{ fontSize: '12px', color: '#374151', marginBottom: '3px' }}>{t}</li>
            ))}
          </ul>
          <div style={{ marginTop: '8px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {day.resources.map((r, i) => (
              <span key={i} style={{ backgroundColor: '#EDE9FE', color: '#7C3AED', fontSize: '10px', padding: '2px 8px', borderRadius: '20px' }}>{r}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

// ── Navbar ─────────────────────────────────────────────────────────────────
function Navbar({ packLabel, packPrice }) {
  return (
    <nav className="sticky top-0 z-50" style={{ backgroundColor: 'rgba(250,250,247,0.94)', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${C.border}` }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: C.text }}>
          Place<span style={{ color: C.violet }}>Pro</span>
        </Link>
        {packLabel && (
          <span className="text-xs px-3 py-1 rounded-full font-medium"
            style={{ backgroundColor: C.cardAlt, color: C.violet, border: `1px solid ${C.borderV}` }}>
            {packLabel} — {packPrice}
          </span>
        )}
      </div>
    </nav>
  )
}

// ── Purchase prompt (locked state) ─────────────────────────────────────────
function PurchasePrompt({ pack }) {
  const details = PACK_DETAILS[pack]
  return (
    <div style={{ backgroundColor: C.bg, minHeight: '100vh' }}>
      <Navbar />
      <div className="max-w-lg mx-auto px-4 py-24 text-center">
        <div className="text-5xl mb-6">🔒</div>
        <h1 className="text-2xl font-extrabold mb-3" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: C.text }}>
          This content is locked
        </h1>
        <p className="mb-2 text-sm" style={{ color: C.muted }}>
          You need the <strong style={{ color: C.text }}>{details.label}</strong> to access this content.
        </p>
        <p className="text-sm mb-8" style={{ color: C.faint }}>Includes: {details.companies.join(', ')}</p>
        <BuyButton
          pack={pack}
          amountRupees={details.amount}
          packName={details.label}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-base cursor-pointer"
          style={{ backgroundColor: C.violet, color: '#fff' }}
        >
          {DEV ? 'Preview Content →' : `Buy ${details.label} — ${details.price} →`}
        </BuyButton>
        <div className="mt-6">
          <Link to="/" className="text-sm" style={{ color: C.faint }}>← Back to home</Link>
        </div>
      </div>
    </div>
  )
}

// ── Main page ──────────────────────────────────────────────────────────────
export default function Unlock() {
  const [searchParams] = useSearchParams()
  const pack = searchParams.get('pack')

  if (!pack || !packAccess[pack]) return <Navigate to="/" replace />
  if (!DEV && !hasAccess(pack)) return <PurchasePrompt pack={pack} />

  const access = DEV ? { pack } : getAccess()
  const companies = packAccess[pack]
  const [activeCompany, setActiveCompany] = useState(companies[0])
  const [downloading, setDownloading] = useState(false)
  const details = PACK_DETAILS[pack]
  const pdfRef = useRef(null)

  async function handleDownload() {
    setDownloading(true)
    const html2pdf = (await import('html2pdf.js')).default
    const el = pdfRef.current
    const meta = companyMeta[activeCompany]
    await html2pdf().set({
      margin: [10, 10, 10, 10],
      filename: `PlacePro-${meta.name}-PrepKit.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
    }).from(el).save()
    setDownloading(false)
  }

  return (
    <div style={{ backgroundColor: C.bg, minHeight: '100vh' }}>
      <Navbar packLabel={details.label} packPrice={details.price} />

      {/* Access notice */}
      <div className="py-2 px-4 text-center text-xs" style={{ backgroundColor: C.cardAlt, borderBottom: `1px solid ${C.borderV}`, color: C.violet }}>
        🔖 Your access is saved in this browser. <strong>Bookmark this page</strong> to return anytime — no login needed.
        {access?.paymentId && <span className="ml-2" style={{ color: '#A78BFA' }}>Payment ID: {access.paymentId}</span>}
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Header row */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold mb-1" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: C.text }}>
              Your Placement Kit
            </h1>
            <p className="text-sm" style={{ color: C.muted }}>
              {companies.length} compan{companies.length > 1 ? 'ies' : 'y'} unlocked · Select a company below
            </p>
          </div>
          <button
            className="self-start sm:self-auto flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold"
            style={{ backgroundColor: C.ink, color: '#fff', opacity: downloading ? 0.6 : 1, cursor: downloading ? 'not-allowed' : 'pointer' }}
            onClick={handleDownload}
            disabled={downloading}
          >
            {downloading ? '⏳ Generating PDF…' : '↓ Download as PDF'}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Company sidebar */}
          <aside className="lg:w-56 flex-shrink-0">
            <div className="flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0">
              {companies.map((id) => {
                const meta = companyMeta[id]
                const isActive = activeCompany === id
                return (
                  <button
                    key={id}
                    onClick={() => setActiveCompany(id)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-left whitespace-nowrap lg:whitespace-normal flex-shrink-0 lg:flex-shrink w-full"
                    style={{
                      backgroundColor: isActive ? C.cardAlt : C.card,
                      border: `1px solid ${isActive ? C.borderV : C.border}`,
                    }}
                  >
                    <span className="text-xl">{meta.emoji}</span>
                    <div>
                      <div className="font-semibold text-sm" style={{ color: isActive ? C.violet : C.text }}>{meta.name}</div>
                      <div className="text-xs" style={{ color: C.faint }}>{meta.fullName.split(' ').slice(0, 2).join(' ')}</div>
                    </div>
                  </button>
                )
              })}
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0">
            <div className="mb-6 flex items-center gap-3">
              <span className="text-3xl">{companyMeta[activeCompany].emoji}</span>
              <div>
                <h2 className="text-xl font-bold" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: C.text }}>
                  {companyMeta[activeCompany].fullName}
                </h2>
                <p className="text-xs" style={{ color: C.faint }}>Full placement prep kit · 4 sections</p>
              </div>
            </div>
            <CompanyContent companyId={activeCompany} />
          </main>
        </div>
      </div>

      {/* Hidden flat content used only for PDF generation */}
      <div style={{ position: 'absolute', left: '-9999px', top: 0, pointerEvents: 'none' }} aria-hidden="true">
        <div ref={pdfRef}>
          <FlatCompanyContent companyId={activeCompany} />
        </div>
      </div>

      <footer className="border-t py-8 mt-12" style={{ borderColor: C.border }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs" style={{ color: C.faint }}>© 2026 PlacePro. Built for Indian freshers 🇮🇳</p>
        </div>
      </footer>
    </div>
  )
}
