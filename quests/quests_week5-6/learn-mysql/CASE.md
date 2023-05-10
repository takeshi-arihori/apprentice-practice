条件分岐ができる
1. CASE
従業員番号10100から10200の従業員に対して、最終在籍日に応じて在籍中か離職済みかを出し分けたいです。従業員番号、最終在籍日 (to_date)、在職状況(employed/unemployed) を、CASE 式を使用して表示してください。
```
SELECT emp_no, to_date,
  CASE
    WHEN to_date = '9999-01-01' THEN 'employed'
    ELSE 'unemployed'
  END AS employment_status
FROM titles
WHERE emp_no BETWEEN 10100 AND 10200;
```

2. 年代
従業員番号が10001から10050の従業員を対象に、従業員番号、誕生日、年代を表示してください。なお年代は、誕生日が1950年代の場合「50s」、誕生日が1960年代の場合「60s」と表記してください。
```
SELECT emp_no, birth_date,
  CASE
    WHEN YEAR(birth_date) BETWEEN 1950 AND 1959 THEN '50s'
    WHEN YEAR(birth_date) BETWEEN 1960 AND 1969 THEN '60s'
  END AS decade
FROM employees
WHERE emp_no BETWEEN 10001 AND 10050;
```

3. 年代ごとの最大給与
年代ごとの最大給与を取得してください。なお年代は、誕生日が1950年代の場合「50s」、誕生日が1960年代の場合「60s」と表記してください。```
SELECT
  CASE
    WHEN YEAR(e.birth_date) BETWEEN 1950 AND 1959 THEN '50s'
    WHEN YEAR(e.birth_date) BETWEEN 1960 AND 1969 THEN '60s'
  END AS decade,
  MAX(s.salary) as max_salary
FROM employees e
JOIN salaries s ON e.emp_no = s.emp_no
GROUP BY decade;
```