import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * Effet machine à écrire cyclant sur une liste de mots.
 * Si l'utilisateur préfère moins d'animations → affiche simplement le 1er mot.
 */
export function useTypewriter(words, { typeSpeed = 90, deleteSpeed = 45, pause = 1600 } = {}) {
  const reduce = useReducedMotion()
  const [text, setText] = useState('')
  const [index, setIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (reduce) return
    const word = words[index % words.length]
    let timeout

    if (!deleting && text === word) {
      timeout = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && text === '') {
      setDeleting(false)
      setIndex((v) => (v + 1) % words.length)
    } else {
      const next = deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)
      timeout = setTimeout(() => setText(next), deleting ? deleteSpeed : typeSpeed)
    }

    return () => clearTimeout(timeout)
  }, [text, deleting, index, words, typeSpeed, deleteSpeed, pause, reduce])

  return reduce ? words[0] || '' : text
}
