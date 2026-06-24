import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { motion } from 'framer-motion'
import { FiSend, FiMail, FiMapPin } from 'react-icons/fi'
import { FaGithub, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa'
import { useLang } from '../context/LanguageContext'
import { t, personal, emailjsConfig } from '../data/content'
import SectionHeader from '../components/SectionHeader'
import Reveal from '../components/Reveal'

export default function Contact() {
  const { tr, lang } = useLang()
  const formRef = useRef(null)
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const channels = [
    { icon: FiMail, label: personal.email, href: `mailto:${personal.email}` },
    { icon: FaLinkedinIn, label: 'LinkedIn', href: personal.linkedin },
    { icon: FaGithub, label: 'GitHub', href: personal.github },
    { icon: FaWhatsapp, label: 'WhatsApp', href: personal.whatsapp },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    const configured =
      emailjsConfig.serviceId !== 'TU_SERVICE_ID' &&
      emailjsConfig.publicKey !== 'TU_PUBLIC_KEY'

    if (!configured) {
      // Sin EmailJS configurado: abre el cliente de correo como fallback.
      const data = new FormData(formRef.current)
      const subject = encodeURIComponent(`Portafolio — ${data.get('user_name')}`)
      const body = encodeURIComponent(`${data.get('message')}\n\n${data.get('user_email')}`)
      window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`
      setStatus('idle')
      return
    }

    try {
      await emailjs.sendForm(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        formRef.current,
        { publicKey: emailjsConfig.publicKey }
      )
      setStatus('success')
      formRef.current.reset()
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="section-pad">
      <div className="container-max">
        <SectionHeader kicker={tr(t.contact.kicker)} title={tr(t.contact.title)} />

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Info / canales */}
          <Reveal>
            <div className="flex h-full flex-col justify-between gap-8">
              <div>
                <p className="text-lg leading-relaxed text-slate-300">{tr(t.contact.intro)}</p>
                <div className="mt-6 flex items-center gap-2 text-sm text-slate-400">
                  <FiMapPin className="text-neon-cyan" /> {personal.location[lang]}
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {channels.map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    target="_blank"
                    rel="noreferrer"
                    className="glass glass-hover flex items-center gap-3 p-4 text-sm text-slate-300"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/10 bg-aurora-soft text-neon-violet">
                      <c.icon size={16} />
                    </span>
                    <span className="truncate">{c.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Formulario */}
          <Reveal delay={0.1}>
            <form ref={formRef} onSubmit={handleSubmit} className="glass border-gradient space-y-4 p-7">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field name="user_name" label={tr(t.contact.form.name)} type="text" />
                <Field name="user_email" label={tr(t.contact.form.email)} type="email" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-slate-400">
                  {tr(t.contact.form.message)}
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-slate-600 focus:border-neon-violet/50 focus:bg-white/[0.05]"
                  placeholder="..."
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn-primary w-full disabled:opacity-60"
              >
                {status === 'sending' ? tr(t.contact.form.sending) : tr(t.contact.form.send)}
                <FiSend />
              </button>

              {status === 'success' && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-sm text-emerald-400"
                >
                  {tr(t.contact.form.success)}
                </motion.p>
              )}
              {status === 'error' && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-sm text-rose-400"
                >
                  {tr(t.contact.form.error)}
                </motion.p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Field({ name, label, type }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-slate-400">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required
        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-slate-600 focus:border-neon-violet/50 focus:bg-white/[0.05]"
      />
    </div>
  )
}
