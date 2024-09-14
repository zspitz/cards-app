import { Card, Title } from '@mantine/core'
import { CardResponse } from '../../types'

type Props = {
    index: number,
    width: number,
    data: CardResponse
}

const MasonryCard = ({ data: card }: Props) => {
    return (
        <Card radius="md" key={card._id} m="md" p="0">
            <img src={card.image.url} alt={card.image.alt} />
            <Title order={2}>{card.title}</Title>
            <Title order={4}>{card.subtitle}</Title>
        </Card>
    )
}

export default MasonryCard
