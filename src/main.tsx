import React from 'react'
import ReactDOM from 'react-dom/client'
import '@mantine/core/styles.css'
import LangProvider from './context/lang/LangProvider'
import Root from './Root'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import ErrorPage from './pages/Error'
import Cards, { cardsLoader, favoritesLoader, mycardsLoader } from './pages/Cards'
import About from './pages/About'
import ControlPanel from './pages/ControlPanel'
import { getCurrentUser } from './services/users'
import Profile, { profileLoader, registrationLoader } from './pages/Profile'
import Login from './pages/Login'
import { logoutAction } from './components/NavParts'

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route loader={getCurrentUser} id="root" path="/" element={<Root />} errorElement={<ErrorPage />}>
                <Route errorElement={<ErrorPage />}>
                    <Route index element={<Cards />} loader={cardsLoader} />
                    <Route path="cards" element={<Cards />} loader={cardsLoader} />
                    <Route path="favorites" element={<Cards />} loader={favoritesLoader} />
                    <Route path="my-cards" element={<Cards />} loader={mycardsLoader} />
                    <Route path="about" element={<About />} />
                    <Route path="control-panel" element={<ControlPanel />} />
                    <Route path="profile" element={<Profile />} loader={profileLoader} />
                    {/* <Route path="logout" element={<ControlPanel />} /> */}
                    <Route path="register" element={<Profile />} loader={registrationLoader} />
                    <Route path="login" element={<Login />} />
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
