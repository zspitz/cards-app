import { jwtDecode } from 'jwt-decode'
import { User } from './types'

const baseUrl = 'https://monkfish-app-z9uza.ondigitalocean.app/bcard2'

const tokenKey = 'token'

const getInit = (): RequestInit | undefined => {
    const token = localStorage.getItem(tokenKey)
    if (!token) { return undefined }
    return ({
        headers: {
            'x-auth-token': token
        }
    })
}

export const getCurrentUser = async () => {
    const token = localStorage.getItem(tokenKey)
    if (!token) { return null }
    let _id: string
    try {
        ({ _id } = jwtDecode(token))
    } catch (error) {
        return null
    }

    // The api for getting a specific user requires the user id
    // The only way to access that is via parsing the existing token
    return await getById(_id)
}

const getById = async (_id: string) => {
    if (!_id) { return null }
    const init = getInit()
    if (!init) { return null }
    const response = await fetch(`${baseUrl}/users/${_id}`, init)
    if (!response.ok) {
        return null
    }
    return await response.json() as User
}