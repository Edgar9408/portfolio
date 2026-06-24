import { createContext, useContext, useEffect, useState } from 'react'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const saved = typeof window !== 'undefined' && localStorage.getItem('lang')
    if (saved) return saved
    const browser = typeof navigator !== 'undefined' ? navigator.language : 'es'
    return browser.startsWith('en') ? 'en' : 'es'
  })

  useEffect(() => {
    localStorage.setItem('lang', lang)
    document.documentElement.lang = lang
  }, [lang])

  const toggle = () => setLang((l) => (l === 'es' ? 'en' : 'es'))

  // Helper: resuelve un campo { es, en } o devuelve el valor tal cual
  const tr = (field) => {
    if (field == null) return ''
    if (typeof field === 'object' && (field.es !== undefined || field.en !== undefined)) {
      return field[lang] ?? field.es ?? ''
    }
    return field
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle, tr }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used within LanguageProvider')
  return ctx
}
