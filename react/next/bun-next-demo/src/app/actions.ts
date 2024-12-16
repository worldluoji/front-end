'use server'
 
import { redirect } from 'next/navigation';
 
interface Response {
  ok: boolean;
  message?: string;
  data?: {
    [props: string]: string | number;
  };
}

interface FormState {
  message?: string;
}

export async function createUser(prevState: FormState, formData: FormData) {
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
        message: `${formData.get('email') || ''} please try again later.`
      });
    }, 1000);
  });

  if (!res.ok) {
    return { message: res.message };
  }

  prevState.message = 'User created successfully!';
 
  redirect('/dashboard');
}