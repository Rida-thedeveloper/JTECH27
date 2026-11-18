import { gsap } from 'gsap'

export function buildIntroTimeline(root: HTMLElement, onComplete: () => void) {
  const q = (selector: string) => root.querySelector(selector)
  const qAll = (selector: string) => root.querySelectorAll(selector)
  gsap.set(qAll('.scene'), { autoAlpha: 0 })
  gsap.set('.intro-word', { yPercent: 110, rotateX: -70, opacity: 1, filter: 'blur(0px)', transformOrigin: '50% 100%' })
  gsap.set('.kinetic-letter', { yPercent: 115, scale: .84, opacity: 0, filter: 'blur(8px)', transformOrigin: '50% 100%' })
  gsap.set('.hero-mark', { autoAlpha: 0, scale: .84, filter: 'blur(18px)' })
  gsap.set('.year-reel-track', { yPercent: 0 })
  gsap.set('.year-step-final', { scale: 1, textShadow: '0 0 0 transparent', transformOrigin: '50% 55%' })
  gsap.set('.tagline', { autoAlpha: 0, y: 18, letterSpacing: '.65em' })
  gsap.set('.year-step-final', { color: '#ffd36e', textShadow: '0 0 8px #ffd36e55' })
  gsap.set('.year-underline', { scaleX: 0, autoAlpha: 0, transformOrigin: 'left center' })
  gsap.set('.tagline-word', { color: '#dce7fb', textShadow: '0 0 0 transparent' })
  gsap.set('.reveal-attribution', { autoAlpha: 0, y: 12 })
  gsap.set(qAll('.side-logo'), { autoAlpha: 0, y: 8, scale: .96 })
  gsap.set('.transition-wash', { autoAlpha: 0, scaleY: 0, transformOrigin: 'bottom' })

  const tl = gsap.timeline({ onComplete })
  // Seven clean typographic beats; every word shares one center point.
  tl.to(q('.scene-void'), { autoAlpha: 1, duration: .4 }, 0)
    .to(q('.scene-void'), { autoAlpha: 0, duration: .18 }, .24)

    .to(q('.scene-innovation'), { autoAlpha: 1, duration: .14 }, .38)
    .to('.word-innovation', { yPercent: 0, rotateX: 0, duration: .52, ease: 'power4.out' }, .54)
    .to('.word-innovation .kinetic-letter', { yPercent: 0, scale: 1, opacity: 1, filter: 'blur(0px)', duration: .38, stagger: .035, ease: 'back.out(1.4)' }, .60)
    .to('.word-innovation', { yPercent: -18, opacity: 0, filter: 'blur(7px)', duration: .24, ease: 'power2.in' }, 1.34)
    .to(q('.scene-innovation'), { autoAlpha: 0, duration: .2 }, 1.52)

    .to(q('.scene-creativity'), { autoAlpha: 1, duration: .14 }, 1.64)
    .to('.word-creativity', { yPercent: 0, rotateX: 0, duration: .52, ease: 'power4.out' }, 1.80)
    .to('.word-creativity .kinetic-letter', { yPercent: 0, scale: 1, opacity: 1, filter: 'blur(0px)', duration: .38, stagger: .035, ease: 'back.out(1.4)' }, 1.86)
    .to('.word-creativity', { yPercent: -18, opacity: 0, filter: 'blur(7px)', duration: .24, ease: 'power2.in' }, 2.60)
    .to(q('.scene-creativity'), { autoAlpha: 0, duration: .2 }, 2.78)

    .to(q('.scene-technology'), { autoAlpha: 1, duration: .14 }, 2.90)
    .to('.word-technology', { yPercent: 0, rotateX: 0, duration: .52, ease: 'power4.out' }, 3.06)
    .to('.word-technology .kinetic-letter', { yPercent: 0, scale: 1, opacity: 1, filter: 'blur(0px)', duration: .38, stagger: .035, ease: 'back.out(1.4)' }, 3.12)
    .to('.word-technology', { yPercent: -18, opacity: 0, filter: 'blur(7px)', duration: .24, ease: 'power2.in' }, 3.86)
    .to(q('.scene-technology'), { autoAlpha: 0, duration: .2 }, 4.04)

    .to(q('.scene-reveal'), { autoAlpha: 1, duration: .2 }, 4.16)
    .to('.reveal-attribution', { autoAlpha: 1, y: 0, duration: .48, ease: 'power2.out' }, 4.26)
    .to(qAll('.side-logo'), { autoAlpha: 1, y: 0, scale: 1, duration: .7, stagger: .12, ease: 'power2.out' }, 4.28)
    .to('.hero-mark', { autoAlpha: 1, scale: 1, filter: 'blur(0px)', duration: .75, ease: 'power3.out' }, 4.38)
    .to('.year-reel-track', { yPercent: -25, duration: .5, ease: 'power1.inOut' }, 4.88)
    .to('.year-reel-track', { yPercent: -50, duration: .5, ease: 'power1.inOut' }, 5.38)
    .to('.year-reel-track', { yPercent: -75, duration: .56, ease: 'power1.inOut' }, 5.88)
    .to('.tagline', { autoAlpha: 1, y: 0, letterSpacing: '.28em', duration: .62, ease: 'power2.out' }, 5.10)
    .to('.year-step-final', { scale: 1.2, color: '#fff0bd', textShadow: '0 0 10px #ffd36e, 0 0 20px #ffd36e', duration: .2, ease: 'power2.out' }, 6.44)
    .to('.year-step-final', { scale: 1, color: '#ffd36e', textShadow: '0 0 8px #ffd36e55', duration: .42, ease: 'back.out(2)' }, 6.64)
    .to('.year-underline', { scaleX: 1, autoAlpha: 1, duration: .52, ease: 'power2.out' }, 6.48)
    .to('.tagline-beyond', { color: '#62eaff', textShadow: '0 0 10px #62eaff88', duration: .34, ease: 'power2.out' }, 7.08)
    .to('.tagline-the', { color: '#f39acb', textShadow: '0 0 10px #f39acb88', duration: .34, ease: 'power2.out' }, 7.44)
    .to('.tagline-future', { color: '#c6a0ff', textShadow: '0 0 10px #c6a0ff99', duration: .42, ease: 'power2.out' }, 7.80)

    // Scene seven is a quiet light transition behind the same, single title.
    .to('.transition-wash', { autoAlpha: .68, scaleY: 1, duration: .72, ease: 'power2.inOut' }, 8.27)
    .to('.transition-wash', { autoAlpha: 0, duration: .72, ease: 'power2.out' }, 9.27)
    .to({}, { duration: .35 }, 9.97)
  return tl
}

