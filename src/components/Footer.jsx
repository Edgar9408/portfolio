import { FiArrowUp } from 'react-icons/fi'
import { FaGithub, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa'
import { HiOutlineMail } from 'react-icons/hi'
import { useLang } from '../context/LanguageContext'
import { t, personal } from '../data/content'

export default function Footer() {
  const { tr } = useLang()
  const year = new Date().getFullYear()

  const socials = [
    { icon: FaGithub, href: personal.github, label: 'GitHub' },
    { icon: FaLinkedinIn, href: personal.linkedin, label: 'LinkedIn' },
    { icon: HiOutlineMail, href: `mailto:${personal.email}`, label: 'Email' },
    { icon: FaWhatsapp, href: personal.whatsapp, label: 'WhatsApp' },
  ]

  return (
    <footer className="border-t border-white/5 px-6 py-10 md:px-12">
      <div className="container-max flex flex-col items-center justify-between gap-6 md:flex-row">
        <div className="text-center md:text-left">
          <a href="#home" className="font-display text-lg font-semibold text-white">
            Edgar<span className="text-gradient">.dev</span>
          </a>
          <p className="mt-1 text-xs text-slate-500">
            © {year} {personal.fullName}. {tr(t.footer.rights)}
          </p>
          <p className="mt-0.5 text-xs text-slate-600">{tr(t.footer.builtWith)}</p>
        </div>

        <div className="flex items-center gap-3">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={s.label}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-slate-400 transition-all duration-300 hover:-translate-y-1 hover:text-white"
            >
              <s.icon size={16} />
            </a>
          ))}
          <a
            href="#home"
            aria-label="Back to top"
            className="grid h-10 w-10 place-items-center rounded-full bg-aurora text-white shadow-glow-violet transition-transform hover:-translate-y-1"
          >
            <FiArrowUp size={16} />
          </a>
        </div>
      </div>
    </footer>
  )
}
