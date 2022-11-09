import styles from './index.module.scss'
import logoSrc from '@assets/logo-with-shadow.png'
import { ReactComponent as ReactLogo } from '@assets/react.svg';

export function Header() {
  return (
    <div className={styles.header}>
      <p className={styles.header_text}>
        This is Header
        <ReactLogo />
      </p>
      <img src={logoSrc} alt="" />
    </div>
  )
}
