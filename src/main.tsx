import React from 'react'
import ReactDOM from 'react-dom/client'
import '@mantine/core/styles.css'

// providers
import LangProvider from './context/lang/LangProvider'

// router and router components
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router'
import Root from './Root'
import ErrorPage from './pages/Error'
import Cards from './pages/Cards'
import About from './pages/About'
import ControlPanel from './pages/ControlPanel'
import Login from './pages/Login'

// loaders and actions
import {
    // users
    getLocalUser, updateTokenAndUserAction, localUserAction,

    // cards
    getCards, favoritesLoader, mycardsLoader, cardAction, cardLoader,

    protectLoader
} from './loadersActions'
import Profile from './pages/Profile'
import Register from './pages/Register'
import CreateCard from './pages/CreateCard'
import CardDetails from './pages/CardDetails'

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route loader={getLocalUser} id="root" path="/" element={<Root />} errorElement={<ErrorPage />} action={localUserAction}>

                {/* For downstream errors, wrapping in a pathless route with ErrorPage renders the error page in the Root's Outlet, instead of replacing the entire Root */}
                {/* https://reactrouter.com/en/main/start/tutorial#pathless-routes */}
                <Route errorElement={<ErrorPage />}>
                    <Route path="about" element={<About />} />
                    <Route path="control-panel" element={<ControlPanel />} loader={protectLoader('admin')} />
                    <Route path="profile" element={<Profile />} loader={protectLoader('user')} />
                    <Route path="register" element={<Register />} />
                    <Route path="login" element={<Login />} />

                    <Route index element={<Cards />} loader={getCards} />

                    <Route path="cards" action={cardAction} id="cards">
                        <Route index element={<Cards />} loader={getCards} />

                        <Route path="favorites" element={<Cards />} loader={protectLoader('user', favoritesLoader)} />
                        <Route path="my" element={<Cards />} loader={protectLoader('business', mycardsLoader)} />
                        <Route path="create" element={<CreateCard />} loader={protectLoader('business')} />
                        {/* <Route path="edit/:id" element={<EditCard />} loader={protectLoader(['business', 'admin'])} /> */}
                        <Route path=":id" element={<CardDetails />} loader={cardLoader} />
                    </Route>
                </Route>
            </Route>
            <Route path="/logout" action={updateTokenAndUserAction} />
            <Route path="/login/:newToken" action={updateTokenAndUserAction} />
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
