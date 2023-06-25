# CRUD 処理を実装できる

TODO を管理できる「TODO アプリ」を作りながら学んでいきましょう。基本的な機能は以下の通りです。

- TODO を追加する: ユーザーは新しいタスクを追加することができます。各タスクにはタイトル（タスクの簡単な説明）があります。
- TODO の一覧を表示する: ユーザーは、すべてのタスクの一覧示することができます。一覧には、タスクのタイトルが表示されます。
- TODO を編集する: タスクのタイトルを編集することができます。
- TODO を削除する: 一覧からタスクを削除することができます。

なお、Scaffold 機能は使用しないでください。

## 1. プロジェクトの作成

Rails の新規プロジェクトを作成してください。

トップページにアクセスしたときに、ページが表示されることを確認してください。

## 2. テーブルの作成

今回使用するテーブルを作成しましょう。

テーブルの作成にはマイグレーションを使用します。マイグレーションとは何か、マイグレーションを使用するメリットは何かを説明してください。

次に、TODO のデータを保存するためのテーブルを作成してください。テーブル名は `todos` とします。テーブルには以下のカラムが必要です。

- `id`: タスクの ID
- `title`: タスクのタイトル
- `created_at`: タスクの作成日時
- `updated_at`: タスクの更新日時

## 3. モデルの作成

TODO のデータを扱うためのモデルを作成してください。モデルには特に処理を書く必要はありません。

## 4. ルーティングの設定

`/todos` に GET されると、TODO の一覧を表示するページ（以下、TODO 一覧ページ）を表示するようにルーティングを設定してください。

また、トップページにアクセスしたときも TODO 一覧ページを表示するようにしてください。

## 5. コントローラーの作成

TODO 一覧を表示するためのコントローラー及びコントローラーのアクションを作成してください。アクション内では特に処理を行わなくて大丈夫です。

## 6. ビューの作成

TODO 一覧ページのビューを作成してください。HTML は以下を参考にしてください。

```html
<div class="container">
  <h1>Todo List</h1>

  <a class="new-task" href="/todos/new">タスクを追加する</a>

  <table>
    <thead>
      <tr>
        <th>タスク</th>
        <th>アクション</th>
      </tr>
    </thead>
    <tbody>
      <!-- ここは後から動的コンテンツに置き換える -->
      <tr>
        <td>サンプルタスク</td>
        <td>
          <a class="edit" href="#">編集</a>
          <a class="delete" href="#">削除</a>
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

CSS は以下を参考にしてください。

```css
body {
  font-family: "Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif;
  background-color: #f5f5f5;
  padding: 20px;
}

.container {
  max-width: 600px;
  margin: 0 auto;
}

h1 {
  text-align: center;
}

form {
  display: flex;
  margin-bottom: 20px;
}

form input[type="text"] {
  flex: 1;
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

form input[type="submit"] {
  width: 150px;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  color: #fff;
  background-color: #007BFF;
  cursor: pointer;
}

table {
  width: 100%;
  border-collapse: collapse;
}

table,
th,
td {
  border: 1px solid #ddd;
}

th,
td {
  padding: 10px;
  text-align: left;
}

.edit,
.delete {
  display: inline-block;
  padding: 10px;
  border: none;
  border-radius: 4px;
  color: #fff;
  text-decoration: none;
  margin-right: 5px;
}

.edit {
  background-color: #FFC107;
}

.delete {
  background-color: #DC3545;
}

.new-task {
  display: inline-block;
  margin-bottom: 20px;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  color: #fff;
  background-color: #007BFF;
  text-decoration: none;
}
```

## 7. TODO 新規作成ページの作成

TODO の新規作成ページを作成してください。HTML は以下を参考にしてください。

```html
<div class="container">
  <h1>タスクの追加</h1>

  <form>
    <input type="text" placeholder="タスクを入力する">
    <input type="submit" value="保存する">
  </form>
</div>
```

ビューが完成したら、タスクの保存処理を実装してください。タスクが保存できたら、TODO 一覧ページにリダイレクトするようにします。また、データベースにタスクが保存されていることを確認してください。

## 8. TODO 一覧の表示

TODO 一覧ページで、保存されている TODO の一覧を表示してください。その際に、一覧ページの HTML で示した「サンプルタスク」の部分を、保存されている TODO のタイトルに置き換えてください。

## 9. 編集ページの作成

TODO の編集ページを作成し、タイトルを編集できるようにしてください。HTML は以下を参考にしてください。

```html
<div class="container">
  <h1>タスクの編集</h1>

  <form>
    <input type="text" placeholder="タスクを入力する">
    <input type="submit" value="保存する">
  </form>
</div>
```

ビューが完成したら、タスクの保存処理を実装してください。タスクが保存できたら、TODO 一覧ページにリダイレクトするようにします。また、データベースに更新されたタスクが保存されていることを確認してください。

この機能を作成する際、フォーム部分の HTML はパーシャル化することで、TODO の新規作成ページと共通化してください。

## 10. 削除機能

TODO 一覧ページで、TODO の削除ボタンをクリックすると、TODO を削除できるようにしてください。

削除ボタンをクリックすると、「本当に削除していいですか?」と確認ダイアログが表示され、OK をクリックすると TODO が削除され、TODO 一覧ページにリダイレクトするようにします。
