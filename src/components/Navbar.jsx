import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenuAlt4, HiX } from 'react-icons/hi'
import { useLang } from '../context/LanguageContext'
import { t, personal } from '../data/content'

const links = [
  { id: 'home', key: 'home' },
  { id: 'about', key: 'about' },
  { id: 'skills', key: 'skills' },
  { id: 'experience', key: 'experience' },
  { id: 'contact', key: 'contact' },
]

export default function Navbar() {
  const { lang, toggle, tr } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Resalta el link de la sección visible
  useEffect(() => {
    const sections = links.map((l) => document.getElementById(l.id)).filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-3' : 'py-5'
      }`}
    >
      <nav
        className={`container-max mx-4 flex items-center justify-between rounded-2xl px-5 py-3 transition-all duration-300 md:mx-auto ${
          scrolled ? 'glass shadow-glass' : 'bg-transparent'
        }`}
      >
        {/* Logo */}
        <a href="#home" className="group flex items-center gap-2.5">
          <img
            src="/assets/img/avatar-edgar.png"
            alt={personal.fullName}
            className="h-9 w-9 rounded-full border border-white/10 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <span className="font-display text-sm font-semibold tracking-wide text-white">
            Edgar<span className="text-gradient">.dev</span>
          </span>
        </a>

        {/* Links desktop */}
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active === l.id ? 'text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {active === l.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full border border-white/10 bg-white/[0.06]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {tr(t.nav[l.key])}
              </a>
            </li>
          ))}
        </ul>

        {/* Acciones derecha */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label="Toggle language"
            className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-xs font-semibold text-slate-300 transition-colors hover:border-white/25 hover:text-white"
          >
            {lang === 'es' ? 'ES' : 'EN'}<span className="text-slate-600"> / {lang === 'es' ? 'EN' : 'ES'}</span>
          </button>

          <a href="#contact" className="hidden btn-primary !px-5 !py-2 text-sm md:inline-flex">
            {tr(t.hero.ctaPrimary)}
          </a>

          {/* Botón menú móvil */}
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-white md:hidden"
          >
            {open ? <HiX size={20} /> : <HiMenuAlt4 size={20} />}
          </button>
        </div>
      </nav>

      {/* Menú móvil */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="glass mx-4 mt-3 overflow-hidden p-2 md:hidden"
          >
            {links.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
              >
                {tr(t.nav[l.key])}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
