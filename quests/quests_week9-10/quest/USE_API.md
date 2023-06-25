# API を利用できる

[簡単な API を作成できる](/quest/technologies/api/EASY_API.md) の続きになります。

## 1. API の利用

TODO アプリの API を利用して、TODO を管理できる Web アプリを作成してください。フロントエンドを実装して、TODO アプリを完成させます。

HTML、CSS、JavaScript は以下をベースにしてください。今回は API を利用するイメージをつかむことが目的です。コードを読んで、API を利用する方法を理解することを目標にしてください。

なお、CORS のエラーが発生した場合、全てのリクエストを許可するようにして大丈夫なものとします。

index.html

```html
<!DOCTYPE html>
<html>

<head>
  <title>TODO</title>
  <link rel="stylesheet" type="text/css" href="styles.css">
</head>

<body>
  <h1>TODO</h1>
  <input id="new-todo" type="text" placeholder="新しいTODO">
  <button onclick="addTodo()">追加する</button>
  <ul id="todo-list"></ul>
  <script src="script.js"></script>
</body>

</html>
```

styles.css

```css
body {
  font-family: "Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif;
}

#todo-list {
  margin: 0;
  padding: 0;
}

.todo-item {
  list-style-type: none;
  margin: 5px;
  padding: 5px;
  border: 1px solid #333;
}

#new-todo {
  margin-bottom: 10px;
}
```

script.js

```js
const api = 'http://localhost:3000/api'; // API の URL に置き換える

function addTodo() {
  const title = document.getElementById('new-todo').value;
  fetch(`${api}/todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ todo: { title } })
  })
  .then(response => response.json())
  .then(() => {
    document.getElementById('new-todo').value = '';
    fetchTodos();
  });
}

function fetchTodos() {
  fetch(`${api}/todos`)
  .then(response => response.json())
  .then(data => {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';
    for (let todo of data.todos) {
      let listItem = document.createElement('li');
      listItem.className = 'todo-item';
      listItem.innerHTML = `
        ${todo.title}
        <button onclick="editTodo(${todo.id})">編集</button>
        <button onclick="deleteTodo(${todo.id})">削除</button>
      `;
      todoList.appendChild(listItem);
    }
  });
}

function editTodo(id) {
  const newTitle = prompt("新しいTODOを入力してください");
  fetch(`${api}/todos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ todo: { title: newTitle } })
  })
  .then(response => response.json())
  .then(() => fetchTodos());
}

function deleteTodo(id) {
  fetch(`${api}/todos/${id}`, {
    method: 'DELETE'
  })
  .then(() => fetchTodos());
}

fetchTodos();
```
