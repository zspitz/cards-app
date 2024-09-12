import { Button, InputError, Stack } from '@mantine/core'
import { useLang } from '../context/lang/useLang'
import { useFetcher } from 'react-router-dom'
import { deleteUserFetchArgs } from '../services/http/users'
import { useFetch } from '../hooks/useFetch'
import { UserResponse } from '../types'

type Props = {
    user: UserResponse
}

const DeleteUser = ({ user: { _id } }: Props) => {
    const { t } = useLang()
    const { loading, error, runFetch } = useFetch()

    const fetcher = useFetcher()

    const handleDelete = async () => {
        const { url, init } = deleteUserFetchArgs(_id)
        const response = (await runFetch(url, init)) as UserResponse | undefined
        if (!response) { return }
        fetcher.submit(null, {
            method: 'put',
            action: '/logout'
        })
    }

    return (
        <Stack align="flex-start">
            <Button loading={loading} color="red" onClick={() => handleDelete()}>{t('Delete user')}</Button>
            {
                error &&
                <InputError>
                    {t('Can\'t delete user')}<br />
                    {error.message}
                </InputError>
            }
        </Stack>
    )
}

export default DeleteUser
