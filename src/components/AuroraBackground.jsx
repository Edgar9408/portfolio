import { motion } from 'framer-motion'

// Fondo global: grid sutil + blobs aurora animados con blur.
export default function AuroraBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-base-900">
      <div className="absolute inset-0 bg-grid opacity-60" />

      {/* Blob cian */}
      <motion.div
        className="absolute -top-32 -left-32 h-[40rem] w-[40rem] rounded-full blur-[120px]"
        style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.22), transparent 70%)' }}
        animate={{ x: [0, 80, 0], y: [0, 60, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Blob violeta */}
      <motion.div
        className="absolute top-1/3 -right-40 h-[45rem] w-[45rem] rounded-full blur-[130px]"
        style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.22), transparent 70%)' }}
        animate={{ x: [0, -70, 0], y: [0, 90, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Blob rosa */}
      <motion.div
        className="absolute bottom-0 left-1/4 h-[35rem] w-[35rem] rounded-full blur-[120px]"
        style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.18), transparent 70%)' }}
        animate={{ x: [0, 60, 0], y: [0, -50, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Viñeta para dar profundidad */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(5,6,10,0.8)_100%)]" />
    </div>
  )
}
