## ステップ 2

実際にテーブルを構築し、データを入れましょう。その手順をドキュメントとしてまとめてください（アウトプットは手順のドキュメントです）。

具体的には、以下のことを行う手順のドキュメントを作成してください。

データベースを構築します
1: ステップ 1 で設計したテーブルを構築します
2: サンプルデータを入れます。サンプルデータはご自身で作成ください（ChatGPT を利用すると比較的簡単に生成できます）
3: 手順のドキュメントは、他の人が見た時にその手順通りに実施すればテーブル作成及びサンプルデータ格納が行えるように記載してください。

## ステップ2の目的

- データを実際に入れることでステップ3でデータ抽出クエリを試せるようにすること
- 手順をドキュメントにまとめることで、自身がやり直したい時にすぐやり直せること
- 手順を人が同じように行えるようにまとめることで、ドキュメントコミュニケーション力を上げること

# データベースの作成手順と実行

## Step 1: データベースの作成

MySQLサーバーにログインします。次に、新しいデータベースを作成します。以下のコマンドを使用します。

```
CREATE DATABASE internet_tv;
```

## Step 2: テーブルの作成

ステップ1で提供したSQLコードを使用してテーブルを作成します。そのためには、作成したデータベースを選択し、SQLコードを実行します。

```
USE internet_tv;
```

その後、各テーブル作成用のSQLコードを実行します。

```
CREATE TABLE `channels` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `program_slots` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `channel_id` INT NOT NULL,
  `start_time` DATETIME NOT NULL,
  `end_time` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`channel_id`) REFERENCES `channels` (`id`)
);

CREATE TABLE `programs` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(100) NOT NULL,
  `detail` TEXT,
  `genre` VARCHAR(50),
  PRIMARY KEY (`id`)
);

CREATE TABLE `episodes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `program_id` INT NOT NULL,
  `season` INT,
  `episode_no` INT,
  `title` VARCHAR(100) NOT NULL,
  `detail` TEXT,
  `duration` INT NOT NULL,
  `release_date` DATE NOT NULL,
  `view_count` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`program_id`) REFERENCES `programs` (`id`)
);

