// 让我们用代码直观感受这种差异
console.log("🏁 开始点餐流程...");

// 模拟传统阻塞式服务
function traditionalService() {
    console.log("👨‍🍳 服务员A开始为顾客1点餐");
    // 模拟点餐和等待的阻塞时间
    const start = Date.now();
    while (Date.now() - start < 2000) {
        // 阻塞等待2秒
    }
    console.log("✅ 顾客1点餐完成");
}

// 模拟Node.js非阻塞服务
function nodejsService(customer, callback) {
    console.log(`🦌 服务员开始为${customer}记录订单`);
    // 非阻塞 - 立即返回，后续回调
    setTimeout(() => {
        callback(`${customer}的菜品准备好了！`);
    }, 2000);
}

console.log("--- 传统模式测试 ---");
traditionalService(); // 会阻塞后续操作
console.log("❌ 其他顾客在等待...");

console.log("--- Node.js模式测试 ---");
nodejsService("顾客1", (result) => {
    console.log(`✅ ${result}`);
});
console.log("🦌 服务员已去服务其他顾客...");