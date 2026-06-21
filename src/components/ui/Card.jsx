import styles from './Card.module.css'

export default function Card({
  as: Tag = 'div',
  children,
  className = '',
  interactive = false,
  ...rest
}) {
  return (
    <Tag
      className={`${styles.card} ${interactive ? styles.interactive : ''} ${className}`.trim()}
      {...rest}
    >
      {children}
    </Tag>
  )
}
