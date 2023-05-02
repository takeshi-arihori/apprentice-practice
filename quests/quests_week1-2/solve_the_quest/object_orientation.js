
/* =============================== ES2015以前のオブジェクト指向構文 =============================== */

// オブジェクトのプロトタイプについて
// var Member = function (firstName, lastName) {
//   this.firstName = firstName;
//   this.lastName = lastName;
// };


// var mem = new Member('Takeshi', 'Arihori');
// mem.getName = function () {
//   return this.lastName + ' ' + this.firstName; // thisがないとエラーになる
// }

// console.log(mem.getName());


// mem2.getName is not a functionとなる
// 理由: プロトタイプベースのオブジェクト指向だから、それぞれが持つメンバーは同一であるとは限らない
// オブジェクトを凍結する場合: Object.seal(this);
// var mem2 = new Member('Nami', 'Tanigake');
// console.log(mem2.getName());



// thisについて
// スクリプトのどこからでも参照できる特別な変数(呼び出す場所や呼び出し方法によって中身が変化する不思議な変数)

// thisキーワードの参照先

// var data = 'Global data';
// var obj1 = {data: 'obj1 data'};
// var obj2 = {data: 'obj2 data'};


// function hoge(){
//   // console.log(this.data);
//   var args = Array.prototype.slice.call(arguments);
//   console.log(args.join('／'))
// }

// hoge.call(null); // Global data
// hoge.call(obj1); // obj1 data
// hoge.call(obj2); // obj2 data

// hoge('Angular', 'React', 'Backbone');




/* コンストラクターの強制的な呼び出し */
// var Member = function (firstName, lastName) {
//   if (!(this instanceof Member)) {
//     return new Member(firstName, lastName);
//   }
//   this.firstName = firstName;
//   this.lastName = lastName;
// };

// var m = Member('Takeshi', 'Arihori');
// console.log(m);
// console.log(firstName);
// console.log(m.firstName);



/* メソッドはプロトタイプで宣言 */

// クラスという抽象的な設計図が存在しないのがJavaScriptの世界である
// 実体化されたオブジェクトだけで、新しくオブジェクトを生成する場合も、オブジェクトが元となる。
// そのオブジェクトの原型を表すのが、それぞれのオブジェクトに属する「プロトタイプ」という特別なオブジェクトになる

// var Member = function (firstName, lastName) {
//   this.firstName = firstName;
//   this.lastName = lastName;
// };

// Member.prototype.getName = function(){
//   return this.lastName + ' ' + this.firstName;
// }

// var mem = new Member('Takeshi', 'Arihori');

// console.log(mem.getName());


// メリット1: メモリの使用量を節減できる
// => インスタンスから暗黙的に参照されるのみなので、コピーされるわけではない。
// ・インスタンス側に要求されたメンバーが存在しないかを確認
// ・存在しない場合は、暗黙の参照を辿ってプロトタイプオブジェクトを検索
// ※ コンストラクター経由でメソッドを定義する場合に起こる「メモリを無駄に消費する」問題を回避できる

// メリット2: メンバーの追加や変更をインスタンスがリアルタイムに認識できる
// => インスタンスにメンバーをコピーしない = プロトタイプオブジェクトへの変更をインスタンス側で動的に認識できる

// var Member = function(firstName, lastName){
//   this.firstName = firstName;
//   this.lastName= lastName;
// }

// var mem = new Member('Takeshi', 'Arihori');

// インスタンス化の後にメソッドを追加
// Member.prototype.getName = function(){
//   return this.lastName + ' ' + this.firstName;
// }

// console.log(mem.getName());


/* -------------------- プロパティの設定 -------------------- */

// 値の参照時のみプロトタイプオブジェクトが利用される
// mem2.sex = '女' では、インスタンスmem2自身がsexプロパティを持つようになるので、mem2はプロトタイプを参照する必要がなくなる
// 結果、インスタンスmem2に設定されているsexプロパティが参照される
// var Member = function(){};

// Member.prototype.sex = '男';
// var mem1 = new Member();
// var mem2 = new Member();

