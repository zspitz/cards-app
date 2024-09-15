import { useLoaderData } from 'react-router-dom'
import { CardsLoaderReturnData } from '../loadersActions'
import { Masonry } from 'masonic'
import MasonryCard from '../components/cards/MasonryCard'
import { useMatches } from '@mantine/core'

const Cards = () => {
    const cards = useLoaderData() as CardsLoaderReturnData
    const columnWidth = useMatches({
        base: 200,
        sm: 300
    })
    const columnGutter = useMatches({
        base: 0,
        sm: 5
    })

    return (
        <Masonry items={cards} render={MasonryCard} columnWidth={columnWidth} columnGutter={columnGutter} />
    )
}

export default Cards
