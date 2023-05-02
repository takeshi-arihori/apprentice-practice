// 判定するクラス
public class Winner {
	// ディーラーの手札の判定
	/**
	 * @params: Dealer
	 * @return: boolean
	 */
	// ディーラーは17を超えるまで強制的にカードを引く trueならもう一枚
	public static boolean shouldDealerDraw(Dealer dealer) {
		return dealer.getHandTotal() < 17 ? true : false;
	}

	// 21を超えていないか判定(ポリモーフィズムでPlayer, Dealer両者を判定)
	/**
	 * @params: Human
	 * @return: boolean
	 */
	// 21を超えた時点でfalseが返される
	public static boolean isNotBust(Human human) {
		return human.getHandTotal() <= 21 ? true : false;
	}

	/**
	 *
	 * @param: player
	 * @param: dealer
	 * @return: String
	 */
	public static String isWinner(Player player, Dealer dealer) {
		// ディーラーだけがバストのケース
		if (isNotBust(player) && !isNotBust(dealer)) {
			return "あなたの勝ちです!!";
		}
		// プレイヤだけがバストのケース
		if (isNotBust(dealer) && !isNotBust(player)) {
			return "あなたの負けです!!";
		}

		// 両者バストしたケース
		if (!isNotBust(dealer) && !isNotBust(player)) {
			return "引き分けです!!";
		}

		// 両者バストしてない場合の条件分岐
		if (player.getHandTotal() > dealer.getHandTotal()) {
			return "あなたの勝ちです!!";
		} else if (player.getHandTotal() < dealer.getHandTotal()) {
			return "あなたの負けです!!";
		} else {
			return "引き分けです!!";
		}
	}

}
