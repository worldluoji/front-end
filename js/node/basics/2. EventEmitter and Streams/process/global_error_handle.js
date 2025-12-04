process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
  });
  
process.on('uncaughtException', (err, type) => {
    console.log('Uncaught Exception thrown');
    console.log(err.stack, type);
});

// unhandledRejection
Promise.reject(new Error('Explosion!'));

// uncaughtException
setTimeout(() => {
    throw new Error('Explosion!');
}, 1000);