// console.log(mem1.sex + '|' + mem2.sex); // 男|男
// mem2.sex = '女';
// console.log(mem1.sex + '|' + mem2.sex); // 男|女

// ・プロパティの宣言 -> コンストラクターで
// ・メソッドの宣言 -> プロトタイプで


/* -------------------- プロパティの削除 -------------------- */
// var Member = function(){};

// Member.prototype.sex = '男';
// var mem1 = new Member();
// var mem2 = new Member();

// console.log(mem1.sex + '|' + mem2.sex); // 男|男
// mem2.sex = '女';
// console.log(mem1.sex + '|' + mem2.sex); // 男|女
// delete mem1.sex // sexプロパティを持たない -> delete演算子は何も行わない -> 暗黙の参照を辿ってプロトタイプオブジェクトを返す
// delete mem2.sex // sexプロパティを持つ -> delete演算子はこれを削除する -> 暗黙の参照を辿ってプロトタイプオブジェクトを返す

// // mem2.sex = undefined // インスタンス単位で削除したい場合、undefinedを上書きすることで擬似的にメンバーを無効化(存在は消せない)

// console.log(mem1.sex + '|' + mem2.sex); // 男|男

// // インスタンス側でのメンバーの追加や削除といった操作が、プロトタイプオブジェクトにまで影響を及ぼすことはない
// delete Member.prototype.sex // プロトタイプオブジェクトのメンバーを削除する場合、全てのインスタンスに影響を及ぼす事になるため注意


/* -------------------- オブジェクトリテラルでプロトタイプを定義 -------------------- */

// 可読性向上のため
// var Member = function (firstName, lastName) {
//   this.firstName = firstName;
//   this.lastName = lastName;
// };

// Member.prototype = {
//   getName: function () {
//     return this.lastName + ' ' + this.firstName;
//   },
//   toString: function () {
//     return this.lastName + ' ' + this.firstName;
//   }
// };

// let mem1 = new Member("test", "taro");
// console.log(mem1.getName())



/* -------------------- 継承 -------------------- */

// オブジェクトの機能を引き継いで、新たなクラスを定義する機能のこと
// メリット: 共通した機能を複数のクラスで重複して定義する必要がなくなる(差分プログラミング)
// 継承元: スーパークラス、基底クラス
// 継承先: サブクラス、派生クラス


// プロトタイプにインスタンスを設定することで、インスタンス同士を「暗黙の参照」で連結し、互いに継承関係を持たせることができる。
// このようなプロトタイプの連なりをプロトタイプチェーンと呼ぶ

// プロトタイプチェーンの基礎
// var Animal = function () { };

// Animal.prototype = {
//   walk : function(){
//     console.log('トコトコ！！');
//   }
// };

// var Dog = function(){
//   Animal.call(this);
// };

// Dog.prototype = new Animal(); // Dogオブジェクトのプロトタイプとして、Animalオブジェクトのインスタンスをセット

// Dog.prototype.bark = function(){
//   console.log('わんわん！！');
// }

// var d = new Dog();
// d.walk(); // トコトコ！！
// d.bark(); // わんわん！！


// 現在のプロパティだけを列挙する場合: hasOwnPropertyを使用(現在のインスタンスが持つプロパティだけを列挙する)
// for(var key in obj){
//   if(obj.hasOwnProperty(key)){
//     console.log(key);
//   }
// }


/* -------------------- 継承関係は動的に変更可能 -------------------- */
// JavaScriptによる継承は動的なもの: 「同一のオブジェクトが、あるタイミングではオブジェクトXを継承しており、次のタイミングではオブジェクトYを継承している」ことも可能

// var Animal = function () { };

// Animal.prototype = {
//   walk: function () {
//     console.log('トコトコ！！');
//   }
// };

// var SuperAnimal = function () { };

// SuperAnimal.prototype = {
//   walk: function () {
//     console.log('ダダダダダ！！');
//   }
// };


// var Dog = function () { };
// Dog.prototype = new Animal(); // Dog -> Animal
// var d1 = new Dog();
// d1.walk(); // トコトコ！！

