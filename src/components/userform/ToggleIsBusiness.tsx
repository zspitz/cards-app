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
        fetchArgsGetter: () => toggleIsBusinessFetchArgs(_id),
        errorPrefixKey: 'Can\'t toggle isBusiness',
        buttonProps: {
            leftSection: isBusiness ? <MdCheckBox /> : <MdIndeterminateCheckBox />,
            children: t('Toggle isBusiness')
        },
        fetcherSubmitOptions: {
            method: 'put'
        }
    }

    return (
        <ActionButton {...actionButtonProps} />
    )
}

export default ToggleIsBusiness
