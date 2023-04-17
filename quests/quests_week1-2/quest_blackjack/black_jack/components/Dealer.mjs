import { Deck } from "./deck.mjs";

export class Dealer {
  // 参加人数を受け取り、それぞれのプレイヤーにカードを配る処理を作成
  static startGame(amountOfPlayers, gameMode) {
    // 卓の情報
    let table = {
      "players": [],
      "gameMode": gameMode,
      "deck": new Deck(),
    }

    // デッキをシャッフル
    table["deck"].shuffleDeck();

    for (let i = 0; i < amountOfPlayers; i++) {
      // プレイヤーの手札
      let playerCard = [];
      // ブラックジャックの手札は2枚
      for (let j = 0; j < Dealer.initialCards(gameMode); j++) {
        playerCard.push(table["deck"].draw());
      }
      table["players"].push(playerCard);
    }

    // tableを返す
    return table;
  }

  // ゲームの内容によって手札の枚数を変更する
  static initialCards(gameMode){
    if(gameMode == "poker") return 5;
    if(gameMode == "21") return 2;
  }

  // 宅の情報を表示するメソッドを作成
  static printTableInformation(table){
    console.log("Amount of players: " + table["players"].length + "... Game mode: " + table["gameMode"] + ". At this table: ");

    for(let i = 0; i < table["players"].length; i++){
      console.log("Player " + (i + 1) + " hand is: ");
      for(let j = 0; j < table["players"][i].length; j++){
        console.log(table["players"][i][j].getCardString());
      }
    }
  }

  // 各プレイヤーの手札を受け取って、合計値を計算するメソッド
  // 21を超えると0になる
  static score21Individual(cards){
    let value = 0;
    for(let i = 0; i < cards.length; i++){
      value += cards[i].intValue;
    }
    if(value > 21) value = 0;
    return value;
  }
}

