import { useLoaderData } from 'react-router-dom'

export const loadCards = () => 'Cards'
export const loadFavorites = () => 'Favorites'
export const loadMyCards = () => 'My cards'

const Cards = () => {
    const caption = useLoaderData() as string
    return (
        <div>{caption}</div>
    )
}

export default Cards