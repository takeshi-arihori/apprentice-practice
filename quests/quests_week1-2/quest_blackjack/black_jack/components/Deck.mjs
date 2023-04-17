import { Card } from "./card.mjs";

export class Deck {
  constructor(gameMode = null) {
    this.deck = Deck.generateDeck(gameMode);
  }

  // デッキを作成するメソッド
  // constructorで初期化と同時に生成するためstaticにする
  static generateDeck(gameMode = null) {
    let newDeck = [];
    const suits = ["♣", "♦", "♥", "♠"];
    const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]

    for (let i = 0; i < suits.length; i++) {
      for (let j = 0; j < values.length; j++) {
        newDeck.push(new Card(suits[i], values[j], j + 1));
      }
    }

    return newDeck;
  }

  // カードをドロー
  draw() {
    return this.deck.pop();
  }

  // カードを表示
  printDeck() {
    console.log("Displaying cards...")
    for (let i = 0; i < this.deck.length; i++) {
      console.log(this.deck[i].getCardString());
    }
  }

  // カードをシャッフル
  shuffleDeck() {
    let deckSize = this.deck.length;
    for (let i = deckSize - 1; i >= 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = this.deck[i];
      this.deck[i] = this.deck[j];
      this.deck[j] = temp;
    }
  }
}
