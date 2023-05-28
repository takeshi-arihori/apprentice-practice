<!-- インタラクティブな Web アプリを作成できる
1. TODO アプリ
TODO アプリを作成してください。以下の順に実装してください。

ユーザーがテキストボックスにタスクを入力し、追加ボタンを押すと、タスクが追加され表示される。テキストボックスは空になる
各タスクには削除ボタンが付いており、削除ボタンを押すとタスクが削除される
各タスクにはチェックボックスが付いており、チェックボックスにチェックを入れるとタスクが完了したことになり、タスクの文字に取り消し線が付く。チェックを外すと取り消し線が消える
HTML と CSS は以下を使用してください。なお、HTMLは必要に応じて変更しても構いません。
-->


<!DOCTYPE html>
<html lang="ja">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Todo</title>
  <link rel="stylesheet" type="text/css" href="style.css">
</head>

<body>
  <div class="todo-app">
    <h1>Todoリスト</h1>
    <form>
      <input type="text" id="todo-input" placeholder="新しいタスクを入力" />
      <button type="submit" id="add-button">タスクを追加する</button>
    </form>
    <ul id="todo-list">
      <!-- タスクはここに追加される。下記のようなタグを追加する -->
      <!-- <li class="todo-item"><input type="checkbox"><span>TODO</span><button class="delete-button">削除</button></li> -->
    </ul>
  </div>
  <script src="todo.js"></script>
</body>


</html>

style.css
```
body {
  background-color: #F4F4F4;
}

.todo-app {
  width: 400px;
  margin: 0 auto;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 8px;
}

h1 {
  text-align: center;
}

form {
  display: flex;
  margin-bottom: 20px;
}

#todo-input {
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

#add-button {
  padding: 10px 20px;
  border: none;
  background-color: #007BFF;
  color: #fff;
  cursor: pointer;
  margin-left: 10px;
  border-radius: 4px;
}

#add-button:hover {
  background-color: #0056b3;
}

#todo-list {
  list-style-type: none;
  padding: 0;
}

.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #f2f2f2;
  border-radius: 4px;
}

.delete-button {
  padding: 5px 10px;
  border: none;
  background-color: #ff4d4d;
  color: #fff;
  cursor: pointer;
  border-radius: 4px;
}

.delete-button:hover {
  background-color: #cc0000;
}
```


2. 電卓アプリ
電卓アプリを作成してください。仕様は以下の通りです。

電卓には、結果を表示するためのディスプレイエリアがあります
電卓には、0～9の数字、四則演算（加算、減算、乗算、除算）、等号、クリアボタンがあります
ユーザーが数字ボタンを押すと、その数字が表示エリアに表示されます
すでに数字が表示されている場合は、数字ボタンを押すと、その右側に新しい数字が追加されます
番号を入力した後に四則演算ボタンを押すと、番号の右側に四則演算の記号が表示されます
四則演算ボタンを押した後、新しい数値を入力すると、表示エリアに新しい数値が表示されます
イコールボタンを押すと、保存されている数値と現在表示されている数値の演算結果を計算し、結果を表示します
クリアボタンを押すと、表示領域と保存されている操作や数値がクリアされます
HTML と CSS は以下を使用してください。なお、HTMLは必要に応じて変更しても構いません。

```
<!DOCTYPE html>
<html lang="ja">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>電卓アプリ</title>
  <link rel="stylesheet" type="text/css" href="style.css">
</head>

<body>
  <div id="calculator">
    <div id="display"></div>
    <div id="buttons">
      <button class="digit">1</button>
      <button class="digit">2</button>
      <button class="digit">3</button>
      <button class="operator">+</button>
      <button class="digit">4</button>
      <button class="digit">5</button>
      <button class="digit">6</button>
      <button class="operator">-</button>
      <button class="digit">7</button>
      <button class="digit">8</button>
      <button class="digit">9</button>
      <button class="operator">*</button>
      <button class="digit">0</button>
      <button id="clear">C</button>
      <button class="operator">/</button>
      <button id="equals">=</button>
    </div>
  </div>
  <script src="calculator.js"></script>
</body>

</html>
```

style.css
```
#calculator {
  width: 200px;
  margin: auto;
  text-align: center;
}

#display {
  height: 50px;
  line-height: 50px;
  border: 1px solid #000;
  margin-bottom: 10px;
  font-size: 24px;
}

#buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

button {
  height: 50px;
  font-size: 20px;
}
```