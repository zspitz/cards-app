import { Button, ButtonProps, InputError, Stack } from '@mantine/core'
import { useFetch } from '../hooks/useFetch'
import { useFetcher } from 'react-router-dom'
import { useLang } from '../context/lang/useLang'
import { FetchArgs, UserResponse } from '../types'
import { HTMLFormMethod } from '@remix-run/router/utils'

export type ActionButtonProps = {
    _id: string,
    fetchArgsGetter: (_id: string) => FetchArgs,
    actionErrorKey: string,
    reactRouterMethod: HTMLFormMethod,
    buttonProps: Omit<ButtonProps, 'loading' | 'onClick'>
}

const ActionButton = ({ _id, fetchArgsGetter, actionErrorKey, reactRouterMethod: method, buttonProps }: ActionButtonProps) => {
    const { t } = useLang()
    const { loading, error, runFetch } = useFetch()
    const fetcher = useFetcher()

    const handler = async () => {
        const { url, init } = fetchArgsGetter(_id)
        const response = (await runFetch(url, init)) as UserResponse | undefined
        if (!response) { return }
        fetcher.submit(response, {
            method,
            action: '/',
            encType: 'application/json'
        })
    }

    return (
        <Stack align="flex-start">
            <Button {...buttonProps} loading={loading} onClick={() => handler()} />
            {
                error &&
                <InputError>
                    {t(actionErrorKey)}<br />
                    {error.message}
                </InputError>
            }
        </Stack>

    )
}

export default ActionButton
