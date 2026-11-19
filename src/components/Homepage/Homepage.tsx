import { useEffect, useRef, useState } from 'react'
import WorksWheel from '../ui/WorksWheel'

const nav = ['About', 'Experiences', 'Gallery', 'Events', 'Schedule']
const cards = [
  { id: '01', title: 'Build what’s next', copy: 'Hands-on challenges across software, AI, and emerging technology.', tone: 'violet' },
  { id: '02', title: 'Make ideas visible', copy: 'A space for creative work, prototypes, and unexpected collaborations.', tone: 'pink' },
  { id: '03', title: 'Meet your people', copy: 'Connect with curious minds shaping what comes after today.', tone: 'cyan' },
]
const gallery = ['f5f25355-d70b-471e-b798-91220a88516a','e8b7ddc7-555f-4905-9ab1-92df10cd3e75','fff53dc3-a489-464d-8193-df007962ccc9','76ce2b29-3652-4ad3-a75a-4a68247b69a9','b2cc0c1c-1deb-486c-8824-de20d69e7da4','c26ed03c-a68b-4536-a90e-e7a3a1b88292','172bd970-6b41-4a21-9bac-e77675330efb','932f88fc-d149-491a-af13-b251af7c944c','fd075303-ab28-44c6-a108-67813997aae2','bda93ab5-79f2-44c8-981a-b5c2e6e34e2e','d0318172-9ead-4d9e-a77c-8f9adb77157b','c4b89e79-6c79-4d51-af68-b83f27c47c25','ac35be35-2718-4c4d-8f55-cd74a7ab169e','bdd44cd2-990b-42cf-8ce0-b387fc16a85e','4b4e3d64-c748-477b-8570-c0fdc7eb2f2f','45877a6d-7a74-48b2-bd8a-fcef2507add8','67d2e928-3a86-4831-923b-c9b3dae5a7eb']
export default function Homepage() {
  const [menu, setMenu] = useState(false)
  const [selected, setSelected] = useState<number | null>(null)
  const cosmosRef = useRef<HTMLDivElement>(null)
  useEffect(() => { document.body.classList.add('home-active'); return () => document.body.classList.remove('home-active') }, [])
  useEffect(() => {
    const cosmos = cosmosRef.current
    if (!cosmos) return

    // Give the J orbit a deliberate path through the page: hero-right, about-left,
    // experiences-right, gallery-center, then a final left/right sweep.
    const route = [
      ['.home-hero', 78], ['#about', 20], ['#experiences', 80],
      ['#gallery', 50], ['#events', 22], ['#register', 76],
    ] as const
    let frame = 0
    let x = 78
    let targetX = 78

    const measure = () => {
      const scrollY = window.scrollY
      const points: Array<{ y: number; x: number }> = []
      route.forEach(([selector, position]) => {
        const section = document.querySelector<HTMLElement>(selector)
        if (!section) return
        const rect = section.getBoundingClientRect()
        points.push({ y: rect.top + scrollY + rect.height / 2 - window.innerHeight / 2, x: position })
      })

      if (!points.length) return
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (scrollY <= points[0].y) targetX = points[0].x
      else if (scrollY >= points[points.length - 1].y) targetX = points[points.length - 1].x
      else {
        const next = points.findIndex(point => point.y >= scrollY)
        const from = points[next - 1]
        const to = points[next]
        const progress = Math.max(0, Math.min(1, (scrollY - from.y) / Math.max(1, to.y - from.y)))
        const eased = progress * progress * (3 - 2 * progress)
        targetX = from.x + (to.x - from.x) * eased
      }
      if (reduceMotion) {
        x = targetX
        cosmos.style.setProperty('--cosmos-x', `${x.toFixed(2)}vw`)
        cancelAnimationFrame(frame)
        frame = 0
      } else if (!frame) frame = requestAnimationFrame(animate)
    }

    const animate = () => {
      x += (targetX - x) * 0.11
      cosmos.style.setProperty('--cosmos-x', `${x.toFixed(2)}vw`)
      if (Math.abs(targetX - x) < 0.08) {
        x = targetX
        cosmos.style.setProperty('--cosmos-x', `${x.toFixed(2)}vw`)
        frame = 0
      } else frame = requestAnimationFrame(animate)
    }

    measure()
    window.addEventListener('scroll', measure, { passive: true })
    window.addEventListener('resize', measure)
    return () => {
      window.removeEventListener('scroll', measure)
      window.removeEventListener('resize', measure)
      cancelAnimationFrame(frame)
    }
  }, [])
  return <div className="home-shell">
    <header className="home-nav"><a className="home-brand" href="#top" aria-label="JTECH 2027 home"><span>J</span>TECH <b>’27</b></a><button className="menu-toggle" onClick={() => setMenu(!menu)} aria-label="Toggle navigation">{menu ? 'Close' : 'Menu'}</button><nav className={menu ? 'nav-links open' : 'nav-links'}>{nav.map(x=><a key={x} href={`#${x.toLowerCase()}`} onClick={()=>setMenu(false)}>{x}</a>)}<a className="nav-register" href="#register">Register <span>↗</span></a></nav></header>
    <main id="top">
      <section className="home-hero"><div className="hero-copy"><div className="eyebrow"><i/> JINNAH UNIVERSITY FOR WOMEN <span>·</span> 2027</div><h1>Where ideas<br/>become <em>innovation.</em></h1><p>A gathering for the curious—where computer science, creativity, and the next wave of technology meet.</p><div className="hero-actions"><a href="#experiences" className="button-primary">Explore JTECH <span>↘</span></a><a href="#register" className="button-text">Register now <span>↗</span></a></div><div className="hero-note"><span className="note-line"/> DEPARTMENT OF COMPUTER SCIENCE & SOFTWARE ENGINEERING</div></div>
        <div className="hero-index"><span>01</span><i/> A NEW FRONTIER</div></section>
      <div ref={cosmosRef} className="cosmos scroll-orbit" aria-hidden="true"><div className="cosmos-glow"/><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="orbit orbit-three"/><div className="cosmos-core"><span>J</span><i>’27</i></div><div className="cosmos-dot dot-one"/><div className="cosmos-dot dot-two"/><div className="cosmos-dot dot-three"/><div className="cosmos-cross">✳</div></div>
      <section className="about-section" id="about"><div className="section-kicker">01 / ABOUT JTECH</div><div className="about-grid"><h2>Technology moves<br/>when <em>we do.</em></h2><div><p className="about-lead">JTECH brings students and the wider tech community together to explore what’s possible when knowledge meets imagination.</p><p className="muted">A student-led platform from the Department of Computer Science & Software Engineering at Jinnah University for Women. Program details will be announced soon.</p><a href="#experiences" className="inline-link">Discover the experience <span>↗</span></a></div></div></section>
      <section className="experience-section" id="experiences"><div className="section-heading"><div><div className="section-kicker">02 / WHAT AWAITS YOU</div><h2>Bring your <em>curiosity.</em></h2></div><p>Three ways to step into<br/>what’s coming next.</p></div><div className="experience-grid">{cards.map(c=><article className={`experience-card ${c.tone}`} key={c.id}><div className="card-top"><span>{c.id} — JTECH 2027</span><span>↗</span></div><div className="card-art"><div className="art-ring"/><div className="art-ring second"/><div className="art-point"/></div><h3>{c.title}</h3><p>{c.copy}</p></article>)}</div></section>
      <WorksWheel />
      <section className="program-section" id="events"><div className="section-kicker">03 / THE PROGRAM</div><div className="program-grid"><h2>Made for<br/><em>the makers.</em></h2><div className="program-list"><article><span>01</span><div><h3>Events & activities</h3><p>Program announcements coming soon.</p></div><b>↗</b></article><article><span>02</span><div><h3>Speakers</h3><p>Guest announcements coming soon.</p></div><b>↗</b></article><article id="schedule"><span>03</span><div><h3>Event schedule</h3><p>Schedule details coming soon.</p></div><b>↗</b></article></div></div></section>
      <section className="register-section" id="register"><div className="register-orb"/><div className="section-kicker">JTECH 2027 · JUW</div><h2>Your next idea<br/>starts <em>here.</em></h2><p>Registration information will be announced soon.</p><a className="button-primary" href="mailto:jtech@juw.edu.pk">Get updates <span>↗</span></a></section>
    </main><footer className="home-footer"><a className="home-brand" href="#top"><span>J</span>TECH <b>’27</b></a><span>DEPARTMENT OF COMPUTER SCIENCE & SOFTWARE ENGINEERING</span><span>JINNAH UNIVERSITY FOR WOMEN · KARACHI</span><a href="#top">BACK TO TOP ↑</a></footer>
    {selected!==null&&<div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label="JTECH gallery photo" onClick={()=>setSelected(null)}><button className="lightbox-close" onClick={()=>setSelected(null)} aria-label="Close image">×</button><img src={`/assets/gallery/jtech-${String(selected+1).padStart(2,'0')}.jpg`} alt={`JTECH showcase photo ${selected+1}`}/><button className="lightbox-prev" aria-label="Previous photo" onClick={e=>{e.stopPropagation();setSelected((selected+gallery.length-1)%gallery.length)}}>←</button><button className="lightbox-next" aria-label="Next photo" onClick={e=>{e.stopPropagation();setSelected((selected+1)%gallery.length)}}>→</button><span>{String(selected+1).padStart(2,'0')} / {gallery.length}</span></div>}
    <div className="warp-transition" aria-hidden="true"><div className="warp-rings"/><div className="warp-flash"/></div>
  </div>
}
