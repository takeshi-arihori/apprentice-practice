# RealWorld

ブログプラットフォームを作る RealWorld という OSS のプロジェクトがあります。

RealWorld は実世界と同じ機能を持つプラットフォームを作ることで、学習したいフレームワークの技術を習得することを目的としてたプロジェクトです。

ここでは、RealWorld の バックエンドの API の仕様を満たす Laravel API を作成します。

ステップ 1 とステップ 2 に分かれます。時間に余裕がない場合はステップ 1 に進んでください。時間に余裕がある場合はステップ 2 に進んでください。ステップ 1 を終えてからステップ 2

ステップ 1 は RealWorld の API の仕様を部分的に満たした API を作成します。具体的には、認証機能のない簡易バージョンの作成になります。

## ステップ 1

RealWorld 　の API のうち、次のエンドポイントを実装してください。

```
Create Article
Get Article
Update Article
Delete Article
```

なお、Article に関わる要素のうち、認証機能及び著者、タグ、お気に入り(favorite) は実装しなくてよいものとします。

## 開発手順

1. Laravel Sail にて環境構築を行う
   詳細は Blog に書いてあります。

2. モデルとマイグレーションの作成
   まず、Article モデルとそれに対応するマイグレーションを作成します。Laravel の Artisan コマンドを使用してこれを行います。ターミナルで以下のコマンドを実行してください。

`sail artisan make:model Article -m`
このコマンドは Article モデルと、それに対応するマイグレーションファイルを作成します。-m オプションはマイグレーションファイルを同時に作成するためのものです。

3. マイグレーションファイルの編集
   次に、新しく作成されたマイグレーションファイルを編集します。このファイルは database/migrations ディレクトリにあり、create_articles_table という名前が付けられています。

このファイルを開き、up メソッドを以下のように編集します。

```
public function up()
{
    Schema::create('articles', function (Blueprint $table) {
        $table->id();
        $table->string('slug')->unique();
        $table->string('title');
        $table->string('description');
        $table->text('body');
        $table->json('tagList')->nullable();
        $table->timestamps();
    });
}
```

4. マイグレーションの実行
   マイグレーションファイルの編集が完了したら、以下のコマンドを実行してマイグレーションを行います。

`sail artisan migrate`

これで、データベースに articles テーブルが作成されます。

5. ルーティングの設定
   次に、Article に関するルーティングを設定します。routes/api.php ファイルを開き、以下のコードを追加します。

```
Route::apiResource('articles', ArticleController::class);
```

6. コントローラーの作成
   次に、Article に関する操作を行うコントローラーを作成します。以下のコマンドを実行してください。

```
sail artisan make:controller ArticleController --api
```

このコマンドは ArticleController という名前のコントローラーを作成します。--api オプションは、API 用のコントローラーを作成するためのもので、一連のアクションメソッド（index, store, show,update, destroy）が自動的に生成されます。

7. コントローラーの編集
次に、新しく作成された ArticleController を編集します。このファイルは app/Http/Controllers ディレクトリにあります。

まず、このファイルの先頭に以下のコードを追加します。
```
use App\Models\Article;
use Illuminate\Support\Str;
```

次に、store メソッドを以下のように編集します。これは新しい記事を作成するためのメソッドです。

```
public function store(Request $request)
{
    $data = $request->get('article');

    $request->validate([
        'article.title' => 'required',
        'article.description' => 'required',
        'article.body' => 'required',
    ]);

    $article = new Article([
        'slug' => Str::slug($data['title']),
        'title' => $data['title'],
        'description' => $data['description'],
        'body' => $data['body'],
        'tagList' => $data['tagList'],
    ]);

    $article->save();

    return response()->json([
        'message' => 'Article created successfully!',
        'article' => $article
    ], 201);
}
```

このメソッドでは、まずリクエストデータのバリデーションを行います。次に、新しい Article インスタンスを作成し、リクエストデータを使用してそのプロパティを設定します。最後に、新しい Article インスタンスをデータベースに保存します。

次に、show メソッドを以下のように編集します。これは特定の記事を取得するためのメソッドです。

```
public function show($slug)
{
    $article = Article::where('slug', $slug)->firstOrFail();

    return response()->json([
        'article' => $article
    ], 200);
}
```

このメソッドでは、指定されたスラグに一致する記事をデータベースから取得します。記事が見つからない場合は、404 エラーを返します。

次に、update メソッドを以下のように編集します。これは特定の記事を更新するためのメソッドです。

```
public function update(Request $request, $slug)
{
    $article = Article::where('slug', $slug)->firstOrFail();

    $article->update($request->all());

    return response()->json([
        'message' => 'Article updated successfully!',
        'article' => $article
    ], 200);
}
```

このメソッドでは、指定されたスラグに一致する記事をデータベースから取得します。次に、リクエストデータを使用して記事のプロパティを更新します。

最後に、destroy メソッドを以下のように編集します。これは特定の記事を削除するためのメソッドです。

```
public function destroy($slug)
{
    $article = Article::where('slug', $slug)->firstOrFail();

    $article->delete();

    return response()->json([
        'message' => 'Article deleted successfully!'
    ], 200);
}
```

このメソッドでは、指定されたスラグに一致する記事をデータベースから取得します。次に、その記事をデータベースから削除します。

### ArticleController の編集が終わったら、api.php ファイルの先頭に以下のコマンドを追加しコントローラーをインポートします。

`use App\Http\Controllers\ArticleController;`

8. モデルの編集
最後に、Article モデルを編集します。このファイルは app/Models ディレクトリにあります。

$fillable プロパティを以下のように設定します。これは、一括代入を許可するフィールドを指定するためのものです。

``protected $fillable = ['slug', 'title', 'description', 'body', 'tagList'];``

