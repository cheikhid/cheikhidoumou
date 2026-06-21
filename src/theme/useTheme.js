import { useContext } from 'react'
import { ThemeContext } from './ThemeProvider.jsx'

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme doit être utilisé dans un <ThemeProvider>')
  return ctx
}
