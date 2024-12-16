
import type { Metadata } from 'next';
import Link from 'next/link';
// You can modify the <head> HTML elements such as title and meta using the Metadata APIs.
export const metadata: Metadata = {
  title: 'Dashboard',
}
 
export default function Page() {
    return (
      <>
         <h1>Hello, Dashboard Page!</h1>
         <Link href="/photo" className="bg-blue-400 rounded p-1">to photo page</Link>
      </>
    )
}