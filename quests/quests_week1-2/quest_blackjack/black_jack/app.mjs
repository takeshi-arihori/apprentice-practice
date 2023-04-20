import  readline from 'readline';
import { HelperFunctions } from "./components/HelperFunctions.mjs";
import { Card } from "./components/card.mjs";
import { Dealer } from "./components/dealer.mjs";
import { Deck } from "./components/deck.mjs";



console.log("ブラックジャックを開始します。");


/**
 * --- 卓の情報 ---
 *  let table = {
 *    "players": [], // 二次元配列で各プレイヤーのカード情報を格納 [[{}, {}], [{}, {}]]
 *    "gameMode": gameMode, // poker or 21
 *    "deck": new Deck(gameMode), // {}
 *  }
*/
/* --- table作成 --- */
let table = Dealer.startGame(3, "21");

/* Game開始 */
Dealer.printTableInformation(table);
console.log(Dealer.checkWinner(table));


// console.log(" =================== table2 ======================")
// Dealer.printTableInformation(table2);
// console.log(Dealer.checkWinner(table2));



// console.log("あなたの勝ちです!");
// console.log("あなたの負けです!");
// console.log("ブラックジャックを終了します。");

// let result;




/* ============== 各クラスのテスト ============= */

/* ================= カードを取得 ================= */
// let card1 = new Card("♥","J", 11);
// console.log(card1) // Deckクラスに集約されている

/* ================= デッキのカードを取得 ================= */
// let deck1 = new Deck();
// deck1.printDeck(); // Deck上の全てのカードを表示

/* ================= シャッフルして再度表示 ================= */
// let deck2 = new Deck();
// console.log("スタート")
// deck2.printDeck();
// deck2.shuffleDeck();
// console.log("シャッフルしてから再度表示")
// deck2.printDeck();

// ================= ディーラーを使ってプレイヤー全員にカードを配る処理 =================
// カードやデッキはここで状態を保つが、ディーラーは状態を保たないステートレスオブジェクトになる
// let table1 = Dealer.startGame(3, "21");
// let table2 = Dealer.startGame(3, "poker")


/* ================= テーブルの情報を受け取り、宅の情報を表示する ================= */
// console.log("blackJack... \n")
// Dealer.printTableInformation(table1);

// console.log("poker... \n")
// Dealer.printTableInformation(table2);


/* ================= Playerのスコアの計算 ================= */
// PlayerAの手札
// let card1 = new Card("♦︎","A", 1);
// let card2 = new Card("♦︎","J", 11);

// // PlayerBの手札
// let card3 = new Card("♦︎","9", 9);
// let card4 = new Card("♦︎","K", 13);

// console.log(Dealer.score21Individual([card1, card2]));
// console.log(Dealer.score21Individual([card3, card4]));


/* ================= 最も多いスコアを獲得したプレイヤー ================= */
// 最大値は19(= index 2)
// let arr1 = [1, 9, 19, 3, 4, 6];
// console.log(HelperFunctions.maxInArrayIndex(arr1));

// // 最大値は5(= index 0)
// let arr2 = [5, 2, 1, 3, 5, 5];
// console.log(HelperFunctions.maxInArrayIndex(arr2));


/* ================= 最も多いスコアを獲得したプレイヤー ================= */
// let table = Dealer.startGame(4, "21");

// Dealer.printTableInformation(table);
// console.log(Dealer.winnerOf21(table));

// // readlineでキーボード入力を受け取る
// rl.question('文字列を入力してください: ', (input) => {
//   // 入力を処理する関数を呼び出す
//   result = processInput(input);

//   // readlineインターフェースを閉じる
//   rl.close();
// });



/* ============== 各クラスのテスト ============= */

/* ================= カードを取得 ================= */
// let card1 = new Card("♥","J", 11);
// console.log(card1) // Deckクラスに集約されている

/* ================= デッキのカードを取得 ================= */
// let deck1 = new Deck();
// deck1.printDeck(); // Deck上の全てのカードを表示

/* ================= シャッフルして再度表示 ================= */
// let deck2 = new Deck();
// console.log("スタート")
// deck2.printDeck();
// deck2.shuffleDeck();
// console.log("シャッフルしてから再度表示")
// deck2.printDeck();

// ================= ディーラーを使ってプレイヤー全員にカードを配る処理 =================
// カードやデッキはここで状態を保つが、ディーラーは状態を保たないステートレスオブジェクトになる
// let table1 = Dealer.startGame(3, "21");
// let table2 = Dealer.startGame(3, "poker")


/* ================= テーブルの情報を受け取り、宅の情報を表示する ================= */
// console.log("blackJack... \n")

// Dealer.printTableInformation(table1);


// console.log("poker... \n")
// Dealer.printTableInformation(table2);


/* ================= Playerのスコアの計算 ================= */
// PlayerAの手札
// let card1 = new Card("♦︎","A", 1);
// let card2 = new Card("♦︎","J", 11);

// // PlayerBの手札
// let card3 = new Card("♦︎","9", 9);
// let card4 = new Card("♦︎","K", 13);

// console.log(Dealer.score21Individual([card1, card2]));
// console.log(Dealer.score21Individual([card3, card4]));


/* ================= 最も多いスコアを獲得したプレイヤー ================= */
// 最大値は19(= index 2)
// let arr1 = [1, 9, 19, 3, 4, 6];
// console.log(HelperFunctions.maxInArrayIndex(arr1));

// // 最大値は5(= index 0)
// let arr2 = [5, 2, 1, 3, 5, 5];
// console.log(HelperFunctions.maxInArrayIndex(arr2));


/* ================= 最も多いスコアを獲得したプレイヤー ================= */
// let table = Dealer.startGame(4, "21");

// Dealer.printTableInformation(table);
// console.log(Dealer.winnerOf21(table));



/* ================= 宅の種類によってトランプの値が変わる ================= */
// let table = Dealer.startGame(4, "21");

// Dealer.printTableInformation(table);
// console.log(Dealer.winnerOf21(table));


/* ================= 宅の種類によって勝利条件を変更する ================= */

// let table1 = Dealer.startGame(1, "poker");
// let table2 = Dealer.startGame(3, "21");



