import type { UserResponse } from '../types'
import { getCurrent } from './http/users'
import { tokenKey } from './http/shared'

export default async () => {
    let user = await getCurrent()

    const getLocalUser = () => user
    const setLocalUser = (newUser: UserResponse) => user = newUser

    const updateTokenAndUser = async (newToken: string | undefined) => {
        if (!newToken) {
            localStorage.removeItem(tokenKey)
            user = null
            return
        }
        localStorage.setItem(tokenKey, newToken)
        user = await getCurrent()
    }

    return {
        getLocalUser,
        setLocalUser,
        updateTokenAndUser
    }
}
