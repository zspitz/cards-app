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
        _id,
        fetchArgsGetter: deleteUserFetchArgs,
        actionErrorKey: 'Can\'t delete user',
        reactRouterMethod: 'delete',
        buttonProps: {
            color: 'red',
            children: t('Delete user')
        }
    }

    return (
        <ActionButton {...actionButtonProps} />
    )
}

export default DeleteUser
