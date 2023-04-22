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

}
