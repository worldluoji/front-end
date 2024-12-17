import DashboardSkeleton from '@/app/ui/skeletons';
 
// 放在(overview)里，Loading.jsx只会对page.tsx起作用；放在外面，会影响所有页面，包括customer和invoices
export default function Loading() {
  return <DashboardSkeleton />;
}