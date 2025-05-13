export default function test() {
    console.log('test');
    const someURLInfo = new URL(import.meta.url).searchParams.get("someURLInfo"); // 5
    console.log(`someURLInfo=${someURLInfo}`);
    console.log(`meta url is ${import.meta.url}`);
    console.log(`location url is ${location.href}`);
}