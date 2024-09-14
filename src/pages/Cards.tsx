import { useLoaderData } from 'react-router-dom'
import { CardsLoaderReturnData } from '../loadersActions'
import ImageOrPlaceholder from '../components/ImageOrPlaceholder'
import { Card, Title } from '@mantine/core'

const Cards = () => {
    const cards = useLoaderData() as CardsLoaderReturnData

    return (
        cards.map(card => (
            <Card radius="md" key={card._id} m="md" p="0">
                <ImageOrPlaceholder url={card.image.url} height={200} alt={card.image.alt} />
                <Title order={2}>{card.title}</Title>
                <Title order={4}>{card.subtitle}</Title>
            </Card>
        ))
    )
}

export default Cards
