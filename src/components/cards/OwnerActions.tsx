import { useRoles } from '../../hooks/useRoles'
import { TbPencil, TbTrash } from 'react-icons/tb'
import ActionIconWithFeedback from '../ActionIconWithFeedback'
import { deleteCardFetchArgs } from '../../services/http/cards'
import { ActionIcon } from '@mantine/core'
import { useNavigate } from 'react-router'
import { MouseEventHandler } from 'react'

type Props = {
    cardId: string,
    ownerId: string
}

const OwnerActions = ({ cardId, ownerId }: Props) => {
    const { hasRole, isOwner } = useRoles()
    const navigate = useNavigate()

    const canEditDelete = isOwner(ownerId) || hasRole('admin')
    if (!canEditDelete) {
        return <></>
    }

    const editHandler: MouseEventHandler<HTMLButtonElement> = e => {
        e.preventDefault()
        navigate(`/cards/edit/${cardId}`)
    }

    return (
        <>
            <ActionIcon variant="transparent" onClick={editHandler}>
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
