import { Role, User } from './http/types'

export const getRoles = (user: User | null): Role[] => {
    const roles: Role[] = []
    if (user) {
        roles.push('user')
        if (user.isBusiness) { roles.push('business') }
        if (user.isAdmin) { roles.push('admin') }
    }
    return roles
}
