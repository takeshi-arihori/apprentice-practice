# Ajax 通信できる

[OpenWeather API](https://openweathermap.org/api) を使用して任意の都市の現在の天気を取得する処理を書いてください。緯度と経度を入力として受け取り、摂氏温度、および天気の説明を表示します。

## 1. API キーの取得

[OpenWeather](https://openweathermap.org) のアカウントを作成し、API キーを取得してください。

## 2. Ajax 通信

画面上で緯度と経度を入力し、「天気情報を取得する」ボタンを押すと、摂氏温度、および天気の説明を表示してください。

天気情報の取得は、Fetch API を使用して、OpenWeather API への HTTP リクエストを処理することで実現してください。

以下のコードを元に、天気予報アプリを作成してください。

```html
<!DOCTYPE html>
<html lang="ja">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>天気予報アプリ</title>
  <link rel="stylesheet" type="text/css" href="style.css">
</head>

<body>
  <h1>天気予報</h1>
  <form id="weatherForm">
    <label for="latitude">緯度:</label>
    <input type="text" id="latitude" name="latitude" required>
    <label for="longitude">経度:</label>
    <input type="text" id="longitude" name="longitude" required>
    <button type="submit">天気情報を取得する</button>
  </form>
  <div id="weatherResult"></div>
  <script src="weather.js"></script>
</body>

</html>
```

style.css

```css
body {
  max-width: 500px;
  margin: auto;
  padding: 20px;
}

form {
  margin-bottom: 20px;
}

label,
input {
  display: block;
  margin-bottom: 10px;
}

#weatherResult {
  padding: 10px;
}
```