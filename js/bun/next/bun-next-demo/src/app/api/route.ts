
import { headers } from 'next/headers';
 
/**
* Route Handlers allow you to create custom request handlers for a given route 
* using the Web Request and Response APIs.
*/
export async function GET(request: Request) {
  console.log(request.method);
  const headersList = await headers();
  const referer = headersList.get('referer') || '';

  return new Response('Hello, Next.js!', {
    status: 200,
    headers: { referer: referer },
  });
}