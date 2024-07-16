let url = `https://a.b.com/c/d?foo=bar&alo=ha`

function parse(url) {
  return [...new URL(url).searchParams].reduce(
    (cur, [key, value]) => ((cur[key] = value), cur),
    {}
  )
}

console.log(parse(url)) // {foo: "bar", alo: "ha"}

console.log(new URL(url))

// 获取 url 参数有个热门的库 query-string