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
    // blackJack
    const blackJack = { "A": 1, "J": 10, "Q": 10, "K": 10 };

    for (let i = 0; i < suits.length; i++) {
      for (let j = 0; j < values.length; j++) {
        let currentValue = values[j];
        let intValue = (gameMode === "21") ? (currentValue in blackJack ? blackJack[currentValue] : parseInt(currentValue)) : j+1;
        newDeck.push(new Card(suits[i], values[j], intValue));
      }
    }
    return newDeck;
  }

  // カードをドロー
  draw() {
    return this.deck.pop();
  }

  // デッキにあるカードを全て表示
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
