import Reveal from './Reveal'

export default function SectionHeader({ kicker, title, subtitle }) {
  return (
    <div className="mb-14 text-center">
      {kicker && (
        <Reveal>
          <span className="kicker">{kicker}</span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="mt-5 font-display text-4xl font-bold tracking-tight text-white md:text-5xl">
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.1}>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-400 md:text-lg">{subtitle}</p>
        </Reveal>
      )}
    </div>
  )
}
