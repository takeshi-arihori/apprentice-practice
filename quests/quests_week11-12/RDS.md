# RDS を構築できる

AWS の公式ドキュメントを参考にしながら、以下を進めてください。参考になるドキュメントを紹介します。

- [VPC 内の DB インスタンスの使用](https://docs.aws.amazon.com/ja_jp/AmazonRDS/latest/UserGuide/USER_VPC.WorkingWithRDSInstanceinaVPC.html)
- [DB インスタンスを作成する](https://docs.aws.amazon.com/ja_jp/AmazonRDS/latest/UserGuide/CHAP_Tutorials.WebServerDB.CreateDBInstance.html)

## 1. セキュリティグループの作成

データベース用の VPC セキュリティグループを作成してください。外部からの MySQL 通信のみを許可するようにします。

- 作成した VPC を選択してください
- 外部からの通信は、EC2 を設置したセキュリティグループからの MySQL の通信のみを許可するようにしてください

## 2. RDS のサブネットグループ

RDS のサブネットグループを作成してください。サブネットグループを作成することで、作成する RDS を 作成した VPC 及びサブネットと紐付けることができます。

- 作成した VPC を選択してください
- 作成した2つのプライベートサブネットを割り当ててください

## 3. RDS の作成

RDS を新規に作成してください。これにより、WordPress が使用するデータベースを構築します。

- エンジンのタイプは MySQL を選択してください
- デプロイオプションは「単一の DB インスタンス」を指定してください。今回はマルチ AZ は有効にする必要は特にありません
- マスターユーザー名とパスワードはご自身で管理してください
- VPC 及び DB サブネットグループ、VPC セキュリティグループは作成したものを選択してください
- パブリックアクセスはなしにしてください。これにより、インターネットから RDS にアクセスできなくなります
