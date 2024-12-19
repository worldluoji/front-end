import { customers, invoices, revenue } from './placeholder-data';

import { pool } from './pool';

const insertCustomers = async () => {
  let conn;
  const query = `INSERT INTO customers (id, name, email, image_url) VALUES (?,?,?,?)`;
  const values = customers.map((customer) => [
    customer.id,
    customer.name,
    customer.email,
    customer.image_url,
  ]);

  try {
    conn = await pool.getConnection();
    await conn.beginTransaction();
    const res = await conn.batch(query, values);
    await conn.commit();
    console.log(`Committed`, res);
  } catch(err) {
    if (conn) {
      await conn.rollback();
      console.error("Transaction rollback due to error:", err);
    }
    throw err;
  } finally {
    if (conn) conn.release();
  }
};

const insertInvoices = async () => {
    let conn;
    const query = `INSERT INTO invoices (id, customer_id, amount, date, status) VALUES (?,?,?,?,?)`;
    const values = invoices.map((invoice) => [
      invoice.id,
      invoice.customer_id,
      invoice.amount,
      invoice.date,
      invoice.status,
    ]);
    try {
      conn = await pool.getConnection();
      await conn.beginTransaction();
      const res = await conn.batch(query, values);
      await conn.commit();
      console.log(`Committed`, res);
    } catch(err) {
      if (conn) {
        await conn.rollback();
        console.error("Transaction rollback due to error:", err);
      }
      throw err;
    } finally {
      if (conn) conn.release();
    }
};

const insertRevenue = async () => {
    let conn;
    const query = `INSERT INTO revenue (month, revenue) VALUES (?,?)`;
    const values = revenue.map((revenueItem) => [
      revenueItem.month,
      revenueItem.revenue,
    ]);
    try {
      conn = await pool.getConnection();
      await conn.beginTransaction();
      const res = await conn.batch(query, values);
      await conn.commit();
      console.log(`Committed`, res);
    } catch(err) {
      if (conn) {
        await conn.rollback();
        console.error("Transaction rollback due to error:", err);
      }
      throw err;
    } finally {
      if (conn) conn.release();
    }
};

export const addAllFakeData = async () => {
    await insertCustomers();
    await insertInvoices();
    await insertRevenue();
};