export function finishIntro(root: HTMLElement) {
  gsap.killTweensOf('*')
  const scenes = root.querySelectorAll('.scene')
  gsap.set(scenes, { autoAlpha: 0 })
  gsap.set(root.querySelector('.scene-reveal'), { autoAlpha: 1 })
  gsap.set(root.querySelector('.reveal-attribution'), { autoAlpha: 1, y: 0 })
  gsap.set(root.querySelectorAll('.side-logo'), { autoAlpha: 1, y: 0, scale: 1 })
  gsap.set(root.querySelector('.hero-mark'), { autoAlpha: 1, scale: 1, filter: 'blur(0px)' })
  gsap.set(root.querySelector('.year-reel-track'), { yPercent: -75 })
  gsap.set(root.querySelector('.year-step-final'), { scale: 1, color: '#f1a7c8', textShadow: '0 0 0 transparent' })
  gsap.set(root.querySelector('.tagline'), { autoAlpha: 1, y: 0, letterSpacing: '.28em' })
  gsap.set(root.querySelector('.tagline-beyond'), { color: '#62eaff', textShadow: '0 0 10px #62eaff88' })
  gsap.set(root.querySelector('.tagline-the'), { color: '#f39acb', textShadow: '0 0 10px #f39acb88' })
  gsap.set(root.querySelector('.tagline-future'), { color: '#c6a0ff', textShadow: '0 0 10px #c6a0ff99' })
  gsap.set(root.querySelector('.year-step-final'), { scale: 1, color: '#ffd36e', textShadow: '0 0 8px #ffd36e55' })
  gsap.set(root.querySelector('.year-underline'), { scaleX: 1, autoAlpha: 1 })
  gsap.set(root.querySelector('.transition-wash'), { autoAlpha: 0, scaleY: 0 })
}
