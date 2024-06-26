import { DirectionProvider, MantineProvider } from '@mantine/core'
import { useLang } from './context/lang/useLang'
import Home from './pages/Home'

const Root = () => {
    const { dir } = useLang()
    return (
        <DirectionProvider initialDirection={dir}>
            <MantineProvider>
                <Home />
            </MantineProvider>
        </DirectionProvider>
    )
}

export default Root