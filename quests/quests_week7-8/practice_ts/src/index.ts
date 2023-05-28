const message: string = "Hello, TypeScript";

console.log(message);

const width1 = 5;
const width2 = 8;
const height:number = 3;
const area = (width1 + width2) * height / 2;
console.log(area);

// 数値リテラル
// 2進数リテラル
const binaryLiteral: number = 0b1010;
console.log(binaryLiteral);

// 8進数リテラル
const octalLiteral: number = 0o744;
console.log(octalLiteral);

// 16進数リテラル
const hexLiteral: number = 0xf00d;
console.log(hexLiteral);

// 指数標記のリテラル
const exponentialLiteral: number = 6e3;
console.log(exponentialLiteral);

// 数値リテラル区切り文字
const million = 1_000_000;
console.log(million);