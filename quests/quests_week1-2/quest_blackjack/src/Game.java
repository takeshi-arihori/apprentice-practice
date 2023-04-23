import java.util.Scanner;

public class Game {

  // gamestart -> 勝者を返す
  public String startGame() {

    // System.out.println("プレイヤーの名前を入力してください!!");
    // System.out.println();
    // String playerName = new Scanner(System.in).nextLine();

    // プレイヤーとディーラーをインスタンス化
    Player player = new Player("テストテスオ");
    Dealer dealer = new Dealer();

    // デッキをインスタンス化
    Deck deck = new Deck();
    deck.setDeck();
    deck.shuffleDeck();

    int count = 2; // ターンをカウント
    boolean flag = false; // プレイヤーがゲームを終了するを選ぶ or プレイヤーのカードが21を超えた場合にtrueになりwhile-loopが終了となる
    String winner = "draw"; // 勝者(初期値はdraw)

    while (!flag) {
      if (count <= 2) {
        Card tempDrawPlayer1 = deck.draw();
        Card tempDrawPlayer2 = deck.draw();
        player.setCard(tempDrawPlayer1);
        player.setCard(tempDrawPlayer2);
        System.out.println("あなたの引いたカードは、");
        System.out.println(tempDrawPlayer1);
        System.out.println(tempDrawPlayer2);
        System.out.println("あなたの得点は " + player.getHandTotal() + "です。");
        System.out.println();

        Card tempDrawDealer1 = deck.draw();
        dealer.setCard(tempDrawDealer1);
        System.out.println("ディーラーの引いたカードは、");
        System.out.println(tempDrawDealer1);
        System.out.println("ディーラーの引いた2枚目のカードはわかりません。");
        System.out.println();
      }

      // プレイヤーの合計が21以内なら再度引くか選択できる
      if (count > 2) {
        if (Winner.isNotBust(player)) {
          System.out.println("あなたの現在の得点は" + player.getHandTotal() + "です。カードを引きますか？（Y/n）");
          String shouldDrawCard = new Scanner(System.in).nextLine();
          if ("N".equals(shouldDrawCard) || "n".equals(shouldDrawCard))
            break;
          else {
            Card playerCard = deck.draw();
            player.setCard(playerCard);
            System.out.println("あなたの引いたカードは、");
            System.out.println(playerCard);
            System.out.println("あなたの得点は " + player.getHandTotal() + "です");
            System.out.println();
          }
        }
        // プレイヤーが21を超えているなら強制終了(プレイヤーの負け)
        else {
          break;
        }
      }
      count++;
    }

    // 勝者が決まってないなら
    if (winner == "draw") {
      // ディーラーの合計が17以下なら再度カードを引く
      while (Winner.shouldDealerDraw(dealer)) {
        dealer.setCard(deck.draw());
      }
    }

    // 最終結果
    System.out.println("結果発表\n");
    System.out.println("あなたの得点は" + player.getHandTotal());
    System.out.println("ディーラーの得点は" + dealer.getHandTotal());
    System.out.println();

    return Winner.isWinner(player, dealer);

  }

}