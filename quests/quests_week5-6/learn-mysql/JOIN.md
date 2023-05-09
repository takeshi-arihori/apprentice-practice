テーブルを結合できる
1. 内部結合
部署マネージャーテーブルに、従業員テーブルのデータを内部結合させた全データを取得してください。
```
SELECT *
FROM dept_manager AS dm
INNER JOIN employees AS e
ON dm.emp_no = e.emp_no;
```

2. 列の選択
部署ごとに、部署番号、歴代のマネージャーの従業員番号、マネージャーのファーストネーム、マネージャーのラストネームを取得してください。
```
SELECT dm.dept_no, dm.emp_no, e.first_name, e.last_name
FROM dept_manager AS dm
INNER JOIN employees AS e
ON dm.emp_no = e.emp_no;
```

3. 複数の内部結合
部署ごとに、部署番号、部署名、歴代のマネージャーの従業員番号、マネージャーのファーストネーム、マネージャーのラストネームを取得してください。
```
SELECT d.dept_no, d.dept_name, dm.emp_no, e.first_name, e.last_name
FROM departments AS d
INNER JOIN dept_manager AS dm
ON d.dept_no = dm.dept_no
INNER JOIN employees AS e
ON dm.emp_no = e.emp_no;
```

4. 絞り込み
部署ごとに、部署番号、部署名、現在のマネージャーの従業員番号、マネージャーのファーストネーム、マネージャーのラストネームを取得してください。
```
CREATE TEMPORARY TABLE current_dept_manager AS
SELECT dm.*
FROM dept_manager AS dm
WHERE dm.to_date = '9999-01-01';
```

```
SELECT d.dept_no, d.dept_name, cdm.emp_no, e.first_name, e.last_name
FROM departments AS d
INNER JOIN current_dept_manager AS cdm
ON d.dept_no = cdm.dept_no
INNER JOIN employees AS e
ON cdm.emp_no = e.emp_no;
```

5. 給与
従業員番号10001から10010の従業員ごとに、ファーストネーム、ラストネーム、いつからいつまで給与がいくらだったかを取得してください。
```
SELECT e.emp_no, e.first_name, e.last_name, s.from_date, s.to_date, s.salary
FROM employees AS e
INNER JOIN salaries AS s
ON e.emp_no = s.emp_no
WHERE e.emp_no BETWEEN 10001 AND 10010;
```

6. 内部結合と外部結合の違い
INNER JOIN と OUTER JOIN の違いについて、SQL 初心者にわかるように説明してください。またどのように使い分けるのかも合わせて説明してください。
- INNER JOIN: テーブルを結合する際に、両方のテーブルに一致するデータが存在する場合にのみ結果を返す
- OUTER JOIN: テーブルを結合する際に、少なくとも片方のテーブルに一致するデータが存在する場合に結果を返す