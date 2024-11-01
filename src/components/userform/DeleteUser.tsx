import { useLang } from '../../context/lang/useLang'
import { deleteUserFetchArgs } from '../../services/http/users'
import { UserResponse } from '../../types'
import ActionButton, { ActionButtonProps } from '../ActionButton'

type Props = {
    user: UserResponse
}

const DeleteUser = ({ user: { _id } }: Props) => {
    const { t } = useLang()
    const actionButtonProps: ActionButtonProps = {
        fetchArgsGetter: () => deleteUserFetchArgs(_id),
        errorPrefixKey: 'Can\'t delete user',
        buttonProps: {
            color: 'red',
            children: t('Delete user')
        },
        fetcherSubmitOptions: {
            method: 'delete'
        }
    }

    return (
        <ActionButton {...actionButtonProps} />
    )
}

export default DeleteUser
