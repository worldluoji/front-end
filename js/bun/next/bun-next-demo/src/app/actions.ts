'use server'
 
import { redirect } from 'next/navigation';
 
interface Response {
  ok: boolean;
  message?: string;
  data?: {
    [props: string]: string | number;
  };
}
export async function createUser(prevState: any, formData: FormData) {
  /*
  const res = await fetch('https://jsonplaceholder.typicode.com/users', {
    method: 'POST',
    body: JSON.stringify({
      name: formData.get('name'),
      email: formData.get('email'),
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  const json = await res.json();
  */
  // mock
  const res = await new Promise<Response>((resolve) => {
    setTimeout(() => {
      resolve({
        ok: false,
        message: 'Please try again later.'
      });
    }, 1000);
  });

  if (!res.ok) {
    return { message: res.message };
  }
 
  redirect('/dashboard');
}