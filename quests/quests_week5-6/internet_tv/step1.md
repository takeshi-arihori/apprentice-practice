# ステップ 1

## テーブル設計

## channelsテーブル

| カラム名 | データ型 | NULL | キー | 初期値 | AUTO INCREMENT |
|---|---|---|---|---|---|
| id | INT | NO | PRIMARY | - | YES |
| name | VARCHAR(255) | YES | - | - | - |


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

| カラム名 | データ型 | NULL | キー | 初期値 | AUTO INCREMENT |
|---|---|---|---|---|---|
| program_slot_id | INT | NO | PRIMARY, FOREIGN KEY | - | - |
| episode_id | INT | NO | PRIMARY, FOREIGN KEY | - | - |
| view_count | INT | YES | - | - | - |

