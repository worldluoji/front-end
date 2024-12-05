import { useEffect } from "react"
import useAsync from '../../hooks/useAsync'

export default function UserList() {
  // 通过 useAsync 这个函数，只需要提供异步逻辑的实现
  const {
    execute: fetchUsers,
    data,
    loading,
    error,
  } = useAsync(async () => {
    // const res = await fetch("https://reqres.in/api/users/");
    // const json = await res.json();
    // return json.data;

    // mock request
    return new Promise((resolve) => {
        setTimeout(function () {
            resolve({
                data: [{id: 1, name: 'luoji1'}, {id: 2, name: 'luoji3'}]
            })
        }, 500)
    })
    
  })

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div>
        {loading ? (<p>Loading........</p>): error ? (<p>Failed.......</p>):
            <ul>
                { data.map(u => {
                    return (
                        <li key={u.id}>{ u.name }</li>
                    )
                })}
            </ul>
        }
    </div>
  )
}