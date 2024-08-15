import { getCurrentUser, tokenKey } from './http/users'

export default async () => {
    let user = await getCurrentUser()

    const getStoredUser = () => user
    const logout = () => {
        localStorage.removeItem(tokenKey)
        user = null
    }
    const reloadStoredUser = async (token?: string) => {
        if (token) {
            localStorage.setItem(tokenKey, token)
        }
        user = await getCurrentUser()
    }

    // TODO function for logging in, which calls users.login, and updates local user if successful

    return {
        getStoredUser,
        logout,
        reloadStoredUser
    }
}
