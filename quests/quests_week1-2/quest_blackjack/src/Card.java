public class Card {
	private String suit;
	private String value;
	private int rank;
	/**
	 * @param suit
	 * @param value
	 * @param rank
	 */
	public Card(String suit, String value, int rank) {
		setSuit(suit);
		setValue(value);
		setRank(rank);
	}
	/**
	 * @return suit
	 */
	public String getSuit() {
		return suit;
	}
	/**
	 * @return value
	 */
	public String getValue() {
		return value;
	}
	/**
	 * @return rank
	 */
	public int getRank() {
		return rank;
	}
	/**
	 * @param suit セットする suit
	 */
	public void setSuit(String suit) {
		if(suit.length() > 1) throw new IllegalArgumentException("Suitのサイズの大きさがおかしいです！！");
		this.suit = suit;
	}
	/**
	 * @param value セットする value
	 */
	public void setValue(String value) {
		if(value.length() > 2) throw new IllegalArgumentException("Valueのサイズの大きさがおかしいです！！");
		this.value = value;
	}
	/**
	 * @param rank セットする rank
	 */
	public void setRank(int rank) {
		if((rank < 1) || (rank > 13)) throw new IllegalArgumentException("カードのrankがおかしいです！！");
		this.rank = rank;
	}


	@Override
    public String toString() {
			if(getValue() == "10"){
				String cardRepresentation =
				"┌───────┐\n" +
				"│ " + value + "    │\n" +
				"│       │\n" +
				"│   " + suit + "   │\n" +
				"│       │\n" +
				"│     " + value + "│\n" +
				"└───────┘";
        return cardRepresentation;
			} else {
				String cardRepresentation =
								"┌───────┐\n" +
								"│ " + value + "     │\n" +
								"│       │\n" +
								"│   " + suit + "   │\n" +
								"│       │\n" +
								"│     " + value + " │\n" +
								"└───────┘";
				return cardRepresentation;
			}
    }
}
