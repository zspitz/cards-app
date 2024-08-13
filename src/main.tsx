import React from 'react'
import ReactDOM from 'react-dom/client'
import '@mantine/core/styles.css'
import LangProvider from './context/lang/LangProvider'
import Root from './Root'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import ErrorPage from './pages/Error'
import Cards, { loadCards, loadFavorites, loadMyCards } from './pages/Cards'
import About from './pages/About'
import ControlPanel from './pages/ControlPanel'
import { getCurrentUser } from './http/users'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route loader={getCurrentUser} id="root" path="/" element={<Root />} errorElement={<ErrorPage />}>
            <Route errorElement={<ErrorPage />}>
                <Route index element={<Cards />} loader={loadCards} />
                <Route path="cards" element={<Cards />} loader={loadCards} />
                <Route path="favorites" element={<Cards />} loader={loadFavorites} />
                <Route path="my-cards" element={<Cards />} loader={loadMyCards} />
                <Route path="about" element={<About />} />
                <Route path="control-panel" element={<ControlPanel />} />
            </Route>
        </Route>
    )
)

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <LangProvider>
            <RouterProvider router={router} />
        </LangProvider>
    </React.StrictMode>
)
