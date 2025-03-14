import process from 'node:process';

// NODE_ENV=dev node app.js
console.log('Environment Variables:', process.env);
console.log('NODE_ENV:', process.env.NODE_ENV);