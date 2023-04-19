export class Card {
  constructor(suit, value, intValue){
    this.suit = suit
    this.value = value;
    this.intValue = intValue;
  }

  // カードの柄と数字
  getCardString(){
    return this.suit + this.value + "(" + this.intValue + ")";
  }
}
