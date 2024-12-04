interface Point {
    x: number;
    y: number;
   [key: string]: any; // 或者更具体的类型
}

let point = {
    x: 10,
    y: 20,
    z: 30 // 这里多了一个属性 'z'
} satisfies Point;

// point 的类型是 { x: number, y: number, z: number }
// 它不仅符合 Point 接口，而且保留了 'z' 属性
let point2: Point = {
    x: 30,
    y: 50,
}

// point = point2 error


type Config = {
    theme: 'light' | 'dark';
    [key: string]: any;
};

const config = {
    theme: 'dark',
    version: 1 // 额外的属性
} satisfies Config;

// config 的类型是 { theme: "dark"; version: number; }
// 它符合 Config 类型，并且我们没有失去 'version' 属性的信息


type Direction = 'up' | 'down' | 'left' | 'right';

const move = 'up' satisfies Direction;

// move 的类型是 'up'，而不是 Direction