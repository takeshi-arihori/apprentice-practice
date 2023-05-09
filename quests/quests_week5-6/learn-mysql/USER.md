ユーザーを作成・権限付与・削除できる
Root権限を持つユーザーで MySQL へ接続してください。

1. ユーザーの作成
MySQL のユーザーを作成してください。名前とパスワードは任意、ホストは localhost を指定してください。
```
CREATE USER 'your_username'@'localhost' IDENTIFIED BY 'your_password';
```

2. ユーザーの表示
ユーザーを作成できたことを確認するために、ユーザーの一覧を表示してください。
```
SELECT user FROM mysql.user;
```

3. ユーザーへの権限付与
作成したユーザーに、MySQL 内のすべてのデータベースとテーブルへの root のフルアクセス権を付与してください。
```
GRANT ALL PRIVILEGES ON *.* TO 'your_username'@'localhost';
```

なお、ユーザーへの権限付与を学習するために本問題を用意していますが、現場ですべてのデータベースへの root のフルアクセス権限を付与することはほぼありません。データベースのセキュリティを危険にさらす可能性があるためです。

4. 権限のリロード
ユーザーに権限を付与したら、すべての権限をリロードしてください。これにより設定が有効になります。
```
FLUSH PRIVILEGES;
```

5. ユーザーの削除
作成したユーザーを削除してください。削除後、削除できていることを確認してください。
```
DROP USER 'your_username'@'localhost';
```

6. ユーザーの再作成
再度ユーザーを作成、権限付与、権限のリロードを行ってください。

今後は root ユーザーは基本的に使用せず、今回作成したユーザーを使用してください。
```
CREATE USER 'your_username'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON *.* TO 'your_username'@'localhost';
FLUSH PRIVILEGES;
```

7. パスワードポリシー要件を緩和する場合

#### 7.1. パスワードポリシー要件を確認する
```
SHOW VARIABLES LIKE 'validate_password%';
```
##### 表示例
```
mysql> show variables like 'validate_password%'
    -> ;
+--------------------------------------+--------+
| Variable_name                        | Value  |
+--------------------------------------+--------+
| validate_password.check_user_name    | ON     |
| validate_password.dictionary_file    |        |
| validate_password.length             | 8      |
| validate_password.mixed_case_count   | 1      |
| validate_password.number_count       | 1      |
| validate_password.policy             | MEDIUM |
| validate_password.special_char_count | 1      |
+--------------------------------------+--------+
```

#### 7.2. パスワードポリシー要件を緩和する
```
SET GLOBAL validate_password.policy = LOW;
```
##### 表示例
```
mysql> SHOW VARIABLES LIKE 'validate_password%';
+--------------------------------------+-------+
| Variable_name                        | Value |
+--------------------------------------+-------+
| validate_password.check_user_name    | ON    |
| validate_password.dictionary_file    |       |
| validate_password.length             | 8     |
| validate_password.mixed_case_count   | 1     |
| validate_password.number_count       | 1     |
| validate_password.policy             | LOW   |
| validate_password.special_char_count | 1     |
+--------------------------------------+-------+
```
