// you can visit it by http://localhost:3000/dynamic/a
export default async function Page({
    params,
  }: {
    params: Promise<{ slug: string }>
  }) {
    const slug = (await params).slug
    return <div>My Post: {slug}</div>
  }