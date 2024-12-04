import { useRouteLoaderData } from 'react-router'
import { Role, UserResponse } from '../types'
import { getRoles } from '../shared'
import { hasIntersection } from '../util'

export const useRoles = () => {
    const user = useRouteLoaderData('root') as UserResponse | null
    const userRoles = getRoles(user)

    const hasRole = (...roles: Role[]) =>
        hasIntersection(userRoles, roles)

    const isOwner = (ownerId: string) =>
        userRoles.includes('business') && ownerId === user?._id

    return {
        hasRole,
        isOwner
    }
}
