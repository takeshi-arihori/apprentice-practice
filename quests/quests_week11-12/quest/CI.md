# CI を構築できる

簡単な計算を行うプログラムを作成し、CI を構築しましょう。

CI の構築には GitHub Actions を使います。CI ツールは多数ありますが、GitHub Actions は GitHub との親和性が高く、GitHub での開発においては使いやすいツールです。

以下のドキュメントを参考にしながら進めてください。

- [GitHub Actions について](https://docs.github.com/ja/actions/learn-github-actions)
- [継続的インテグレーションについて](https://docs.github.com/ja/actions/automating-builds-and-tests/about-continuous-integration)
- [Rubyでのビルドとテスト](https://docs.github.com/ja/actions/automating-builds-and-tests/building-and-testing-ruby)

## 1. プロジェクトの作成

新規プロジェクトを作成し、以下を実装してください。

今回は足し算を行うプログラムを作成します。その上で、Rspec によるテストと Rubocop による静的解析を行えるようにします。

`.ruby-version` (任意のバージョンを使用してください)

```ruby
3.2.2
```

`Gemfile`

```ruby
# frozen_string_literal: true

source "https://rubygems.org"

gem "rspec", "~> 3.12", group: :development
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

`calculator.rb`

```ruby
class Calculator
  def add(a, b)
    a + b
  end
end
```

`spec/calculator_spec.rb`

```ruby
require_relative '../calculator'

RSpec.describe Calculator do
  describe '#add' do
    it '2つの数字を足し算する' do
      calculator = Calculator.new

      expect(calculator.add(1, 2)).to eq(3)
    end
  end
end
```

実装ができたら、ローカルでテストと Rubocop が実行できることを確認してください。

```bash
bundle install
bundle exec rspec
bundle exec rubocop
```

## 2. GitHub へ push

GitHub 上で新規リポジトリを作成し、作成したプロジェクトを push してください。

## 3. CI の構築

GitHub の main ブランチに プルリクエスト、もしくは push された際に、テストと Rubocop が実行されるように CI を構築してください。

実装ができたら、GitHub の main　ブランチにプルリクエスト、もしくは push して CI が実行されることを確認してください。

参考までに、以下に CI の設定例を記載しておきます。CI のイメージを掴みましょう。

`.github/workflows/test.yml`

```yml
name: Test

on:
  push:
    branches: [ main ]
  pull_request:
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

    - name: Run tests
      run: bundle exec rspec

    - name: Run rubocop
      run: bundle exec rubocop
```
