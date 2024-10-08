import { FlexProps } from '@mantine/core'
import { Role, UserResponse } from './types'

export const getRoles = (user: UserResponse | null) => {
    const roles: Role[] = []
    if (user) {
        roles.push('user')
        if (user.isBusiness) { roles.push('business') }
        if (user.isAdmin) { roles.push('admin') }
    } else {
        roles.push('guest')
    }
    return roles
}

export const flexProps: FlexProps = {
    direction: { base: 'column', sm: 'row' },
    gap: 15
}
