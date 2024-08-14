import { LoaderFunctionArgs, redirect } from 'react-router-dom'
import { Role, User } from './http/types'

export const getRoles = (user: User | null) => {
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

export const redirectToLogin = ({ request }: LoaderFunctionArgs) => {
    const params = new URLSearchParams()
    params.set('from', new URL(request.url).pathname)
    return redirect('/login?' + params.toString())
}
