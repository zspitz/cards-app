import { getCurrent, tokenKey } from './http/users'

export default async () => {
    let user = await getCurrent()

    const getStoredUser = () => user
    const logout = () => {
        localStorage.removeItem(tokenKey)
        user = null
    }
    const reloadStoredUser = async (newToken?: string) => {
        if (newToken) {
            localStorage.setItem(tokenKey, newToken)
        }
        const receivedUser = await getCurrent()
        user = receivedUser
    }

    return {
        getStoredUser,
        logout,
        reloadStoredUser
    }
}
