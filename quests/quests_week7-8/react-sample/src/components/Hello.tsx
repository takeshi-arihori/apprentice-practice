// Helloはクリックするとアラートを出すテキストを返す
const Hello = () => {
  // クリック時に呼ばれる関数
  const onClick = () => {
    // アラートを出す
    alert("Hello World!");
  };

  const text = "Hello World!";

  return (
    // divのonClickにクリック時のコールバック関数を渡す
    <div onClick={onClick}>
      {text}
    </div>
  );
};

export default Hello;
