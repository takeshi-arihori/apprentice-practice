# Postman を使って API をテストできる

Postman とは API を開発・テストするためのツールです。API を開発する時には、Postman を使って API の動作確認をすることが多いです。

Postman をインストールした上で、以下に進みましょう。

## 1. ファーストリクエスト

[Sending your first request](https://learning.postman.com/docs/getting-started/sending-the-first-request/) を読み、最初のリクエストを送信してみましょう。

## 2. 新規プロジェクト

ローカルにて API のプロジェクトを作成しましょう。サーバーサイドのフレームワーク(Rails等)を学習中の場合、そのフレームワークを使用して新規プロジェクトを作成してください。

次に、以下のエンドポイントを作成してください。エンドポイントが作成できたら、Postman でリクエストを送信してみましょう。

HTTP リクエストは次のようになります。

- GET /get

HTTP レスポンスは次のようになります。

```js
{
  "status": "success"
}
```
