import { HelperFunctions } from "./components/HelperFunctions.mjs";
import { Card } from "./components/card.mjs";
import { Dealer } from "./components/dealer.mjs";



// console.log("ブラックジャックを開始します。");
// console.log(`あなたの引いたカードは${}の${}です。`);
// console.log(`あなたの引いたカードは${}の${}です。`);
// console.log(`ディーラーの引いたカードはダイヤのQです。`);
// console.log("ディーラーの引いた2枚目のカードはわかりません。");
// console.log(`あなたの現在の得点は${}です。カードを引きますか？（Y/N）`);
// console.log(`あなたの引いたカードは${}の${}です。`);
// console.log(`あなたの現在の得点は${}です。カードを引きますか？（Y/N）`);
// console.log(`ディーラーの引いた2枚目のカードは${}の${}でした。`);
// console.log(`ディーラーの現在の得点は${}です。`);
// console.log(`ディーラーの引いたカードは${}の${}です`);
// console.log(`あなたの得点は${}です。`);
// console.log(`ディーラーの得点は${}です。`);
// console.log("あなたの勝ちです!");
// console.log("あなたの負けです!");
// console.log("ブラックジャックを終了します。");


// setTimeout(gameStart, 1000);

// function gameStart() {
//   let flag = false;
//   let player1 = {};
//   let player2 = {};
//   let tern = 0;
//   let player = "";
//   while (!flag) {
//     let card = 4
//     console.log(`あなたの引いたカードは${card}です`);
//     flag = true;
//   }
// }



// 宅の情報を取得
let table = Dealer.startGame(4, "21");

Dealer.printTableInformation(table);
// console.log(Dealer.winnerOf21(table));

// let table1 = Dealer.startGame(1, "poker");
// let table2 = Dealer.startGame(3, "21");

// Dealer.printTableInformation(table1);
// console.log(Dealer.checkWinner(table1));

// Dealer.printTableInformation(table2);
// console.log(Dealer.checkWinner(table2));

import * as readline from 'readline/promises';

(async () => {
  const readInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const string = await readInterface.question("文字列を入力してください >");

  console.log(string);

  result(string)
  readInterface.close();
})();

function result(string) {
  if (string === "y" || string === "Y") {
    console.log("結果はYです")
  } else {
    console.log("結果はNです")
  }
}