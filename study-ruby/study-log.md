#### 記録用

### Java との比較

コードをコンパイルする必要はありません。単に実行するだけです。
異なったサードパーティ製の GUI ツールキットがいくつか存在します。 Ruby のユーザーは、たとえば WxRuby、FXRuby、Ruby-GNOME2、Qt、 あるいは Ruby に同梱されている Ruby Tk などを利用します。
クラスなどの定義の最後には end キーワードを使います。コードのまとまりを波括弧で括ることはしません。
import の代わりに require を使います。
すべてのメンバ変数はプライベート変数です。オブジェクトの外側からはメソッドを介してそれらにアクセスします。
メソッド呼び出しの括弧は基本的にオプションで、しばしば省略されます。
2 や 3.14159 といった数値も含めて、すべてのものはオブジェクトです。
静的型チェックはありません。
変数名はただのラベルです。変数名は関連付けられた型を持ちません。
型宣言はありません。必要に応じて新しい変数名を割りあてれば、それらを利用できます (int[] a = {1,2,3};ではなく a = [1,2,3]というように)。
キャストはありません。メソッドを呼び出すだけです。 例外を確認するつもりなら、コードを実行する前にユニットテストで示しましょう。
Foo foo = new Foo("hi")は foo = Foo.new("hi")と書きます。
コンストラクタは常に”initialize”という名前になります。クラス名ではありません。
インターフェイスの代わりに Mix-in を使います。
XML よりも YAML が好まれます。
null は nil です。
==と equals()の扱いが異なります。等価かどうかを評価したい時(Java で equals()を使うケース)は==を使います。
二つのオブジェクトが同一かどうかを確認したい時(Java で==を使うケース)は equal?()を使います。

## 第一章

rbenv で環境設定
`https://github.com/rbenv/rbenv`

irb の使い方

## 第二章

式展開(例)
`name = "Takeshi" || "Hello, #{name}!"`
バイト値の確認
`puts "A".bytes`

#### 真偽値 nil

偽 -> false, nil
真 -> それ以外の全て

#### キャメルケースは使わない

`def hello_world<br>"Hello, World"<br>end`

#### 文字列へ変換

`.to_s`

#### class 名の確認

`'abc'.class`

## 第三章

Minitest を使ったテスト
Minitest の version 確認
`ruby -r minitest -e "puts Minitest::VERSION"`

#### テストコード
プログラム本体とテストコードを分離する

require 'minitest/autorun'
require_relative '../lib/fizz_buzz'

class FizzBuzzTest < Minitest::Test
  def test_fizz_buzz
    assert_equal '1', fizz_buzz(1)
    assert_equal '2', fizz_buzz(2)
    assert_equal 'Fizz', fizz_buzz(3)
    assert_equal '4', fizz_buzz(4)
    assert_equal 'Buzz', fizz_buzz(5)
    assert_equal 'Fizz', fizz_buzz(6)
    assert_equal '7', fizz_buzz(7)
    assert_equal 'Fizz Buzz!!', fizz_buzz(15)
  end
end


## 第四章

Rubyの繰り返し処理 each
numbers = [1, 2, 3, 4]
sum = 0
numbers.each do |n|
  sum += n\
end

delete(number) : 指定したものだけ消す
delete_if : 条件に当てはまるのを消す