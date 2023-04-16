# 第七章 クラスの作成を理解する

# Userクラスを定義
class User
  attr_reader :first_name, :last_name, :age

  def initialize(first_name, last_name, age)
    @first_name = first_name
    @last_name = last_name
    @age = age
  end
end

# ユーザーのデータを作成
users = []
users << User.new('Alice', 'Ruby', 20)
users << User.new('Bob', 'Python', 30)

# # 氏名を作成するメソッド
def full_name(user)
  "#{user.first_name} #{user.last_name}"
end

# ユーザーのデータを表示する
users.each do |user|
  puts "氏名: #{full_name(user)}, 年齢: #{user.age}"
end

# ============ オブジェクト指向プログラミング関連の用語 ============
# クラス：設計図
# オブジェクト, インスタンス, レシーバ: クラスをもとにして作成したデータの塊
# メソッド, メッセージ: オブジェクトが持つ動作や振る舞い
# 状態(ステート): オブジェクトごとに保持されるデータ
# 属性(アトリビュート、プロパティ): 外部から取得したり変更したり


# ============ initializeメソッド ============
# クラスからオブジェクトを作成する時
# デフォルトではprivateメソッド

class User
  def initialized
    puts 'Initialized'
  end
end

user = User.new
user.initialized



# ============ インスタンスメソッドの定義 ============
# 同じインスタンスの内部で共有される変数 -> @で始まる変数のこと

class User
  # インスタンスメソッドの定義
  def hello
    "hello!"
  end
end

user = User.new # インスタンスメソッドの呼び出し
user.hello


# ============ インスタンス変数とアクセサメソッド ============
class User
  def initialize(name)
    # インスタンス作成時に渡された名前をインスタンス変数に保存
    @name = name
  end

  def hello
    # インスタンス変数に保存されている名前を表示する
    "Hello, I am #{@name}"
  end
end

user = User.new('Alice')
user.hello

# @, @@や$といったプレフィックス(接続辞)がつかない変数はローカル変数になる


# ============ getter, setter ============
# Rubyの場合、get_ set_ といった名前はあまり付けない

# ========= インスタンス変数の内容を外部から読み書きする場合: attr_accessorメソッドを使用 =======
class User
  # @nameを読み書きするメソッドが自動的に定義される
  attr_accessor :name
  def initialize(name)
    @name = name
  end
  # nameメソッドやname=メソッドを明示的に定義する必要がない
end

user = User.new('Alice')
# @nameを変更する
user.name = 'Bob'
user.name


# ========= インスタンス変数の内容を読み取り専用にする場合: attr_readerメソッドを使用 ============
class User
  # 読み取り用のメソッドだけを定義する
  attr_reader :name
  def initialize(name)
    @name = name
  end
end

user = User.new('Alice')
user.name

# @nameを変更しようとするとエラーになる
user.name = 'Bob'


# ========= インスタンス変数の内容を書き込み専用にする場合: attr_writerメソッドを使用 ==========
class User
  # 書き込み用のメソッドだけを定義する
  attr_reader = name
  def initialize(name)
    @name = name
  end
end

user = User.new('Alice')
# @nameは変更できる
user.name = 'Bob'

# @nameへの参照はできない
user.name



# ============ 複数の値を渡し、複数のインスタンス変数に対するアクセサメソッドを定義 ============
class User
  # @nameと@ageへのアクセサメソッドを定義する
  attr_accessor :name, :age
  def initialize(name, age)
    @name = name
    @age = age
  end
end

user = User.new("Alice", 20)
user.name
user.age




# ============ クラスメソッドの定義 ============
# 定義方法 1
#
class User
  def self.initialize
    # クラスメソッドの処理
  end
end

# 定義方法 2
# classメソッドをたくさん定義する際に、毎回selfをつけなくていい
class User
  class << self
    def self.initialize
      # クラスメソッドの処理
    end
  end
end



# ============ クラス名・メソッド名 ============
# 一つ一つのインスタンスに含まれるデータは使わないメソッドを定義する場合
# この場合はクラスメソッドを定義する方が効率的

class User
  def initialize(name)
    @name = name
  end

  # self.をつけるとクラスメソッドになる
  # クラスオブジェクトの特異メソッド
  def self.create_users(names)
    names.map do |name|
      User.new(name)
    end
  end


  # インスタンスメソッド
  def hello
    "Hello, I am #{@name}."
  end
end

names = ["Alice", "Bob", "Carol"]
# クラスメソッドの呼び出し
users = User.create_users(names)
users.each do |user|
  # インスタンスメソッドの呼び出し
  puts user.hello
end



# ============ 定数 ============
class Product
  # デフォルトの価格を定数として定義する
  DEFAULT_PRICE = 0

  attr_reader :name, :price
  # 第二引数priceのデフォルト値を定数DEFAULT_PRICEとする
  def initialize(name, price = DEFAULT_PRICE)
    @name = name
    @price = price
  end
