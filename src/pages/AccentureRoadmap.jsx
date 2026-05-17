import { useState } from 'react'
import { Link } from 'react-router-dom'
import { content } from '../data/content'
import BuyButton from '../components/BuyButton'

const DEV = import.meta.env.DEV
const roadmap = content.accenture.roadmap

const ROUND_COLORS = ['#7C3AED', '#2563EB', '#059669', '#DC2626']

export default function AccentureRoadmap() {
  const [openDay, setOpenDay] = useState(null)
  const [openHR, setOpenHR] = useState(null)

  return (
    <div style={{ backgroundColor: '#FAFAF7', minHeight: '100vh' }}>

      {/* Navbar */}
      <nav className="sticky top-0 z-50" style={{ backgroundColor: 'rgba(250,250,247,0.94)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #E2E0DA' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link to="/" className="text-xl font-extrabold" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#0F0A1E' }}>
            Place<span style={{ color: '#7C3AED' }}>Pro</span>
          </Link>
          <a
            href="#pricing-cta"
            className="text-sm font-bold px-4 py-2 rounded-lg"
            style={{ backgroundColor: '#7C3AED', color: '#FFFFFF' }}
          >
            Get Full Pack
          </a>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 sm:px-6">

        {/* ── HERO ── */}
        <div className="pt-12 pb-10 border-b" style={{ borderColor: '#E2E0DA' }}>
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-5"
            style={{ backgroundColor: '#F5F3FF', color: '#7C3AED', border: '1px solid #DDD6FE' }}
          >
            Free · No login · No email gate
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#0F0A1E' }}>
            Accenture ASE.<br />
            <span style={{ color: '#7C3AED' }}>4 rounds.</span>{' '}
            <span style={{ color: '#64748B', fontWeight: 500 }}>7 days.</span>
          </h1>
          <p className="text-base leading-relaxed max-w-xl" style={{ color: '#64748B' }}>
            Most candidates fail at Round 1 because they don't know what's actually in it. This page changes that — exact rounds, what each tests, and a day-by-day plan.
          </p>
        </div>

        {/* ── THE 4 ROUNDS ── */}
        <section className="py-10 border-b" style={{ borderColor: '#E2E0DA' }}>
          <p className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: '#94A3B8' }}>The process</p>
          <div className="space-y-3">
            {roadmap.interviewRoundsOverview.map((r, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-4 rounded-2xl"
                style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E0DA' }}
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-extrabold flex-shrink-0"
                  style={{ backgroundColor: ROUND_COLORS[i], color: '#FFFFFF' }}
                >
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm" style={{ color: '#0F0A1E' }}>{r.round}</div>
                  <div className="text-xs mt-0.5" style={{ color: '#94A3B8' }}>{r.type}</div>
                </div>
                <div
                  className="text-xs font-bold px-3 py-1 rounded-full flex-shrink-0"
                  style={{ backgroundColor: '#F5F3FF', color: '#7C3AED' }}
                >
                  {r.duration}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── WHAT KILLS CANDIDATES ── */}
        <section className="py-10 border-b" style={{ borderColor: '#E2E0DA' }}>
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#94A3B8' }}>What each round actually tests</p>
          <p className="text-sm mb-6" style={{ color: '#94A3B8' }}>Not the official description — the real breakdown.</p>
          <div className="space-y-4">
            {roadmap.whatEachRoundTests.map((r, i) => (
              <div key={i} className="rounded-2xl p-5" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E0DA' }}>
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold flex-shrink-0"
                    style={{ backgroundColor: ROUND_COLORS[i], color: '#FFFFFF' }}
                  >
                    {i + 1}
                  </div>
                  <span className="font-semibold text-sm" style={{ color: '#0F0A1E' }}>{r.round}</span>
                </div>
                <p className="text-sm leading-relaxed pl-10" style={{ color: '#64748B' }}>{r.tests}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 7-DAY PLAN ── */}
        <section className="py-10 border-b" style={{ borderColor: '#E2E0DA' }}>
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#94A3B8' }}>Your prep plan</p>
          <h2 className="text-2xl font-extrabold mb-6" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#0F0A1E' }}>
            7 days. One company. Zero guessing.
          </h2>
          <div className="space-y-2">
            {roadmap.sevenDayPlan.map((day) => (
              <div key={day.day} className="rounded-2xl overflow-hidden" style={{ border: '1px solid #E2E0DA' }}>
                <button
                  className="w-full text-left px-5 py-4 flex items-center gap-4"
                  style={{ backgroundColor: openDay === day.day ? '#F5F3FF' : '#FFFFFF' }}
                  onClick={() => setOpenDay(openDay === day.day ? null : day.day)}
                >
                  <span
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-extrabold flex-shrink-0"
                    style={{ backgroundColor: openDay === day.day ? '#7C3AED' : '#0F0A1E', color: '#FFFFFF' }}
                  >
                    D{day.day}
                  </span>
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-sm" style={{ color: '#0F0A1E' }}>{day.focus}</div>
                    <div className="text-xs mt-0.5" style={{ color: '#94A3B8' }}>{day.topics.length} topics</div>
                  </div>
                  <span style={{ color: '#7C3AED', fontWeight: 700 }}>{openDay === day.day ? '−' : '+'}</span>
                </button>
                {openDay === day.day && (
                  <div className="px-5 pb-5 pt-4" style={{ borderTop: '1px solid #DDD6FE', backgroundColor: '#FAFAF7' }}>
                    <ul className="space-y-2 mb-4">
                      {day.topics.map((t, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm" style={{ color: '#374151' }}>
                          <span style={{ color: '#7C3AED', flexShrink: 0, marginTop: '2px' }}>→</span>
                          {t}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      {day.resources.map((r, i) => (
                        <span key={i} className="text-xs px-3 py-1 rounded-full" style={{ backgroundColor: '#EDE9FE', color: '#7C3AED' }}>
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── HR QUESTIONS ── */}
        <section className="py-10 border-b" style={{ borderColor: '#E2E0DA' }}>
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#94A3B8' }}>HR round</p>
          <h2 className="text-2xl font-extrabold mb-1" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#0F0A1E' }}>
            10 questions. With sample answers.
          </h2>
          <p className="text-sm mb-6" style={{ color: '#94A3B8' }}>Don't wing this round. These come up every time.</p>
          <div className="space-y-2">
            {roadmap.hrQuestions.map((item, i) => (
              <div key={i} className="rounded-2xl overflow-hidden" style={{ border: '1px solid #E2E0DA' }}>
                <button
                  className="w-full text-left px-5 py-4 flex items-center gap-3"
                  style={{ backgroundColor: openHR === i ? '#F5F3FF' : '#FFFFFF' }}
                  onClick={() => setOpenHR(openHR === i ? null : i)}
                >
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded flex-shrink-0"
                    style={{ backgroundColor: openHR === i ? '#7C3AED' : '#EDE9FE', color: openHR === i ? '#FFFFFF' : '#7C3AED' }}
                  >
                    Q{i + 1}
                  </span>
                  <span className="font-semibold text-sm text-left" style={{ color: '#0F0A1E' }}>{item.question}</span>
                  <span className="ml-auto flex-shrink-0" style={{ color: '#7C3AED', fontWeight: 700 }}>{openHR === i ? '−' : '+'}</span>
                </button>
                {openHR === i && (
                  <div className="px-5 pb-5 pt-4" style={{ borderTop: '1px solid #DDD6FE', backgroundColor: '#FAFAF7' }}>
                    <p className="text-sm leading-relaxed italic" style={{ color: '#374151' }}>"{item.sampleAnswer}"</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section id="pricing-cta" className="py-12">
          <div className="rounded-2xl p-8 text-center" style={{ backgroundColor: '#0F0A1E', border: '1px solid rgba(124,58,237,0.3)' }}>
            <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#A78BFA' }}>Want TCS + Infosys + Wipro too?</div>
            <h3 className="text-xl font-extrabold text-white mb-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Get the Starter Pack
            </h3>
            <p className="text-sm mb-6" style={{ color: '#64748B' }}>3 more companies. Same depth. ₹99 one-time.</p>
            <BuyButton
              pack="starter"
              amountRupees={99}
              packName="Starter"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold cursor-pointer"
              style={{ backgroundColor: '#7C3AED', color: '#FFFFFF' }}
            >
              {DEV ? 'Preview Starter Pack →' : 'Get Starter Pack — ₹99 →'}
            </BuyButton>
            <div className="mt-4">
              <Link to="/" className="text-sm transition-colors" style={{ color: '#475569' }}>
                View all packs →
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Mobile sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden z-50 p-4" style={{ backgroundColor: 'rgba(250,250,247,0.96)', borderTop: '1px solid #E2E0DA', backdropFilter: 'blur(12px)' }}>
        <BuyButton
          pack="starter"
          amountRupees={99}
          packName="Starter"
          className="block w-full text-center py-3 rounded-xl font-bold text-sm cursor-pointer"
          style={{ backgroundColor: '#7C3AED', color: '#FFFFFF' }}
        >
          {DEV ? 'Preview Starter Pack →' : 'TCS + Infosys + Wipro kits — ₹99 →'}
        </BuyButton>
      </div>

      <footer className="border-t py-8 mt-4 pb-24 md:pb-8" style={{ borderColor: '#E2E0DA' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs" style={{ color: '#94A3B8' }}>© 2026 PlacePro. Built for Indian freshers 🇮🇳</p>
        </div>
      </footer>
    </div>
  )
}
