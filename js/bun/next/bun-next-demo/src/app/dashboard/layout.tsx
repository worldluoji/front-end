import { SortOrder } from "@/app/sortorder/sort-order"
export default function DashboardLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <section>
        {/* Include shared UI here e.g. a header or sidebar.
          Layouts are Server Components by default but can be set to a Client Component.
        */}
        <div className="ml-3">
          <SortOrder />
          {children}
        </div>
      </section>
    )
  }