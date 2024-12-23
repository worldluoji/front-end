'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

// we'll use Zod, a TypeScript-first validation library that can simplify this task for you.
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { pool } from './pool';
 
const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  amount: z.coerce.number()
            .gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.'
  }),
  date: z.string(),
});
 
const CreateInvoice = FormSchema.omit({ id: true, date: true });

export type State = {
    errors?: {
      customerId?: string[];
      amount?: string[];
      status?: string[];
    };
    message?: string | null;
};

/**
* formData - 提交的表单数据
* prevState - contains the state passed from the useActionState hook. You won't be using it in the action in this example, but it's a required prop.
*/
export async function createInvoice(prevState: State, formData: FormData) {
    // const rawFormData = Object.fromEntries(formData.entries())
    // const rawFormData = {
    //   customerId: formData.get('customerId'),
    //   amount: formData.get('amount'),
    //   status: formData.get('status'),
    // };
    // // Test it out:
    // console.log(rawFormData);
    // console.log(typeof rawFormData.amount);
    const validatedFields = CreateInvoice.safeParse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Invoice.',
        };
    }

    const { customerId, amount, status } = validatedFields.data;

    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];

    let conn;
    try  {
        conn = await pool.getConnection();
        const sql =  `INSERT INTO invoices (id, customer_id, amount, status, date) VALUES (?,?,?,?,?)`;
        await conn.query(sql, [uuidv4(), customerId, amountInCents, status, date]);
    } catch (error) {
        console.error('Error connecting to the database:', error);
        throw error;
    } finally {
        if (conn) conn.release();
    }
    

    /*
      Next.js has a Client-side Router Cache that stores the route segments in the user's browser for a time. 
      Along with prefetching, this cache ensures that users can quickly navigate between routes while reducing the number of requests made to the server.

      Since you're updating the data displayed in the invoices route, you want to clear this cache and trigger a new request to the server. 
      You can do this with the revalidatePath function from Next.js:
    */
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}

// Use Zod to update the expected types
const UpdateInvoice = FormSchema.omit({ id: true, date: true });
 
// ...
 
export async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
 
  const amountInCents = amount * 100;
 
  let conn;
  try  {
      conn = await pool.getConnection();
      const sql =  `UPDATE invoices
    SET customer_id = (?), amount = (?), status = (?)
    WHERE id = (?)`;
      await conn.query(sql, [customerId, amountInCents, status, id]);
  } catch (error) {
      console.error('Error connecting to the database:', error);
      throw error;
  } finally {
      if (conn) conn.release();
  }
  
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
    let conn;
    try  {
        conn = await pool.getConnection();
        const sql =  `DELETE FROM invoices WHERE id = ?`;
        await conn.query(sql, [id]);
    } catch (error) {
        console.error('Error connecting to the database:', error);
        throw error;
    } finally {
        if (conn) conn.release();
    }
    revalidatePath('/dashboard/invoices');
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}