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
        <p>shared content</p>
   
        {children}
      </section>
    )
  }