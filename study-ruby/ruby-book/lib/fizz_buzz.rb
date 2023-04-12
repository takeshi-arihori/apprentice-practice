# fizz_buzz作成

def fizz_buzz n
  if n % 15 == 0
    "Fizz Buzz!!"
  elsif n % 5 == 0
    "Buzz"
  elsif n % 3 == 0
    "Fizz"
  else
    n.to_s
  end
end


# i = 1
# while i <= 15
#   puts fizz_buzz(i);
#   i+=1
# end

