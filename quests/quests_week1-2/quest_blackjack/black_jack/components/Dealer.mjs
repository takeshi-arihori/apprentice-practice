import { HelperFunctions } from "./HelperFunctions.mjs";
import { Deck } from "./deck.mjs";

export class Dealer {
  // 参加人数を受け取り、それぞれのプレイヤーにカードを配る処理を作成
  static startGame(amountOfPlayers, gameMode) {
    // 卓の情報
    let table = {
      "players": [], // 二次元配列で各プレイヤーのカード情報を格納 [[{}, {}], [{}, {}], [{}, {}]]
      "gameMode": gameMode, // poker or 21
      "deck": new Deck(gameMode), // {}
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
  static initialCards(gameMode) {
    if (gameMode == "poker") return 5;
    if (gameMode == "21") return 2;
  }


  
  // 宅の情報を表示するメソッドを作成
  // ラウンドロビンで各indexごとに表示
  static printTableInformation(table) {
    console.log("Amount of players: " + table["players"].length + "... Game mode: " + table["gameMode"] + ". At this table: ");
    let flag = false;
    let counter = 0;
    let j = 0; // プレイヤーのカードを追跡(1周するごとにカウントアップ)
    while (!flag) {

      if(counter == 10) flag = true;
      if(counter === table["players"].length) j++;
      // for (let i = 0; i < table["players"].length; i++) {
      //   console.log("Player " + (i + 1) + " hand is: ");
      //   for (let j = 0; j < table["players"][i].length; j++) {
      //     console.log(table["players"][i][j].getCardString());
      //   }
      // }
      console.log('table["players"]')
      console.log(`loop : ${j} 周目！`)
      console.log(`ラウンドロビン : ${counter % table["players"].length} 回`)
      console.log(table["players"][counter % table["players"].length][j])
      /* ========= 自分(player1)のカードの2ペアを確認 ========= */
      // console.log(`あなたの引いたカードは${myCardNumber}の${intValue}です。`);
      // console.log(`あなたの引いたカードは${myCardNumber}の${intValue}です。`);


      /* ========= その他のプレイヤー(player2-3)のカードの2ペアを確認 ========= */
      // console.log(`プレイヤー${playerNumber}の引いたカードは${suit}の${intValue}です。`);
      // console.log(`プレイヤー${playerNumber}の引いたカードは${suit}の${intValue}です。`);


      /* ========= ディーラーの一枚目のカードだけ開示 ========= */
      // console.log(`ディーラーの引いたカードはダイヤのQです。`);
      // console.log("ディーラーの引いた2枚目のカードはわかりません。");

      /* ========= 自分の現在のカードの合計を表示 and Game Out ========= */
      // console.log(`あなたの現在の得点は${}です。カードを引きますか？（Y/N）`);
      // console.log(`あなたの引いたカードは${}の${}です。`);

      /* ========= 再度カードを引くか確認 ========= */
      // console.log(`あなたの現在の得点は${}です。カードを引きますか？（Y/N）`);
      // console.log(`ディーラーの引いた2枚目のカードは${}の${}でした。`);

      /* ========= CPUの機能について ========= */
      // もし合計値が15以上ならもう一度引く

      /* ========= カードを引くのをやめたらディーラーのカードを開示 ========= */
      // console.log(`ディーラーの現在の得点は${}です。`);
      // console.log(`ディーラーの引いたカードは${}の${}です`);



      /* ========= 勝者が決定 ========= */
      // console.log(`あなたの得点は${}です。`);
      // console.log(`ディーラーの得点は${}です。`);
      counter++;
    }
  }

  // 各プレイヤーの手札を受け取って、合計値を計算するメソッド
  // 21を超えると0になる
  static score21Individual(cards) {
    let value = 0;
    for (let i = 0; i < cards.length; i++) {
      value += cards[i].intValue;
    }
    if (value > 21) value = 0;
    return value;
  }

  // 勝利したプレイヤーを表示する
  // それぞれのプレイヤーの手札をscore21Individualで計算
  static winnerOf21(table) {
    let points = [];
    let cache = [];
    for (let i = 0; i < table["players"].length; i++) {
      let point = Dealer.score21Individual(table["players"][i]);
      // それぞれのpointを配列に保存
      points.push(point);

      if (cache[point] >= 1) cache[point] += 1;
      else cache[point] = 1;
    }

    // 各プレイヤーの得点を確認する
    console.log("各プレイヤーの得点");
    console.log(points);

    let winnerIndex = HelperFunctions.maxInArrayIndex(points);
    if (cache[points[winnerIndex]] > 1) return "It is a draw";
    else if (cache[points[winnerIndex]] >= 0) return "player " + (winnerIndex + 1) + " is the winner";
    else return "No winners..";
  }


  // 宅のゲームの種類によって勝利条件を変更
  static checkWinner(table) {
    if (table["gameMode"] == "21") return Dealer.winnerOf21(table);
    else return "no game";
  }
}

