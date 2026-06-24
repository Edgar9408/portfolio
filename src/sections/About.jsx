import { motion } from 'framer-motion'
import { useLang } from '../context/LanguageContext'
import { t, personal, yearsOfExperience } from '../data/content'
import SectionHeader from '../components/SectionHeader'
import Reveal from '../components/Reveal'

// Tokens de color para el "editor" de código
const C = {
  kw: 'text-neon-violet', // const
  fn: 'text-white',
  key: 'text-neon-cyan',
  str: 'text-emerald-400',
  bool: 'text-neon-pink',
  punct: 'text-slate-500',
}

function CodeCard({ role, location, experience, delivers }) {
  return (
    <div className="border-gradient glass relative overflow-hidden rounded-2xl shadow-glass">
      {/* Barra de ventana */}
      <div className="flex items-center gap-2 border-b border-white/5 bg-white/[0.02] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-rose-500/80" />
        <span className="h-3 w-3 rounded-full bg-amber-400/80" />
        <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
        <span className="ml-3 font-mono text-xs text-slate-500">developer.js</span>
      </div>

      {/* Cuerpo de código */}
      <pre className="overflow-x-auto px-5 py-5 font-mono text-[13px] leading-relaxed sm:text-sm">
        <code>
          <Line n="1"><span className={C.kw}>const</span> <span className={C.fn}>edgar</span> <span className={C.punct}>= {'{'}</span></Line>
          <Line n="2">{'  '}<span className={C.key}>role</span><span className={C.punct}>:</span> <span className={C.str}>'{role}'</span><span className={C.punct}>,</span></Line>
          <Line n="3">{'  '}<span className={C.key}>location</span><span className={C.punct}>:</span> <span className={C.str}>'{location}'</span><span className={C.punct}>,</span></Line>
          <Line n="4">{'  '}<span className={C.key}>experience</span><span className={C.punct}>:</span> <span className={C.str}>'{experience}'</span><span className={C.punct}>,</span></Line>
          <Line n="5">{'  '}<span className={C.key}>delivers</span><span className={C.punct}>:</span> <span className={C.str}>'{delivers}'</span><span className={C.punct}>,</span></Line>
          <Line n="6">
            {'  '}<span className={C.key}>available</span><span className={C.punct}>:</span> <span className={C.bool}>true</span><span className={C.punct}>,</span>
            <span className="ml-1.5 inline-block h-3.5 w-[2px] translate-y-0.5 animate-pulse bg-neon-cyan align-middle" />
          </Line>
          <Line n="7"><span className={C.punct}>{'}'}</span></Line>
        </code>
      </pre>

      {/* Brillo decorativo */}
      <div className="pointer-events-none absolute -bottom-16 -right-10 h-40 w-40 rounded-full bg-neon-violet/20 blur-3xl" />
    </div>
  )
}

function Line({ n, children }) {
  return (
    <div className="flex">
      <span className="mr-4 w-4 select-none text-right text-slate-700">{n}</span>
      <span className="flex-1 whitespace-pre">{children}</span>
    </div>
  )
}

export default function About() {
  const { tr, lang } = useLang()

  return (
    <section id="about" className="section-pad">
      <div className="container-max">
        <SectionHeader kicker={tr(t.about.kicker)} title={tr(t.about.title)} />

        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Tarjeta de código */}
          <Reveal>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            >
              <CodeCard
                role={tr(t.about.code.role)}
                location={personal.location[lang]}
                experience={`${yearsOfExperience()}+ ${tr(t.about.code.yearsWord)}`}
                delivers={tr(t.about.code.delivers)}
              />
            </motion.div>
          </Reveal>

          {/* Texto + estado + stats */}
          <div>
            <Reveal>
              <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/5 px-3 py-1.5 text-xs font-medium text-emerald-300">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                {tr(t.about.status)}
              </span>
            </Reveal>

            {t.about.paragraphs[lang].map((p, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <p className="mb-5 text-base leading-relaxed text-slate-300 md:text-lg">{p}</p>
              </Reveal>
            ))}

            <div className="mt-8 grid grid-cols-3 gap-4">
              {t.about.stats.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                  className="glass glass-hover relative overflow-hidden rounded-2xl p-4 text-center"
                >
                  <span className="absolute inset-x-0 top-0 h-px bg-aurora" />
                  <div className="font-display text-3xl font-bold text-gradient">{s.value}</div>
                  <div className="mt-1 text-xs text-slate-400">{tr(s.label)}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
