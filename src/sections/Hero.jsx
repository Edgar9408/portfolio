import { motion } from 'framer-motion'
import { FiArrowDown, FiArrowUpRight } from 'react-icons/fi'
import { FaGithub, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa'
import { HiOutlineMail } from 'react-icons/hi'
import { useLang } from '../context/LanguageContext'
import { t, personal } from '../data/content'
import useTyped from '../components/useTyped'

export default function Hero() {
  const { tr, lang } = useLang()
  const typed = useTyped(t.hero.typed[lang])

  const socials = [
    { icon: FaGithub, href: personal.github, label: 'GitHub' },
    { icon: FaLinkedinIn, href: personal.linkedin, label: 'LinkedIn' },
    { icon: HiOutlineMail, href: `mailto:${personal.email}`, label: 'Email' },
    { icon: FaWhatsapp, href: personal.whatsapp, label: 'WhatsApp' },
  ]

  return (
    <section id="home" className="relative flex min-h-screen items-center section-pad pt-32">
      <div className="container-max grid w-full items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Columna texto */}
        <div>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="kicker"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-neon-cyan" />
            {personal.location[lang]} · {tr(t.hero.role)}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            {tr(t.hero.greeting)}{' '}
            <span className="block text-gradient">{personal.name}</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 flex items-center gap-2 font-mono text-lg text-slate-300 sm:text-xl"
          >
            <span className="text-neon-cyan">&gt;</span>
            <span>{typed}</span>
            <span className="inline-block h-5 w-[2px] animate-pulse bg-neon-violet sm:h-6" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-slate-400 md:text-lg"
          >
            {tr(t.hero.tagline)}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a href="#contact" className="btn-primary">
              {tr(t.hero.ctaPrimary)} <FiArrowUpRight />
            </a>
            <a href="#about" className="btn-ghost">
              {tr(t.hero.ctaSecondary)}
            </a>
          </motion.div>

          {/* Redes */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-10 flex items-center gap-3"
          >
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-slate-300 transition-all duration-300 hover:-translate-y-1 hover:border-neon-violet/40 hover:text-white hover:shadow-glow-violet"
              >
                <s.icon size={18} />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Columna avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto hidden w-full max-w-sm lg:block"
        >
          <div className="relative aspect-square">
            {/* Anillos animados */}
            <motion.div
              className="absolute inset-0 rounded-full border border-neon-cyan/20"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute inset-6 rounded-full border border-neon-violet/20"
              animate={{ rotate: -360 }}
              transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
            />
            {/* Glow */}
            <div className="absolute inset-10 rounded-full bg-aurora opacity-25 blur-3xl" />
            {/* Avatar flotando */}
            <motion.div
              className="absolute inset-8 overflow-hidden rounded-full border border-white/10 bg-base-700 shadow-glass"
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <img
                src="/assets/img/avatar-edgar.png"
                alt={personal.fullName}
                className="h-full w-full object-cover"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Indicador de scroll */}
      <motion.a
        href="#about"
        aria-label="Scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-widest text-slate-500 sm:flex"
      >
        {tr(t.hero.scroll)}
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <FiArrowDown />
        </motion.span>
      </motion.a>
    </section>
  )
}
