import { Card, Image, Paper, Stack, Text } from '@mantine/core'
import { CardResponse } from '../../types'
import classes from './MasonryCard.module.css'

type Props = {
    index: number,
    width: number,
    data: CardResponse
}

const MasonryCard = ({ data: card }: Props) => (
    <Card radius="md" key={card._id} m="xs" p="0" className={classes.card}>
        <Image src={card.image.url} alt={card.image.alt} className={classes.image} />
        <Stack pos="absolute" gap={0} justify="flex-end" h="100%" w="100%">
            <Paper w="100%" radius={0} opacity={.75} p={5}>
                <Text size="lg">{card.title}</Text>
                <Text size="xs">{card.subtitle}</Text>
            </Paper>
        </Stack>
    </Card>
)

export default MasonryCard
