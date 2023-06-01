#!/bin/bash

# パスワード情報が保存されるファイル
FILE="passwords.txt"
# 暗号化されたファイル
ENCRYPTED_FILE="passwords.txt.gpg"

# パスワードを追加する関数
function add_password {
  echo "サービス名を入力してください:"
  read service
  echo "ユーザー名を入力してください:"
  read username
  echo "パスワードを入力してください:"
  read password

  # ファイルにパスワード情報を追加
  echo "${service}:${username}:${password}" >> $FILE

  # パスワード情報のファイルを暗号化
  gpg -e -r "your@email.address" -o $ENCRYPTED_FILE $FILE
  # 暗号化前のファイルを削除
  rm $FILE

  echo "情報が追加されました: $service"
}

# パスワードを取得する関数
function get_password {
  # 暗号化されたファイルを復号化
  gpg -d -q $ENCRYPTED_FILE > $FILE

  echo "サービス名を入力してください:"
  read service

  # ファイルから該当するサービスのパスワード情報を検索
  result=$(grep -w $service $FILE)
  # ファイルを削除
  rm $FILE

  if [ -z "$result" ]; then
    echo "そのサービスは登録されていません。"
  else
    # パスワード情報を出力
    echo "サービス名:$(echo $result | cut -d ':' -f1)"
    echo "ユーザー名:$(echo $result | cut -d ':' -f2)"
    echo "パスワード:$(echo $result | cut -d ':' -f3)"
  fi
}

# プログラムの開始
echo "パスワードマネージャーへようこそ！"
while true; do
  echo "次の選択肢から入力してください(Add Password/Get Password/Exit):"
  read choice

  case $choice in
    "Add Password")
      add_password
      ;;
    "Get Password")
      get_password
      ;;
    "Exit")
      echo "Thank you!"
      break
      ;;
    *)
      echo "入力が間違えています。Add Password/Get Password/Exit から入力してください。"
      ;;
  esac
done
