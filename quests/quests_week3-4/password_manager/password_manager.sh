#!/bin/bash

PASSWORD_FILE="passwords.txt"
ENCRYPTED_FILE="passwords.txt.gpg"

while true; do
  echo "パスワードマネージャーへようこそ！"
  echo "次の選択肢から入力してください(Add Password/Get Password/Exit)："
  read choice

  case $choice in
    "Add Password")
      echo "サービス名を入力してください："
      read service
      echo "ユーザー名を入力してください："
      read username
      echo "パスワードを入力してください："
      read password
      echo "$service:$username:$password" >> $PASSWORD_FILE
      gpg -r YourEmail@example.com -e $PASSWORD_FILE
      rm $PASSWORD_FILE
      echo "パスワードの追加は成功しました。"
      ;;
    "Get Password")
      gpg -d $ENCRYPTED_FILE > $PASSWORD_FILE
      echo "サービス名を入力してください："
      read service
      result=$(grep "^$service:" $PASSWORD_FILE)
      if [ -z "$result" ]; then
        echo "そのサービスは登録されていません。"
      else
        echo "サービス名：$(echo $result | cut -d: -f1)"
        echo "ユーザー名：$(echo $result | cut -d: -f2)"
        echo "パスワード：$(echo $result | cut -d: -f3)"
      fi
      rm $PASSWORD_FILE
      ;;
    "Exit")
      echo "Thank you!"
      exit 0
      ;;
    *)
      echo "入力が間違えています。Add Password/Get Password/Exit から入力してください。"
      ;;
  esac
done
