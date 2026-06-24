import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMousePointer } from 'react-icons/fi'
import { useLang } from '../context/LanguageContext'
import { t } from '../data/content'
import SectionHeader from '../components/SectionHeader'
import TechIcon from '../components/techIcons'

const AREA_RADIUS = 37 // % — anillo interior (áreas)
const SOFT_RADIUS = 44 // % — anillo exterior (blandas)

// Posiciona ítems en círculo. offsetDeg desfasa el anillo (para intercalar).
function layout(items, radius, offsetDeg = 0) {
  return items.map((item, i) => {
    const angle = (-90 + offsetDeg + (360 / items.length) * i) * (Math.PI / 180)
    return {
      ...item,
      x: 50 + radius * Math.cos(angle),
      y: 50 + radius * Math.sin(angle),
    }
  })
}

export default function Skills() {
  const { tr } = useLang()
  const [active, setActive] = useState(null) // área con hover
  const [activeSoft, setActiveSoft] = useState(null) // blanda con hover

  const areas = layout(t.skills.orbit, AREA_RADIUS)
  const softOffset = 360 / (2 * t.skills.soft.items.length)
  const soft = layout(t.skills.soft.items, SOFT_RADIUS, softOffset)

  return (
    <section id="skills" className="section-pad">
      <div className="container-max">
        <SectionHeader
          kicker={tr(t.skills.kicker)}
          title={tr(t.skills.title)}
          subtitle={tr(t.skills.subtitle)}
        />

        {/* ===== Orbital (desktop / tablet) ===== */}
        <div className="hidden md:block">
          <div className="relative mx-auto aspect-square w-full max-w-[600px]">
            {/* Anillos decorativos giratorios */}
            <motion.div
              className="absolute inset-[6%] rounded-full border border-dashed border-white/10"
              animate={{ rotate: 360 }}
              transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute inset-[13%] rounded-full border border-white/[0.06]"
              animate={{ rotate: -360 }}
              transition={{ duration: 36, repeat: Infinity, ease: 'linear' }}
            />

            {/* Líneas conectoras a las áreas */}
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
              <defs>
                <linearGradient id="line-grad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="100" y2="100">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
              {areas.map((n, i) => (
                <line
                  key={n.id}
                  x1="50"
                  y1="50"
                  x2={n.x}
                  y2={n.y}
                  stroke="url(#line-grad)"
                  strokeWidth="0.25"
                  className="transition-opacity duration-300"
                  style={{ opacity: active === null ? 0.35 : active === i ? 0.9 : 0.1 }}
                />
              ))}
            </svg>

            {/* Núcleo central */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative grid h-24 w-24 place-items-center">
                <motion.span
                  className="absolute inset-0 rounded-full bg-aurora opacity-30 blur-xl"
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.span
                  className="absolute inset-0 rounded-full border border-neon-violet/30"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                />
                <div className="relative grid h-20 w-20 place-items-center rounded-full border border-white/10 bg-base-700/80 shadow-glass backdrop-blur-md">
                  <span className="bg-aurora bg-clip-text font-display text-4xl font-bold text-transparent">
                    {t.skills.core.initial}
                  </span>
                </div>
              </div>
            </div>

            {/* Nodos blandos (anillo exterior, solo icono + tooltip) */}
            {soft.map((s, i) => (
              <div
                key={s.es}
                className={`absolute ${activeSoft === i ? 'z-50' : 'z-10'}`}
                style={{ left: `${s.x}%`, top: `${s.y}%`, transform: 'translate(-50%, -50%)' }}
                onMouseEnter={() => setActiveSoft(i)}
                onMouseLeave={() => setActiveSoft(null)}
              >
                <motion.div
                  animate={{ y: [0, -6, 0], scale: activeSoft === i ? 1.15 : 1 }}
                  transition={{
                    y: { duration: 5 + i * 0.4, repeat: Infinity, ease: 'easeInOut' },
                    scale: { duration: 0.3 },
                  }}
                  className={`grid h-12 w-12 cursor-default place-items-center rounded-full border bg-base-800/70 backdrop-blur-md transition-colors ${
                    activeSoft === i ? 'border-neon-violet/60' : 'border-white/10'
                  }`}
                >
                  <TechIcon name={s.icon} size={18} />
                </motion.div>

                <AnimatePresence>
                  {activeSoft === i && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.18 }}
                      className={`absolute left-1/2 z-30 -translate-x-1/2 whitespace-nowrap rounded-lg border border-white/10 bg-base-800/95 px-3 py-1.5 text-xs font-medium text-slate-200 shadow-glass backdrop-blur-md ${
                        s.y < 50 ? 'bottom-full mb-2' : 'top-full mt-2'
                      }`}
                    >
                      {tr(s)}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            {/* Nodos de áreas (anillo interior) */}
            {areas.map((n, i) => (
              <div
                key={n.id}
                className={`absolute ${active === i ? 'z-50' : 'z-20'}`}
                style={{ left: `${n.x}%`, top: `${n.y}%`, transform: 'translate(-50%, -50%)' }}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
              >
                <motion.div
                  animate={{
                    y: [0, -8, 0],
                    opacity: active === null || active === i ? 1 : 0.4,
                    scale: active === i ? 1.12 : 1,
                  }}
                  transition={{
                    y: { duration: 4 + i * 0.3, repeat: Infinity, ease: 'easeInOut' },
                    opacity: { duration: 0.3 },
                    scale: { duration: 0.3 },
                  }}
                  className={`grid h-[4.25rem] w-[4.25rem] cursor-pointer place-items-center rounded-2xl border bg-base-700/70 backdrop-blur-md transition-colors ${
                    active === i ? 'border-neon-violet/50 shadow-glow-violet' : 'border-white/10'
                  }`}
                >
                  <TechIcon name={n.icon} size={28} />
                </motion.div>

                <span className="mt-2 block text-center text-xs font-medium text-slate-400">
                  {tr(n.name)}
                </span>

                {/* Tarjeta de hover */}
                <AnimatePresence>
                  {active === i && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className={`absolute left-1/2 z-40 w-60 -translate-x-1/2 rounded-2xl border border-white/10 bg-base-800/95 p-4 text-left shadow-glass backdrop-blur-xl ${
                        n.y < 50 ? 'top-full mt-3' : 'bottom-full mb-3'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <TechIcon name={n.icon} size={18} />
                        <span className="font-display text-sm font-semibold text-white">{tr(n.name)}</span>
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-slate-300">{tr(n.description)}</p>
                      <p className="mt-2.5 border-t border-white/10 pt-2.5 font-mono text-[11px] text-neon-cyan">
                        <span className="text-slate-500">{tr(t.skills.techLabel)}: </span>
                        {n.tech}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Pista + leyenda */}
          <div className="mt-2 flex flex-col items-center gap-2 text-xs text-slate-500">
            <p className="flex items-center gap-2">
              <FiMousePointer size={13} /> {tr(t.skills.hoverHint)}
            </p>
            <div className="flex items-center gap-5">
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-sm bg-neon-cyan/70" /> {tr(t.skills.core.label)}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-neon-violet/70" /> {tr(t.skills.soft.title)}
              </span>
            </div>
          </div>
        </div>

        {/* ===== Fallback móvil ===== */}
        <div className="md:hidden">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {t.skills.orbit.map((n) => (
              <div key={n.id} className="glass flex items-start gap-3 p-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.03]">
                  <TechIcon name={n.icon} size={24} />
                </span>
                <div>
                  <p className="font-display text-sm font-semibold text-white">{tr(n.name)}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-slate-400">{tr(n.description)}</p>
                  <p className="mt-1.5 font-mono text-[10px] text-neon-cyan">{n.tech}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <h3 className="mb-4 font-display text-base font-semibold text-white">
              {tr(t.skills.soft.title)}
            </h3>
            <div className="flex flex-wrap justify-center gap-2.5">
              {t.skills.soft.items.map((item) => (
                <span
                  key={item.es}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-medium text-slate-200"
                >
                  <TechIcon name={item.icon} size={16} />
                  {tr(item)}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
