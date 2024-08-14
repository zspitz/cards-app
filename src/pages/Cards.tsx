import { useLoaderData } from 'react-router-dom'

export const cardsLoader = () => 'Cards'
export const favoritesLoader = () => 'Favorites'
export const mycardsLoader = () => 'My cards'

const Cards = () => {
    const caption = useLoaderData() as string
    return (
        <div>{caption}</div>
    )
}

export default Cards
