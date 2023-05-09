データを絞り込むことができる
1. 指定した行数のみ取得
従業員データ(employees テーブル)を10行のみ取得してください。
```
SELECT * FROM employees LIMIT 10;
```

2. 等しいデータの絞り込み
従業員のうち、女性のデータを10行分取得してください。
```
SELECT * FROM employees WHERE gender='F' LIMIT 10;
```

3. 等しくないデータの絞り込み
従業員のうち、女性でないデータを10行分取得してください。その際、否定形の構文を使用してください。
```
SELECT * FROM employees WHERE NOT gender='F' LIMIT 10;
```

4. より大きいデータの絞り込み
従業員のうち、誕生日が1960年1月1日以降の人のデータを10行分取得してください。
```
SELECT * FROM employees WHERE birth_date >= '1960-01-01' LIMIT 10;
```

5. あいまいな条件の絞り込み
従業員のうち、ファーストネームに vi が含まれる人のデータを10行分取得してください。
```
SELECT * FROM employees WHERE first_name LIKE '%vi%' LIMIT 10;
```

6. 特定の範囲の絞り込み
従業員のうち、誕生日が1960年1月1日から1960年1月31日までの人のデータを10行分取得してください。
```
SELECT * FROM employees WHERE birth_date BETWEEN '1960-01-01' AND '1960-01-31' LIMIT 10;
```

7. かつ
従業員のうち、ファーストネームが Mary で、かつ女性のデータを取得してください。
```
SELECT * FROM employees WHERE first_name='Mary' AND gender='F';
```


8. または
従業員のうち、ファーストネームが Mary または ラストネームが Peck の人のデータを10行分取得してください。
```
SELECT * FROM employees WHERE first_name='Mary' OR last_name='Peck' LIMIT 10;
```

9. 含まれる
従業員のうち、従業員番号が 10011, 10021, 10031 のいずれかに合致する人のデータを取得してください。なお、OR 演算子は使用しないでください。
```
SELECT * FROM employees WHERE emp_no IN (10011, 10021, 10031);
```

10. 従業員番号
従業員番号（emp_no）が20,000の人のファーストネームとラストネームを取得してください。
```
SELECT first_name, last_name FROM employees WHERE emp_no=20000;
```

11. 誕生日
誕生日が1959年1月の人のレコードを取得してください。
```
SELECT * FROM employees WHERE birth_date LIKE '1959-01%';
```
