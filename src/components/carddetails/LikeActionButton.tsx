import { useLike } from '../../hooks/useLike'
import { TbHeart, TbHeartFilled } from 'react-icons/tb'
import { toggleLikedFetchArgs } from '../../services/http/cards'
import { useRoles } from '../../hooks/useRoles'
import ActionButton, { ActionButtonProps } from '../ActionButton'
import { useLang } from '../../context/lang/useLang'

type Props = {
    cardId: string,
    likes: string[]
}

const LikeActionButton = ({ likes, cardId }: Props) => {
    const { hasRole } = useRoles()
    const { isLiked } = useLike()
    const { t } = useLang()

    if (!hasRole('user')) { return <></> }

    const likedState = isLiked(likes)

    const actionButtonProps: ActionButtonProps = {
        fetchArgsGetter: () => toggleLikedFetchArgs(cardId),
        errorPrefixKey: 'Unable to toggle like',
        buttonProps: {
            leftSection: likedState ?
                <TbHeartFilled color="#e33bc4" /> :
                <TbHeart color="#e33bc4" />
        },
        fetcherSubmitOptions: {
            method: 'put',
            action: '/cards'
        }
    }

    return (
        <ActionButton {...actionButtonProps}>
            {t(likedState ? 'Unlike' : 'Like')}
        </ActionButton>
    )
}

export default LikeActionButton
