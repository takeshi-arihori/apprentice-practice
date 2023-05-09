テーブルを作成・修正・削除できる
作成済みのデータベースを指定して MySQL に接続してください。MySQL に接続後、使用するデータベースを指定しても大丈夫です。

1. テーブルの作成
任意のテーブルを作成してください。テーブルのカラムは自由に作成してください。
#### テーブルの作成(country)
```
 INSERT INTO countries (name, population, area) VALUES
  ('Japan', 126050000, 377972),
  ('United States', 331449000, 9833520),
  ('Germany', 83166700, 357022);
Query OK, 3 rows affected (0.00 sec)
Records: 3  Duplicates: 0  Warnings: 0
```
#### テーブルの作成(cities)
```
mysql> INSERT INTO cities (name, population, country_id) VALUES
    ->   ('Tokyo', 13929286, 1),
    ->   ('New York', 8623000, 2),
    ->   ('Berlin', 3748000, 3);
Query OK, 3 rows affected (0.00 sec)
Records: 3  Duplicates: 0  Warnings: 0
```

2. テーブルの表示
テーブルが作成できたことを確認するために、テーブルの一覧を表示してください。
```
+-----------------+
| Tables_in_world |
+-----------------+
| cities          |
| countries       |
+-----------------+
2 rows in set (0.00 sec)

mysql> SELECT * FROM countries;
+----+---------------+------------+---------+
| id | name          | population | area    |
+----+---------------+------------+---------+
|  1 | Japan         |  126050000 |  377972 |
|  2 | United States |  331449000 | 9833520 |
|  3 | Germany       |   83166700 |  357022 |
+----+---------------+------------+---------+
3 rows in set (0.00 sec)

mysql> SELECT * FROM cities;
+----+----------+------------+------------+
| id | name     | population | country_id |
+----+----------+------------+------------+
|  1 | Tokyo    |   13929286 |          1 |
|  2 | New York |    8623000 |          2 |
|  3 | Berlin   |    3748000 |          3 |
+----+----------+------------+------------+
3 rows in set (0.00 sec)

```


3. カラムの追加
作成したテーブルに、任意のカラムを一列追加してください。
```
mysql> ALTER TABLE countries
    -> ADD COLUMN countrycode CHAR(3);
Query OK, 0 rows affected (0.01 sec)
Records: 0  Duplicates: 0  Warnings: 0
```


4. カラムの表示
カラムが追加できたことを確認するために、テーブルのカラムの一覧を表示してください。
```
mysql> select * from countries;
+----+---------------+------------+---------+-------------+
| id | name          | population | area    | countrycode |
+----+---------------+------------+---------+-------------+
|  1 | Japan         |  126050000 |  377972 | NULL        |
|  2 | United States |  331449000 | 9833520 | NULL        |
|  3 | Germany       |   83166700 |  357022 | NULL        |
+----+---------------+------------+---------+-------------+
3 rows in set (0.00 sec)
```


5. カラムの削除
追加したカラムを削除してください。削除後、削除できていることを確認してください。
```
mysql> SELECT * FROM countries;
+----+---------------+------------+---------+-------------+----------+
| id | name          | population | area    | countrycode | COUNTOUT |
+----+---------------+------------+---------+-------------+----------+
|  1 | Japan         |  126050000 |  377972 | JPN         |     NULL |
|  2 | United States |  331449000 | 9833520 | USA         |     NULL |
|  3 | Germany       |   83166700 |  357022 | DEU         |     NULL |
+----+---------------+------------+---------+-------------+----------+
3 rows in set (0.00 sec)
```

```
mysql> ALTER TABLE countries
    -> DROP COLUMN COUNTOUT;
Query OK, 0 rows affected (0.01 sec)
Records: 0  Duplicates: 0  Warnings: 0

mysql> SELECT * FROM countries;
+----+---------------+------------+---------+-------------+
| id | name          | population | area    | countrycode |
+----+---------------+------------+---------+-------------+
|  1 | Japan         |  126050000 |  377972 | JPN         |
|  2 | United States |  331449000 | 9833520 | USA         |
|  3 | Germany       |   83166700 |  357022 | DEU         |
+----+---------------+------------+---------+-------------+
3 rows in set (0.00 sec)

```


6. テーブルの削除
作成したテーブルを削除してください。削除後、削除できていることを確認してください。
#### 外部キー制約があるテーブルを削除する場合、まず制約を解除する必要があります。
```
ALTER TABLE cities
DROP FOREIGN KEY cities_ibfk_1;

DROP TABLE countries;

```
#### それからテーブルを削除します。

```
mysql> DROP TABLE countries;
```

7. テーブルの再作成
再度テーブルを作成しましょう。

今後、作成したテーブルを指定して作業します。
```
mysql> CREATE TABLE countries (
     id INT NOT NULL AUTO_INCREMENT,
     name VARCHAR(255) NOT NULL,
     population INT NOT NULL,
     area INT NOT NULL,
     PRIMARY KEY (id)
   );
```
