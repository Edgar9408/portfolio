import { motion } from 'framer-motion'
import { FiBriefcase, FiMapPin } from 'react-icons/fi'
import { useLang } from '../context/LanguageContext'
import { t } from '../data/content'
import SectionHeader from '../components/SectionHeader'

export default function Experience() {
  const { tr } = useLang()

  return (
    <section id="experience" className="section-pad">
      <div className="container-max">
        <SectionHeader kicker={tr(t.experience.kicker)} title={tr(t.experience.title)} />

        <div className="relative mx-auto max-w-3xl">
          {/* Línea vertical */}
          <div className="absolute left-4 top-2 h-full w-px bg-gradient-to-b from-neon-cyan via-neon-violet to-transparent md:left-1/2" />

          <div className="space-y-10">
            {t.experience.items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className={`relative pl-14 md:w-1/2 md:pl-0 ${
                  i % 2 === 0 ? 'md:ml-auto md:pl-12' : 'md:mr-auto md:pr-12 md:text-right'
                }`}
              >
                {/* Punto (sobre la línea, por encima de las tarjetas) */}
                <span
                  className={`absolute left-4 top-1.5 z-10 grid h-8 w-8 -translate-x-1/2 place-items-center rounded-full border border-white/15 bg-base-700 text-neon-cyan shadow-glow-cyan ${
                    i % 2 === 0 ? 'md:left-0' : 'md:left-full'
                  }`}
                >
                  <FiBriefcase size={14} />
                </span>

                <div className="glass glass-hover p-6">
                  <span className="font-mono text-xs text-neon-cyan">{tr(item.period)}</span>
                  <h3 className="mt-1 font-display text-lg font-semibold text-white">
                    {tr(item.role)}
                  </h3>
                  <p className="text-sm font-medium text-slate-300">{tr(item.company)}</p>
                  {item.location && (
                    <p className="mt-0.5 text-xs text-slate-500">
                      <span className="inline-flex items-center gap-1.5">
                        <FiMapPin size={11} /> {tr(item.location)}
                      </span>
                    </p>
                  )}
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">
                    {tr(item.description)}
                  </p>
                  <div
                    className={`mt-4 flex flex-wrap gap-2 ${
                      i % 2 === 0 ? '' : 'md:justify-end'
                    }`}
                  >
                    {item.tech.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
