import * as React from 'react'
import styles from './ScrollReelTestimonials.module.css'

/* ----------------------------------------------------------------
 * ScrollReelTestimonials — porté de shadcn/Tailwind vers CSS Modules.
 * Reel de portraits contra-rotatif + montée du texte caractère par
 * caractère. La colonne centrale translate d'un « pas » par étape ;
 * les colonnes latérales contra-rotatent. Le reflet a été re-teinté en or.
 * ---------------------------------------------------------------- */

/* Géométrie — pas entre centres de portraits : 3 * (cellule 121.33 + gap 8) = 388px */
const CELL = 121.33
const GAP = 8
const STEP = 3 * (CELL + GAP)

const EXIT_MS = 240 // ancien texte retiré / nouveau monté
const SLIDE_MS = 800 // durée du glissement + verrou d'interaction
const EASE_INOUT = 'cubic-bezier(0.65,0,0.35,1)'

const FEATURED_SHADOW =
  '0 1.008px 0.705px -0.563px rgba(0,0,0,0.18), 0 2.389px 1.672px -1.125px rgba(0,0,0,0.17), 0 4.357px 3.05px -1.688px rgba(0,0,0,0.17), 0 7.244px 5.07px -2.25px rgba(0,0,0,0.16), 0 11.698px 8.188px -2.813px rgba(0,0,0,0.15), 0 19.148px 13.404px -3.375px rgba(0,0,0,0.13), 0 32.972px 23.08px -3.938px rgba(0,0,0,0.09), 0 60px 42px -4.5px rgba(0,0,0,0.02), inset 0 1px 0 rgba(255,255,255,0.7), inset 0 -1px 0 rgba(0,0,0,0.6)'

/* Reflet diagonal — re-teinté « or » (au lieu du violet/bleu d'origine) */
const SHEEN_GRADIENT =
  'linear-gradient(220.99deg, rgba(201,169,104,0) 32%, rgb(230,200,134) 41%, rgb(245,225,170) 47%, rgba(201,169,104,0.55) 54%, rgba(201,169,104,0) 65%)'

function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

function Cell() {
  return <div aria-hidden="true" className={styles.cell} style={{ width: CELL, height: CELL }} />
}

function Featured({ src, alt }) {
  return (
    <div
      className={styles.featured}
      style={{ width: CELL, height: CELL, boxShadow: FEATURED_SHADOW }}
    >
      <img src={src} alt={alt ?? ''} loading="lazy" className={styles.featuredImg} />
      <div aria-hidden="true" className={styles.overlaySat} />
      <div aria-hidden="true" className={styles.overlaySheen} style={{ background: SHEEN_GRADIENT }} />
    </div>
  )
}

/* Découpe par caractère : les espaces restent entre les mots (nœuds texte)
 * pour préserver le retour à la ligne naturel. Chaque char monte avec un
 * animation-delay inline. */
function Chars({ text, startIndex, staggerMs }) {
  let idx = startIndex
  const words = text.split(' ')
  return (
    <>
      {words.map((word, wi) => {
        const wordSpan = (
          <span className={styles.word}>
            {Array.from(word).map((ch, ci) => {
              const delay = idx * staggerMs
              idx++
              return (
                <span key={ci} className={styles.char} style={{ animationDelay: `${delay}ms` }}>
                  {ch}
                </span>
              )
            })}
          </span>
        )
        if (wi < words.length - 1) idx++
        return (
          <React.Fragment key={wi}>
            {wordSpan}
            {wi < words.length - 1 ? ' ' : null}
          </React.Fragment>
        )
      })}
    </>
  )
}

