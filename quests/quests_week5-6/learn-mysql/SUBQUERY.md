1. サブクエリ
従業員番号が10001から10010のうち、全給与レコードの平均給与より給与が大きいレコードの従業員番号と給与を、サブクエリを使用して取得してください。
```
SELECT emp_no, salary
FROM salaries
WHERE emp_no BETWEEN 10001 AND 10010
AND salary > (SELECT AVG(salary) FROM salaries);
```

2. 重複なし
平均の2倍以上の給与をもらっている従業員の従業員番号を重複なく取得してください。
```
SELECT DISTINCT emp_no
FROM salaries
WHERE salary > (SELECT AVG(salary) * 2 FROM salaries);

```

３. 最大給与
従業員番号が10001から10010のうち、全給与レコードの平均給与より給与が大きい従業員の従業員番号と最大給与を取得してください。
```
SELECT emp_no, MAX(salary) AS max_salary
FROM salaries
WHERE emp_no BETWEEN 10001 AND 10010
AND salary > (SELECT AVG(salary) FROM salaries)
GROUP BY emp_no;
```

4. 相関サブクエリ
従業員のうち、性別ごとに最高年齢の従業員の性別、従業員番号、誕生日を、相関サブクエリを使用して取得してください。
```
SELECT e.gender, e.emp_no, e.birth_date
FROM employees e
INNER JOIN (
    SELECT gender, MIN(birth_date) as min_birth_date
    FROM employees
    GROUP BY gender
) g ON e.gender = g.gender AND e.birth_date = g.min_birth_date;
```

5. 一番若い従業員
従業員番号10100から10200の従業員の中で、それぞれの性別で最も若い年齢の人の性別、誕生日、従業員番号、ファーストネーム、ラストネームを取得してください。
```
SELECT gender, birth_date, emp_no, first_name, last_name
FROM employees e1
WHERE emp_no BETWEEN 10100 AND 10200
AND birth_date = (SELECT MAX(birth_date) FROM employees e2 WHERE e1.gender = e2.gender AND e2.emp_no BETWEEN 10100 AND 10200);
```