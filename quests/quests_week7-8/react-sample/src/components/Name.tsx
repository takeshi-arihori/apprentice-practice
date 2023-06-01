import React from 'react'
  // 名前を入力するためのテキストボックスを表示する
  const Name = () => {
    // input要素のonchangeイベントに対するコールバック関数を定義する
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // 入力されたテキストをコンソールに表示
      console.log(e.target.value);
    }
    return (
      <div style={{padding: '16px', backgroundColor: 'gray'}}>
      {/* forの代わりにhtmlForを使う */}
      <label htmlFor="name">名前</label>
      {/* classやonChangeの代わりに、classNameやonChangeを使う */}
      <input id='name' type="text" className="input-name" onChange={onChange} />
    </div>
  )
}

export default Name