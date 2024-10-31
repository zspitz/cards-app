import { useLang } from '../../context/lang/useLang'
import { toggleIsBusinessFetchArgs } from '../../services/http/users'
import { MdCheckBox, MdIndeterminateCheckBox } from 'react-icons/md'
import ActionButton, { ActionButtonProps } from '../ActionButton'
import { UserResponse } from '../../types'

type Props = {
    user: UserResponse
}

const ToggleIsBusiness = ({ user: { _id, isBusiness } }: Props) => {
    const { t } = useLang()
    const actionButtonProps: ActionButtonProps = {
        _id,
        fetchArgsGetter: toggleIsBusinessFetchArgs,
        actionErrorKey: 'Can\'t toggle isBusiness',
        reactRouterMethod: 'put',
        buttonProps: {
            leftSection: isBusiness ? <MdCheckBox /> : <MdIndeterminateCheckBox />,
            children: t('Toggle isBusiness')
        }
    }

    return (
        <ActionButton {...actionButtonProps} />
    )
}

export default ToggleIsBusiness
