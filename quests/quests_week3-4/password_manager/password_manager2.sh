#!/bin/bash

PASSWORD_FILE="$HOME/passwords.txt"

function add_password() {
    echo "サービス名を入力してください:"
    read service
    echo "ユーザー名を入力してください:"
    read username
    echo "パスワードを入力してください:"
    read password
    echo "$service:$username:$password" >> $PASSWORD_FILE
    echo "パスワードの追加は成功しました。"
}

function get_password() {
    echo "サービス名を入力してください:"
    read service
    result=$(grep "^$service:" $PASSWORD_FILE)
    if [ -z "$result" ]; then
        echo "そのサービスは登録されていません。"
    else
        IFS=':' read -ra data <<< "$result"
        echo "サービス名：${data[0]}"
        echo "ユーザー名：${data[1]}"
        echo "パスワード：${data[2]}"
    fi
}

echo "パスワードマネージャーへようこそ！"

while true; do
    echo "次の選択肢から入力してください(Add Password/Get Password/Exit)："
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
