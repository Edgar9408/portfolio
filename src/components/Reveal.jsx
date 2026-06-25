import { motion } from 'framer-motion'

// Wrapper de animación al hacer scroll. Reutilizable en todas las secciones.
export default function Reveal({ children, delay = 0, y = 28, className = '', once = true }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      // Margen inferior positivo: el reveal se dispara ANTES de que la sección
      // entre al viewport, así ya está visible cuando el usuario llega a ella
      // (evita ver el hueco "en blanco" al bajar rápido).
      viewport={{ once, margin: '0px 0px 200px 0px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

// Variantes para contenedores con stagger
export const staggerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

export const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}
