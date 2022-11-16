import styles from './index.module.scss'
import logoSrc from '@assets/logo-with-shadow.png'
import { ReactComponent as ReactLogo } from '@assets/react.svg'
import { version } from '../../../package.json'
import React from 'react'

const Hello = React.lazy(()=> import('./hello'))

export function Header() {
  return (
    <div className={styles.header}>
      <p className={styles.header_text}>
        <Hello />
        version: { version }
        <ReactLogo />
      </p>
      <img src={logoSrc} alt="" />
    </div>
  )
}
