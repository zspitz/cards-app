import { ActionIcon, InputError, Popover } from '@mantine/core'
import { useLike } from '../../hooks/useLike'
import { TbHeart, TbHeartFilled } from 'react-icons/tb'
import { useLang } from '../../context/lang/useLang'
import { useFetch } from '../../hooks/useFetch'
import { toggleLikedFetchArgs } from '../../services/http/cards'
import { useRoles } from '../../hooks/useRoles'
import { useFetcher } from 'react-router-dom'
import { useEffect } from 'react'
import { SubmitTarget } from 'react-router-dom/dist/dom'

type Props = {
    cardId: string,
    likes: string[]
}

const LikeActionIcon = ({ likes, cardId }: Props) => {
    const { t } = useLang()
    const { loading, error, runFetch, clearError } = useFetch()
    const { hasRole } = useRoles()
    const { isLiked } = useLike()
    const fetcher = useFetcher()

    const clickHandler = async () => {
        const { url, init } = toggleLikedFetchArgs(cardId)
        const response = (await runFetch(url, init)) as SubmitTarget
        if (!response) { return }
        fetcher.submit(response, {
            method: 'put',
            action: '/cards',
            encType: 'application/json'
        })
    }

    useEffect(() => {
        if (!error) { return }
        const intervalId = setInterval(() => {
            clearError()
        }, 3000)
        return () => clearInterval(intervalId)
    }, [error, clearError])

    if (!hasRole('user')) { return <></> }

    return (
        <Popover opened={!!error} trapFocus={true} withArrow>
            <Popover.Target>
                <ActionIcon variant="transparent" loading={loading} onClick={clickHandler}>
                    {isLiked(likes) ?
                        <TbHeartFilled color="#e33bc4" /> :
                        <TbHeart color="#e33bc4" />}
                </ActionIcon>
            </Popover.Target>
            <Popover.Dropdown>
                {
                    error &&
                    <InputError>
                        {t('Unable to toggle like')}<br />
                        {error.message}
                    </InputError>
                }
            </Popover.Dropdown>
        </Popover>
    )
}

export default LikeActionIcon
