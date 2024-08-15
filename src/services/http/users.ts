import { jwtDecode } from 'jwt-decode'
import { User } from './types'

const baseUrl = 'https://monkfish-app-z9uza.ondigitalocean.app/bcard2'

export const tokenKey = 'token'

const getInit = (withToken = false, body?: object) => {
    const init: RequestInit = {}
    const headers: HeadersInit = {}
    init.headers = headers

    if (withToken) {
        const token = localStorage.getItem(tokenKey)
        if (!token) { return undefined }
        headers['x-auth-token'] = token
    }
    if (body) {
        init.body = JSON.stringify(body)
        headers['content-type'] = 'application/json'
        init.method = 'POST'
    }

    return init
}

export const getCurrentUser = async () => {
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
    return await response.json() as User
}

export const login = async (email: string, password: string) => {
    if (!email || !password) {
        return { message: 'Missing username or password.' }
    }
    const response = await fetch(`${baseUrl}/users/login`, getInit(false, {
        email,
        password
    }))
    const text = await response.text()
    if (!response.ok) {
        return { message: text }
    }
    return text
}
