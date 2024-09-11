import { Button, InputError, Stack } from '@mantine/core'
import { useLang } from '../context/lang/useLang'
import { useFetch } from '../hooks/useFetch'
import { ProfileLoaderReturnData } from '../loadersActions'
import { useFetcher } from 'react-router-dom'
import { toggleIsBusinessFetchArgs } from '../services/http/users'
import { MdCheckBox, MdIndeterminateCheckBox } from 'react-icons/md'

type Props = {
    user: ProfileLoaderReturnData
}

const ToggleIsBusiness = ({ user: { _id, isBusiness } }: Props) => {
    const { t } = useLang()
    const { loading, error, runFetch } = useFetch()

    const fetcher = useFetcher()

    const clickHandler = async () => {
        const { url, init } = toggleIsBusinessFetchArgs(_id)
        const response = (await runFetch(url, init)) as ProfileLoaderReturnData | undefined
        if (!response) { return }
        fetcher.submit(null, {
            method: 'put',
            action: '/profile'
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
