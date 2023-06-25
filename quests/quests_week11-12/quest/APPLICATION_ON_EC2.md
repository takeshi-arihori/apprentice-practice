# EC2 上でアプリケーションを動作できる

## 1. WordPress のインストール

AWS の公式ドキュメント [WordPress ブログをホストする](https://docs.aws.amazon.com/ja_jp/AWSEC2/latest/UserGuide/tuts-wordpress.html) を参考に、WordPress のインストールを行ってください。

その際に、データベースの接続先はローカルホストではなく、RDS のエンドポイントを指定してください。少なくとも変更が必要な箇所を以下に挙げます。それ以外に必要な変更がある場合は、適宜変更してください。

- MySQL 接続する際に、ホスト名に RDS のエンドポイントを指定します

```bash
[ec2-user ~]$ mysql -u root -h {RDSのエンドポイント} -p
```

- MySQL データベースのユーザーを作成する際に、ホスト名には任意を意味する `%` を指定します

```sql
CREATE USER 'wordpress-user'@'%' IDENTIFIED BY 'your_strong_password';
```

- WordPress ユーザーに権限を付与する際に、ホスト名には `%` を指定します

```sql
GRANT ALL PRIVILEGES ON `wordpress-db`.* TO "wordpress-user"@"%";
```

- `wp-config.php` の `DB_HOST` に RDS のエンドポイントを指定します

```php
define( 'DB_HOST', 'RDSのエンドポイント' );
```

## 2. WordPress へアクセス

WordPress へアクセスして、正しく動作していることを確認してください。EC2 インスタンスのパブリック IP アドレスをブラウザで開くことで、WordPress へアクセスできます (WordPress をドキュメントルートで実行している場合)。