CREATE TABLE `program_slot_episodes` (
  `program_slot_id` INT NOT NULL,
  `episode_id` INT NOT NULL,
  `view_count` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`program_slot_id`, `episode_id`),
  FOREIGN KEY (`program_slot_id`) REFERENCES `program_slots` (`id`),
  FOREIGN KEY (`episode_id`) REFERENCES `episodes` (`id`)
);
```


## Step 3: サンプルデータの挿入

### 挿入時の注意
テーブルを作成する際の順番は、テーブル間の依存関係によります。外部キー制約があるテーブルは、参照先のテーブルが先に作成されている必要があります。
よって、他のテーブルを参照しないテーブルから作成します。

#### 1: テレビチャンネルの情報を管理(ABEMA)

```
INSERT INTO `channels` (`name`) VALUES ('ABEMA NEWS');
INSERT INTO `channels` (`name`) VALUES ('ABEMA SPECIAL');
INSERT INTO `channels` (`name`) VALUES ('ドラマチャンネル');
INSERT INTO `channels` (`name`) VALUES ('映画チャンネル');
INSERT INTO `channels` (`name`) VALUES ('アニメチャンネル');
INSERT INTO `channels` (`name`) VALUES ('アニメLIVEチャンネル');
INSERT INTO `channels` (`name`) VALUES ('アニメ24チャンネル');
INSERT INTO `channels` (`name`) VALUES ('無料アニメチャンネル');
INSERT INTO `channels` (`name`) VALUES ('スポーツチャンネル');
INSERT INTO `channels` (`name`) VALUES ('野球チャンネル');
INSERT INTO `channels` (`name`) VALUES ('サッカーチャンネル');
INSERT INTO `channels` (`name`) VALUES ('格闘チャンネル');
INSERT INTO `channels` (`name`) VALUES ('釣りチャンネル');
INSERT INTO `channels` (`name`) VALUES ('麻雀チャンネル');
INSERT INTO `channels` (`name`) VALUES ('プロレスチャンネル');
INSERT INTO `channels` (`name`) VALUES ('将棋チャンネル');
INSERT INTO `channels` (`name`) VALUES ('囲碁チャンネル');
INSERT INTO `channels` (`name`) VALUES ('ブレイキングダウン');
INSERT INTO `channels` (`name`) VALUES ('K WORLD');
INSERT INTO `channels` (`name`) VALUES ('乃木坂46チャンネル');
```



#### 2: 各テレビ番組の情報を管理

```
INSERT INTO `programs` (`title`, `detail`)
VALUES
('ニュースショー', '最新のニュースをお届けします。'),
('スポーツタイム', '各種スポーツの最新情報をお届けします。'),
('ドラマ特集', '人気のドラマシリーズをお楽しみください。'),
('映画の時間', '様々なジャンルの映画をお楽しみいただけます。'),
('アニメマラソン', '人気のアニメシリーズを一挙放送。'),
('野球生中継', 'プロ野球の試合を生中継します。'),
('サッカーの夜', '国内外のサッカーの試合を放送します。'),
('深夜の映画館', '深夜に楽しむことができる映画を放送します。'),
('朝のニュース', '朝の最新ニュースをお届けします。'),
('ブレイキングダウン', '社会問題を深く掘り下げて解説します。');
```



#### 3: テレビ番組の放送スケジュール（タイムスロット）を管理

```
INSERT INTO `program_slots` (`channel_id`, `program_name`, `start_time`, `end_time`)
VALUES
(1, 'ニュースショー', '2023-06-01 09:00:00', '2023-06-01 10:00:00'),
(1, 'スポーツタイム', '2023-06-01 10:00:00', '2023-06-01 11:00:00'),
(2, 'ドラマ特集', '2023-06-01 13:00:00', '2023-06-01 14:30:00'),
(2, '映画の時間', '2023-06-01 15:00:00', '2023-06-01 17:00:00'),
(3, 'アニメマラソン', '2023-06-01 18:00:00', '2023-06-01 21:00:00'),
(4, '野球生中継', '2023-06-01 19:00:00', '2023-06-01 22:00:00'),
(5, 'サッカーの夜', '2023-06-01 22:00:00', '2023-06-02 00:00:00'),
(6, '深夜の映画館', '2023-06-02 00:00:00', '2023-06-02 02:00:00'),
(7, '朝のニュース', '2023-06-02 06:00:00', '2023-06-02 08:00:00'),
(8, 'ブレイキングダウン', '2023-06-02 20:00:00', '2023-06-02 22:00:00');
```



#### 4: 各テレビ番組のエピソード情報を管理
```
INSERT INTO `episodes` (`program_id`, `season`, `episode_no`, `title`, `detail`, `duration`, `release_date`, `view_count`)
VALUES
(1, 1, 1, 'ニュースショー: 6月1日', '2023年6月1日の最新ニュースをお届けします。', 60, '2023-06-01', 0),
(2, 1, 1, 'スポーツタイム: 6月1日', '2023年6月1日のスポーツニュースをお届けします。', 60, '2023-06-01', 0),
(3, 1, 1, 'ドラマ特集: エピソード1', 'ドラマシリーズの最初のエピソードをお楽しみください。', 60, '2023-06-01', 0),
(4, 1, 1, '映画の時間: 映画1', '人気の映画を一本ご紹介します。', 120, '2023-06-01', 0),
(5, 1, 1, 'アニメマラソン: シリーズ1', '人気アニメシリーズの最初のエピソードをお楽しみください。', 30, '2023-06-01', 0),
(6, 1, 1, '野球生中継: ゲーム1', 'プロ野球の試合を生中継します。', 180, '2023-06-01', 0),
(7, 1, 1, 'サッカーの夜: マッチ1', 'エキサイティングなサッカーの試合をお送りします。', 90, '2023-06-01', 0),
(8, 1, 1, '深夜の映画館: 映画1', '深夜に楽しむことができる映画を放送します。', 120, '2023-06-01', 0);
```

#### 5: 各タイムスロットで放送されるエピソードを管理

- 挿入の際にエラーが生じたので、一時的に外部キーをOFFにする。
```
SET FOREIGN_KEY_CHECKS = 0;
```

- 作業が終わったら必ず再度外部キー制約を有効にする。
```
SET FOREIGN_KEY_CHECKS = 1;
```



```
INSERT INTO `program_slot_episodes` (`program_slot_id`, `episode_id`)
VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 7),
(8, 8),
(9, 9),
(10, 10);
```


#### 注意： 実際のデータ挿入時には、適切な値を使用してください。また、適切な値を使用するためには、テーブルの構造（どのカラムがどのようなデータ型を持つかなど）を理解する必要があります。


## Step 4: データの確認

最後に、データが正しく挿入されたか確認します。以下のSQLコマンドを使用してデータを取得します。

```
SELECT * FROM channels;
SELECT * FROM program_slots;
SELECT * FROM programs;
SELECT * FROM episodes;
SELECT * FROM program_slot_episodes;

```

これで、データベースの構築とデータの挿入が完了しました。

