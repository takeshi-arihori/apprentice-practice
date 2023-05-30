// オブジェクトを使うことができる
// 1. 書籍プリンター
// 書籍の名前と著者名をプロパティとして持つオブジェクトの配列 books を受け取り、「『書籍名』著者名」を出力する関数 printBooks を実装してください。

function printBooks(books: string[]) {
  // 関数を完成させてください
  console.log(`${books[0]} ${books[1]}`);
}
const books = ["『JavaScript入門』", "山田太郎"]; // オブジェクトの配列を定義する
// printBooks(books)

// 2. ユーザーパーミッションチェッカー

let users = [
  {
      username: "山田",
      permissions: {
          canRead: true,
          canWrite: true,
          canDelete: false,
      },
  },
  {
      username: "佐藤",
      permissions: {
          canRead: false,
          canWrite: true,
          canDelete: false,
      },
  },
  // ユーザーを追加してください
];

// 文字列リテラルのユニオン型で判定する
function checkPermission(name: string, per: "canRead" | "canWrite" | "canDelete"): void {
let user = users.find(el => el.username === name);

if (user) {
  console.log(user.permissions[per]);
} else {
  console.log("ユーザーが見つかりません");
}
}

checkPermission("山田", "canWrite");
checkPermission("佐藤", "canRead");
checkPermission("佐藤", "canDelete");

// 3. メソッド
// JavaScript ではオブジェクトのプロパティが関数である場合、それをメソッドと呼びます。メソッドの定義として正しいものを全て選択してください。なお、正しいかどうかは手元で実行して確認することができます。

// ①: 正

// const obj = {
//   method: function() {
//     console.log('method');
//   },
// }
// obj.method();

// // ②:

// const obj = {
//   method: () => {
//     console.log('method');
//   },
// }

// obj.method();


// // ③ 正

// const obj = {
//   method() {
//     console.log('method');
//   },
// }

// obj.method();

// // ④ 誤

// const obj = {
//   () => {
//     console.log('method');
//   },
// }

// obj.method();
