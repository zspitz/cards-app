/*
Mantine provides a useFetch hook: https://mantine.dev/hooks/use-fetch/
https://github.com/mantinedev/mantine/blob/master/packages/%40mantine/hooks/src/use-fetch/use-fetch.ts#L26
But it seems to only handle a JSON response.
For the monkfish server, if invalid data is passed, the server will return successfully, if with an HTTP error code.
But no exception would be raised.
Mantine's useFetch would then try to parse as JSON which would throw an error about unparseable JSON

This is a modified version of the hook with the following modifications:
- Treats !response.ok, or text when JSON expected, as an error
- Uses async/await syntax instead of Promise callbacks
- Handles null for options, which happens when a token is required but doesn't exist
- hook doesn't run fetch automatically, but returns a function that initiates the fetch when possible.
*/

import { useCallback, useRef, useState } from 'react'
import { parseHeaders } from '../util'

const hasJsonContentType = (headers: HeadersInit) => {
    const entries = parseHeaders(headers)
    return entries.some(([name, value]) => name === 'content-type' && value.includes('application/json'))
}

export const useFetch = () => {
    const [data, setData] = useState<unknown>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)
    const controller = useRef<AbortController | null>(null)

    const runFetch = useCallback(async (url: string, options?: RequestInit | null) => {
        if (!url || options === null) { return }

        controller.current?.abort()
        controller.current = new AbortController()

        setLoading(true)
        setError(null)

        try {
            const res = await fetch(url, { ...options, signal: controller.current.signal })
            const text = await res.text()

            if (!res.ok) {
                setLoading(false)
                setError(new Error(text))
                return
            }

            const resData: unknown =
                hasJsonContentType(res.headers) ?
                    JSON.parse(text) :
                    text
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
        }
    }, [])

    const abort = useCallback(() => {
        controller.current?.abort('')
    }, [])

    const clearError = useCallback(() => {
        setError(null)
    }, [])

    return { data, loading, error, runFetch, abort, clearError }
}