export function ScrollReelTestimonials({ testimonials, charStaggerMs = 6, className }) {
  /* État de navigation vs état d'affichage séparés : le bloc sortant et le
   * bloc entrant ne sont jamais rendus en même temps. */
  const [index, setIndex] = React.useState(0)
  const [displayIndex, setDisplayIndex] = React.useState(0)
  const [exiting, setExiting] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)
  const animating = React.useRef(false)
  const timeouts = React.useRef([])

  const count = testimonials.length

  React.useEffect(() => {
    /* Active les transitions de colonnes seulement après le premier paint,
     * pour que le reel apparaisse à son offset de départ sans glissement. */
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => setMounted(true)))
    const pending = timeouts.current
    return () => {
      cancelAnimationFrame(raf)
      pending.forEach(clearTimeout)
    }
  }, [])

  const paginate = React.useCallback(
    (dir) => {
      if (animating.current) return
      const next = index + dir
      if (next < 0 || next >= count) return
      animating.current = true

      setIndex(next)
      setExiting(true)

      timeouts.current.push(
        setTimeout(() => {
          setDisplayIndex(next)
          setExiting(false)
        }, EXIT_MS)
      )
      timeouts.current.push(
        setTimeout(() => {
          animating.current = false
        }, SLIDE_MS)
      )
    },
    [index, count]
  )

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      paginate(1)
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      paginate(-1)
    }
  }

  /* Colonne centrale : 3 cellules de tête, puis featured + 2 cellules entre
   * chaque témoignage, puis 3 cellules de queue. */
  const middleItems = React.useMemo(() => {
    const items = []
    for (let i = 0; i < 3; i++) items.push({ type: 'cell' })
    testimonials.forEach((_, i) => {
      items.push({ type: 'featured', i })
      if (i < count - 1) {
        items.push({ type: 'cell' }, { type: 'cell' })
      }
    })
    for (let i = 0; i < 3; i++) items.push({ type: 'cell' })
    return items
  }, [testimonials, count])

  const sideCellCount = 4 + 2 * count
  const centerIdx = (count - 1) / 2
  const middleY = (centerIdx - index) * STEP
  const sideY = -middleY

  const colStyle = (y) => ({
    transform: `translateY(${y}px)`,
    transition: mounted ? `transform ${SLIDE_MS}ms ${EASE_INOUT}` : 'none',
  })

  const current = testimonials[displayIndex]

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Témoignages"
      tabIndex={0}
      onKeyDown={onKeyDown}
      className={cn(styles.root, className)}
    >
      {/* Reel */}
      <div
        aria-hidden="true"
        className={styles.reel}
        style={{
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
          maskImage:
            'linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
          WebkitMaskComposite: 'source-in',
          maskComposite: 'intersect',
        }}
      >
        <div className={styles.reelInner}>
          <div className={styles.col} style={colStyle(sideY)}>
            {Array.from({ length: sideCellCount }).map((_, i) => (
              <Cell key={i} />
            ))}
          </div>

          <div className={styles.col} style={colStyle(middleY)}>
            {middleItems.map((item, i) =>
              item.type === 'featured' ? (
                <Featured key={i} src={testimonials[item.i].image} alt={testimonials[item.i].alt} />
              ) : (
                <Cell key={i} />
              )
            )}
          </div>

          <div className={styles.col} style={colStyle(sideY)}>
            {Array.from({ length: sideCellCount }).map((_, i) => (
              <Cell key={i} />
            ))}
          </div>
        </div>
      </div>

      {/* Contenu */}
      <div className={styles.content}>
        <div className={styles.contentTop}>
          <svg
            className={styles.quoteIcon}
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M4.58 17.32C3.55 16.23 3 15 3 13.01c0-3.5 2.46-6.64 6.03-8.19l.9 1.38c-3.34 1.8-4 4.15-4.25 5.62.54-.28 1.24-.38 1.93-.31 1.8.17 3.23 1.65 3.23 3.49a3.5 3.5 0 0 1-3.5 3.5c-1.07 0-2.1-.49-2.75-1.18zm10 0C13.55 16.23 13 15 13 13.01c0-3.5 2.46-6.64 6.03-8.19l.9 1.38c-3.34 1.8-4 4.15-4.25 5.62.54-.28 1.24-.38 1.93-.31 1.8.17 3.23 1.65 3.23 3.49a3.5 3.5 0 0 1-3.5 3.5c-1.07 0-2.1-.49-2.75-1.18z" />
          </svg>

          <div className={styles.stage} aria-live="polite">
            {/* Copie invisible en flux : dimensionne le stage sur la citation
              * courante à toute largeur, pour que le texte wrappé ne soit pas coupé. */}
            <div aria-hidden="true" className={styles.sizer}>
              <p className={styles.quote}>{current.quote}</p>
              <p className={styles.author}>{current.author}</p>
            </div>
            <div key={displayIndex} className={cn(styles.block, exiting && styles.exit)}>
              <p className={styles.quote}>
                <Chars text={current.quote} startIndex={0} staggerMs={charStaggerMs} />
              </p>
              <p className={styles.author}>
                <Chars
                  text={current.author}
                  startIndex={current.quote.length + 6}
                  staggerMs={charStaggerMs}
                />
              </p>
            </div>
          </div>
        </div>

        <div className={styles.controls}>
          <button
            type="button"
            onClick={() => paginate(-1)}
            disabled={index === 0}
            aria-label="Témoignage précédent"
            className={styles.navBtn}
          >
            <svg
              className={styles.navIcon}
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7.5 2.5 3.5 6l4 3.5" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => paginate(1)}
            disabled={index === count - 1}
            aria-label="Témoignage suivant"
            className={styles.navBtn}
          >
            <svg
              className={styles.navIcon}
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m4.5 2.5 4 3.5-4 3.5" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ScrollReelTestimonials
