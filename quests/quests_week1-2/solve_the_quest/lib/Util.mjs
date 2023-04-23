/* -------------------- アプリを機能単位にまとめる -モジュール- -------------------- */
// ES2015からモジュールがサポートされた
const AUTHOR = 'TAKESHI, ARIHORI';

export class Member {
  // コンストラクター
  // javaScriptのクラスは全てがpublic
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
  // メソッド
  getName() {
    return this.lastName + ' ' + this.firstName;
  }
}

export class BusinessMember extends Member {
  work() {
    return this.getName() + 'は働いています！！';
  }
}
