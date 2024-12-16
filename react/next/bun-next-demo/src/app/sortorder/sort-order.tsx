'use client'
 
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
 
function SetSortOrder() {
  const searchParams = useSearchParams()
 
  function updateSorting(sortOrder: string) {
    const params = new URLSearchParams(searchParams.toString())
    params.set('sort', sortOrder)
    window.history.pushState(null, '', `?${params.toString()}`)
  }

  return (
    <>
      <button onClick={() => updateSorting('asc')}>Sort Ascending</button>
      <button onClick={() => updateSorting('desc')}>Sort Descending</button>
    </>
  )
}

export function SortOrder() {
 
  /*
  * Reading search parameters through useSearchParams() without a Suspense boundary will opt the entire page into client-side rendering. 
  * This could cause your page to be blank until the client-side JavaScript has loaded.
  * https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
  */
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SetSortOrder />
    </Suspense>
  )
}