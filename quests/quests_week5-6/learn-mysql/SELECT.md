1. 環境構築
MySQL 公式サンプルデータベースの employee data のデータをデータベースに入れます。ドキュメント内の Installation のやり方に従ってください。

#### GitHubからダウンロード
https://github.com/datacharmer/test_db


#### データベースへのインポート方法

```
unzip test_db-master.zip
cd test_db-master/
mysql -t < employees.sql
```

#### 使用するデータベースの指定
```
USE employees;
```

2. 全カラムの取得
部署マネージャーの全データを取得してください。dept_manager テーブルの全データを * を指定して取得します。
```
SELECT * FROM dept_manager;
```

3. カラムの選択
部署マネージャーの従業員番号の一覧のみを取得してください。dept_manager テーブルの emp_no カラムの値のみを取得します。
```
SELECT emp_no FROM dept_manager;
```

4. カラム名の別名
部署マネージャーの従業員番号の一覧のみを、取得データの見出し（カラム）に「employee_no」という名前を付けて取得してください。
```
SELECT emp_no AS employee_no FROM dept_manager;
```

5. 重複行の削除
部署マネージャーが所属する部署番号を重複なく取得してください。dept_manager テーブルの dept_no カラムの値を、重複を削除して取得します。
```
SELECT DISTINCT dept_no FROM dept_manager;
```