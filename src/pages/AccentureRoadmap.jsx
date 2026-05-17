import { useState } from 'react'
import { Link } from 'react-router-dom'
import { content } from '../data/content'

const DEV = import.meta.env.DEV
const STARTER_URL = DEV ? '/unlock?pack=starter' : (import.meta.env.VITE_RAZORPAY_STARTER_URL || 'https://rzp.io/l/placeholder-starter')

const roadmap = content.accenture.roadmap

export default function AccentureRoadmap() {
  const [openDay, setOpenDay] = useState(null)

  return (
    <div style={{ backgroundColor: '#0A0F1E', minHeight: '100vh' }}>
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-slate-800 backdrop-blur-md" style={{ backgroundColor: 'rgba(10,15,30,0.9)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Place<span style={{ color: '#F59E0B' }}>Pro</span>
            </span>
          </Link>
          <a
            href="#pricing-cta"
            className="text-sm font-medium px-4 py-2 rounded-lg transition-colors"
            style={{ backgroundColor: '#F59E0B', color: '#0A0F1E' }}
          >
            Get Full Pack
          </a>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <div className="mb-12 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4"
            style={{ backgroundColor: 'rgba(245,158,11,0.15)', color: '#F59E0B', border: '1px solid rgba(245,158,11,0.3)' }}>
            Free Resource — No Login Required
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Accenture Placement{' '}
            <span style={{ background: 'linear-gradient(135deg, #F59E0B 0%, #FCD34D 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Roadmap
            </span>
          </h1>
          <p className="text-slate-400 text-lg">Complete guide to crack Accenture ASE selection — 4 rounds, real patterns, 7-day plan.</p>
        </div>

        {/* Section 1: Interview Rounds Overview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            1. Interview Rounds Overview
          </h2>
          <div className="space-y-4">
            {roadmap.interviewRoundsOverview.map((r, i) => (
              <div key={i} className="flex gap-4 items-start rounded-xl p-5" style={{ backgroundColor: '#1E293B', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{ backgroundColor: '#F59E0B', color: '#0A0F1E' }}>
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-white">{r.round}</div>
                  <div className="flex flex-wrap gap-3 mt-2">
                    <span className="text-xs px-3 py-1 rounded-full" style={{ backgroundColor: 'rgba(245,158,11,0.15)', color: '#F59E0B' }}>
                      ⏱ {r.duration}
                    </span>
                    <span className="text-xs px-3 py-1 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.06)', color: '#94a3b8' }}>
                      {r.type}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: What Each Round Tests */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            2. What Each Round Tests
          </h2>
          <div className="space-y-5">
            {roadmap.whatEachRoundTests.map((r, i) => (
              <div key={i} className="rounded-xl p-6" style={{ backgroundColor: '#1E293B', border: '1px solid rgba(255,255,255,0.06)' }}>
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <span className="text-sm px-2 py-0.5 rounded font-bold" style={{ backgroundColor: 'rgba(245,158,11,0.2)', color: '#F59E0B' }}>
                    Round {i + 1}
                  </span>
                  {r.round}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">{r.tests}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: 7-Day Prep Timeline */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            3. 7-Day Prep Timeline
          </h2>
          <div className="space-y-3">
            {roadmap.sevenDayPlan.map((day) => (
              <div key={day.day} className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
                <button
                  className="w-full text-left px-6 py-4 flex justify-between items-center transition-colors"
                  style={{ backgroundColor: openDay === day.day ? 'rgba(245,158,11,0.08)' : '#1E293B' }}
                  onClick={() => setOpenDay(openDay === day.day ? null : day.day)}
                >
                  <div className="flex items-center gap-4">
                    <span className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                      style={{ backgroundColor: '#F59E0B', color: '#0A0F1E' }}>
                      D{day.day}
                    </span>
                    <div className="text-left">
                      <div className="font-semibold text-white text-sm">{day.focus}</div>
                      <div className="text-slate-500 text-xs mt-0.5">{day.topics.length} topics</div>
                    </div>
                  </div>
                  <span style={{ color: '#F59E0B' }}>{openDay === day.day ? '−' : '+'}</span>
                </button>
                {openDay === day.day && (
                  <div className="px-6 pb-5 pt-4 border-t border-slate-700" style={{ backgroundColor: 'rgba(245,158,11,0.04)' }}>
                    <div className="mb-4">
                      <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Topics</div>
                      <ul className="space-y-1.5">
                        {day.topics.map((t, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                            <span style={{ color: '#F59E0B' }} className="mt-0.5 flex-shrink-0">→</span>
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Resources</div>
                      <div className="flex flex-wrap gap-2">
                        {day.resources.map((r, i) => (
                          <span key={i} className="text-xs px-3 py-1 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.06)', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.08)' }}>
                            {r}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Top 10 HR Questions */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            4. Top 10 HR Questions — With Sample Answers
          </h2>
          <div className="space-y-5">
            {roadmap.hrQuestions.map((item, i) => (
              <div key={i} className="rounded-xl p-6" style={{ backgroundColor: '#1E293B', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-sm font-bold px-2 py-0.5 rounded flex-shrink-0" style={{ backgroundColor: 'rgba(245,158,11,0.2)', color: '#F59E0B' }}>
                    Q{i + 1}
                  </span>
                  <h3 className="font-semibold text-white text-sm">{item.question}</h3>
                </div>
                <div className="ml-9">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Sample Answer</div>
                  <p className="text-slate-300 text-sm leading-relaxed italic">"{item.sampleAnswer}"</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sticky bottom CTA */}
        <div id="pricing-cta" className="rounded-2xl p-8 text-center" style={{ backgroundColor: '#1E293B', border: '2px solid rgba(245,158,11,0.3)' }}>
          <div className="text-lg font-bold mb-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Want TCS + Infosys + Wipro kits too?
          </div>
          <p className="text-slate-400 text-sm mb-6">Get the Starter Pack — 3 companies, same depth as this Accenture guide.</p>
          {DEV ? (
            <Link
              to={STARTER_URL}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold transition-all"
              style={{ backgroundColor: '#F59E0B', color: '#0A0F1E' }}
            >
              Preview Starter Pack →
            </Link>
          ) : (
            <a
              href={STARTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold transition-all"
              style={{ backgroundColor: '#F59E0B', color: '#0A0F1E' }}
            >
              Get Starter Pack — ₹199 →
            </a>
          )}
          <div className="mt-4">
            <Link to="/" className="text-slate-500 text-sm hover:text-slate-300 transition-colors">
              View all packs →
            </Link>
          </div>
        </div>
      </main>

      {/* Fixed sticky bottom bar on mobile */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden z-50 p-4" style={{ backgroundColor: 'rgba(10,15,30,0.95)', borderTop: '1px solid rgba(245,158,11,0.3)', backdropFilter: 'blur(12px)' }}>
        {DEV ? (
          <Link
            to={STARTER_URL}
            className="block w-full text-center py-3 rounded-xl font-bold text-sm"
            style={{ backgroundColor: '#F59E0B', color: '#0A0F1E' }}
          >
            Preview Starter Pack →
          </Link>
        ) : (
          <a
            href={STARTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center py-3 rounded-xl font-bold text-sm"
            style={{ backgroundColor: '#F59E0B', color: '#0A0F1E' }}
          >
            Want TCS + Infosys + Wipro too? ₹199 →
          </a>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 mt-12 pb-24 md:pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-slate-600 text-xs">© 2025 PlacePro. Built for Indian freshers 🇮🇳</p>
        </div>
      </footer>
    </div>
  )
}
