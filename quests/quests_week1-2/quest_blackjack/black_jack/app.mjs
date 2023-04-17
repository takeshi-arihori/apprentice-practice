import { HelperFunctions } from "./components/HelperFunctions.mjs";
import { Card } from "./components/card.mjs";
import { Dealer } from "./components/dealer.mjs";

// 52枚のトランプ, 13のランク
// 1テーブル「ハウス」, 5-7人のプレイヤ
// 各プレーヤーは「ハウス」と1対1の勝負

// 各プレーヤーの目標: 21を超えないように21に近づけ、その点数がハウスのハンドを上回ること
// 2-10 -> その手札の点数,  A, J ,Q ,K -> 10 (Aは1か11の都合のいい方でカウント)

// 1, ベット -> 賭け金
// 2, カードの入手 -> ハウスは各プレーヤーに2枚ずつ配る
// 3, アクション -> ラウンドロビン形式で維持 or 調整を決める
//   最初のラウンドでプレーヤーができるアクション -> サレンダー(負けを認める)、スタンド(現在のハンドで勝負)、ヒット(手札に更に1枚追加)、ダブル(ベットを2倍にしてもう一度だけカードを引く)
//   手札の数が21を超えること -> バスト , プレーヤーがバストしなかったら -> ヒット(もう一度ヒットできる)、スタンド(現在のハンドで勝負できる)
//   各プレイヤーの全ての行動が終了したタイミング（バスト、スタンド、サレンダー、ダブル）で、
//   ハウスは裏向きのカードを公開し、それが 17 以上であればスタンド、そうでなければ、17 以上になるまでカードを引き続けなければなりません。
// 4, 評価 -> プレーヤー勝ち = ハウスよりプレーヤーの合計値が高い or ハウスがバスト


let table1 = Dealer.startGame(1, "poker");
let table2 = Dealer.startGame(3, "21");

Dealer.printTableInformation(table1);
console.log(Dealer.checkWinner(table1));

Dealer.printTableInformation(table2);
console.log(Dealer.checkWinner(table2));