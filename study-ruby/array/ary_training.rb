numbers = [1, 2, 3, 4]

# ========== 配列 ===========

# sum = 0
# numbers.each { |n| sum+=n }

# puts sum

# ========== 偶数のみ10倍にして表示 ===========

# def even_ten(array)
#   array.each do |n|
#     puts even = n % 2 == 0 ? n *10 : n
#   end
# end

# even_ten(numbers)

# ========== map ===========
# 各要素に対してブロックを評価した結果を新しい配列にて返す

# new_numbers = numbers.map { |n| n * 10}
# puts new_numbers

# =========== select =============
# 各要素に対してブロックを評価し、その戻り値が真の要素を集めた配列を返すメソッド
# even_numbers = numbers.select{ |n| n.even? }
# puts even_numbers

# =========== reject =============
# ブロックの戻り値が偽である要素を集めるメソッド
# non_multiples_of_three = numbers.reject{ |n| n % 3 == 0 }
# puts non_multiples_of_three

# =========== find =============
# プログラムの戻り値が最初に真になった数値を返すメソッド
# even_number = numbers.find{|n| n.even?}
# puts even_number

# =========== sum =============
# 要素の合計を求めるメソッド
# puts numbers.sum



# ========== Range =============
# 範囲を表すオブジェクト
1..5 # 最初の値..最後の値(最後の値を含む)
1...5 # 最初の値...最後の値(最後の値を含まない)

# range = 1..5
# puts range.include?(0) # false
# puts range.include?(1) # true
# puts range.include?(2) # true
# puts range.include?(3) # true
# puts range.include?(4) # true
# puts range.include?(5) # true
# puts range.include?(6) # false

