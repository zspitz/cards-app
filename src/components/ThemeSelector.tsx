import { TbMoon, TbSun } from 'react-icons/tb'
import { ActionIcon, useComputedColorScheme, useMantineColorScheme } from '@mantine/core'

const ThemeSelector = () => {
    const { setColorScheme } = useMantineColorScheme()
    const colorScheme = useComputedColorScheme()

    return (
        <ActionIcon onClick={() => setColorScheme(colorScheme == 'light' ? 'dark' : 'light')} variant="default">
            {colorScheme === 'dark' ? <TbSun /> : <TbMoon />}
        </ActionIcon>
    )
}

export default ThemeSelector
