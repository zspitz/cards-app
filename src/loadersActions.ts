import { ActionFunctionArgs, LoaderFunction, LoaderFunctionArgs, redirect } from 'react-router-dom'
import authProvider from './services/authProvider'
import { Role, UserResponse } from './types'
import { getRoles } from './shared'

// Loaders/actions that don't depend on authProvider

const cardsLoader = () => 'Cards'
const favoritesLoader = () => 'Favorites'
const mycardsLoader = () => 'My cards'
export type CardsLoaderReturnData = string // TODO

// Loaders/actions that depend on authProvider

const { getLocalUser, setLocalUser, updateTokenAndUser } = await authProvider()

// const redirectToLogin = ({ request }: LoaderFunctionArgs) => {
//     const params = new URLSearchParams()
//     params.set('from', new URL(request.url).pathname)
//     return redirect('/login?' + params.toString())
// }

const updateTokenAndUserAction = async ({ params }: ActionFunctionArgs) => {
    await updateTokenAndUser(params.newToken)
    // TODO get previous page from Login/logout; try to redirect to that original page
    return redirect('/')
}

const localUserAction = async ({ request }: ActionFunctionArgs) => {
    const userResponse = (await request.json()) as UserResponse
    if (request.method !== 'DELETE') {
        setLocalUser(userResponse)
        return { ok: true }
    }

    if (userResponse._id !== getLocalUser()?._id) {
        return { ok: true }
    }
    updateTokenAndUser(undefined)
    return redirect('/')
}

const protectLoader = (role: Role, loader?: LoaderFunction) =>
    (args: LoaderFunctionArgs) => {
        const user = getLocalUser()
        const roles = getRoles(user)

        if (!roles.includes(role)) {
            const redirectUrl = user ?
                '/' :
                '/login'
            return redirect(redirectUrl)
        }

        if (loader) {
            return loader(args)
        }

        return true
    }

export {
    getLocalUser,
    updateTokenAndUserAction,
    localUserAction,

    cardsLoader,
    mycardsLoader,
    favoritesLoader,

    protectLoader
}
