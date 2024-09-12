import { Button, InputError, Stack } from '@mantine/core'
import { useLang } from '../context/lang/useLang'
import { useFetch } from '../hooks/useFetch'
import { useFetcher } from 'react-router-dom'
import { toggleIsBusinessFetchArgs } from '../services/http/users'
import { MdCheckBox, MdIndeterminateCheckBox } from 'react-icons/md'
import { UserResponse } from '../types'

type Props = {
    user: UserResponse
}

const ToggleIsBusiness = ({ user: { _id, isBusiness } }: Props) => {
    const { t } = useLang()
    const { loading, error, runFetch } = useFetch()

    const fetcher = useFetcher()

    const clickHandler = async () => {
        const { url, init } = toggleIsBusinessFetchArgs(_id)
        const response = (await runFetch(url, init)) as UserResponse | undefined
        if (!response) { return }
        fetcher.submit(response, {
            method: 'put',
            action: '/',
            encType: 'application/json'
        })
    }

    return (
        <Stack align="flex-start">
            <Button loading={loading} leftSection={isBusiness ? <MdCheckBox /> : <MdIndeterminateCheckBox />} onClick={() => clickHandler()}>{t('Toggle isBusiness')}</Button>
            {
                error &&
                <InputError>
                    {t('Can\'t toggle isBusiness')}<br />
                    {error.message}
                </InputError>
            }
        </Stack>
    )
}

export default ToggleIsBusiness
