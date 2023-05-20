## ステップ 3

### 以下のデータを抽出するクエリを書いてください。

1: よく見られているエピソードを知りたいです。エピソード視聴数トップ 3 のエピソードタイトルと視聴数を取得してください。
```
SELECT title, view_count
FROM episodes
ORDER BY view_count DESC
LIMIT 3;
```


2: よく見られているエピソードの番組情報やシーズン情報も合わせて知りたいです。エピソード視聴数トップ 3 の番組タイトル、シーズン数、エピソード数、エピソードタイトル、視聴数を取得してください。
```
SELECT p.title AS program_title, e.season, e.episode_no, e.title AS episode_title, e.view_count
FROM episodes e
JOIN programs p ON e.program_id = p.id
ORDER BY e.view_count DESC
LIMIT 3;
```


3: 本日の番組表を表示するために、本日、どのチャンネルの、何時から、何の番組が放送されるのかを知りたいです。本日放送される全ての番組に対して、チャンネル名、放送開始時刻(日付+時間)、放送終了時刻、シーズン数、エピソード数、エピソードタイトル、エピソード詳細を取得してください。なお、番組の開始時刻が本日のものを本日方法される番組とみなすものとします。
- データが存在しないため、limit3でランダムで3つ上書き
```
UPDATE program_slots
SET start_time = CONCAT(CURDATE(), ' ', TIME(start_time)),
    end_time = CONCAT(CURDATE(), ' ', TIME(end_time))
WHERE id IN (
    SELECT id FROM (
        SELECT id FROM program_slots
        ORDER BY RAND()
        LIMIT 3
    ) AS subquery
);
```

- 再度検索
```
SELECT c.name AS channel_name, ps.start_time, ps.end_time, e.season, e.episode_no, e.title, e.detail
FROM program_slots ps
JOIN channels c ON ps.channel_id = c.id
JOIN program_slot_episodes pse ON ps.id = pse.program_slot_id
JOIN episodes e ON pse.episode_id = e.id
WHERE DATE(ps.start_time) = CURDATE();
```


4: ドラマというチャンネルがあったとして、ドラマのチャンネルの番組表を表示するために、本日から一週間分、何日の何時から何の番組が放送されるのかを知りたいです。ドラマのチャンネルに対して、放送開始時刻、放送終了時刻、シーズン数、エピソード数、エピソードタイトル、エピソード詳細を本日から一週間分取得してください。

```
SELECT ps.start_time, ps.end_time, e.season, e.episode_no, e.title, e.detail
FROM program_slots ps
JOIN program_slot_episodes pse ON ps.id = pse.program_slot_id
JOIN episodes e ON pse.episode_id = e.id
WHERE ps.channel_id IN (SELECT id FROM channels WHERE name = 'ドラマ')
AND ps.start_time BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 7 DAY);
```


5: (advanced) 直近一週間で最も見られた番組が知りたいです。直近一週間に放送された番組の中で、エピソード視聴数合計トップ 2 の番組に対して、番組タイトル、視聴数を取得してください。

6: (advanced) ジャンルごとの番組の視聴数ランキングを知りたいです。番組の視聴数ランキングはエピソードの平均視聴数ランキングとします。ジャンルごとに視聴数トップの番組に対して、ジャンル名、番組タイトル、エピソード平均視聴数を取得してください。