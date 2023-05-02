# fizz_buzz作成

def fizz_buzz n
  if n % 15 == 0
    # 15で割り切れるなら
    "Fizz Buzz!!"
  elsif n % 5 == 0
    # 5で割り切れるなら
    "Buzz"
  elsif n % 3 == 0
    # 3で割り切れるなら
    "Fizz"
  else
    # それ以外は文字列に変換
    n.to_s
  end
end



