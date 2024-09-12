import React from 'react'
import ReactDOM from 'react-dom/client'
import '@mantine/core/styles.css'

// providers
import LangProvider from './context/lang/LangProvider'

// router and router components
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Root from './Root'
import ErrorPage from './pages/Error'
import Cards from './pages/Cards'
import About from './pages/About'
import ControlPanel from './pages/ControlPanel'
import Login from './pages/Login'

// loaders and actions
import {
    // users
    getStoredUser, reloadUserAction, logoutAction,

    // profile
    profileLoader,

    // cards
    cardsLoader, favoritesLoader, mycardsLoader,
    registerAction
} from './loadersActions'
import Profile from './pages/Profile'
import Register from './pages/Register'

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
                    <Route path="profile" element={<Profile />} loader={profileLoader} action={reloadUserAction} />
                    <Route path="register" element={<Register />} />
                    <Route path="login/:newToken?" element={<Login />} action={registerAction} />
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
