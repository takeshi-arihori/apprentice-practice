currencies = {
  'japan' => 'yen',
  'us' => 'dollar',
  'india' => 'rupee',
}

currencies['japan']

currencies["us"] = currencies["us"] = '$$$$$'
currencies

# ============= keyとvalueの組み合わせを順に取り出す ================
currencies.each do |key, value|
  "#{key} : #{value}"
end

# ブロックパラメーターを一つにするとkey,valueが配列に格納される
currencies.each do |key_value|
  key = key_value[0]
  value = key_value[1]
  "#{key} : #{value}"
end

#シンボルについて
# 文字列よりもシンボルの方が高速に比較できる(シンボルは整数として管理されるため)
# シンボルは同じidになる
# ハッシュのkeyにシンボルを使用するとより高速に値を比較できる

# 実用面では、シンボルは文字の意味を明確にします。`名前'を指し示す時など、文字列そのものが必要なわけではない時に用います。

# ハッシュのキー { :key => "value" }
# アクセサの引数で渡すインスタンス変数名 attr_reader :name
# メソッド引数で渡すメソッド名 __send__ :to_s
# C の enum 的な使用 (値そのものは無視してよい場合)

# シンボルを使うメリット

# 新しく文字列を生成しない分やや効率がよく、比較も高速。
# 文字の意味がはっきりするのでコードが読みやすくなる
# immutable なので内容を書き換えられる心配がない

:apple.object_id # 3149148
:apple.object_id # 3149148
:apple.object_id # 3149148

'apple'.object_id # 69560
'apple'.object_id # 76540
'apple'.object_id # 106180

# ============ シンボルを使用した記述方法 ============

currencies = {
  :japan => 'yen',
  :us => 'dollar',
  :india => 'rupee',
}
currencies[:japan]

# ============ タスクの各状態をシンボルで管理する ============
status = :done

case status
when :todo
  'これからやります'
when :doing
  '今やってます'
when :done
  'もう終わりました'
end

# =========== ハッシュのキーにシンボルを使う ============
currencies = {
  japan: 'yen',
  us: 'dollar',
  india: 'rupee',
}

currencies[:us]

# ============ keys, values has_key?, include?, member? ===========
currencies = {japan: 'yen', us: 'dollar', india: 'rupee'}
currencies.keys
currencies.values
currencies.has_key?(:japan)
currencies.has_key?(:china)

# ============ ハッシュを使った擬似キーワード引数 ===========
def buy_burger(menu, options = {})
  drink = options[:drink]
  potato = options[:potato]
end

buy_burger('cheese', drink: true, potato: true)


# ============ 任意のキーワードを受け付ける**引数 ===========
def buy_burger(menu, drink: true, potato: true, **others)
  "drink = #{drink}"
  "potato = #{potato}"
  others
end

buy_burger('cheese', drink: true, potato: true, salad: true, chicken: false)


# ============ ハッシュを明示的にキーワードに変換する ===========
# ruby3.0から自動変換が行われないため、明示しないとエラーになる
# キーワード引数の分離

def buy_burger(menu, drink: true, potato: true)
  "menu = #{menu}"
  "drink = #{drink}"
  "potato = #{potato}"
end

params = {drink: true, potato: false}
buy_burger('fish', params) ==> 明示的にキーワードをハッシュに変換する必要がある
buy_burger('fish', **params)


# ============ ハッシュから配列 ===========
currencies = {
  japan: 'yen',
  us: 'dollar',
  india: 'rupee'
}

currencies.to_a


# ============ 配列からハッシュへ ===========

array = [
  [:japan, 'yen'],
  [:us, 'dollar'],
  [:india, 'rupee']
]

array.to_h