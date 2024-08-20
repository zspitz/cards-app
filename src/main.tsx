import React from 'react'
import ReactDOM from 'react-dom/client'
import '@mantine/core/styles.css'

// providers
import LangProvider from './context/lang/LangProvider'
import authProvider from './services/authProvider'

// router and router components
import { ActionFunctionArgs, Route, RouterProvider, createBrowserRouter, createRoutesFromElements, redirect } from 'react-router-dom'
import Root from './Root'
import ErrorPage from './pages/Error'
import Cards, { cardsLoader, favoritesLoader, mycardsLoader } from './pages/Cards'
import About from './pages/About'
import ControlPanel from './pages/ControlPanel'
import Profile, { profileLoader, registrationLoader } from './pages/Profile'
import Login from './pages/Login'

const { getStoredUser, logout, reloadStoredUser } = await authProvider()

const logoutAction = () => {
    logout()
    // TODO when logging out, try to return to current page
    return redirect('/')
}
const reloadAction = async ({ params }: ActionFunctionArgs) => {
    await reloadStoredUser(params.newToken)
    // TODO get source page from Login; redirect to that original page
    return redirect('/')
}

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route loader={getStoredUser} id="root" path="/" element={<Root />} errorElement={<ErrorPage />}>

                {/* For downstream errors, wrapping in a pathless route with ErrorPage renders the error page in the Root's Outlet, instead of replacing the entire Root */}
                {/* https://reactrouter.com/en/main/start/tutorial#pathless-routes */}
                <Route errorElement={<ErrorPage />}>

                    <Route index element={<Cards />} loader={cardsLoader} />
                    <Route path="cards" element={<Cards />} loader={cardsLoader} />
                    <Route path="favorites" element={<Cards />} loader={favoritesLoader} />
                    <Route path="my-cards" element={<Cards />} loader={mycardsLoader} />
                    <Route path="about" element={<About />} />
                    <Route path="control-panel" element={<ControlPanel />} />
                    <Route path="profile" element={<Profile />} loader={profileLoader} action={reloadAction} />
                    <Route path="register" element={<Profile />} loader={registrationLoader} />
                    <Route path="login/:newToken?" element={<Login />} action={reloadAction} />
                </Route>
            </Route>
            <Route path="/logout" action={logoutAction} />
        </>
    )
)

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <LangProvider>
            <RouterProvider router={router} />
        </LangProvider>
    </React.StrictMode>
)
