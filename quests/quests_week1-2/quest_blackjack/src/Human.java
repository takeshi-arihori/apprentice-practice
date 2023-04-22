import java.util.ArrayList;
import java.util.List;

// インスタンス化を禁止するため、abstractにする
public abstract class Human {
	private ArrayList<Card>hand = new ArrayList<>();
	private String playerName; // プレイヤー名 or ディーラー

	public Human(String name) {
		setPlayerName(name);
	}
	public Human() {
		this("CPUプレイヤー");
	}


	/**
	 * @return hand
	 */
	public List<Card> getHand() {
		return hand;
	}

	/**
	 * @return playerName
	 */
	public String getPlayerName() {
		return playerName;
	}

	// 手札の追加(Gameクラスからカードを取得)
	public void setCard(Card card) {
		hand.add(card);
	}

	/**
	 * @param playerName セットする playerName
	 */
	public void setPlayerName(String playerName) {
		this.playerName = playerName;
	}


	// 手札の合計値を取得
	public int getHandTotal() {
		int totalValue = 0;
		for(Card card : hand) {
			totalValue += card.getRank();
			// Aをdrawかつ、
			if(card.getValue() == "A" && totalValue <= 11) totalValue+=10;
		}
		return totalValue;
	}

	// 手札のリストを取得
	public void display() {
		System.out.println("");
		for(Card card : hand) System.out.println(card);
		System.out.println("");
	}
}
