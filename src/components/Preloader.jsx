import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Pantalla de carga inicial — versión "kinetic / glitch".
 * Tipografía animada con efecto glitch, anillos orbitando, barras de escaneo
 * y un contador estilo terminal.
 * Permanece visible un mínimo de tiempo y hasta que la ventana termine de cargar.
 */
export default function Preloader() {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const start = Date.now()
    const MIN_DURATION = 1400 // ms que se muestra como mínimo
    let raf

    let loaded = document.readyState === 'complete'
    const onLoad = () => {
      loaded = true
    }
    window.addEventListener('load', onLoad)

    const tick = () => {
      const elapsed = Date.now() - start
      // Avance suave hacia 90%; el último tramo espera a que cargue todo
      const target = loaded ? 100 : Math.min(90, (elapsed / MIN_DURATION) * 90)
      setProgress((p) => {
        const next = p + (target - p) * 0.12
        return next > 99.5 ? 100 : next
      })

      if (loaded && elapsed >= MIN_DURATION) {
        setProgress(100)
        setTimeout(() => setDone(true), 450)
        return
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('load', onLoad)
    }
  }, [])

  // Bloquea el scroll mientras el preloader está visible
  useEffect(() => {
    document.body.style.overflow = done ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [done])

  const pct = Math.round(progress)
  const word = 'EDGAR'

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-base-900"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* ---------- Fondo ---------- */}
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
          {/* Resplandor cónico giratorio */}
          <motion.div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[140vmax] w-[140vmax] -translate-x-1/2 -translate-y-1/2 opacity-[0.18] blur-2xl"
            style={{
              background:
                'conic-gradient(from 0deg, transparent, #22d3ee, transparent 30%, #a855f7, transparent 60%, #ec4899, transparent)',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 18, ease: 'linear', repeat: Infinity }}
          />
          {/* Líneas de escaneo */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 4px)',
            }}
          />
          {/* Barra de escaneo que recorre la pantalla */}
          <motion.div
            className="pointer-events-none absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-neon-cyan to-transparent shadow-glow-cyan"
            initial={{ top: '0%' }}
            animate={{ top: ['0%', '100%', '0%'] }}
            transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}
          />

          {/* ---------- Anillos orbitando ---------- */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {[260, 360, 480].map((size, i) => (
              <motion.div
                key={size}
                className="absolute rounded-full border border-white/5"
                style={{
                  width: size,
                  height: size,
                  left: -size / 2,
                  top: -size / 2,
                }}
                animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                transition={{
                  duration: 10 + i * 6,
                  ease: 'linear',
                  repeat: Infinity,
                }}
              >
                {/* Punto neón sobre la órbita */}
                <span
                  className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{
                    background: ['#22d3ee', '#a855f7', '#ec4899'][i],
                    boxShadow: `0 0 14px ${['#22d3ee', '#a855f7', '#ec4899'][i]}`,
                  }}
                />
              </motion.div>
            ))}
          </div>

          {/* ---------- Contenido central ---------- */}
          <div className="relative flex flex-col items-center">
            {/* Etiqueta superior tipo terminal */}
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-5 font-mono text-[10px] uppercase tracking-[0.5em] text-neon-cyan/80"
            >
              {'<'} cargando portafolio {'/>'}
            </motion.span>

            {/* Nombre con efecto glitch + entrada por letra */}
            <h1 className="relative select-none font-display text-6xl font-extrabold tracking-tight sm:text-8xl">
              {/* Capa base */}
              <span className="relative z-10 flex">
                {word.split('').map((ch, i) => (
                  <motion.span
                    key={i}
                    className="inline-block text-white"
                    initial={{ y: '110%', opacity: 0, rotateX: -90 }}
                    animate={{ y: '0%', opacity: 1, rotateX: 0 }}
                    transition={{
                      delay: 0.25 + i * 0.08,
                      duration: 0.6,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {ch}
                  </motion.span>
                ))}
              </span>

              {/* Capas glitch (cyan / pink desfasadas) */}
              <motion.span
                aria-hidden
                className="absolute inset-0 z-0 text-neon-cyan"
                animate={{ x: [0, -3, 2, -2, 0], opacity: [0, 0.7, 0, 0.6, 0] }}
                transition={{
                  duration: 2.4,
                  ease: 'easeInOut',
                  repeat: Infinity,
                  repeatDelay: 0.6,
                }}
              >
                {word}
              </motion.span>
              <motion.span
                aria-hidden
                className="absolute inset-0 z-0 text-neon-pink"
                animate={{ x: [0, 3, -2, 2, 0], opacity: [0, 0.7, 0, 0.6, 0] }}
                transition={{
                  duration: 2.4,
                  ease: 'easeInOut',
                  repeat: Infinity,
                  repeatDelay: 0.6,
                  delay: 0.08,
                }}
              >
                {word}
              </motion.span>
            </h1>

            {/* Subtítulo con barrido de gradiente */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="mt-2 font-display text-xl font-semibold tracking-[0.3em] text-gradient sm:text-2xl"
            >
              PALMA
            </motion.span>
          </div>

          {/* ---------- Contador + barra inferior (full width) ---------- */}
          <div className="absolute inset-x-0 bottom-0">
            <div className="flex items-end justify-between px-6 pb-4 font-mono text-xs text-slate-500 sm:px-10">
              <span className="tracking-widest">EDGAR.DEV</span>
              <span className="text-5xl font-bold tabular-nums leading-none text-white sm:text-7xl">
                {pct.toString().padStart(3, '0')}
                <span className="text-gradient text-2xl sm:text-3xl">%</span>
              </span>
            </div>
            {/* Barra de progreso de ancho completo */}
            <div className="relative h-[3px] w-full bg-white/5">
              <motion.div
                className="absolute inset-y-0 left-0"
                style={{
                  backgroundImage:
                    'linear-gradient(90deg, #22d3ee, #a855f7, #ec4899)',
                  boxShadow: '0 0 18px rgba(168,85,247,0.7)',
                }}
                animate={{ width: `${pct}%` }}
                transition={{ ease: 'linear', duration: 0.15 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
