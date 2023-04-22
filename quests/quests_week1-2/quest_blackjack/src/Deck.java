import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;


public class Deck {
	private ArrayList<Card> deck; // 外部から直接アクセスできないようにprivateに設定

	/**
	 * @return deck
	 */
	public ArrayList<Card> getDeck() {
		return deck;
	}

	/**
	 * @param deck セットする deck
	 */
	public void setDeck() {
		this.deck = this.generateDeck();
	}

	// 新しいデッキを生成
	public ArrayList<Card> generateDeck (){
		ArrayList<Card> newDeck = new ArrayList<>();
		// カードのランク順に並べる
        String[] suits = new String[]{"♣", "♦", "♥", "♠"}; // Clover, Diamond, Heart, Spade
        String[] values = new String[]{"A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"}; // 左からindex+1の数値がランク("A"は11になることもある)
		// Mapでカードのランクを作成
        // エースもしくはフェースカードの場合hashmapのvalueの数値になる
		Map<String, Integer>blackJack = new HashMap<>() {
			{
				put("A", 1); // 条件によってはゲーム中に 11 になることも
                put("J", 10);
                put("Q", 10);
                put("K", 10);
			}
		};

		// Cardクラスを生成しnewDeckに格納する
		for(int i = 0; i < suits.length; i++) {
			for(int j = 0; j < values.length; j++) {
				newDeck.add(new Card(suits[i], values[j], blackJack.get(values[j]) == null ? (j+1) : blackJack.get(values[j])));
			}
		};

		return newDeck;
	};

	// デッキをシャッフル
	public void shuffleDeck() {
		// デッキをシャッフル
		// Collections.shuffleでもOK!!
		for(int i = deck.size()-1; i >= 0; i--) {
			int j = (int)Math.floor(Math.random() * (i+1));
			Card temp = this.deck.get(i);
			this.deck.set(i, this.deck.get(j));
			this.deck.set(j, temp);
		}
		System.out.println("デッキをシャッフルしました!!\n");
	}

	// デッキから一枚取得
	/**
	 * @param: human
	 * @return void
	 */
	public Card draw() {
		return this.deck.remove(this.deck.size()-1);
	}
}
