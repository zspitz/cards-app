import { ActionFunctionArgs, LoaderFunctionArgs, redirect } from 'react-router-dom'
import authProvider from './services/authProvider'
import * as users from './services/http/users'

const redirectToLogin = ({ request }: LoaderFunctionArgs) => {
    const params = new URLSearchParams()
    params.set('from', new URL(request.url).pathname)
    return redirect('/login?' + params.toString())
}

// Loaders/actions that don't depend on authProvider

const profileLoader = async (args: LoaderFunctionArgs) => {
    const user = await users.getCurrent()
    if (user) { return user }
    return redirectToLogin(args)
}
export type ProfileLoaderReturnData = Exclude<Awaited<ReturnType<typeof profileLoader>>, Response>

const cardsLoader = () => 'Cards'
const favoritesLoader = () => 'Favorites'
const mycardsLoader = () => 'My cards'
export type CardsLoaderReturnData = string // TODO

// Loaders/actions that depend on authProvider

const { getStoredUser, logout, reloadStoredUser } = await authProvider()

const logoutAction = () => {
    logout()
    // TODO when logging out, try to return to current page
    return redirect('/')
}

// TODO often when this action is triggered, it's after some response with the updated user
// As is, the action currently makes another call to the server
// Instead, the action should receive the new user as a parameter (?) and reload using the new user object with fresh data
const reloadUserAction = async ({ params }: ActionFunctionArgs) => {
    await reloadStoredUser(params.newToken)
    // TODO get source page from Login; redirect to that original page
    return redirect('/')
}

export {
    logoutAction,
    reloadUserAction,
    getStoredUser,
    profileLoader,
    cardsLoader,
    mycardsLoader,
    favoritesLoader
}