また、$casts プロパティを以下のように設定します。これは、モデルの属性を特定のタイプにキャストするためのものです。

```
protected $casts = [
'tagList' => 'array',
];
```
これで、Laravel での"Create Article"エンドポイントの実装は完了です。Postman を使用して、このエンドポイントが正しく動作するかテストしてみてください。



## Postmanを使用する方法

1. Postmanのインストール
まず、Postmanがまだインストールされていない場合は、公式サイトからダウンロードしてインストールしてください。

2. Postmanの起動
Postmanを起動します。起動すると、左側に「Collections」パネルが表示されます。

3. Collectionの作成
「Collections」パネルの右上にある「+」ボタンをクリックして新しいCollectionを作成します。Collectionは関連するリクエストをまとめるためのものです。例えば、今回の場合は「RealWorld API」などと名付けると良いでしょう。

4. Requestの作成
新しいCollectionを作成したら、その中に新しいRequestを作成します。Collectionの右側(もしくは左側)にある「...」ボタンをクリックし、「Add Request」を選択します。Requestの名前を入力し、「Save to RealWorld API」をクリックします。

5. Requestの設定
新しいRequestを作成したら、その設定を行います。まず、左上のドロップダウンメニューからHTTPメソッド（GET、POST、PUT、DELETEなど）を選択します。次に、隣のテキストボックスにリクエストのURLを入力します。例えば、「Create Article」のエンドポイントの場合、HTTPメソッドは「POST」、URLは「http://localhost:8800/api/articles」になります。

6. リクエストボディの設定
「POST」や「PUT」などのリクエストでは、リクエストボディを設定する必要があります。リクエストボディは、リクエストと一緒にサーバーに送信されるデータです。リクエストボディを設定するには、下部のタブから「Body」を選択し、「raw」を選択します。そして、テキストボックスにJSON形式でデータを入力します。

7. リクエストの送信
すべての設定が完了したら、「Send」ボタンをクリックしてリクエストを送信します。すると、右側のパネルにレスポンスが表示されます。

以上が基本的なPostmanの使い方です。続いて「Create Article」、「Get Article」、「Update Article」、「Delete Article」の実装をハンズオンで解説していきたいと思います。

## Postmanを使用してCreate Articleを実装する方法

1. ``http://localhost:8800/api/articles``をPOSTメソッドで送信します。
2. リクエストボディに以下のJSONデータを入力します。

```
{
    "article": {
        "title": "How to train your dragon",
        "description": "Ever wonder how?",
        "body": "Very carefully.",
        "tagList": ["training", "dragons"]
    }
}
```
3. リクエストを送信します。
4. レスポンスに以下のJSONデータが表示されます。

```
{
    "message": "Article created successfully!",
    "article": {
        "slug": "how-to-train-your-dragon",
        "title": "How to train your dragon",
        "description": "Ever wonder how?",
        "body": "Very carefully.",
        "tagList": [
            "training",
            "dragons"
        ],
        "updatedAt": "2021-03-09T08:00:00.000000Z",
        "createdAt": "2021-03-09T08:00:00.000000Z",
        "id": 1
    }
}
```

5. PHPMyAdminを開き、articlesテーブルを確認します。すると、新しい記事が追加されていることが確認できます。

## Postmanを使用してGet Articleを実装する方法
1. ``http://localhost:8800/api/articles/how-to-train-your-dragon``をGETメソッドで送信します。
2. レスポンスに以下のJSONデータが表示されます。

```
{
    "article": {
        "slug": "how-to-train-your-dragon",
        "title": "How to train your dragon",
        "description": "Ever wonder how?",
        "body": "Very carefully.",
        "tagList": [
            "training",
            "dragons"
        ],
        "updatedAt": "2021-03-09T08:00:00.000000Z",
        "createdAt": "2021-03-09T08:00:00.000000Z",
        "id": 1
    }
}
```

## Postmanを使用してUpdate Articleを実装する方法
1. ``http://localhost:8800/api/articles/how-to-train-your-dragon``をPUTメソッドで送信します。
2. リクエストボディに以下のJSONデータを入力します。

```
{
    "article": {
        "title": "How to train your dragon",
        "description": "Ever wonder how?",
        "body": "Very carefully.",
        "tagList": ["training", "dragons"]
    }
}
```
3. リクエストを送信します。
4. レスポンスに以下のJSONデータが表示されます。

```
{
    "message": "Article updated successfully!",
    "article": {
        "slug": "how-to-train-your-dragon",
        "title": "How to train your dragon",
        "description": "Ever wonder how?",
        "body": "Very carefully.",
        "tagList": [
            "training",
            "dragons"
        ],
        "updatedAt": "2021-03-09T08:00:00.000000Z",
        "createdAt": "2021-03-09T08:00:00.000000Z",
        "id": 1
    }
}
```
5. PHPMyAdminを開き、articlesテーブルを確認します。すると、記事が更新されていることが確認できます。

## Postmanを使用してDelete Articleを実装する方法
1. ``http://localhost:8800/api/articles/how-to-train-your-dragon``をDELETEメソッドで送信します。
2. レスポンスに以下のJSONデータが表示されます。

```
{
    "message": "Article deleted successfully!"
}
```
3. PHPMyAdminを開き、articlesテーブルを確認します。すると、記事が削除されていることが確認できます。

以上で、Postmanを使用してCreate Article、Get Article、Update Article、Delete Articleを実装する方法の解説を終わります。Postmanを使用することで、APIの実装を簡単に確認することができます。ぜひ、Postmanを使ってAPIの実装を確認してみてください。

![mermaid-diagram-2023-06-18-202451](https://github.com/takeshi-arihori/apprentice-practice/assets/83809409/c099e155-a71b-43bc-afc2-5c5bd30da4fc)

