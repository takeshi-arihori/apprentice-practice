# RGB変換プログラムの作成

# to_hex : 10 -> 16進数
# to_ints : 16 -> 10進数

# プログラムのインプットとアウトプットが明確である && テストコードの書き方が最初からイメージできる -> TDD(Test Driven Development)が良い
# Testを行う時は対象のファイルを読み込む
require 'minitest/autorun' # フレームワークを読み込むコード
require_relative '../lib/rgb.rb'

class RgbTest < Minitest::Test
  def test_to_hex
    assert_equal '#000000', to_hex(0, 0, 0)
    assert_equal '#ffffff', to_hex(255, 255, 255)
    assert_equal '#043c78', to_hex(4, 60, 120)
  end

  def test_to_ints
    assert_equal [0, 0, 0], to_ints("#000000")
    assert_equal [255, 255, 255], to_ints("#ffffff")
    assert_equal [4, 60, 120], to_ints("#043c78")
  end
end

