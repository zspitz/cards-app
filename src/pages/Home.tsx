import { useMantineColorScheme } from '@mantine/core'
import LangSelector from '../components/LangSelector'

const Home = () => {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme()

    return (
        <div>
            <LangSelector />
            <button onClick={toggleColorScheme}>Toggle scheme from {colorScheme}</button>
        </div>
    )
}

export default Home