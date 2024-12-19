'use server';

// we'll use Zod, a TypeScript-first validation library that can simplify this task for you.
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { pool } from './pool';
 
const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});
 
const CreateInvoice = FormSchema.omit({ id: true, date: true });
export async function createInvoice(formData: FormData) {
    // const rawFormData = Object.fromEntries(formData.entries())
    // const rawFormData = {
    //   customerId: formData.get('customerId'),
    //   amount: formData.get('amount'),
    //   status: formData.get('status'),
    // };
    // // Test it out:
    // console.log(rawFormData);
    // console.log(typeof rawFormData.amount);
    const { customerId, amount, status } = CreateInvoice.parse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });

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