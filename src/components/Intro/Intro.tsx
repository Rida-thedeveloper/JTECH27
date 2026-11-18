import { useCallback, useEffect, useRef, useState } from 'react'
import ParticleField from './ParticleField'
import { buildIntroTimeline, finishIntro } from './IntroTimeline'
import './Intro.css'

function KineticWord({ word, className }: { word: string; className: string }) {
  return <span className={`intro-word ${className}`} aria-label={word}>
    {Array.from(word).map((letter, index) => <span className="kinetic-letter" aria-hidden="true" key={`${letter}-${index}`}>{letter}</span>)}
  </span>
}

export default function Intro() {
  const rootRef = useRef<HTMLElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const [complete, setComplete] = useState(false)
  const [reduced, setReduced] = useState(false)
  const replay = new URLSearchParams(window.location.search).has('replay')
  const finish = useCallback(() => {
    timelineRef.current?.kill()
    if (rootRef.current) finishIntro(rootRef.current)
    setComplete(true)
  }, [])
  const play = useCallback(() => {
    if (!rootRef.current) return
    setComplete(false)
    timelineRef.current?.kill()
    if (reduced) { finishIntro(rootRef.current); setComplete(true); return }
    timelineRef.current = buildIntroTimeline(rootRef.current, () => setComplete(true))
  }, [reduced])
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(media.matches)
    update(); media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])
  useEffect(() => {
    if (reduced) finish()
    else play()
    return () => { timelineRef.current?.kill() }
  }, [play, reduced, replay, finish])
  return <main className="intro" ref={rootRef}>
    <ParticleField active={!complete} />
    <div className="ambient ambient-blue" /><div className="ambient ambient-violet" />
    <div className="grain" aria-hidden="true" />
    <header className="intro-top">
      <img className="side-logo logo-department" src="/assets/jtech-department-logo.jpeg" alt="JTECH symbol logo" />
      <img className="side-logo logo-jtech" src="/assets/jtech-department-logo.png" alt="JTECH Department of Computer Science and Software Engineering logo" />
    </header>
    <button className="skip-button" onClick={finish} aria-label="Skip intro">Skip intro <span aria-hidden="true">↗</span></button>
    <div className="scene scene-void" />
    <div className="scene scene-innovation"><div className="word-wrap"><KineticWord word="INNOVATION" className="word-innovation" /></div></div>
    <div className="scene scene-creativity"><div className="word-wrap"><KineticWord word="CREATIVITY" className="word-creativity" /></div></div>
    <div className="scene scene-technology"><div className="word-wrap"><KineticWord word="TECHNOLOGY" className="word-technology" /></div></div>
    <div className="scene scene-reveal"><div className="transition-wash"/><div className="reveal-lockup"><div className="reveal-attribution"><span>DEPARTMENT OF COMPUTER SCIENCE &amp; SOFTWARE ENGINEERING,</span><span>JINNAH UNIVERSITY FOR WOMEN PRESENTS</span></div><div className="hero-mark" aria-label="JTECH 2027">JTECH<span className="mark-year"><span className="year-apostrophe" aria-hidden="true">’</span><span className="year-reel" aria-hidden="true"><span className="year-reel-track"><span className="year-step">2024</span><span className="year-step">2025</span><span className="year-step">2026</span><span className="year-step year-step-final">2027</span></span></span><svg className="year-underline" viewBox="0 0 120 16" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="year-underline-gradient" x1="0" x2="1" y1="0" y2="0"><stop offset="0%" stopColor="#ffd36e"/><stop offset="52%" stopColor="#fff0bd"/><stop offset="100%" stopColor="#f39acb"/></linearGradient></defs><path className="year-underline-path" d="M3 9 Q60 5 117 9" pathLength="1" strokeDasharray="1" vectorEffect="non-scaling-stroke" /></svg></span></div><div className="tagline"><span className="tagline-word tagline-beyond">BEYOND</span>{' '}<span className="tagline-word tagline-the">THE</span>{' '}<span className="tagline-word tagline-future">FUTURE.</span></div></div></div>
    <span className="sr-only" aria-live="polite">{complete ? 'Intro complete. JTECH 2027, Beyond the future.' : 'JTECH 2027 cinematic intro playing.'}</span>
  </main>
}
