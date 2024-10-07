import { Card, Group, Image, Paper, Stack, Text } from '@mantine/core'
import { CardResponse } from '../../types'
import classes from './MasonryCard.module.css'
import LikeActionIcon from './LikeActionIcon'
import OwnerActions from './OwnerActions'
import { NavLink } from 'react-router-dom'

type Props = {
    index: number,
    width: number,
    data: CardResponse
}

const MasonryCard = ({ data: card }: Props) => (
    <NavLink to={`/cards/${card._id}`} key={card._id}>
        <Card radius="md" m="xs" p="0" className={classes.card} mih={150}>
            <Image src={card.image.url} alt={card.image.alt} className={classes.image} />
            <Stack pos="absolute" gap={0} justify="flex-end" h="100%" w="100%">
                <Paper w="100%" radius={0} opacity={.75} p={5}>
                    <Group gap={0}>
                        <Stack gap={0} flex="1">
                            <Text size="lg">{card.title}</Text>
                            <Text size="xs">{card.subtitle}</Text>
                        </Stack>
                        <Group gap={0}>
                            <LikeActionIcon cardId={card._id} likes={card.likes} />
                            <OwnerActions cardId={card._id} ownerId={card.user_id} />
                        </Group>
                    </Group>
                </Paper>
            </Stack>
        </Card>
    </NavLink>
)

export default MasonryCard
