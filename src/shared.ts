import type { FlexProps } from '@mantine/core'
import type { Address, Role, UserResponse } from './types'

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

export const formatAddress = ({ street, houseNumber, city, state, country, zip }: Address) => {
    const parts: string[] = []
    if (street !== 'n/a') { parts.push(`${street} ${houseNumber}`) }
    // TODO use filter and a type guard function - https://stackoverflow.com/a/70927747/111794
    for (const x of [city, state, country]) {
        if (!x || x === 'n/a/') { continue }
        parts.push(x)
    }
    if (zip !== 0) { parts.push(`${zip}`) }
    return parts.join(', ')
}
