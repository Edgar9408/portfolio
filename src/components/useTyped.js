import { useEffect, useRef, useState } from 'react'

// Efecto máquina de escribir: recorre un array de frases, escribe y borra.
export default function useTyped(words, { typeSpeed = 70, deleteSpeed = 40, pause = 1600 } = {}) {
  const [text, setText] = useState('')
  const [index, setIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const timeout = useRef(null)

  // Reinicia si cambia el set de palabras (cambio de idioma)
  useEffect(() => {
    setText('')
    setIndex(0)
    setDeleting(false)
  }, [words])

  useEffect(() => {
    if (!words || words.length === 0) return
    const current = words[index % words.length]

    if (!deleting && text === current) {
      timeout.current = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && text === '') {
      setDeleting(false)
      setIndex((i) => (i + 1) % words.length)
    } else {
      timeout.current = setTimeout(() => {
        setText((prev) =>
          deleting ? current.slice(0, prev.length - 1) : current.slice(0, prev.length + 1)
        )
      }, deleting ? deleteSpeed : typeSpeed)
    }

    return () => clearTimeout(timeout.current)
  }, [text, deleting, index, words, typeSpeed, deleteSpeed, pause])

  return text
}
