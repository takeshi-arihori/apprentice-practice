require 'minitest/autorun'
require_relative '../lib/gate.rb'
require_relative '../lib/ticket.rb'

# テストコード(アサーションメソッド)
# assert: 与えられた条件が真(true)であることを期待する
# refute: 与えられた条件が偽(false)であることを期待します。

# 改札機プログラムを作成
class GateTest < Minitest::Test
  def setup
    @umeda = Gate.new(:umeda)
    @juso = Gate.new(:juso)
    @mikuni = Gate.new(:mikuni)
  end

  def test_umeda_to_juso
    ticket = Ticket.new(160)
    @umeda.enter(ticket)
    assert @juso.exit(ticket)
  end

# 運賃が足りてるかどうかを判別する
  def test_umeda_to_mikuni_when_fare_is_not_enough
    ticket = Ticket.new(190)
    @umeda.enter(ticket)
    assert @mikuni.exit(ticket)
  end

  def test_juso_to_mikuni
    ticket = Ticket.new(160)
    @juso.enter(ticket)
    assert @mikuni.exit(ticket)
  end
end