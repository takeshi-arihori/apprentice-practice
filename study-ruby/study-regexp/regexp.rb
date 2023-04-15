# ヒアドキュメントで文字列を作成
text = <<TEXT
I love Ruby.
Python is a great language.
Java and JavaScript are different.
TEXT

text.scan(/[A-Z][A-Za-z]+/)


# # 正規表現について https://qiita.com/jnchito/items/893c887fbf19e17d3ff9
# # Rubularでチェック https://rubular.com/


text = '私の誕生日は1987年1月3日です。'
if m = /(\d+)年(\d+)月(\d+)日/.match(text)


# ============= キャプチャーに名前をつける ==============
# (?<name>)というメタ文字を使用して名前をつけることによって結果を連番ではなく名前で取得できる
text = '私の誕生日は1987年1月3日です。'
m = /(?<year>\d+)年(?<month>\d+)月(?<day>\d+)日/.match(text)

# シンボルで名前を指定してキャプチャの結果を取得する
m[:year]
m[:month]
m[:day]

# 文字列で指定
m['year']

# 連番で指定
m[3]

# 最後のキャプチャを取得
m[-1]

# 左辺に正規表現リテラル、右辺に文字列を置く方法
# キャプチャの名前がそのままローカル変数に割り当てられる
if /(?<year>\d+)月(?<month>\d+)月(?<day>\d)日/ =~ text
  puts "#{year}/#{month}/#{day}"
end

# ============= 正規表現 + Stringクラス ==============
# 文字列を配列に scan
'123 456 789'.scan(/\d+/) # ["123", "456", "789"]
'1977年7月17日 2021年12月31日'.scan(/(\d+)年(\d+)月(\d+)日/) # [["1977", "7", "17"], ["2021", "12", "31"]]



# [], slice, slice!
text = '郵便番号は123-4567です'
text[/\d{3}-\d{4}/] # "123-4567"


text = '123-4567 456-7890'
text[/\d{3}-\d{4}/] # "123-4567"


# split
text = '123,456-789'
text.split(',') # ["123", "456-789"]

# gsub, gsub!
text = '123,456-789'
text.gsub(',', ':') # "123:456-789"
text.gsub(/,|-/, ':') # "123:456:789"
text # "123,456-789"

hash = {',' => ':', '-' => '/'}
text.gsub(/,|-/, hash) # "123:456/789"

# gsub!は文字列の内容を破壊的に置換する
text = '123,456-789'
text.gsub!(/,|-/, ':') # "123:456:789"
text # "123:456:789"



# ============ 正規表現オブジェクトを作成する方法 ===========

通常: /\d{3}-\d{4}/
Regexp.newを使用: Regexp.new('\d{3}-\d{4}')
%rを使用: %r{'\d{3}-\d{4}'} || %r!'\d{3}-\d{4}'!


# 式の値の埋め込み
pattern = '\d{3}-\d{4}'
'123-4567' =~ /#{pattern}/


# =============== 正規表現オブジェクト作成時のオプション ==============
# i -> 大文字小文字を区別しない
'HELLO' =~ /hello/i
'HELLO' =~ %r{hello}i
# Regexp.new使用時は, Regexp::IGNORECASEをいう定数を渡す
regexp = Regexp.new('hello', Regexp::IGNORECASE)
'HELLO' == regexp


# mオプションを使用すると任意の文字を表すドットが改行文字にもマッチする
"Hello\nBye" =~ /Hello.Bye/
"Hello\nBye" =~ /Hello.Bye/m
# Regexp.newを使用する場合は、Regexp::MULTILINEという定数を渡す
regexp = Regexp.new('Hello.Bye', Regexp::MULTILINE)
"Hello\nBye" =~ regexp