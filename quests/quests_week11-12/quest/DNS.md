# DNS について説明できる
## 1. ドメインとは
#### ドメインとは何か、プログラミング初心者にわかるように説明してください。

- ドメインとは、インターネット上の住所のようなもので、ウェブサイトやメールサービスなどが存在する場所を指します。ドメインは一意であり、同じドメイン名は世界中で1つだけです。例えば、"www.google.com" はGoogleのウェブサイトのドメインです。

- ドメインは通常、"www.example.com" のように表されます。ここで "www" はサブドメイン、"example" はセカンドレベルドメイン、"com" はトップレベルドメイン（TLD）を表します。これらはドット（.）で区切られ、左から順に特定のサービス、組織、種類の順になります。


## 2. DNS とは
#### DNS とは何か、プログラミング初心者にわかるように説明してください。

- DNS（Domain Name System）は、人間が覚えやすいドメイン名をコンピュータが理解できるIPアドレスに変換するシステムです。これは、電話帳のようなもので、人の名前から電話番号を検索するのと同様に、ドメイン名からIPアドレスを検索します。

- 例えば、ブラウザで "www.google.com" を入力すると、DNSはこのドメイン名を対応するIPアドレス（例えば "142.251.214.142"）に変換します。これにより、ブラウザは正しいサーバーに接続してウェブページを表示することができます。このプロセスは「DNSルックアップ」または「DNS解決」と呼ばれます。


## 3. ドメイン名と IP アドレスの対応
#### www.google.com の IP アドレスを調べてください。

`nslookup` コマンドを使うと、ドメイン名から IP アドレスを調べることができます。

```
nslookup www.google.com

Server:         2001:a7ff:5f01:1::a
Address:        2001:a7ff:5f01:1::a#53

Non-authoritative answer:
Name:   www.google.com
Address: 142.250.199.100
```

またブラウザでその IP アドレスにアクセスして、www.google.com が開かれることを確認してください。