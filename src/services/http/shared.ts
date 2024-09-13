export const baseUrl = import.meta.env.VITE_API_BASEURL as string

export const tokenKey = 'token'

export const getInit = (withToken = false, body?: object, method?: string) => {
    const init: RequestInit = {}
    const headers: HeadersInit = {}
    init.headers = headers

    if (withToken) {
        const token = localStorage.getItem(tokenKey)
        if (!token) { return null }
        headers['x-auth-token'] = token
    }
    if (body) {
        init.body = JSON.stringify(body)
        headers['content-type'] = 'application/json'
        init.method = method ?? 'POST'
    } else {
        init.method = method ?? 'GET'
    }

    return init
}
