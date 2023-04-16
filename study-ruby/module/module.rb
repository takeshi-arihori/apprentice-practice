# puts 'Hello world!'.rainbow

# # ターミナル上の文字色を変える時
# "\e[31mABC\e[0m"


# =============== モジュールの定義 include ===============

# 特徴
# モジュールからインスタンスは生成できない
# 他のモジュールやクラスを継承できない

# モジュールをクラスにinclude
# 共通の機能は持たせたいがis-aの関係ではない時にクラスのmoduleをinclude

module Loggable
  # logメソッドはprivateにする
  private

  def log
    puts "[LOG] #{text}"
  end
end

class Product
  # 上で作ったモジュールをincludeする
  include Loggable

  def title
    # logメソッドはLoggableモジュールで定義したメソッド
    log 'title is called.'
    'A great movie'
  end
end


class User
  include Loggable

  def name
    puts 'name is called.'
    'Alice'
  end
end

product = Product.new
product.title

user = User.new
user.name


# =============== モジュールをextends ===============





# ===============  ===============
# ===============  ===============
# ===============  ===============
# ===============  ===============
# ===============  ===============
# ===============  ===============
# ===============  ===============
# ===============  ===============
# ===============  ===============
# ===============  ===============
# ===============  ===============
# ===============  ===============
# ===============  ===============
# ===============  ===============