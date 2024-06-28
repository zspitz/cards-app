import React from 'react'
import ReactDOM from 'react-dom/client'
import '@mantine/core/styles.css'
import LangProvider from './context/lang/LangProvider'
import Root from './Root'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import ErrorPage from './pages/Error'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
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
