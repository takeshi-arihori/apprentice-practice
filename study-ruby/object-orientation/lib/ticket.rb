class Ticket
  # 外部から取得できるようにゲッターメソッドを追加
  attr_reader :fare, :stamped_at

  def initialize(fare)
    @fare = fare
  end

  def stamp(name)
    @stamped_at = name
  end
end