end

product = Product.new('A free movie')
product.price





# ============ self ============
# Javaでいうthisと同じ

class User
  attr_accessor :name
  def initialize(name)
    @name = name
  end

  def hello
    # selfなしでnameメソッドを呼ぶ
    "Hello, I am #{name}."
  end

  def hi
    "Hi, I am #{self.name}."
  end

  def my_name
    # 直接インスタンス変数の@nameにアクセスする
    "My name is #{@name}."
  end
end
user = User.new("Alice")
user.hello
user.hi
user.my_name



# ============ 継承 ============

class User
end

# is-aの関係
User.superclass # 継承クラスを表示
user.methods.sort # 継承したメソッドの一覧の確認

# オブジェクトのクラスの調べ方
user.class # => User
user.instance_of?(User) # => true
user.instance_of?(String) # => false

# 継承関係(is_a)にあるかどうかを含めて確認する場合
user = User.new
# instance_ofは引数で指定したクラスそのもののインスタンスでないとtrueにならない
user.instance_of?(Object) # => false

# is-a関係にあればtrue
user.is_a?(User)
user.is_a?(Object)
user.is_a?(BasicObject)


# =========== superでスーパークラスのメソッドを呼び出す ============

# Productを継承 class サブクラス < スーパークラス
# class DVD < Product
# end

# スーパークラス Product
class Product
  attr_reader :name, :price
  def initialize(name, price)
    @name = name
    @price = price
  end
end

product = Product.new('A great movie', 1000)
product.name
product.price

# サブクラス DVD
class DVD < Product
  # nameとpriceはスーパークラスでattr_readerが設定されているので定義不要
  attr_reader :running_time

  def initialize(name, price, running_time)
    # スーパークラスのinitializeメソッドを呼び出す
    super(name, price)
    # DVDクラス独自の属性
    @running_time = running_time
  end
end

dvd = DVD.new('A great movie', 1000, 120)
dvd.name
dvd.price
dvd.running_time


# ============== メソッドのオーバーライド ===============
class Product
  attr_reader :name, :price

  def initialize(name, price)
    @name = name
    @price = price
  end

  def to_s
    "name: #{name}, price: #{price}"
  end
end

class DVD < Product
  attr_reader :running_time

  def initialize(name, price, running_time)
    super(name, price)
    @running_time = running_time
  end

  def to_s
    # superでスーパークラスのto_sメソッドを呼び出す
    "#{super}, running_time: #{running_time}"
  end
end

product = Product.new('A great movie', 1000)
product.to_s

dvd = DVD.new('An awesome film', 3000, 120)
dvd.to_s

# ============== privateクラスについて ===============
# initialize以外は基本publicメソッドになる
# privateは外部に公開されないメソッド(クラスの内部でのみ使えるメソッド, レシーバがselfに限定されるメソッド)

# private
class User
  # ここから下で定義されたメソッドはprivate
  private

  def hello
    'Hello!'
  end
end
user = User.new
user.hello # (irb):10:in `<main>': private method `hello' called for #<User:0x00000001034486b8>


# selfをつけることで呼び出せる
class User
  def hello
    "Hello!, I am #{self.name}."
  end

  private

  def name
    'Alice'
  end
end

user = User.new
user.hello # => "Hello!, I am Alice."


# ============== provateメソッドはサブクラスでも呼び出せる =================
class Product
  private

  # これはprivate
  def name
    'A great movie'
  end
end

class DVD < Product
  def to_s
    # nameはスーパークラスのprivateメソッド
    "name: #{name}"
  end
end

dvd = DVD.new
# 内部でスーパークラスのprivateメソッドを呼んでいるがエラーにならない
dvd.to_s

# ============== protectedメソッド ===============
# そのメソッドを定義したクラス自身と、そのサブクラスのインスタンスメソッドからレシーバ付きで呼び出せる
# 用途: 外部には公開したくないが、同じクラスやサブクラスの中であればレシーバ付きで呼びだせるようにしたい！！という時に使える
# Ruby 3.0以上ならメソッドの定義と同時にprotectedメソッドにすることができる

class User
  attr_reader :name
  #weightメソッドの定義と同時にprotectedメソッドにする
  protected attr_reader :weight

  def initialize
    @name = name
    @weight = weight
  end

  def heavier_than?(other_user)
    other_user.weight < @weight
  end

  protected

  # protectedメソッドなので同じクラスかサブクラスであればレシーバ付きで呼び出せる
  def weight
    @weight
  end
end

alice = User.new('Alice', 50)
bob = User.new('Bob', 60)

# 同じクラスのインスタンスメソッド内であればweightが呼び出せる
alice.heavier_than?(bob)
bob.heavier_than?(alice)

