import { TbMoon, TbSun } from 'react-icons/tb'
import { ActionIcon, Tooltip, useComputedColorScheme, useMantineColorScheme } from '@mantine/core'
import { useLang } from '../../context/lang/useLang'

const ThemeSelector = () => {
    const { t } = useLang()
    const { setColorScheme } = useMantineColorScheme()
    const colorScheme = useComputedColorScheme()

    return (
        <Tooltip label={colorScheme === 'dark' ? t('Light theme') : t('Dark theme')}>
            <ActionIcon onClick={() => setColorScheme(colorScheme == 'light' ? 'dark' : 'light')} variant="default">
                {colorScheme === 'dark' ? <TbSun /> : <TbMoon />}
            </ActionIcon>
        </Tooltip>
    )
}

export default ThemeSelector
