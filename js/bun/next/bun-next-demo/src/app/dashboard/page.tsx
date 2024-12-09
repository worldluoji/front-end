
import type { Metadata } from 'next'

// You can modify the <head> HTML elements such as title and meta using the Metadata APIs.
export const metadata: Metadata = {
  title: 'Dashboard',
}
 
export default function Page() {
    return <h1>Hello, Dashboard Page!</h1>
}