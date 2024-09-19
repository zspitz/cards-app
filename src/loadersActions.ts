import { ActionFunctionArgs, LoaderFunction, LoaderFunctionArgs, redirect } from 'react-router-dom'
import authProvider from './services/authProvider'
import { CardResponse, Role, UserResponse } from './types'
import { getRoles } from './shared'
import { deleteCard, getCards, upsertCard } from './services/cardsProvider'
import { hasIntersection } from './util'

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

const protectLoader = (validRoles: Role[] | Role, loader?: LoaderFunction) => {
    if (!Array.isArray(validRoles)) {
        validRoles = [validRoles]
    }
    return (args: LoaderFunctionArgs) => {
        const user = getLocalUser()
        const roles = getRoles(user)

        if (!hasIntersection(roles, validRoles)) {
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
}

// cards provider loaders and actions

const favoritesLoader = async () => {
    const user = getLocalUser()
    if (!user) { return [] }
    return (
        await getCards()
    ).filter(x => x.likes.includes(user._id))
}
const mycardsLoader = async () => {
    const user = getLocalUser()
    if (!user) { return [] }
    return (
        await getCards()
    ).filter(x => x.user_id === user._id)
}
export type CardsLoaderReturnData = Awaited<ReturnType<typeof getCards>>

const cardAction = async ({ request }: ActionFunctionArgs) => {
    const cardResponse = (await request.json()) as CardResponse
    if (request.method === 'DELETE') {
        await deleteCard(cardResponse)
    } else {
        await upsertCard(cardResponse)
    }
    return { ok: true }
}

export {
    getLocalUser,
    updateTokenAndUserAction,
    localUserAction,

    getCards,
    mycardsLoader,
    favoritesLoader,
    cardAction,

    protectLoader
}
