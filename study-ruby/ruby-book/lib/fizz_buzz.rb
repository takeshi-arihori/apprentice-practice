# fizz_buzz作成

def fizz_buzz number
  if number % 15 == 0
    return "Fizz Buzz!!"
  elsif number % 5 == 0
    return "Buzz"
  elsif number % 3 == 0
    return "Fizz"
  else
    return number.to_s(base=10)
  end
end


i = 1
while i <= 15
  puts fizz_buzz(i);
  i+=1
end

