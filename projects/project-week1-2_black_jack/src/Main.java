public class Main {
  public static void main(String[] args) {

    System.out.println("ブラックジャックを開始します。");
    System.out.println();

    Game game = new Game();

    String winnerPlayer = game.startGame();

    System.out.println(winnerPlayer);

    System.out.println("ブラックジャックを終了します。");
  }
}