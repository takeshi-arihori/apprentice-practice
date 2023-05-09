検索結果の並び替えができる
1. 昇順の並び替え
従業員を誕生日の昇順に並び替え、年齢が高い人トップ10のレコードを取得してください。
```
SELECT * FROM employees ORDER BY birth_date ASC LIMIT 10;
```

2. 降順の並び替え
従業員を誕生日の降順に並び替え、年齢が若い人トップ10のレコードを取得してください。
```
SELECT * FROM employees ORDER BY birth_date DESC LIMIT 10;
```

3. 複数条件の並び替え
従業員を、年齢が高い順に並び替え、誕生日が同じなら雇った日付が最近の順で並び替え、トップ30のレコードを取得してください。
```
SELECT * FROM employees ORDER BY birth_date ASC, hire_date DESC LIMIT 30;
```
