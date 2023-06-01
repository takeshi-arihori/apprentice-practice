// 無名関数でコンポーネントを定義し、Textという変数に代入する
// Textコンポーネントは親から'context'というデータを受け取る
const Text = (props: { context: string }) => {
    // propsからcontextを受け取る
    const { context } = props;
    // propsで受け取ったcontextを表示する
    return <p className="text">{context}</p>;
}

// 同様に定義したコンポーネントをMessageという変数に代入する
const Message = (props: {}) => {
    const content1 = 'This is parent component'
    const content2 = 'Message uses Text component'

    return (
        <div>
            {/* contentというキーでコンポーネントにデータを渡す */}
            <Text context={content1} />
            {/* 違うデータを渡すと、違う内容が表示される */}
            <Text context={content2} />
        </div>
    )
}

// Messageコンポーネントをデフォルトエクスポートする
export default Message