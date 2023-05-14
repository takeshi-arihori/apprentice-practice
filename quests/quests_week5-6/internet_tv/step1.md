# インターネット TV
好きな時間に好きな場所で話題の動画を無料で楽しめる「インターネット TV サービス」を新規に作成することになりました。データベース設計をした上で、データ取得する SQL を作成してください。

仕様は次の通りです。サービスのイメージとしては ABEMA を頭に思い浮かべてください。

ドラマ 1、ドラマ 2、アニメ 1、アニメ 2、スポーツ、ペットなど、複数のチャンネルがある
各チャンネルの下では時間帯ごとに番組枠が 1 つ設定されており、番組が放映される
番組はシリーズになっているものと単発ものがある。シリーズになっているものはシーズンが 1 つものと、シーズン 1、シーズン 2 のように複数シーズンのものがある。各シーズンの下では各エピソードが設定されている
再放送もあるため、ある番組が複数チャンネルの異なる番組枠で放映されることはある
番組の情報として、タイトル、番組詳細、ジャンルが画面上に表示される
各エピソードの情報として、シーズン数、エピソード数、タイトル、エピソード詳細、動画時間、公開日、視聴数が画面上に表示される。単発のエピソードの場合はシーズン数、エピソード数は表示されない
ジャンルとしてアニメ、映画、ドラマ、ニュースなどがある。各番組は 1 つ以上のジャンルに属する
KPI として、チャンネルの番組枠のエピソードごとに視聴数を記録する。なお、一つのエピソードは複数の異なるチャンネル及び番組枠で放送されることがあるので、属するチャンネルの番組枠ごとに視聴数がどうだったかも追えるようにする

## ステップ 1

テーブル設計をしてください。

テーブルごとにテーブル名、カラム名、データ型、NULL(NULL OK の場合のみ YES と記載)、キー（キーが存在する場合、PRIMARY/INDEX のどちらかを記載）、初期値（ある場合のみ記載）、AUTO INCREMENT（ある場合のみ YES と記載）を記載してください。また、外部キー制約、ユニークキー制約に関しても記載してください。

その際に、少なくとも次のことは満たしてください。

アプリケーションとして成立すること(プログラムを組んだ際に仕様を満たして動作すること)
正規化されていること
以下、アウトプット例です。

テーブル：users

カラム名 データ型 NULL キー 初期値 AUTO INCREMENT
id bigint(20) PRIMARY YES
name varchar(100)
email varchar(100) INDEX
ユニークキー制約：email カラムに対して設定
テーブル：comments

カラム名 データ型 NULL キー 初期値 AUTO INCREMENT
id bigint(20) PRIMARY YES
user_id bigint(20) YES INDEX 0
content text
外部キー制約：user_id に対して、users テーブルの id カラムから設定


# Tables

## channelsテーブル


| カラム名 | データ型 | NULL | キー | 初期値 | AUTO INCREMENT |
| ------ | ------ | ---- | ---- | ---- | -------------- |
|   id   |  INT   |  NO  |PRIMARY| --- |       YES      |
|  name  |VARCHAR(255)| YES | --- | --- | ---------- |


## program_slotsテーブル

| カラム名 | データ型 | NULL | キー | 初期値 | AUTO INCREMENT |
|---|---|---|---|---|---|
| id | INT | NO | PRIMARY | - | YES |
| channel_id | INT | YES | FOREIGN KEY | - | - |
| start_time | DATETIME | YES | - | - | - |
| end_time | DATETIME | YES | - | - | - |


## programsテーブル

| カラム名 | データ型 | NULL | キー | 初期値 | AUTO INCREMENT |
|---|---|---|---|---|---|
| id | INT | NO | PRIMARY | - | YES |
| title | VARCHAR(255) | YES | - | - | - |
| detail | TEXT | YES | - | - | - |


## genresテーブル

| カラム名 | データ型 | NULL | キー | 初期値 | AUTO INCREMENT |
|---|---|---|---|---|---|
| id | INT | NO | PRIMARY | - | YES |
| name | VARCHAR(255) | YES | - | - | - |


## program_genresテーブル

| カラム名 | データ型 | NULL | キー | 初期値 | AUTO INCREMENT |
|---|---|---|---|---|---|
| program_id | INT | NO | PRIMARY, FOREIGN KEY | - | - |
| genre_id | INT | NO | PRIMARY, FOREIGN KEY | - | - |


## episodesテーブル

| カラム名 | データ型 | NULL | キー | 初期値 | AUTO INCREMENT |
|---|---|---|---|---|---|
| id | INT | NO | PRIMARY | - | YES |
| program_id | INT | YES | FOREIGN KEY | - | - |
| season | INT | YES | - | - | - |
| episode | INT | YES | - | - | - |
| title | VARCHAR(255) | YES | - | - | - |
| detail | TEXT | YES | - | - | - |
| duration | TIME | YES | - | - | - |
| release_date | DATE | YES | - | - | - |
| view_count | INT | YES | - | - | - |


## program_slot_episodesテーブル
```
| カラム名 | データ型 | NULL | キー | 初期値 | AUTO INCREMENT |
|---|---|---|---|---|---|
| program_slot_id | INT | NO | PRIMARY, FOREIGN KEY | - | - |
| episode_id | INT | NO | PRIMARY, FOREIGN KEY | - | - |
| view_count | INT | YES | - | - | - |
```

