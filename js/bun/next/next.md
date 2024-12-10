# Next.js
Next.js is a React framework for <strong>building full-stack web applications</strong>. 
You use React Components to build user interfaces, and Next.js for additional features and optimizations.

Under the hood, Next.js also abstracts and automatically configures tooling needed for React, 
like bundling, compiling, and more. This allows you to focus on building your application instead of spending time with configuration.

<br>

## Suspense
```tsx
import { Suspense } from 'react'
import { PostFeed, Weather } from './Components'
 
export default function Posts() {
  return (
    <section>
      <Suspense fallback={<p>Loading feed...</p>}>
        <PostFeed />
      </Suspense>
      <Suspense fallback={<p>Loading weather...</p>}>
        <Weather />
      </Suspense>
    </section>
  )
}
```
By using Suspense, you get the benefits of:
- Streaming Server Rendering: Progressively rendering HTML from the server to the client.
- Selective Hydration: React prioritizes what components to make interactive first based on user interaction.

## reference
- https://nextjs.org/docs
- https://bun.sh/guides/ecosystem/nextjs
- https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming