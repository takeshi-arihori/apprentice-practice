import React from 'react'

// Containerのpropsの方を定義する
type ContainerProps = {
    title: string
    children: React.ReactNode
}

const Container = (props: ContainerProps) => {
    const { title, children } = props

    return (
        <div style={{ background: 'red' }}>
            <span>{title}</span>
            {/* propsのchildrenを埋め込むと、このコンポーネントの開始タグと閉じタグで囲んだ要素を表示 */}
            <div>{children}</div>
        </div>
    )
}

const Parent = (): JSX.Element => {
    return (
        // Containerを使用する際に、他の要素を囲って使用する
        <Container title="Hello">
            <p>ここの部分が背景色で囲まれます</p>
        </Container>
    )
}

export default Parent