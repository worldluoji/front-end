## Next.js App Router Course - Starter

This is the starter template for the Next.js App Router Course. It contains the starting code for the dashboard application.

For more information, see the [course curriculum](https://nextjs.org/learn) on the Next.js Website.

directory structure:
- /app: Contains all the routes, components, and logic for your application, this is where you'll be mostly working from.
- /app/lib: Contains functions used in your application, such as reusable utility functions and data fetching functions.
- /app/ui: Contains all the UI components for your application, such as cards, tables, and forms. To save time, we've pre-styled these components for you.
- /public: Contains all the static assets for your application, such as images.
- Config Files: You'll also notice config files such as next.config.js at the root of your application. Most of these files are created and pre-configured when you start a new project using create-next-app. You will not need to modify them in this course.


## 数据
项目的假数据通过 react/next/nextjs-dashboard/app/lib/insert-fake-data.ts 获取。使用的是 mariadb。

## reference
- https://github.com/lukeed/clsx : clsx is a tiny (239B) utility for constructing className strings conditionally.  -> /app/ui/invoices/status.tsx
- https://nextjs.org/learn/dashboard-app/next-steps