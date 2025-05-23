import SideNav from '@/app/ui/dashboard/sidenav';

import { Metadata } from 'next';
 
// Next.js will automatically add the title and metadata to your application.
export const metadata: Metadata = {
  title: 'Acme Dashboard',
  description: 'The official Next.js Course Dashboard, built with App Router.',
};

export const experimental_ppr = true;
/* 
* One benefit of using layouts in Next.js is that on navigation, only the page components update while the layout won't re-render. 
* This is called partial rendering.
* 
* children is page.tsx
*/
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}