import { Button, ButtonProps, InputError, Stack } from '@mantine/core'
import { useFetch } from '../hooks/useFetch'
import { FetcherSubmitOptions, useFetcher, useNavigate } from 'react-router'
import { useLang } from '../context/lang/useLang'
import { FetchArgs, UserResponse } from '../types'
import { PropsWithChildren } from 'react'

// we can't combine ActionButton and ActionIconWithFeedback
// ActionButton allows customizing the button via Button props
// ActionIconWithFeedback does not

export type ActionButtonProps = {
    fetchArgsGetter: () => FetchArgs,
    fetcherSubmitOptions: FetcherSubmitOptions,
    errorPrefixKey: string,
    buttonProps: Omit<ButtonProps, 'loading' | 'onClick' | 'children'>,
    navigateTo: string
}

const ActionButton = ({ fetchArgsGetter, errorPrefixKey, buttonProps, fetcherSubmitOptions, navigateTo, children }: PropsWithChildren<ActionButtonProps>) => {
    const { t } = useLang()
    const { loading, error, runFetch } = useFetch()
    const fetcher = useFetcher()
    const navigate = useNavigate()

    const handler = async () => {
        const { url, init } = fetchArgsGetter()
        const response = (await runFetch(url, init)) as UserResponse | undefined
        if (!response) { return }
        fetcher.submit(response, {
            encType: 'application/json',
            ...fetcherSubmitOptions
        })
        if (navigateTo) {
            navigate(navigateTo)
        }
    }

    return (
        <Stack align="flex-start">
            <Button {...buttonProps} loading={loading} onClick={() => handler()}>{children}</Button>
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
