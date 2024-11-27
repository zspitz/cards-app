import { useRoles } from '../../hooks/useRoles'
import { TbPencil, TbTrash } from 'react-icons/tb'
import ActionIconWithFeedback from '../ActionIconWithFeedback'
import { deleteCardFetchArgs } from '../../services/http/cards'
import { ActionIcon } from '@mantine/core'

type Props = {
    cardId: string,
    ownerId: string
}

const OwnerActions = ({ cardId, ownerId }: Props) => {
    const { hasRole, isOwner } = useRoles()

    const canEditDelete = isOwner(ownerId) || hasRole('admin')
    if (!canEditDelete) {
        return <></>
    }

    return (
        <>
            <ActionIcon variant="transparent">
                <TbPencil />
            </ActionIcon>
            <ActionIconWithFeedback
                errorPrefixKey='Unable to delete card'
                fetchArgsGetter={() => deleteCardFetchArgs(cardId)}
                fetcherSubmitOptions={{
                    method: 'delete',
                    action: '/cards'
                }}
            >
                <TbTrash />
            </ActionIconWithFeedback>
        </>
    )
}

export default OwnerActions