// Dog.prototype = new SuperAnimal(); // Dog -> SuperAnimal
// var d2 = new Dog();
// d2.walk(); // ダダダダダ！！
// d1.walk(); // トコトコ！！

// インスタンスが生成された時点で固定され、その後の変更に関わらず保存される


/* -------------------- オブジェクトの方を判定 -------------------- */
// 1: 元となるコンストラクターを取得する -constructorプロパティ-
// オブジェクトの元となったコンストラクター(関数オブジェクト)を取得できる
// var Animal = function () { };
// var Hamster = function () { };
// Hamster.prototype = new Animal();

// var a = new Animal();
// var h = new Hamster();
// console.log()
// console.log(a.constructor === Animal); // true
// console.log(h.constructor === Animal); // true
// console.log(h.constructor === Hamster); // false
// // プロトタイプ継承している場合、constructorプロパティが示すものは継承元のクラス(Animal)となる

// // 2: 元となるコンストラクターを判定する -instanceof演算子-
// // 「オブジェクト instanceof コンストラクター」: オブジェクトが特定のコンストラクターによって生成されたインスタンスであるかどうかを判定する
// console.log()
// console.log(h instanceof Animal); // true
// console.log(h instanceof Hamster); // true
// // プロトタイプチェーンを遡って判定も可

// // 3: 参照しているプロトタイプを確認する -isPrototypeOfメソッド-
// // オブジェクトが参照しているプロトタイプを確認する
// console.log()
// console.log(Hamster.prototype.isPrototypeOf(h));
// console.log(Animal.prototype.isPrototypeOf(h));

// // 4: メンバーの有無を判定する -in演算子-
// var obj = { hoge: function () { }, foo: function () { } };
// // 同じクラスをもとにしたインスタンスが、必ずしも同じメンバーを持つとは限らない(インスタンスの単位にメンバーが動的に追加されることもあるため)
// // 特定のメンバーを利用できるかチェックする
// console.log()
// console.log('hoge' in obj); // true
// console.log('foo' in obj); // true
// console.log('piyo' in obj); // false


/* -------------------- プライベートメンバーを定義 -------------------- */
// クラス内部のメソッドからのみ呼び出せるプロパティ/メソッドのこと
// メリット: 不用意に外部からアクセスされる心配がない

// public : 外部からアクセスできる
// private : 外部からアクセスできない(クラス内部からのアクセスのみを許可)

// 特徴
// point1: プライベートメンバーはコンストラクター関数で定義
// point2: 特権メソッド(プリビレッジドメソッド)を定義してプライベートメンバーにアクセスする

// function Triangle() {
//   // クロージャを利用することで擬似的にプライベートメンバーを定義
//   // プライベートプロパティの定義(底辺/高さを保持)
//   var _base; // プライベートの場合はvarで定義
//   var _height;
//   // プライベートメソッドの定義(引数が正の数値であるかチェック)
//   var _checkArgs = function (val) {
//     return (typeof val === 'number' && val > 0);
//   }

//   // プライベートメンバーにアクセスするためのメソッドを定義
//   this.setBase = function (base) {
//     if (_checkArgs(base)) { _base = base };
//   }
//   this.getBase = function () { return _base };

//   this.setHeight = function (height) {
//     if (_checkArgs(height)) { _height = height };
//   }
//   this.getHeight = function () { return _height };
// }

// // プライベートメンバーにアクセスしない普通のメソッドを定義
// Triangle.prototype.getArea = function () {
//   return this.getBase() * this.getHeight() / 2;
// };


// var t = new Triangle();
// t._base = 10;
// t._height = 2;
// console.log('三角形の面積: ' + t.getArea());

// t.setBase(10);
// t.setHeight(2);
// console.log('三角形の底辺: ' + t.getBase());
// console.log('三角形の高さ: ' + t.getHeight());
// console.log('三角形の面積: ' + t.getArea());




/* =============================== ES2015のオブジェクト指向構文 =============================== */

