import { Link } from 'react-router-dom'
import styles from './Button.module.css'

export default function Button({
  children,
  variant = 'primary',
  to,
  href,
  onClick,
  download,
  external = false,
  className = '',
  type = 'button',
  ...rest
}) {
  const cls = `${styles.btn} ${styles[variant] || ''} ${className}`.trim()

  if (to) {
    return (
      <Link to={to} className={cls} {...rest}>
        {children}
      </Link>
    )
  }

  if (href) {
    const ext = external ? { target: '_blank', rel: 'noopener noreferrer' } : {}
    return (
      <a href={href} className={cls} download={download} {...ext} {...rest}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} className={cls} onClick={onClick} {...rest}>
      {children}
    </button>
  )
}
