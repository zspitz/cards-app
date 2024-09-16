import { ActionIcon, Card, Group, Image, Paper, Stack, Text } from '@mantine/core'
import { CardResponse } from '../../types'
import classes from './MasonryCard.module.css'
import { TbHeart, TbHeartFilled, TbTrash, TbPencil } from 'react-icons/tb'
import { useRoles } from '../../hooks/useRoles'
import { useLike } from '../../hooks/useLike'

type Props = {
    index: number,
    width: number,
    data: CardResponse
}

const MasonryCard = ({ data: card }: Props) => {
    const { hasRole, isOwner } = useRoles()
    const { isLiked } = useLike()

    return (
        <Card radius="md" key={card._id} m="xs" p="0" className={classes.card} mih={150}>
            <Image src={card.image.url} alt={card.image.alt} className={classes.image} />
            <Stack pos="absolute" gap={0} justify="flex-end" h="100%" w="100%">
                <Paper w="100%" radius={0} opacity={.75} p={5}>
                    <Group gap={0}>
                        <Stack gap={0} flex="1">
                            <Text size="lg">{card.title}</Text>
                            <Text size="xs">{card.subtitle}</Text>
                        </Stack>
                        <Group gap={0}>
                            {
                                hasRole('user') &&
                                <ActionIcon variant="transparent">
                                    {isLiked(card.likes) ?
                                        <TbHeartFilled color="#e33bc4" /> :
                                        <TbHeart color="#e33bc4" />}
                                </ActionIcon>
                            }
                            {
                                (isOwner(card.user_id) || hasRole('admin')) &&
                                <>
                                    <ActionIcon variant="transparent">
                                        <TbPencil />
                                    </ActionIcon>
                                    <ActionIcon variant="transparent">
                                        <TbTrash />
                                    </ActionIcon>
                                </>
                            }
                        </Group>
                    </Group>
                </Paper>
            </Stack>
        </Card>
    )
}

export default MasonryCard
