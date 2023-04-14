text = <<TEXT
I love Ruby.
Python is a great language.
Java and JavaScript are different.
TEXT

text.scan(/[A-Z][A-Za-z]+/)


# 正規表現について https://qiita.com/jnchito/items/893c887fbf19e17d3ff9
# Rubularでチェック https://rubular.com/
1987年1月3日
(\d+)年(\d+)月(\d+)日

text = '私の誕生日は1987年1月3日です。'
if m = /(\d+)年(\d+)月(\d+)日/.match(text)
  
