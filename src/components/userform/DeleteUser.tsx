import { useLang } from '../../context/lang/useLang'
import { deleteUserFetchArgs } from '../../services/http/users'
import type { UserResponse } from '../../types'
import ActionButton, { type ActionButtonProps } from '../ActionButton'

type Props = {
    user: UserResponse
}

const DeleteUser = ({ user: { _id } }: Props) => {
    const { t } = useLang()
    const actionButtonProps: ActionButtonProps = {
        fetchArgsGetter: () => deleteUserFetchArgs(_id),
        errorPrefixKey: 'Can\'t delete user',
        buttonProps: {
            color: 'red'
        },
        fetcherSubmitOptions: {
            method: 'delete',
            action: '/'
        }
    }

    return (
        <ActionButton {...actionButtonProps}>
            {t('Delete user')}
        </ActionButton>
    )
}

export default DeleteUser
