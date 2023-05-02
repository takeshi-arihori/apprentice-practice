#!/bin/bash

# パスワードファイルのパスを設定
PASSWORD_FILE="$HOME/passwords.txt"

# サービス名の入力を求める
echo "サービス名を入力してください:"
read service_name

# ユーザー名の入力を求める
echo "ユーザー名を入力してください:"
read user_name

# パスワードの入力を求める
echo "パスワードを入力してください:"
read -s password

# ファイルに情報を追記
echo "${service_name}:${user_name}:${password}" >> "$PASSWORD_FILE"

echo "情報が追加されました: $service_name"
echo "Thank you!!"