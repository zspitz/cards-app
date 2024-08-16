import { getCurrentUser, tokenKey } from './http/users'

export default async () => {
    let user = await getCurrentUser()

    const getStoredUser = () => user
    const logout = () => {
        localStorage.removeItem(tokenKey)
        user = null
    }
    const reloadStoredUser = async (token?: string) => {
        const receivedUser = await getCurrentUser()
        if (token && receivedUser) {
            // only update localstorage if token has been received, and server recognizes the token
            localStorage.setItem(tokenKey, token)
        }
        user = receivedUser
    }

    return {
        getStoredUser,
        logout,
        reloadStoredUser
    }
}
