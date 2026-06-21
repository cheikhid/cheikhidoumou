import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * À chaque changement de route : remonte en haut et déplace le focus sur <main>
 * (accessibilité — annonce le changement de page aux technologies d'assistance).
 */
export default function RouteFocus() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
    const main = document.getElementById('main')
    if (main) main.focus({ preventScroll: true })
  }, [pathname])

  return null
}
