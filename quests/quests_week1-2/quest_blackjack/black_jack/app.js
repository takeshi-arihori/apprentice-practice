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



class Card {
  constructor(suit, value, intValue){
    this.suit = suit
    this.value = value;
    this.intValue = intValue;
  }

  getCardString(){
    return this.suit + this.value + "(" + this.intValue + ")";
  }
}

class Deck{
  constructor(){
    this.deck = Deck.generateDeck();
  }

  // デッキを作成するメソッド
  // constructorで初期化と同時に生成するためstaticにする
  static generateDeck(){
    let newDeck = [];
    const suits = ["♣", "♦", "♥", "♠"];
    const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]

    for(let i = 0; i < suits.length; i++){
      for(let j = 0; j < values.length; j++){
        newDeck.push(new Card(suits[i], values[j], j+1));
      }
    }

    return newDeck;
  }

  printDeck(){
    console.log("Displaying cards...")
    for(let i = 0; i <  this.deck.length; i++){
      console.log(this.deck[i].getCardString());
    }
  }
}

let deck1 = new Deck();
deck1.printDeck();