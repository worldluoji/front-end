const orders = [
    { category: 'electronics', title: 'Smartphone', amount: 100 },
    { category: 'electronics', title: 'Laptop', amount: 200 },
    { category: 'clothing', title: 'T-shirt', amount: 50 },
    { category: 'clothing', title: 'Jacket', amount: 100 },
    { category: 'groceries', title: 'Apples', amount: 10 },
];

// 实现类似 groupBy 的效果，这里按照 category 进行分组
const groupedByCategory = orders.reduce((acc, order) => {
    const { category } = order;
    // Check if the category key exists in the accumulator object
    if (!acc[category]) {
        // If not, initialize it with an empty array
        acc[category] = [];
    }
    // Push the order into the appropriate category array
    acc[category].push(order);
    return acc;
}, {});

console.log(groupedByCategory);