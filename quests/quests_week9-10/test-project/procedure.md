# 環境構築

## 開発手順

1. モデルと DB 作成

```
sail artisan make:model Post -m
```

database/migrations/本日の日付\_create_posts_table.php

```
    public function up()
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('body');
            $table->text('image')->nullable();
            $table->timestamps();
        });
    }
```

-   データ型の指定について
    [Laravel 公式サイト・マイグレーション](https://readouble.com/laravel/10.x/ja/migrations.html)

| データ型                                   | 説明(公式サイトより）  | 使用時            |
| :----------------------------------------- | :--------------------- | :---------------- |
| integer                                    | INTEGER カラム         | 整数              |
| string VARCHAR カラム 名前など短めの文字列 |
| text TEXT カラム コメントなどの文字列      |
| longText LONGTEXT カラム かなり長い文字列  |
| unsignedBigInteger foreignId               | 符号なし BIGINT カラム | 他のテーブルの ID |
| boolean                                    | BOOLEAN カラム         | true/false        |

-   マイグレーションファイルにデータベースに保存する内容を入力したら、マイグレートを実行します。

```
sail artisan migrate
```

-   実行したマイグレーションの操作をやり直したい時は、ロールバックコマンドが使えます。
    下記のようにコマンドを入力すれば、バッチごとにマイグレートを取り消せます。
    ※ ロールバックすると、マイグレートで作成したテーブルが削除されます。

```
sail artisan migrate:rollback
```

2. リレーションの設定
   app/Model/Post.php

```

    /**
     * Get the posts for the user.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function posts(){
        return $this->hasMany(Post::class);
    }
```

-   前回作成した posts テーブルに user_id カラムを作成し、この中に投稿者の user_id を格納できるようにします。
    作成したテーブルの中にカラムを追加する

```
sail artisan make:migration add_column_user_id_to_posts_table --table=posts
```

database/migrations/本日の日付\_add_column_user_id_to_posts_table.php

```
return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('posts', function (Blueprint $table) {
            $table->foreignId('user_id')->after('image');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('posts', function (Blueprint $table) {
            $table->dropColumn('user_id');
        });
    }
};
```

3. フォームの作成

resources/views のなかに、【post】フォルダを作成

この中に 【create.blade.php】ファイルを作成します。

```
<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            投稿の新規作成
        </h2>
    </x-slot>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mx-4 sm:p-8">
            <form enctype="multipart/form-data">
                <div class="md:flex items-center mt-8">
                    <div class="w-full flex flex-col">
                        <label for="title" class="font-semibold leading-none mt-4">件名</label>
                        <input type="text" name="title"
                            class="w-auto py-2 placeholder-gray-300 border border-gray-300 rounded-md" id="title"
                            placeholder="Enter Title">
                    </div>
                </div>

                <div class="w-full flex flex-col">
                    <label for="body" class="font-semibold leading-none mt-4">本文</label>
                    <textarea name="body" class="w-auto py-2 border border-gray-300 rounded-md" id="body" cols="30"
                        rows="10"></textarea>
                </div>

                <div class="w-full flex flex-col">
                    <label for="image" class="font-semibold leading-none mt-4">画像 </label>
                    <div>
                        <input id="image" type="file" name="image">
                    </div>
                </div>

                <x-primary-button class="mt-4">
                    送信する
                </x-primary-button>

            </form>
        </div>
    </div>

</x-app-layout>
```

作成・保存したら、次にresources/views/layoutsの中のapp.blade.phpファイルを開いてください。

このapp.blade.phpファイルとリンクさせることで、手軽にナビゲーションバー付のファイルを作成できます。

このapp.blade.phpファイルをテンプレートとして使用したとき、二重波括弧 {{ }} で囲んだ部分に、各ファイルの情報をいれていきます。

この二重波括弧部分をスロットといいます。

スロットが1個の場合は、{{$slot}} とします。

スロットが2個以上の場合は、上記の {{$header}}のように、スロットに名前を付けます。

また21行目あたりに、@include('layouts.navigation')とあります。

これは、resources/layoutsの中のnavigation.blade.phpファイルの中身を埋め込むという意味です。


4. リソースコントローラー作成

```
php artisan make:controller PostController --resource --model=Post
```

新規作成画画面を表示する
それでは、前回作成した新規作成画面を表示させてみましょう。

PostController.phpファイルを開いてください。

--model=Postとモデル名をつけてコントローラを作成したため、ファイル上部にPostモデルのuse宣言が入っています。

確認してください。

【PostController.php】
```
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
// use宣言が入っている
use App\Models\Post;
```

その下にあるcreateメソッドに、次のように入力します。

【PostController.php】
```
class PostController extends Controller
{

    public function create()
    {
            return view('post.create');
    }
}
```

- ルート設定
【web.php】
```
use App\Http\Controllers\PostController;
```

さらに、次のようにルート設定をいれます。

【web.php】
```
Route::resource('post', PostController::class);
```

5. ビューファイルの編集

【create.blade.php】
```

<form method="post" action="{{route('post.store')}}" enctype="multipart/form-data">
 @csrf
```

6. データの保存
app/modelsの中のPost.phpファイルを開き、下記を入力してください。

【Post.php】
```
class Post extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'body',
        'user_id',
        'image',
    ];
}
```
- 次に app/Http/Controllersの中のPostControllerを開きます。
storeメソッドの一番最初に、下記を入れましょう。

【PostController.php】
```
$post=new Post();
```

- インスタンスを作成したら、フォームで投稿された内容を使って、インスタンスの中身を入れていきます。

まずは、次のように記述して、件名を設定しましょう。

【PostController.php】

$post->title=$request->title;

【PostController.php】

```
$post->title=$request->title;
$post->body=$request->body;
$post->user_id=auth()->user()->id;
$post->save();
return redirect()->route('post.create');
```

- 新規投稿テスト
それでは、新規投稿作成フォームをブラウザに表示してください。

まずは、/login 画面よりWebアプリにログインします。

その後、URLの最後にpost/createを加えて、ブラウザを更新してください。

新規投稿画面が表示されます。

投稿を送信後、データが保存されているかチェックしてみましょう。

phpMyAdminにログインし、データベースのpostsテーブルの中に、投稿内容が反映されているか確認してください。

- フラッシュメッセージの表示
【PostController.php】
```
return redirect()->route('post.create')->with('message', '投稿を作成しました');
```

さらに resources/views/postの中のcreate.blade.phpファイルのタイトルの下あたりに、以下のように3行追加してください。

【create.blade.php】

<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            投稿の新規作成
        </h2>
        @if(session('message'))
            {{session('message')}}
        @endif
    </x-slot>


セッションの中にメッセージがあれば表示する、という意味のコードです。


7. Componentの作成

- Componentの作成
まずは下記コマンドを入力して、componentを作成します。
```
sail artisan make:component Message
```


- まずは、app/View/Components/Message.phpを開きます。

【Message.php】

<?php

namespace App\View\Components;

use Illuminate\View\Component;

class Message extends Component
{
    // ここから編集した部分
    public $message;

    public function __construct($message)
    {
        $this->message = $message;
    }

    // この部分は編集不要
    public function render()
    {
        return view('components.message');
    }
}


- 次に resources/views/componentsの中の message.blade.phpファイルを開きます。

ここに、次のようなコードをいれていきます。

【message.blade.php】

@if(isset($message))
<div class="border px-4 py-3 rounded relative bg-green-100 border-green-400 text-green-700">
    {{$message}}
</div>
@endif

- 最後にresources/views/post/create.blade.phpファイルを開きます。

前回 messageを表示するために追加したコードを、次のように変更します。

【create.blade.php】

``<x-message :message="session('message')" />``



8. バリデーション設定

app/Http/Controllersの中のPostController.phpファイルを開きます。

前回は、下記のように、フォームから送信された内容を登録する処理を書きました。

【PostController.php】

    public function store(Request $request)
    {
        $post=new Post();
        $post->title=$request->title;
        $post->body=$request->body;
        $post->user_id=auth()->user()->id;
        $post->save();
        return redirect()->route('post.create')->with('message', '投稿を作成しました');
    }

最初にバリデーションチェックをかけるために、このコードを次のように変えましょう。

【PostController.php】

    public function store(Request $request)
    {
        $inputs=$request->validate([
            'title'=>'required|max:255',
            'body'=>'required|max:1000',
            'image'=>'image|max:1024'
        ]);
        $post=new Post();
       $post->title=$inputs['title'];
       $post->body=$inputs['body'];
        $post->user_id=auth()->user()->id;
        $post->save();
        return redirect()->route('post.create')->with('message', '投稿を作成しました');
    }


エラーメッセージの表示箇所を作成

resources/views/postの中の create.blade.phpファイルを開きます。

タイトルの下あたり、前回追加したメッセージ表示部分の上に、次のコードを追加します。

        <x-input-error class="mb-4" :messages="$errors->all()"/>


前後のコードも一緒に表示すると、次のようになります。

【create.blade.php】

    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            投稿の新規作成
        </h2>

        <x-input-error class="mb-4" :messages="$errors->all()"/>

        <x-message :message="session('message')" />

    </x-slot>


- 日本語化パッケージを導入


```
composer require askdkc/breezejp --dev
sail artisan breezejp
```

バリデーションエラーになった場合、これまで入力した内容が消えてしまいます。
これを防ぐには、old関数が便利です。
書き方は次のとおり。
{{ old('name属性の値') }}

次のように、inputタグはvalue属性の中に、textareaタグはタグの間にold関数を入れてあげましょう。
【create.blade.php】
                        <div class="w-full flex flex-col">
                        <label for="body" class="font-semibold leading-none mt-4">件名</label>
                        <input type="text" name="title" class="w-auto py-2 placeholder-gray-300 border border-gray-300 rounded-md" id="title" value="{{old('title')}}" placeholder="Enter Title">
                        </div>
                    </div>

                    <div class="w-full flex flex-col">
                        <label for="body" class="font-semibold leading-none mt-4">本文</label>
                        <textarea name="body" class="w-auto py-2 border border-gray-300 rounded-md" id="body" cols="30" rows="10">{{old('body')}}</textarea>
                    </div>


- 画像のアップロード
エラーがあった場合に、「画像ファイルがあれば、再度選択してください」とユーザーに表示することは可能です。
resources/views/componentsの中のinput-error.blade.phpファイルをコピーして、同じ場所に貼り付けてください。
ファイルの名前は、validation-errors.blade.phpとします。

ファイルの中身には、次のようにif構文を追加してください。
【validation-errors.blade.php】
@props(['errors'])

```
@if ($errors->any())
    <div {{ $attributes }}>
        <div class="font-medium text-red-600">
            エラーの内容を確認してください。
        </div>

        <ul class="mt-3 list-disc list-inside text-sm text-red-600">
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach

            {{-- ここから追加 --}}
            @if(empty($errors->first('image')))
                <li>画像ファイルがあれば、再度、選択してください。</li>
            @endif
        </ul>
    </div>
@endif
```

最後にcreate.blade.phpファイルのエラーメッセージ表示部分を、次のように変更します。
【create.blade.php】
        <x-validation-errors class="mb-4" :errors="$errors" />

画像ファイルの部分には「1MBまで」とサイズ制限も追加しました。
【create.blade.php】
<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            投稿の新規作成
        </h2>

        <x-validation-errors class="mb-4" :errors="$errors" />

        <x-message :message="session('message')" />
    </x-slot>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mx-4 sm:p-8">
            <form method="post" action="{{route('post.store')}}" enctype="multipart/form-data">
                @csrf
                <div class="md:flex items-center mt-8">
                    <div class="w-full flex flex-col">
                    <label for="body" class="font-semibold leading-none mt-4">件名</label>
                    <input type="text" name="title" class="w-auto py-2 placeholder-gray-300 border border-gray-300 rounded-md" id="title" value="{{old('title')}}" placeholder="Enter Title">
                    </div>
                </div>

                <div class="w-full flex flex-col">
                    <label for="body" class="font-semibold leading-none mt-4">本文</label>
                    <textarea name="body" class="w-auto py-2 border border-gray-300 rounded-md" id="body" cols="30" rows="10">{{old('body')}}</textarea>
                </div>

                <div class="w-full flex flex-col">
                    <label for="image" class="font-semibold leading-none mt-4">画像 （1MBまで）</label>
                    <div>
                    <input id="image" type="file" name="image">
                    </div>
                </div>

                <x-primary-button class="mt-4">
                    送信する
                </x-primary-button>

            </form>
        </div>
    </div>
</x-app-layout>



9. 画像の保存

シンボリックリンクの作成
まずはなぜシンボリックリンクが必要かを説明します。

Webアプリを公開した際に、閲覧者は、publicフォルダ（ディレクトリ）の中にアクセスができます。

ですが他のフォルダ（ディレクトリ）にはアクセスできません。

そのため、ブラウザに反映させるcssやjavascript、画像ファイルはpublicフォルダに入れておかねばなりません。

ところが、画像ファイルは storageフォルダに保存することになっています。

storageフォルダに保存した画像をpublicフォルダを通じてアクセスするために、publicフォルダにstorageフォルダのショートカットを作る必要があるのです。

このショートカットが、シンボリックリンクです。


``sail artisan storage:link``



画像保存処理を追加
次に、コントローラーに画像を保存する処理を追加していきます。

app/Http/Controllersの中のPostControllerを開きます。

前回までに作成したコードは次のとおりです。

【PostController.php】
```
public function store(Request $request)
{

    $inputs=request()->validate([
        'title'=>'required|max:255',
        'body'=>'required|max:1000',
        'image'=>'image|max:1024'
    ]);
    $post=new Post();
    $post->title=$inputs['title'];
    $post->body=$inputs['body'];
    $post->user_id=auth()->user()->id;
    $post->save();
    return redirect()->route('post.create')->with('message', '投稿を作成しました');
}
```

$post->save(); の前に、下記の画像保存用コードを付け加えましょう。

【image】は、画像送信用タグの中のnama属性の名前です。

① 元々のファイル名を取得し、これを$nameに代入する
② $nameの名前で画像ファイルを指定した場所に保存する
③ $nameの名前で画像ファイルのファイル名をデータベースに保存する

【PostController.php】
```
if (request('image')){
    $name = request()->file('image')->getClientOriginalName();
    request()->file('image')->move('storage/images', $name);
    $post->image = $name;
}
```

コードに、次のように date('Ymd_His') を追加します。

 date('Ymd_His')を追加したstoreメソッド全体のコードは下記のようになります。

    public function store(Request $request)
    {

        $inputs=request()->validate([
            'title'=>'required|max:255',
            'body'=>'required|max:1000',
            'image'=>'image|max:1024'
        ]);
        $post=new Post();
        $post->title=$inputs['title'];
        $post->body=$inputs['body'];
        $post->user_id=auth()->user()->id;

        if (request('image')){
            $original = request()->file('image')->getClientOriginalName();
             // 日時追加
            $name = date('Ymd_His').'_'.$original;
            request()->file('image')->move('storage/images', $name);
            $post->image = $name;
        }

        $post->save();
        return redirect()->route('post.create')->with('message', '投稿を作成しました');
    }


10. 一覧画面の作成
データベースに蓄積されたデータを表示する方法


コントローラーの設定
今回はpost.indexページを使って、画面を表示していきます。

app/Http/Controllersの中の PostController.php を開いてください。

次のようにコードを入れます。

【PostController.php】
    public function index()
    {
        $posts=Post::all();
        $user=auth()->user();
        return view('post.index', compact('posts', 'user'));
    }


一覧画面表示ファイルを作成
①から④の場所には、後ほど、コードをいれていきます。

【index.blade.php】

<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            投稿の一覧
        </h2>

        <x-message :message="session('message')" />

    </x-slot>

    {{-- 投稿一覧表示用のコード --}}
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        @foreach ($posts as $post)
            <div class="mx-4 sm:p-8">
                <div class="mt-4">
                    <div class="bg-white w-full  rounded-2xl px-10 py-8 shadow-lg hover:shadow-2xl transition duration-500">
                        <div class="mt-4">
                            <h1 class="text-lg text-gray-700 font-semibold hover:underline cursor-pointer">①件名</h1>
                            <hr class="w-full">
                            <p class="mt-4 text-gray-600 py-4">②本文</p>
                            <div class="text-sm font-semibold flex flex-row-reverse">
                                <p>③投稿者名 • ④投稿作成日</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        @endforeach
    </div>
</x-app-layout>

ログインした後、/post の画面を表示させてみます。

まず①件名には、次のように入れてください。

【index.blade.php】

                        <h1 class="text-lg text-gray-700 font-semibold hover:underline cursor-pointer">{{ $post->title }}</h1>


postsテーブルの中のtitleカラムの中の値が表示されます。

次に②本文には、次のように入れましょう。

【index.blade.php】

<p class="mt-4 text-gray-600 py-4">{{$post->body}}</p>


③投稿者名には、次のように入れます。

【index.blade.php】

<p> {{ $post->user->name }} • ④投稿作成日</p>

④投稿作成日には、次のコードを入れてください。

【index.blade.php】

<p> {{ $post->user->name }} • {{$post->created_at->diffForHumans()}}</p>

⑤追記
{{-- 投稿一覧表示用のコード --}}
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {{$user->name}}さん、こんにちは！！
    @foreach ($posts as $post)

#### データの並び順を変える
データの並び順を変えるには、コントローラーを少し修正するだけでOKです。

Post::all() の部分を、Post::orderBy('created_at', 'desc') にします。

並べ替えたデータを get() で取得します。

これによって、作成順にpostsデータを並べることができます。

【PostController.php】

    public function index(){

        $posts=Post::orderBy('created_at','desc')->get();
        $user=auth()->user();
        return view('home', compact('posts', 'user'));
    }

ログイン後の画面の変更


今作成した一覧ページを、ログインした直後に表示させるようにします。

デフォルトの設定では、ログイン後に dashboardの画面が表示されます。

この設定を変えていきましょう。

app/Providers/RouteServiceProvide.php ファイルを開きます。

デフォルトの設定をコメントアウトして、次のようにコードを加えます。

【RouteServiceProvider.php】


    // デフォルトの設定
    // public const HOME = '/dashboard';

    // 加えたコード
    public const HOME = '/post';


#### ログイン後の画面の変更


今作成した一覧ページを、ログインした直後に表示させるようにします。

デフォルトの設定では、ログイン後に dashboardの画面が表示されます。

この設定を変えていきましょう。

app/Providers/RouteServiceProvide.php ファイルを開きます。

デフォルトの設定をコメントアウトして、次のようにコードを加えます。

【RouteServiceProvider.php】


    // デフォルトの設定
    // public const HOME = '/dashboard';

    // 加えたコード
    public const HOME = '/post';


11. メニューの追加

resources/views/layoutsの中のnavigation.blade.phpファイルを開いてください。

14行目あたりの <!-- Navigation Links --> の部分を、下記のように変更します。

【navigation.blade.php】

                 <!-- Navigation Links -->
                <div class="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                    <x-nav-link :href="route('post.index')" :active="request()->routeIs('post.index')">
                        HOME
                    </x-nav-link>
                    <x-nav-link :href="route('post.create')" :active="request()->routeIs('post.create')">
                        新規作成
                    </x-nav-link>
                </div>


先ほどのnavigation.blade.phpファイルの67行目あたりの<!-- Responsive Navigation Menu -->の部分も次のように変更します。

【navigation.blade.php】

    <!-- Responsive Navigation Menu -->
    <div :class="{'block': open, 'hidden': ! open}" class="hidden sm:hidden">
        <div class="pt-2 pb-3 space-y-1">
            <x-responsive-nav-link :href="route('post.index')" :active="request()->routeIs('post.index')">
                HOME
            </x-responsive-nav-link>
            <x-responsive-nav-link :href="route('post.create')" :active="request()->routeIs('post.create')">
                新規作成
            </x-responsive-nav-link>
        </div>

#### ロゴの変更

ロゴの画像を準備したら、プロジェクトの中のpublic/logo の中に置いてください。

ついでにリンク先も post.indexと変更しておきましょう。

ファイル名は、ご利用のものに変更してくださいね。

再び navigation.blade.phpファイルを開いてください。
【navigation.blade.php】

                <!-- Logo -->
                <div class="shrink-0 flex items-center">
                    <a href="{{ route('post.index') }}">
                        <img src="{{asset('logo/logo_inu.png')}}" style="max-height:80px;">
                    </a>
                </div>
12. 投稿を個別に表示

リソースコントローラー作成で説明したとおり、これをCRUD（クラッド）と呼びます。

Laravelでは、リソースコントローラーを使い、次の7段階のメソッドでCRUDの処理を実行できます。

index	データを一覧表示
create	新規作成用フォームの表示
store	新規作成を保存
show	作成データを個別表示
edit	作成データ編集用フォームの表示
update	編集したデータを保存
destroy	データを削除


resources/views/postの中の index.blade.phpファイルを開きます。

件名を表示させる部分に、次のようにリンクを追加してください。

【index.blade.php】

<h1 class="text-lg text-gray-700 font-semibold hover:underline cursor-pointer float-left pt-4">
    <a href="{{route('post.show', $post)}}">{{ $post->title }}</a>
</h1>


#### 個別表示ページのコントローラ作成
次にpost.showのためのメソッドを作成します。

app/Http/Controllersの中のPostController.phpを開きます。

真ん中あたりの show メソッドに、次のようにコードを入れます。

【PostController.php】

    public function show(Post $post)
    {
        return view('post.show', compact('post'));
    }



個別ページのビュー作成
それでは最後に、ビュー部分を作成していきます。

resources/views/post の中に show.blade.phpファイルを作成してください。

ファイルの中には、次のコードを入力します。

【show.blade.php】

<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            投稿の個別表示
        </h2>

        <x-message :message="session('message')" />

    </x-slot>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mx-4 sm:p-8">
            <div class="px-10 mt-4">

                <div class="bg-white w-full  rounded-2xl px-10 py-8 shadow-lg hover:shadow-2xl transition duration-500">
                    <div class="mt-4">
                        <h1 class="text-lg text-gray-700 font-semibold">
                            {{ $post->title }}
                        </h1>
                        <hr class="w-full">
                        <p class="mt-4 text-gray-600 py-4 whitespace-pre-line">{{$post->body}}</p>
                        <div class="text-sm font-semibold flex flex-row-reverse">
                            <p> {{ $post->user->name }} • {{$post->created_at->diffForHumans()}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>


publicフォルダへアクセスするには、以前も少しご紹介したasset関数を使います。

本文の下に次のように画像表示用のコードを入れておきましょう。

【show.blade.php】

<p class="mt-4 text-gray-600 py-4">{{$post->body}}</p>
    <div>
        (画像ファイル：{{$post->image}})
    </div>
    <img src="{{ asset('storage/images/'.$post->image)}}" class="mx-auto" style="height:300px;">



13. 投稿の編集

個別ページを編集したい場合のURLは、/post/{post}/editとなります。

ルート名は、post.edit です。

次に、前回作成した resources/views/post の中の show.blade.phpファイルを開きます。

{{$post->title}} の下に、下記のボタン用のコードを追加してください。

【show.blade.php】

<h1 class="text-lg text-gray-700 font-semibold hover:underline cursor-pointer">
    {{ $post->title }}
    <a href="{{route('post.edit', $post)}}"><x-primary-button class="bg-teal-700 float-right">編集</x-primary-button></a>
</h1>
<hr class="w-full">


編集用のコントローラーを作成
次にedit用のコントローラーを作成しておきます。

app/Http/Controllersの中の PostController.phpを開き、editメソッドを次のように編集します。

editの後は、(Post $post) を入れてください。
```
public function edit(Post $post)
{
    return view('post.edit', compact('post'));
}
```

編集ページの作成
それでは最後に、編集用のページを作成します。

resources/views/postの中に、edit.blade.phpファイルを作成してください。

ここに、以前作成した create.blade.phpファイルをそのままコピーして貼り付けます。

【edit.blade.php】


<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            投稿の新規作成
        </h2>

        <x-validation-errors class="mb-4" :errors="$errors" />
        <x-message :message="session('message')" />

    </x-slot>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mx-4 sm:p-8">
            <form method="post" action="{{route('post.store')}}" enctype="multipart/form-data">
                @csrf
                <div class="md:flex items-center mt-8">
                    <div class="w-full flex flex-col">
                    <label for="body" class="font-semibold leading-none mt-4">件名</label>
                    <input type="text" name="title" class="w-auto py-2 placeholder-gray-300 border border-gray-300 rounded-md" id="title" value="{{old('title')}}" placeholder="Enter Title">
                    </div>
                </div>

                <div class="w-full flex flex-col">
                    <label for="body" class="font-semibold leading-none mt-4">本文</label>
                    <textarea name="body" class="w-auto py-2 border border-gray-300 rounded-md" id="body" cols="30" rows="10">{{old('body')}}</textarea>
                </div>

                <div class="w-full flex flex-col">
                    <label for="image" class="font-semibold leading-none mt-4">画像 （1MBまで）</label>
                    <div>
                        <input id="image" type="file" name="image">
                    </div>
                </div>

                <x-primary-button class="mt-4">
                    送信する
                </x-primary-button>

            </form>
        </div>
    </div>

</x-app-layout>

【edit.blade.php】

<h2 class="font-semibold text-xl text-gray-800 leading-tight">
    投稿の編集画面
</h2>


【edit.blade.php】

<input type="text" name="title" class="w-auto py-2 border border-gray-300 rounded-md" id="title" value="{{old('title', $post->title)}}" placeholder="Enter Title">


bodyタグも同様に処理します。

textarea タグの中にあるold関数の第2引数に、$post->body を加えてください。

<textarea name="body" class="w-auto py-2 border border-gray-300 rounded-md" id="body" cols="30" rows="10">{{old('body', $post->body)}}</textarea>



最後に画像部分です。

画像ラベル

<label for="image" class="font-semibold leading-none mt-4">画像(1MBまで) </label>
の上に、前回の個別ページでも使った、画像を表示するコードを入れておきましょう。

【edit.blade.php】

                    @if($post->image)
                        <div>
                            (画像ファイル：{{$post->image}})
                        </div>
                        <img src="{{ asset('storage/images/'.$post->image)}}" class="mx-auto" style="height:300px;">
                    @endif


修正後の全体のコードは次のようになります。

【edit.blade.php】

<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            投稿の編集画面
        </h2>

        <x-validation-errors class="mb-4" :errors="$errors" />
        <x-message :message="session('message')" />

    </x-slot>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mx-4 sm:p-8">
            <form method="post" action="{{route('post.store')}}" enctype="multipart/form-data">
                @csrf
                <div class="md:flex items-center mt-8">
                    <div class="w-full flex flex-col">
                    <label for="body" class="font-semibold leading-none mt-4">件名</label>
                    <input type="text" name="title" class="w-auto py-2 placeholder-gray-300 border border-gray-300 rounded-md" id="title" value="{{old('title', $post->title)}}" placeholder="Enter Title">
                    </div>
                </div>

                <div class="w-full flex flex-col">
                    <label for="body" class="font-semibold leading-none mt-4">本文</label>
                    <textarea name="body" class="w-auto py-2 border border-gray-300 rounded-md" id="body" cols="30" rows="10">{{old('body', $post->body)}}</textarea>
                </div>

                <div class="w-full flex flex-col">
                    @if($post->image)
                        <div>
                            (画像ファイル：{{$post->image}})
                        </div>
                        <img src="{{ asset('storage/images/'.$post->image)}}" class="mx-auto" style="height:300px;">
                    @endif
                    <label for="image" class="font-semibold leading-none mt-4">画像（1MBまで） </label>
                    <div>
                        <input id="image" type="file" name="image">
                    </div>
                </div>

                <x-primary-button class="mt-4">
                    送信する
                </x-primary-button>

            </form>
        </div>
    </div>

</x-app-layout>



14. 投稿の更新

【edit.blade.php】

<form method="post" action="{{route('post.update', $post)}}" enctype="multipart/form-data">
    @csrf
    @method('patch')


フォームタグの中のmethodには、getかpostしか入れられません。

そこで、put/patchメソッドは、上記のように、method属性にはpostを入れて、 フォーム開始タグの下に@method命令を入れるようにします。


コントローラーの編集
次に、updateメソッドを編集していきます。

app/Http/Controllersの中のPostController.phpを開いてください。

今回は updateメソッドを編集していきます。

次のようにコードを加えていきます。

【PostController.php】

    public function update(Request $request, Post $post)
    {
        $inputs=$request->validate([
            'title'=>'required|max:255',
            'body'=>'required|max:1000',
            'image'=>'image|max:1024'
        ]);

       $post->title=$inputs['title'];
       $post->body=$inputs['body'];

        if(request('image')){
            $original=request()->file('image')->getClientOriginalName();
            $name=date('Ymd_His').'_'.$original;
            $file=request()->file('image')->move('storage/images', $name);
            $post->image=$name;
        }

        $post->save();

        return redirect()->route('post.show', $post)->with('message', '投稿を更新しました');
    }

15. 投稿の削除

show.blade.phpファイルの上部の、下記のコードを削除します。

【show.blade.php】

<div class="mt-4">
    <h1 class="text-lg text-gray-700 font-semibold hover:underline cursor-pointer">
        {{ $post->title }}
        <a href="{{route('post.edit', $post)}}"><x-primary-button class="bg-teal-700 float-right">編集</x-primary-button></a>
    </h1><hr class="w-full">


代わりに、次のコードを貼り付けてください。

【show.blade.php】

<div class="mt-4">
    <h1 class="text-lg text-gray-700 font-semibold">
        {{ $post->title }}
    </h1>
    <hr class="w-full">
</div>
<div class="flex justify-end mt-4">
    <a href="{{route('post.edit', $post)}}"><x-primary-button class="bg-teal-700 float-right">編集</x-primary-button></a>
    <form method="post" action="{{route('post.destroy', $post)}}">
    @csrf
    @method('delete')
        <x-primary-button class="bg-red-700 float-right ml-4" onClick="return confirm('本当に削除しますか？');">削除</x-primary-button>
    </form>
</div>


コントローラーの編集

次に、コントローラーを編集しましょう。

app/Http/Controllersの中のPostController.phpを開きます。

一番下のdestroyメソッドに、次のようにコードを加えます。

【PostController.php】
```
public function destroy(Post $post)
{
    $post->delete();
    return redirect()->route('post.index')->with('message', '投稿を削除しました');
}
```

なお削除処理のあとは、元のページがなくなってしまいます。

処理が終わった後は元のページではなく、redirectを使って、投稿一覧画面に戻るようにしています。


