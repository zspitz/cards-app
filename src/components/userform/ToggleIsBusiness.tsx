import { useLang } from '../../context/lang/useLang'
import { toggleIsBusinessFetchArgs } from '../../services/http/users'
import { MdCheckBox, MdIndeterminateCheckBox } from 'react-icons/md'
import type { ActionButtonProps } from '../ActionButton'
import ActionButton from '../ActionButton'
import type { UserResponse } from '../../types'

type Props = {
    user: UserResponse
}

const ToggleIsBusiness = ({ user: { _id, isBusiness } }: Props) => {
    const { t } = useLang()
    const actionButtonProps: ActionButtonProps = {
        fetchArgsGetter: () => toggleIsBusinessFetchArgs(_id),
        errorPrefixKey: 'Can\'t toggle isBusiness',
        buttonProps: {
            leftSection: isBusiness ? <MdCheckBox /> : <MdIndeterminateCheckBox />
        },
        fetcherSubmitOptions: {
            method: 'put',
            action: '/'
        }
    }

    return (
        <ActionButton {...actionButtonProps}>
            {t('Toggle isBusiness')}
        </ActionButton>
    )
}

export default ToggleIsBusiness
