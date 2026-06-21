import { motion, useReducedMotion } from 'framer-motion'

/**
 * Apparition au scroll (transform + opacity uniquement → GPU).
 * Neutralisée automatiquement si l'utilisateur préfère moins d'animations.
 */
export default function Reveal({
  as = 'div',
  children,
  delay = 0,
  y = 24,
  className,
  ...rest
}) {
  const reduce = useReducedMotion()

  if (reduce) {
    const Tag = as
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    )
  }

  const MotionTag = motion[as] || motion.div
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}
