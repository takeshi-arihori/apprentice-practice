export class Card {
  constructor(suit, value, intValue){
    this.suit = suit
    this.value = value;
    this.intValue = intValue;
  }

  getCardString(){
    return this.suit + this.value + "(" + this.intValue + ")";
  }
}