// class命令の導入により書きやすくなった
// class構文
/*
```
...コンストラクターの定義...
...プロパティの定義...
...メソッドの定義...
```
*/

// class命令で定義されたクラスは内部的には関数である(functionオブジェクトで表現してきたクラスをよりわかりやすく表現するためのもの)
// class命令は、プロトタイプベースのオブジェクト指向構文を覆い包むシンタックスシュガーみたいな感じ

// 関数との違い
// 1: 関数としての呼び出しはできない
// 2: 定義前のクラスを呼び出すことはできない
class Member {
  // コンストラクター
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  // firstNameプロパティ
  get firstName() {
    return this._firstName;
  }
  set firstName(value) {
    if (typeof value === 'string' && value.length > 0) {
      this._firstName = value;
    } else {
      throw new Error('firstName must be a non-empty string');
    }
  }

  // lastNameプロパティ
  get lastName() {
    return this._lastName;
  }
  set lastName(value) {
    if (typeof value === 'string' && value.length > 0) {
      this._lastName = value;
    } else {
      throw new Error('lastName must be a non-empty string');
    }
  }

  // メソッド
  getName() {
    return this.lastName + ' ' + this.firstName;
  }
}

let m = new Member('Takeshi', 'Arihori');
/* let m = new Member(123, ''); // 空文字または文字列以外ならエラーをスローする */
console.log(m.getName());



/* -------------------- 既存のクラスの継承 -------------------- */
// class Member{
//   // コンストラクター
//   // javaScriptのクラスは全てがpublic
//   constructor(firstName, lastName){
//     this.firstName = firstName;
//     this.lastName = lastName;
//   }
//   // メソッド
//   getName(){
//     return this.lastName + ' ' + this.firstName;
//   }
// }

// class BusinessMember extends Member{
//   work(){
//     return this.getName() + 'は働いています！！';
//   }
// }

// let bm = new BusinessMember('Takeshi', 'Arihori');
// console.log(bm.getName());
// console.log(bm.work());



/* -------------------- 基底クラスのメソッド/コンストラクターを呼び出す -superキーワード- -------------------- */
// 基底クラスで定義されたメソッド/コンストラクターはサブクラスで上書きできる(メソッドのオーバーライド)
// Override: 基底クラスで定義された機能を派生クラスで再定義すること

// class Member {
//   // コンストラクター
//   // javaScriptのクラスは全てがpublic
//   constructor(firstName, lastName) {
//     this.firstName = firstName;
//     this.lastName = lastName;
//   }
//   // メソッド
//   getName() {
//     return this.firstName + ' ' + this.lastName;
//   }
// }
// // Memberオブジェクトを継承したBusinessMemberクラスを定義
// class BusinessMember extends Member {
//   // 引数にclazz(役職)を追加
//   constructor(firstName, lastName, clazz) {
//     super(firstName, lastName);
//     this.clazz = clazz;
//   }

//   getName() {
//     return super.getName() + '／役職:' + this.clazz;
//   }
// }

// let bm = new BusinessMember('Takeshi', 'Arihori', 'CTO');
// console.log(bm.getName());

// オーバーライドに関しては、基底クラスの機能を完全に書き換えるだけでなく、基底クラスの処理を引き継ぎつつ、派生クラスでは差分の処理だけを追加する場合もある
/*
```
super(args,...) ,= constructor
super.method(args,...)
  method:メソッド名 args,...:引数
```
*/

/* -------------------- 変数を同名のプロパティに割り当てる -------------------- */
// let name = '有堀豪';
// let birth = new Date(1987, 1, 3);
// let member = { name, birth };

// console.log(member)


// プロパティを動的に生成
// let i = 0;
// let member = {
//   name: "有堀豪",
//   birth: new Date(1987, 1, 3),
//   ['memo' + ++i]: '正規会員',
//   ['memo' + ++i]: '支部会長',
//   ['memo' + ++i]: '関西',
// }

// console.log(member)



/* --------------------  -------------------- */



/* --------------------  -------------------- */



/* --------------------  -------------------- */



/* --------------------  -------------------- */



