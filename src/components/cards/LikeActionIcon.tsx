import { useLike } from '../../hooks/useLike'
import { TbHeart, TbHeartFilled } from 'react-icons/tb'
import { toggleLikedFetchArgs } from '../../services/http/cards'
import { useRoles } from '../../hooks/useRoles'
import ActionIconWithFeedback from '../ActionIconWithFeedback'

type Props = {
    cardId: string,
    likes: string[]
}

const LikeActionIcon = ({ likes, cardId }: Props) => {
    const { hasRole } = useRoles()
    const { isLiked } = useLike()

    if (!hasRole('user')) { return <></> }

    return (
        <ActionIconWithFeedback
            errorPrefixKey='Unable to toggle like'
            fetchArgsGetter={() => toggleLikedFetchArgs(cardId)}
            fetcherSubmitOptions={{
                method: 'put',
                action: '/cards',
                encType: 'application/json'
            }}
        >
            {isLiked(likes) ?
                <TbHeartFilled color="#e33bc4" /> :
                <TbHeart color="#e33bc4" />}
        </ActionIconWithFeedback>
    )
}

export default LikeActionIcon
