import { Button, ButtonProps, InputError, Stack } from '@mantine/core'
import { useFetch } from '../hooks/useFetch'
import { useFetcher } from 'react-router-dom'
import { useLang } from '../context/lang/useLang'
import { FetchArgs, UserResponse } from '../types'
import { FetcherSubmitOptions } from 'react-router-dom/dist/dom'

export type ActionButtonProps = {
    fetchArgsGetter: () => FetchArgs,
    fetcherSubmitOptions: FetcherSubmitOptions,
    errorPrefixKey: string,
    buttonProps: Omit<ButtonProps, 'loading' | 'onClick'>,
}

const ActionButton = ({ fetchArgsGetter, errorPrefixKey, buttonProps, fetcherSubmitOptions }: ActionButtonProps) => {
    const { t } = useLang()
    const { loading, error, runFetch } = useFetch()
    const fetcher = useFetcher()

    const handler = async () => {
        const { url, init } = fetchArgsGetter()
        const response = (await runFetch(url, init)) as UserResponse | undefined
        if (!response) { return }
        fetcher.submit(response, {
            encType: 'application/json',
            action: '/',
            ...fetcherSubmitOptions
        })
    }

    return (
        <Stack align="flex-start">
            <Button {...buttonProps} loading={loading} onClick={() => handler()} />
            {
                error &&
                <InputError>
                    {t(errorPrefixKey)}<br />
                    {error.message}
                </InputError>
            }
        </Stack>

    )
}

export default ActionButton
