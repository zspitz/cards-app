import { useLoaderData } from 'react-router-dom'
import { CardsLoaderReturnData } from '../loadersActions'
import { Masonry } from 'masonic'
import MasonryCard from '../components/cards/MasonryCard'

const Cards = () => {
    const cards = useLoaderData() as CardsLoaderReturnData

    return (
        <Masonry items={cards} render={MasonryCard} />
    )
}

export default Cards
