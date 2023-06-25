# ACM で SSL 化できる

AWS Certificate Manager (ACM) を利用して、SSL 化 (HTTPS 化)　を行いましょう。また、HTTP 通信を HTTPS 通信にリダイレクトさせましょう。

SSL 化には色々な方法がございますが、今回は ACM と Elastic Load Balancing (ELB) を利用して行います。

AWS の公式ドキュメントを参考にしながら、以下を進めてください。参考になるドキュメントを紹介します。

- [パブリック証明書をリクエストする](https://docs.aws.amazon.com/ja_jp/acm/latest/userguide/gs-acm-request-public.html)
- [Application Load Balancer の開始方法](https://docs.aws.amazon.com/ja_jp/elasticloadbalancing/latest/application/application-load-balancer-getting-started.html)
- [Application Load Balancer 用の HTTPS リスナーを作成する](https://docs.aws.amazon.com/ja_jp/elasticloadbalancing/latest/application/create-https-listener.html)
- [ELB ロードバランサーへのトラフィックのルーティング](https://docs.aws.amazon.com/ja_jp/Route53/latest/DeveloperGuide/routing-to-elb-load-balancer.html)
- [Application Load Balancer を使用して HTTP リクエストを HTTPS にリダイレクトするにはどうすればよいですか?](https://repost.aws/ja/knowledge-center/elb-redirect-http-to-https-using-alb)

## 1. パブリック証明書のリクエスト

ACM を利用して、取得したドメインに対してパブリック証明書をリクエストしてください。その際に、検証を成功させ、証明書のステータスが Issued (発行済み) になるようにしてください。

## 2. ELB のターゲットグループの作成

ロードバランシングのターゲットグループを新規に作成してください。

- 作成した VPC 及び EC2 を選択してください

## 3. ELB のロードバランサーの作成

ELB のロードバランサーを新規に作成してください。

- ロードバランサーのタイプは Application Load Balancer を選択してください
- VPC と2つのパブリックサブネット、ターゲットグループは作成したものを選択してください
- セキュリティグループは EC2 用のセキュリティグループを選択してください

完了したら、ロードバランサーの DNS 名に HTTP 通信して、WordPress のページが表示されることを確認してください。

## 4. ELB の HTTPS リスナーの追加

作成したロードバランサーに、HTTPS リスナーを追加してください。これにより、HTTPS 通信が可能になります。

- リスナーのプロトコルは HTTPS、ポートは 443 を選択してください
- デフォルトの証明書として、先ほど作成したパブリック証明書を選択してください
- ターゲットグループは先ほど作成したターゲットグループを選択してください
- デフォルトのルールを削除してください

## 5. セキュリティグループで HTTPS 通信を許可

EC2 用のセキュリティグループで、外部からの HTTPS 通信を許可してください。

完了したら、ロードバランサーの DNS 名に HTTPS 通信して、WordPress のページが表示されることを確認してください。

## 6. 独自ドメインを HTTPS 通信に対応

独自ドメインを HTTPS 通信に対応させてください。

そのために Route 53 の A レコードを変更します。A レコードの値を、ロードバランサーの DNS 名に変更してください。

完了したら、独自ドメインに HTTPS 通信して、WordPress のページが表示されることを確認してください。

## 7. HTTP 通信を HTTPS 通信にリダイレクト

ロードバランサーの HTTPS リスナーのルールを、HTTP 通信を HTTPS 通信にリダイレクトするルールに変更してください。これにより、HTTP 通信を HTTPS 通信にリダイレクトできるようになります。