# クラスの外ではweightは呼び出せない
alice.weight



# ============== クラスインスタンス変数 ===============

# クラスインスタンス変数とは、インスタンス作成とは無関係に、クラス自身が保持しているデータのこと
# 継承した場合、クラスインスタンス変数はスーパークラスとサブクラスでは異なる変数として参照することになる

class Product
  # クラスインスタンス変数
  @name = 'Product'

  def self.name
    # クラスインスタンス変数
    @name
  end

  def initialize(name)
    # インスタンス変数
    @name = name
  end

  # attr_reader :name絵もいいが、@nameの中身を意識するためにあえてメソッドを定義する
  def name
    # インスタンス変数
    @name
  end
end

class DVD < Product
  @name = 'DVD'

  def self.name
    # クラスインスタンス変数を参照
    @name
  end
  def upcase_name
    # インスタンス変数を参照
    @name.upcase
  end
end


Product.name
DVD.name

product = Product.new('A great movie')
product.name

dvd = DVD.new('An awesome film')
dvd.name
dvd.upcase_name

Product.name
DVD.name

# ============== クラス変数 ===============
# クラスメソッド内でもインスタンスメソッド内でも参照できてしまう
# 滅多に使用しない
class Product
  @@name = 'Product'

  def self.name
    @@name
  end

  def initialize(name)
    @@name = name
  end

  def name
    @@name
  end
end

class DVD < Product
  @@name = 'DVD'

  def self.name
    @@name
  end
  def upcase_name
    @@name.upcase
  end
end


Product.name
DVD.name

product = Product.new('A great movie')
product.name

dvd = DVD.new('An awesome film')
dvd.name
dvd.upcase_name

Product.name
DVD.name



# ============== 等値を判断するメソッドや演算子 ===============

# equal? -> object_idが等しい場合true
# == -> 内容が等しいならtrue 例: 1 == 1.0 true
# === -> "when節のオブジェクト === case節のオブジェクト"の結果を評価する時や、パターンマッチの際
# eql? -> == よりも厳格な等値判定 例: 1 eql? 1.0 false ハッシュ値が同じかで判定
.hash # -> ハッシュ値が出力される

# eql?の代表的な用途:2つのオブジェクトが8種のキーとして同じかどうかを判定する
# ハッシュ値は稀に異なるオブジェクトから同じkeyが生成されることがある
class CountryCode
  attr_reader :code

  def initialize(code)
    @code = code
  end

  def eql?(other)
    # otherがCountryCodeかつ、同じ国コードなら同じキーとみなす
    other.instance_of?(CountryCode) && code.eql?(other.code)
  end

  def hash
    # CountryCodeオブジェクトのハッシュ値として国コードのハッシュ値を返す
    code.hash
  end
end

japan = CountryCode('JP')
us = CountryCode('US')
india = CountryCode('IN')

currencies = {
  japan: 'yen',
  us: 'dollar',
  india: 'rupee'
}

# 同じ国コードなら同じキーとみなされる
key = CountryCode.new('JP')
currencies[:key]
currencies[:japan]

# 等価（equality）:
# 等価とは、2つのオブジェクトが同じ「値」を持っていることを示します。
# オブジェクトの内容が同じであるかどうかを判断しますが、オブジェクトの実際のインスタンスについては考慮しません。
str1 = "hello"
str2 = "hello"

puts str1 == str2 # => true


# 等値（identity）:

# 等値とは、2つのオブジェクトが同じ「インスタンス」であることを示します。
# equal?メソッドまたはobject_idメソッドを使用してオブジェクトの等値性を比較します。

str1 = "hello"
str2 = "hello"
str3 = str1

puts str1.equal?(str2) # => false
puts str1.equal?(str3) # => true

puts str1.object_id == str2.object_id # => false
puts str1.object_id == str3.object_id # => true




# ============== ダックタイピング ===============

# ダックタイピング -> メソッドが呼び出せばよしとされるプログラミングスタイルのこと

class Product
  def initialize(name, price)
    @name = name
    @price = price
  end

  def display_text
    # stockメソッドはサブクラスで実装してもらう想定
    stock = stock? ? 'あり' : 'なし'
    "商品名: #{@name} 価格: #{@price} 在庫: #{@stock}"
  end

  # 例外処理
  def stock?
    # 「サブクラスでstock?メソッドを実装すること」といメッセージとともにエラーを発生させる
    raise 'must implement stock? in subclass.'
  end
end

class DVD < Product
  # 在庫があればtrueを返す
  def stock?
    # データベースの接続を書くのだが今回は省略
    true
  end
end

product = Product.new('A great film', 1000)
product.display_text

dvd = DVD.new('An awesome film', 3000)
dvd.display_text