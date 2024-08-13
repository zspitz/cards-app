import { Role, User } from './http/types'

export const getRoles = (user: User | null): Role[] => {
    if (!user) { return ['guest'] }
    const roles: Role[] = ['user']
    if (user.isBusiness) { roles.push('business') }
    if (user.isAdmin) { roles.push('admin') }
    return roles
}

export const hasIntersection = <T>(arr1: T[], arr2: T[]) => arr1.some(x1 => arr2.includes(x1))
