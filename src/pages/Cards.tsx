import { useLoaderData } from 'react-router-dom'

export const cardsLoader = () => 'Cards'
export const favoritesLoader = () => 'Favorites'
export const mycardsLoader = () => 'My cards'

const Cards = () => {
    const caption = useLoaderData() as string

    // TODO layout cards using flex-direction row + flex-wrap + flex-grow
    // https://css-tricks.com/piecing-together-approaches-for-a-css-masonry-layout/#aa-is-horizontal-line-masonry-ok
    return (
        <div>{caption}</div>
    )
}

export default Cards
