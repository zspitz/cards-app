import { useRoles } from '../../hooks/useRoles'
import { TbPencil, TbTrash } from 'react-icons/tb'
import { deleteCardFetchArgs } from '../../services/http/cards'
import { Button } from '@mantine/core'
import { useLang } from '../../context/lang/useLang'
import ActionButton, { ActionButtonProps } from '../ActionButton'

type Props = {
    cardId: string,
    ownerId: string
}

const OwnerActions = ({ cardId, ownerId }: Props) => {
    const { hasRole, isOwner } = useRoles()
    const { t } = useLang()

    const canEditDelete = isOwner(ownerId) || hasRole('admin')
    if (!canEditDelete) { return <></> }

    const actionButtonProps: ActionButtonProps = {
        fetchArgsGetter: () => deleteCardFetchArgs(cardId),
        errorPrefixKey: 'Unable to delete card',
        fetcherSubmitOptions: {
            method: 'delete',
            action: '/cards'
        },
        buttonProps: {
            color: 'red',
            leftSection: <TbTrash />
        },
        navigateTo: '/cards'
    }

    return (
        <>
            <Button leftSection={<TbPencil />}>{t('Edit')}</Button>
            <ActionButton {...actionButtonProps}>
                {t('Delete')}
            </ActionButton>
        </>
    )
}

export default OwnerActions
