# JWT 認証を実装できる

「TODO アプリ」に JWT 認証の機能を追加しましょう。仕様を以下にまとめます。

- ユーザーを登録できるようにします。ユーザーは email と password の情報を持ちます
- ユーザーがログインできるようにします。ログインに成功した場合は JWT トークンを返します
- TODO の追加、一覧表示、更新、削除のエンドポイントにアクセスするには、JWT トークンによる認証が必須となります。HTTP リクエストの Authorization ヘッダーに含まれている JWT トークンをデコードし、ユーザー ID を取得します。ユーザー ID のユーザーが存在した場合は、TODO の追加、一覧表示、更新、削除を許可します。ユーザーID のユーザーが存在しない場合、または JWT トークンが存在しない場合は、TODO の追加、一覧表示、更新、削除を許可しません

## 1. JWT Gem のインストール

JWT を扱うために、以下の Gem をインストールしてください。

- [jwt](https://github.com/jwt/ruby-jwt): JWT を Ruby で扱うための Gem
- [bcrypt](https://github.com/bcrypt-ruby/bcrypt-ruby): ユーザーのパスワードをセキュアにするための Gem

## 2. Users テーブルの作成

Users テーブルを作成してください。カラムとして以下を少なくとも持たせてください。

- email: メールアドレス
- password_digest: パスワード。bcrypt を使ってハッシュ化してください

## 3. User モデルの作成

User モデルを作成し、`has_secure_password` メソッドををモデル内に記載してください。それにより、ハッシュ化したパスワードをデータベース内の `password_digest` カラムに保存できます。

## 4. ユーザー登録の作成

ユーザーを登録するためのエンドポイントを作成してください。

email と password を POST することで、ユーザーを登録できるようにします。

`POST /api/users`

▼ リクエストボディ例

```js
{
  "user": {
    "email": "harry@example.com",
    "password": "harryharry"
  }
}
```

▼ レスポンスボディ例

```js
{
  "user": {
    "email": "harry@example.com",
    "token": null
  }
}
```

## 5. 認証機能の作成

認証(ログイン)するためのエンドポイントを作成してください。

email と password を POST されると、認証を行います。email と password の組み合わせが正しいユーザーが存在しているかどうかを確認し、存在している場合は JWT トークンをレスポンスに含めてください。

JWT トークンは、`{ user_id: 1 }` という JSON 形式のデータを、jwt gem でエンコードしたものです。エンコードする時のアルゴリズムは `HS256` を使用してください(指定しなければデフォルトで `HS256` が使用されます)。エンコードする時に使用するキーは Rails のシークレットキー(`Rails.application.credentials.secret_key_base`)を使用することができます。

`POST /api/users/login`

▼ リクエストボディ例

```js
{
  "user":{
    "email": "harry@example.com",
    "password": "harryharry"
  }
}
```

▼ レスポンスボディ例

```js
{
  "user": {
    "email": "harry@example.com",
    "token": "eyJhbGciIUzI1NiJ9.eyJ1c2VkIjo1fQ.SQrIgJo8VqB9CZs",
  }
}
```

## 5. JWT トークンの認証

TODO の追加、一覧表示、更新、削除のエンドポイントにアクセスするには、JWT トークンによる認証が必要にしてください。

TODO の追加、一覧表示、更新、削除のエンドポイントにアクセスされたら以下を行うようにしましょう。

- TODO の追加、一覧表示、更新、削除のエンドポイントにアクセス際に、HTTP リクエストの Authorization ヘッダーに JWT トークンを含めます。Postman を使用している場合、Authorization タブの Type に Bearer Token を選択し、Token に JWT トークンを入力します
- JWT トークンをデコードし、ユーザー ID を取得します
- ユーザー ID のユーザーが存在するかどうかを確認します
- ユーザー ID のユーザーが存在する場合は、TODO の追加、一覧表示、更新、削除の処理に進みます
- ユーザー ID のユーザーが存在しない場合は、HTTP 401 Unauthorized を返します

※本来は TODO のデータとユーザーのデータを紐づけし、TODO を作成したユーザーだけが TODO を操作できるようにするのが望ましいです。今回は簡単のため、ユーザー ID が存在するかどうかのみで認証を行います。
