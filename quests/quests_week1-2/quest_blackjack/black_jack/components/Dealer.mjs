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

    // tableのプレイヤー全員の手札を返す
    return table["players"];
  }

  // ゲームの内容によって手札の枚数を変更する
  static initialCards(gameMode){
    if(gameMode == "poker") return 5;
    if(gameMode == "21") return 2;
  }
}

