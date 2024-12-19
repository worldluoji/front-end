import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  Revenue,
} from './definitions';
import { formatCurrency } from './utils';
import { pool } from './pool';

export async function fetchRevenue(): Promise<Revenue[]> {
  let conn;
  try {
    conn = await pool.getConnection();
	  const rows = await conn.query("SELECT * FROM revenue");
    return rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  } finally {
    if (conn) conn.release(); //release to pool
  }
}

export async function fetchLatestInvoices() {
  let conn;
  try {
    conn = await pool.getConnection();
    const data = await conn.query(`SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5`);

    const latestInvoices = data.map((invoice: LatestInvoiceRaw) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  } finally {
    if (conn) conn.release(); //release to pool
  }
}

export async function fetchCardData() {
  let conn1;
  let conn2;
  let conn3;
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    conn1 = await pool.getConnection();
    conn2 = await pool.getConnection();
    conn3 = await pool.getConnection();

    const invoiceCountPromise = conn1.query(`SELECT COUNT(*) FROM invoices`);
    const customerCountPromise = conn2.query(`SELECT COUNT(*) FROM customers`);
    const invoiceStatusPromise = conn3.query(`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`);

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfInvoices = Number(data[0].length ?? '0');
    const numberOfCustomers = Number(data[1].length ?? '0');
    const totalPaidInvoices = formatCurrency(data[2].paid ?? '0');
    const totalPendingInvoices = formatCurrency(data[2].pending ?? '0');

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  } finally {
    if (conn1) conn1.release(); //release to pool
    if (conn2) conn2.release(); //release to pool
    if (conn3) conn3.release(); //release to pool
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  let conn;
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    conn = await pool.getConnection();
    // InvoicesTable
    let invoices: InvoicesTable[];
    if (query) {
      invoices = await conn.query(`
        SELECT
          invoices.id,
          invoices.amount,
          invoices.date,
          invoices.status,
          customers.name,
          customers.email,
          customers.image_url
        FROM invoices
        JOIN customers ON invoices.customer_id = customers.id
        WHERE
          customers.name LIKE ${`'%${query}%'`} OR
          customers.email LIKE ${`'%${query}%'`} OR
          invoices.date LIKE ${`'%${query}%'`} OR
          CONVERT(invoices.amount, CHAR) LIKE ${`'%${query}%'`} OR
          invoices.status LIKE ${`'%${query}%'`}
        ORDER BY invoices.date DESC
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
      `);
    } else {
      invoices = await conn.query(`
        SELECT
          invoices.id,
          invoices.amount,
          invoices.date,
          invoices.status,
          customers.name,
          customers.email,
          customers.image_url
        FROM invoices
        JOIN customers ON invoices.customer_id = customers.id
        ORDER BY invoices.date DESC
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
      `);
    }
  
    return invoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  } finally {
    if (conn) conn.release();
  }
}

export async function fetchInvoicesPages(query: string) {
  let conn;
  try {
    conn = await pool.getConnection();
    let count;
    if (query) {
      count = await conn.query(`SELECT COUNT(*) as totalPage
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name LIKE ${`'%${query}%'`} OR
        customers.email LIKE ${`'%${query}%'`} OR
        CONVERT(invoices.amount, CHAR) LIKE ${`'%${query}%'`} OR
        invoices.date LIKE ${`'%${query}%'`} OR
        invoices.status LIKE ${`'%${query}%'`}
     `);
    } else {
      count = await conn.query(`SELECT COUNT(*) as totalPage
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
     `);
    }
    
    // console.log('Total invoices:', count[0].totalPage, typeof count[0].totalPage);
    const totalPages = Math.ceil(Number(count[0].totalPage) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  } finally {
    if (conn) conn.release();
  }
}

export async function fetchInvoiceById(id: string) {
  let conn;
  try {
    conn = await pool.getConnection();
    const data: InvoiceForm[] = await conn.query(`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `);

    const invoice = data.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));

    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  } finally {
    if (conn) conn.release();
  }
}

export async function fetchCustomers() {
  let conn;
  try {
    conn = await pool.getConnection();
    const customers: CustomerField[] = await conn.query(`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `);

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  } finally {
    if (conn) conn.release();
  }
}

export async function fetchFilteredCustomers(query: string) {
  let conn;
  try {
    conn = await pool.getConnection();
    const data: CustomersTableType[] = await conn.query(`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name LIKE ${`'%${query}%'`} OR
        customers.email LIKE ${`'%${query}%'`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `);

    const customers = data.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  } finally {
    if (conn) conn.release();
  }
}
