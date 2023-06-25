# CD を構築できる

Ruby 製の軽量な Webアプリケーションフレームワークである Sinatra を Amazon EC2 上にデプロイする CD を構築しましょう。

CD の構築には GitHub Actions を使います。

以下のドキュメントを参考にしながら進めてください。

- [継続的デプロイについて](https://docs.github.com/ja/actions/deployment/about-deployments/about-continuous-deployment)
- [GitHub Actions を使用してデプロイする](https://docs.github.com/ja/actions/deployment/about-deployments/deploying-with-github-actions)
- [暗号化されたシークレット](https://docs.github.com/ja/actions/security-guides/encrypted-secrets)

## 1. プロジェクトの作成

新規プロジェクトを作成し、Sinatra を使って Hello GitHub Actions が表示されるようにしてください。

なお、Sinatra を使用するのは手軽に Web アプリケーションを構築でき、CD の動作確認を行いやすいためです。

`.ruby-version` (任意のバージョンを使用してください)

```ruby
3.2.2
```

`Gemfile`

```ruby
# frozen_string_literal: true

source "https://rubygems.org"

gem "sinatra", "~> 3.0"
gem "puma", '~> 6.3'

gem "rubocop", "~> 1.51", require: false
```

`.rubocop.yml`

```yml
AllCops:
  DisabledByDefault: true
  SuggestExtensions: false
  Exclude:
    - 'vendor/**/*'
    - 'spec/**/*'
```

`app.rb`

```ruby
require 'sinatra'

get '/' do
  'Hello GitHub Actions'
end
```

実装ができたら、ローカルで Sinatra を起動してください。

```bash
bundle install
bundle exec ruby app.rb
```

起動したら `http://localhost:4567` にアクセスして Hello GitHub Actions が表示されることを確認してください。

## 2. GitHub へ push

GitHub 上で新規リポジトリを作成し、作成したプロジェクトを push してください。

## 3. 手動デプロイ

AWS の EC2 上で、手動で Sinatra を起動してください。

以下、参考までに手順の概要を記載しておきます。

- VPC を作成する
- パブリックサブネットを作成する。その際に、サブネットにインターネットゲートウェイをアタッチする
- セキュリティグループを作成する。その際に、ポート番号4567 と SSH のアクセスを全て許可する
- EC2 を作成する。その際に、キーペアを作成し、pem ファイルを保管する。また、パブリック IP を付与する
- EC2 に接続し、Git 及び Ruby 関連の必要なライブラリをインストールし、コードを GitHub からクローンする
- EC2 上で Sinatra を起動する

なお、EC2 の AMI で Amazon Linux 2023 を使用する場合、以下のコマンドで必要なライブラリをインストール及び Sinatra を起動できます。

```bash
sudo dnf groupinstall -y "Development Tools"
sudo dnf install -y git-all ruby3.2 ruby-devel openssl-devel
git clone {GitHub のリポジトリ URL}
cd {リポジトリ名}
bundle install
bundle exec ruby app.rb -o 0.0.0.0
```

Sinatra が起動したら、EC2 のパブリック IP にポート番号4567でアクセスして (`{パブリックIP}:4567`)、 Hello GitHub Actions が表示されることを確認してください。

## 4. CD の構築

GitHub の main ブランチに push された際に、デプロイが実行されるように CD を構築してください。

実装ができたら、GitHub の main　ブランチにプルリクエストをマージ、もしくは直接 push して CD が実行されることを確認してください。

参考までに、以下に CD の設定例を記載しておきます。CD のイメージを掴みましょう。

`.github/workflows/deploy.yml`

```yml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Set up Ruby
        uses: ruby/setup-ruby@ec02537da5712d66d4d50a0f33b7eb52773b5ed1
        with:
          ruby-version: '3.2'

      - name: Install dependencies
        run: bundle install

      - name: Rubocop
        run: bundle exec rubocop

  deploy:
    needs: test
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Deploy in Amazon EC2
        env:
          PRIVATE_KEY: ${{ secrets.AWS_PRIVATE_KEY  }}
          HOSTNAME : ${{ secrets.HOSTNAME  }}
          USER_NAME : ${{ secrets.USER_NAME  }}

        run: |
          echo "$PRIVATE_KEY" > private_key && chmod 600 private_key
          ssh -o StrictHostKeyChecking=no -i private_key ${USER_NAME}@${HOSTNAME} '
            # 最新のリポジトリを取得し、既存のポート番号4567のプロセスを終了し、デタッチモードでアプリを起動する
            cd /home/ec2-user/{リポジトリ名} &&
            git fetch --all &&
            git reset --hard origin/main &&
            bundle install &&
            lsof -t -i:4567 | xargs --no-run-if-empty kill -9 &&
            screen -dm bundle exec ruby app.rb -o 0.0.0.0
            '
```

なお、上のファイルでは `AWS_PRIVATE_KEY`、`HOSTNAME`、`USER_NAME` という名前のシークレット (機密情報) を使用しています。これらのシークレットは GitHub のリポジトリの Settings > Secrets and variables > Actions > New repository secrets から登録してください。

- `HOSTNAME` : EC2 のパブリック IP (52.194.252.150 など)
- `USER_NAME` : EC2 に接続する際のユーザー名 (Amazon Linux 2023 の場合は ec2-user)
- `AWS_PRIVATE_KEY` : EC2 に接続する際に使用する秘密鍵 (pem ファイル) の内容

pem ファイルの例。

```pem
-----BEGIN RSA PRIVATE KEY-----
MIIEogIBAAKCAQEAq2FzZrPixR9TQIqtfq+AvQYrkbPLKKsl2JJYUDfY2SYmCu/g
kSr0zCBW+9YtHQTllPP08aoN2DFOtCJrGYAUewaWkqkBwG/UCz1c64O
GiatlbuO2OtKbh3UTERh7DMEP+LZAa78fKAcFCjPOwoIy9nHOAKpJ4WMvnzzn/be
lcfRld2cIsvE20Fd68xT+T3mx0pEhttAUt2OqMsDSo3UvV3xu9wz17pXMlDQroSU
PDzaKKCob18etiSSZAE0UVXZeT6an91EdlNXfbPLI7NB84UnoR5AoVdOK4qjWGmm
irvmEHRK1G5mK9SH0log
-----END RSA PRIVATE KEY-----
```
