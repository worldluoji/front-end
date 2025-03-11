
const products = [
    { name: 'Wireless Mouse', price: 25 },
    { name: 'Bluetooth Headphones', price: 75 },
    { name: 'Smartphone', price: 699 },
    { name: '4K Monitor', price: 300 },
    { name: 'Gaming Chair', price: 150 },
    { name: 'Mechanical Keyboard', price: 45 },
    { name: 'USB-C Cable', price: 10 },
    { name: 'External SSD', price: 120 }
  ];

const productsByBudget = Object.groupBy(products, product => {
    if (product.price < 50) return 'budget';
    if (product.price < 200) return 'mid-range';
    return 'premium';
});

console.log(productsByBudget);


const numbers = [1, 2, 3, 4];
const isGreaterTwo = Object.groupBy(numbers, x => x > 2);

console.log(isGreaterTwo);

// https://blog.logrocket.com/guide-object-groupby-alternative-array-reduce/
// https://www.npmjs.com/package/object.groupby