# EC2 を構築できる

AWS の公式ドキュメントを参考にしながら、以下を進めてください。参考になるドキュメントを紹介します。

- [チュートリアル: Amazon EC2 Linux インスタンスの開始方法](https://docs.aws.amazon.com/ja_jp/AWSEC2/latest/UserGuide/EC2_GetStarted.html)

## 1. セキュリティグループの作成

EC2 インスタンス用の VPC セキュリティグループを新規に作成してください。外部からの HTTP 通信及び SSH 通信のみを許可するようにします。

- 作成した VPC を選択してください
- 外部からの HTTP 通信は全て許可するように設定してください。それにより、EC2 インスタンスに HTTP 通信できるようになります
- 外部からの SSH 通信は、自分の IP アドレスからのみ許可するように設定してください。それにより、自分の IP アドレスからのみ EC2 インスタンスに SSH 通信できるようになります。AWS コンソールからの接続も許可する場合、[Set up EC2 Instance Connect](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-connect-set-up.html) を参考に、AWS の IP アドレスも許可してください

## 2. EC2 インスタンスの作成

EC2 インスタンスを新規に作成してください。後ほどこちらに WordPress をデプロイします。

- Amazon マシンイメージ (AMI) は、[WordPress ブログをホストする](https://docs.aws.amazon.com/ja_jp/AWSEC2/latest/UserGuide/tuts-wordpress.html) に記載されているバージョンの Amazon Linux を使用すると、WordPress のインストールがスムーズになります
- VPC、サブネットは作成したものを使用してくてください
- セキュリティグループは先ほど作成したセキュリティグループを選択してください
- パブリック IP の自動割り当ては有効にしてください。これにより、EC2 インスタンスにパブリック IP アドレスが割り当てられ、インターネットから EC2 インスタンスにアクセスできるようになります

## 3. EC2 インスタンスに接続

EC2 インスタンスに接続してください。EC2 インスタンスに接続することで、EC2 インスタンス上でコマンドを実行できるようになります。
