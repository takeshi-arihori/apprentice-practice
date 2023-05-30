const message: string = "Hello, TypeScript";

// console.log(message);

const width1 = 5;
const width2 = 8;
const height: number = 3;
const area = ((width1 + width2) * height) / 2;
// console.log(area);

// 数値リテラル
// 2進数リテラル
const binaryLiteral: number = 0b1010;
// console.log(binaryLiteral);

// 8進数リテラル
const octalLiteral: number = 0o744;
// console.log(octalLiteral);

// 16進数リテラル
const hexLiteral: number = 0xf00d;
// console.log(hexLiteral);

// 指数標記のリテラル
const exponentialLiteral: number = 6e3;
// console.log(exponentialLiteral);

// 数値リテラル区切り文字
const million = 1_000_000;
// console.log(million);

// TypeScriptの数値型の実態
// number型は、浮動小数点数と整数を表す: IEEE 754倍精度浮動小数点数(他の言語でいうdouble型で64ビット)
// 数値(仮数部)の精度が53ビットまで保証されている
// console.log(Number.MAX_SAFE_INTEGER);
// console.log(9007199254740993);

// console.log(0.1 + 0.2);

// console.log(Number.MIN_SAFE_INTEGER);

// Bigint型
// 2の53乗より大きい整数を扱うことができる
const bignum: bigint = (123n + 456n) * 2n;
// console.log(bignum);

// Bigint型は少数を扱うことができない
// const bignum2: bigint = 123.456n; // error TS1353: A bigint literal must be an integer.
// console.log(bignum2);

/* ======================================
 ============ readlineで入力 =============
 ======================================== */

// プリミティブ型同士の変換(暗黙の変換)
// import {createInterface} from 'readline';

// const rl = createInterface({
//   input: process.stdin,
//   output: process.stdout
// });
// rl.question('文字を入力してください。>', (line) => {
//   console.log(`${line} が入力されました`);
//   rl.close();
// });

// 数値を入力して、それに1000を足した値を出力する
// const rl2 = createInterface({
//   input: process.stdin,
//   output: process.stdout
// });
// rl2.question('数値を入力してください。>', (line) => {
//   const inputNum = parseInt(line, 10);
//   console.log(`${inputNum + 1000} が入力されました`);
//   rl2.close();
// });

/* ======================================
 =========== その他を数値に変換 ============
 ======================================== */

// NaNとは
// Not a Numberの略
// 数値として解釈できない値を表す

// boolean, null, undefinedを数値に変換
// console.log(Number(true)); // 1
// console.log(Number(false)); // 0
// console.log(Number(null)); // 0
// console.log(Number(undefined)); // NaN

// ランタイムエラーになる
// const bigint1 = BigInt("1234");
// console.log(bigint1); // 1234n

// const bigint2 = BigInt(500);
// console.log(bigint2); // 500n

// const bigint3 = BigInt(true);
// console.log(bigint3); // 1n

// const bigint = BigInt("fooooooo");
// console.log("bigint is ", bigint); // BigIntにはNaNに相当する値がないので、エラーになる

/* ======================================
  =========== 数値を文字列に変換 ============
  ======================================== */

// const addResult = 1024 + 314 + 500;
// console.log(addResult); // 1838
// const discounted = addResult * 0.7;
// console.log(discounted); // 1286.6

// const sqrt2 = 2 ** 0.5;
// console.log(sqrt2); // 1.4142135623730951

// const res1 = 5 - 1.86;
// console.log(res1); // 3.14
// const res2 = 2n ** 5n;
// console.log(res2); // 32n

/* ======================================
  =========== 比較演算子と等価演算子 ============
  ======================================== */

// パスワード入力
// import {createInterface} from 'readline';

// const rl = createInterface({
//   input: process.stdin,
//   output: process.stdout
// });
// rl.question('パスワードを入力してください。>', (password) => {
//   if(password === 'hogemoge'){
//     console.log('ログインしました');
//   }
//   else {
//     console.log('パスワードが違います');
//   }
//   rl.close();
// });

// Node.jsでは、環境変数をprocess.envで取得できるのだが、その環境変数が与えられていない場合には、undefinedが返される。
// 以下のケースでは、論理演算子は ?? が使われている。
// const secret = process.env.SECRET ?? 'default';
// console.log(`secretは${secret}です。`);
