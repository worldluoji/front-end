// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};


/*
CREATE TABLE `customer` (
  `id` varchar(24) NOT NULL,
  `name` varchar(24) NOT NULL,
  `email` varchar(24) NOT NULL,
  `image_url` varchar(8) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;
*/
export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

/*
CREATE TABLE `invoices` (
  `id` varchar(24) NOT NULL,
  `customer_id` varchar(24) NOT NULL,
  `date` varchar(24) NOT NULL,
  `amount` int(11) NOT NULL,
  `status` varchar(8) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `customer_id` (`customer_id`)
) ENGINE=InnoDB;
*/
export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'paid';
};


/*
CREATE TABLE `revenue` (
  `month` varchar(8) NOT NULL,
  `revenue` int(11) NOT NULL
) ENGINE=InnoDB;
*/
export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};
