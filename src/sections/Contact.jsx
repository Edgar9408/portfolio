import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { motion } from 'framer-motion'
import { FiSend, FiMail, FiMapPin } from 'react-icons/fi'
import { FaGithub, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa'
import { useLang } from '../context/LanguageContext'
import { t, personal, emailjsConfig } from '../data/content'
import SectionHeader from '../components/SectionHeader'
import Reveal from '../components/Reveal'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const initialValues = { user_name: '', user_email: '', message: '' }

export default function Contact() {
  const { tr, lang } = useLang()
  const formRef = useRef(null)
  const honeypotRef = useRef(null)
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})

  const channels = [
    { icon: FiMail, label: personal.email, href: `mailto:${personal.email}` },
    { icon: FaLinkedinIn, label: 'LinkedIn', href: personal.linkedin },
    { icon: FaGithub, label: 'GitHub', href: personal.github },
    { icon: FaWhatsapp, label: 'WhatsApp', href: personal.whatsapp },
  ]

  // Devuelve la CLAVE del error de un campo (o '' si es válido).
  // Se guarda la clave —no el texto— para traducir en cada render y que
  // los mensajes cambien de idioma junto con el resto de la página.
  const validateField = (name, raw) => {
    const v = (raw ?? '').trim()
    switch (name) {
      case 'user_name':
        if (!v) return 'nameRequired'
        if (v.length < 2) return 'nameShort'
        return ''
      case 'user_email':
        if (!v) return 'emailRequired'
        if (!EMAIL_RE.test(v)) return 'emailInvalid'
        return ''
      case 'message':
        if (!v) return 'messageRequired'
        if (v.length < 10) return 'messageShort'
        return ''
      default:
        return ''
    }
  }

  // Traduce una clave de error a texto en el idioma actual
  const errorText = (key) => (key ? tr(t.contact.form.errors[key]) : '')

  const validateAll = () => {
    const next = {}
    Object.keys(initialValues).forEach((name) => {
      const msg = validateField(name, values[name])
      if (msg) next[name] = msg
    })
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
    // Si el campo ya tenía error, revalida en vivo para limpiarlo al corregir
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }))
    }
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Anti-spam: si el honeypot está lleno, lo trata un bot. Fingimos éxito.
    if (honeypotRef.current?.value) {
      setStatus('success')
      setValues(initialValues)
      return
    }

    if (!validateAll()) return

    setStatus('sending')

    const configured =
      emailjsConfig.serviceId !== 'TU_SERVICE_ID' &&
      emailjsConfig.publicKey !== 'TU_PUBLIC_KEY'

    if (!configured) {
      // Sin EmailJS configurado: abre el cliente de correo como fallback.
      const subject = encodeURIComponent(`Portafolio — ${values.user_name}`)
      const body = encodeURIComponent(`${values.message}\n\n${values.user_email}`)
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
      setValues(initialValues)
      setErrors({})
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
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              noValidate
              className="glass border-gradient space-y-4 p-7"
            >
              {/* Honeypot anti-spam: invisible para humanos, tentador para bots */}
              <input
                ref={honeypotRef}
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute left-[-9999px] h-0 w-0 opacity-0"
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  name="user_name"
                  label={tr(t.contact.form.name)}
                  type="text"
                  value={values.user_name}
                  error={errorText(errors.user_name)}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Field
                  name="user_email"
                  label={tr(t.contact.form.email)}
                  type="email"
                  value={values.user_email}
                  error={errorText(errors.user_email)}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-slate-400"
                >
                  {tr(t.contact.form.message)}
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  value={values.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!errors.message}
                  className={`w-full resize-none rounded-xl border bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-slate-600 focus:bg-white/[0.05] ${
                    errors.message
                      ? 'border-rose-500/60 focus:border-rose-500/60'
                      : 'border-white/10 focus:border-neon-violet/50'
                  }`}
                  placeholder="..."
                />
                {errors.message && (
                  <p className="mt-1.5 text-xs text-rose-400">{errorText(errors.message)}</p>
                )}
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

function Field({ name, label, type, value, error, onChange, onBlur }) {
  return (
    <div>
      <label
        htmlFor={`contact-${name}`}
        className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-slate-400"
      >
        {label}
      </label>
      <input
        id={`contact-${name}`}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        aria-invalid={!!error}
        className={`w-full rounded-xl border bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-slate-600 focus:bg-white/[0.05] ${
          error
            ? 'border-rose-500/60 focus:border-rose-500/60'
            : 'border-white/10 focus:border-neon-violet/50'
        }`}
      />
      {error && <p className="mt-1.5 text-xs text-rose-400">{error}</p>}
    </div>
  )
}
