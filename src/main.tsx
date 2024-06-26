import React from 'react'
import ReactDOM from 'react-dom/client'
import '@mantine/core/styles.css'
import LangProvider from './context/lang/LangProvider'
import Root from './Root'
// import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
// import Home from './pages/Home'
// import ErrorPage from './pages/Error'

// const router = createBrowserRouter(
//     createRoutesFromElements(
//         <Route path="/" element={<Home />} errorElement={<ErrorPage />}>
//         </Route>
//     )
// )

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <LangProvider>
            <Root />
        </LangProvider>
    </React.StrictMode>
)
