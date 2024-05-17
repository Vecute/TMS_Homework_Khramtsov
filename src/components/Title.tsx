import '../App.scss'

export const enum TitlesSizes {
    extraSmall = 'extraSmallTitle', small = 'smallTitle', medium = 'mediumTitle', large = 'largeTitle', extraLarge = 'extraLargeTitle', superLarge = 'superLargeTitle'
}

export const enum TitlesLevels {
    extraSmall = 'h6', small = 'h5', medium = 'h4', large = 'h3', extraLarge = 'h2', superLarge = 'h1'
}

interface Props {
    title: string
    size: TitlesSizes
    level: TitlesLevels
}

const Title = (props: Props) => {
    const { title, size, level } = props
    const Tag = level
    return (
        <Tag className={size}>{title}</Tag>
    )
}

export default Title