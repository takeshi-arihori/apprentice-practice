name = "alice"

puts "Hello, #{name}!"

puts "A".bytes
puts "c".bytes

puts "z".bytes

n = 11
if n > 10
  puts "10より大きい"
else
  puts "10より小さい"
end

country = "Japan"

if country == "Japan"
  puts "こんにちは"
elsif country == "us"
  puts "Hello"
else
  puts "??"
end

def add(a, b)
  a + b
end
def hello_world
  "Hello, World"
end

# 再帰関数を定義
def fact(n)
  if n == 0
    1
  else
    n * fact(n - 1)
  end
end

puts fact(5)
