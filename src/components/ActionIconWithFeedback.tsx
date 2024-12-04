import { useLang } from '../context/lang/useLang'
import { FetchArgs } from '../types'
import { FetcherSubmitOptions, SubmitTarget } from 'react-router'
import { MouseEventHandler, PropsWithChildren, useEffect } from 'react'
import { ActionIcon, InputError, Popover } from '@mantine/core'
import { useFetch } from '../hooks/useFetch'
import { useFetcher } from 'react-router'

type Props = {
    fetchArgsGetter: () => FetchArgs,
    fetcherSubmitOptions: FetcherSubmitOptions,
    errorPrefixKey: string
}

const ActionIconWithFeedback = ({ fetchArgsGetter, fetcherSubmitOptions, children, errorPrefixKey }: PropsWithChildren<Props>) => {
    const { t } = useLang()
    const { loading, error, runFetch, clearError } = useFetch()
    const fetcher = useFetcher()

    const clickHandler: MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault()
        const { url, init } = fetchArgsGetter()
        const response = (await runFetch(url, init)) as SubmitTarget
        if (!response) { return }
        fetcher.submit(response, {
            encType: 'application/json',
            ...fetcherSubmitOptions
        })
    }

    useEffect(() => {
        if (!error) { return }
        const intervalId = setInterval(() => {
            clearError()
        }, 3000)
        return () => clearInterval(intervalId)
    }, [error, clearError])

    return (
        <Popover opened={!!error} trapFocus={true} withArrow>
            <Popover.Target>
                <ActionIcon variant="transparent" loading={loading} onClick={clickHandler}>
                    {children}
                </ActionIcon>
            </Popover.Target>
            <Popover.Dropdown>
                {
                    error &&
                    <InputError>
                        {t(errorPrefixKey)}<br />
                        {error.message}
                    </InputError>
                }
            </Popover.Dropdown>
        </Popover>
    )
}

export default ActionIconWithFeedback
