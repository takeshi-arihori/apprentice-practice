# ====== 例題: Rubyのハッシュ記法を変換する =======

require 'minitest/autorun'
require_relative '../lib/convert_hash_syntax.rb'

class ConvertHashTest < Minitest::Test
  def test_convert_hash_syntax
    old_syntax = <<~TEXT
      {
        :name => 'Alice',
        :age => 20,
        :gender => :female
      }
    TEXT
    expected = <<~TEXT
      {
        name: 'Alice',
        age: 20,
        gender: :female
      }
    TEXT
    assert_equal expected, convert_hash_syntax(old_syntax)
    
    # actual = convert_hash_syntax(old_syntax)
    # puts actual
    # assert_equal expected, actual
  end
end
