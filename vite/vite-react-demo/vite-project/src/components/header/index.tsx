import styles from './index.module.scss'
import logoSrc from '@assets/logo-with-shadow.png'

export function Header() {
  return (
    <div className={styles.header}>
      <p className={styles.header_text}>This is Header</p>
      <img src={logoSrc} alt="" />
    </div>
  )
}
