import { Button, InputError, Stack } from '@mantine/core'
import { useLang } from '../context/lang/useLang'
import { ProfileLoaderReturnData } from '../loadersActions'
import { useFetcher } from 'react-router-dom'
import { deleteUserFetchArgs } from '../services/http/users'
import { useFetch } from '../hooks/useFetch'

type Props = {
    user: ProfileLoaderReturnData
}

const DeleteUser = ({ user: { _id } }: Props) => {
    const { t } = useLang()
    const { loading, error, runFetch } = useFetch()

    const fetcher = useFetcher()

    const handleDelete = async () => {
        const { url, init } = deleteUserFetchArgs(_id)
        const response = (await runFetch(url, init)) as ProfileLoaderReturnData | undefined
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
