'use client'
 
import { usePathname } from 'next/navigation'
import Link from 'next/link'
 
export function NavLinks() {
  const pathname = usePathname()
 
  return (
    <nav>
      <Link className={`link ${pathname === '/' ? 'active' : ''}`} href="/">
        Home
      </Link>
      
      <span> | </span>

      <Link
        className={`link ${pathname === '/dashboard' ? 'active' : ''}`}
        href="/dashboard"
      >
        Dashboard
      </Link>
    </nav>
  )
}