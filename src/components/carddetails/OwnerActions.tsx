import { useRoles } from '../../hooks/useRoles'
import { TbPencil, TbTrash } from 'react-icons/tb'
import { deleteCardFetchArgs } from '../../services/http/cards'
import { Button } from '@mantine/core'
import { useLang } from '../../context/lang/useLang'

type Props = {
    cardId: string,
    ownerId: string
}

const OwnerActions = ({ cardId, ownerId }: Props) => {
    const { hasRole, isOwner } = useRoles()
    const { t } = useLang()

    const canEditDelete = isOwner(ownerId) || hasRole('admin')
    if (!canEditDelete) {
        return <></>
    }

    return (
        <>
            <Button leftSection={<TbPencil />}>{t('Edit')}</Button>
            {/* <ActionIconWithFeedback
                errorPrefixKey='Unable to delete card'
                fetchArgsGetter={() => deleteCardFetchArgs(cardId)}
                fetcherSubmitOptions={{
                    method: 'delete',
                    action: '/cards',
                    encType: 'application/json'
                }}
            >
                <TbTrash />
            </ActionIconWithFeedback> */}
        </>
    )
}

export default OwnerActions
