/*
Mantine provides a useFetch hook: https://mantine.dev/hooks/use-fetch/
https://github.com/mantinedev/mantine/blob/master/packages/%40mantine/hooks/src/use-fetch/use-fetch.ts#L26
But it seems to only handle a JSON response.
For the monkfish server, if invalid data is passed, the server will return successfully, if with an HTTP error code.
But no exception would be raised.
Mantine's useFetch would then try to parse as JSON which would throw an error about unparseable JSON

This is a modified version of the hook with the following modifications:
- Treats anything other than response.ok as an error, using the text as the error message
- Uses async/await syntax instead of Promise callbacks
- Defaults autoInvoke to false
- Handles null for options, which happens when no token exists
*/

import { useCallback, useEffect, useRef, useState } from 'react'

export interface UseFetchOptions extends RequestInit {
    autoInvoke?: boolean;
}

export const useFetch = <T>(url: string, options: UseFetchOptions | null = {}) => {
    const autoInvoke = options?.autoInvoke ?? false

    const [data, setData] = useState<T | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)
    const controller = useRef<AbortController | null>(null)

    const refetch = useCallback(async () => {
        if (!url || !options) { return }
        if (controller.current) {
            controller.current.abort()
        }
        controller.current = new AbortController()

        setLoading(true)

        try {
            const res = await fetch(url, { signal: controller.current.signal, ...options })
            if (!res.ok) {
                setLoading(false)
                setError(new Error(await res.text()))
                return
            }
            const resData = await res.json() as T
            setData(resData)
            setLoading(false)
            return resData
        } catch (err) {
            setLoading(false)
            if (!(err instanceof Error)) {
                throw new Error(JSON.stringify(err))
            }
            if (err.name !== 'AbortError') {
                setError(err)
            }
            return err
        }
    }, [url])

    const abort = useCallback(() => {
        controller.current?.abort('')
    }, [])

    useEffect(() => {
        if (autoInvoke) { refetch() }

        return () => controller.current?.abort('')
    }, [refetch, autoInvoke])

    return { data, loading, error, refetch, abort }
}
