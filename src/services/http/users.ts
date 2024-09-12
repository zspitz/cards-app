import { jwtDecode } from 'jwt-decode'
import { FetchArgs, Login, UserPost, UserPut, UserResponse } from '../../types'

const baseUrl = import.meta.env.VITE_API_BASEURL as string

export const tokenKey = 'token'

const getInit = (withToken = false, body?: object, method?: string) => {
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

export const getCurrent = async () => {
    const token = localStorage.getItem(tokenKey)
    if (!token) { return null }

    // The api for getting a specific user requires the user id
    // The only way to access that is via parsing the existing token
    let _id: string
    try {
        ({ _id } = jwtDecode(token))
    } catch (error) {
        return null
    }
    return await getById(_id)
}

const getById = async (_id: string) => {
    if (!_id) { return null }
    const init = getInit(true)
    if (!init) { return null }
    const response = await fetch(`${baseUrl}/users/${_id}`, init)
    if (!response.ok) {
        return null
    }
    return await response.json() as UserResponse
}

export const loginFetchArgs = (login: Login): FetchArgs =>
({
    url: `${baseUrl}/users/login`,
    init: getInit(false, login)
})

export const profileUpdateFetchArgs = (_id: string, user: UserPut): FetchArgs => {
    return {
        url: `${baseUrl}/users/${_id}`,
        init: !_id ? null : getInit(true, user, 'put')
    }
}

export const registerFetchArgs = (user: UserPost): FetchArgs =>
({
    url: `${baseUrl}/users`,
    init: getInit(false, user)
})

export const toggleIsBusinessFetchArgs = (_id: string): FetchArgs =>
({
    url: `${baseUrl}/users/${_id}`,
    init: !_id ? null : getInit(true, undefined, 'PATCH')
})

export const deleteUserFetchArgs = (_id: string): FetchArgs =>
({
    url: `${baseUrl}/users/${_id}`,
    init: !_id ? null : getInit(true, undefined, 'DELETE')
})
