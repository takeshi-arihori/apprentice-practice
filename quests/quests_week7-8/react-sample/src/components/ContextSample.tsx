import React from 'react'

// Titleを渡すためのContextを作成する
const TitleContext = React.createContext('')

// Titieコンポーネントの中でContextの値を参照する
const Titie = () => {
    // Consumerを使って, Contextの値を参照する
    return (
        <TitleContext.Consumer>
            {/* Consumer直下に関数を置いて、Contextの値を参照する */}
            {(title) => {
                return <h1>{title}</h1>
            }}
        </TitleContext.Consumer>
    )
}

const Header = () => {
    return (
        <div>
            {/* headerからTitleへは何もデータを渡さない */}
            <Titie />
        </div>
    )
}

// Pageコンポーネントの中でContextに値を渡す
const Page = () => {
    const title = 'React Book'

    // Providerを使い、Contextに値を渡す
    // Provider以下のコンポーネントからContextの値を参照できる
    return (
        <TitleContext.Provider value={title}>
            <Header />
        </TitleContext.Provider>
    )
}

export default Page