import { TbMoon, TbSun } from 'react-icons/tb'
import { ActionIcon, Flex, useComputedColorScheme, useMantineColorScheme } from '@mantine/core'
import { NavLink } from 'react-router-dom'
import LangSelector from './LangSelector'

type Props = {
    useIn: 'header' | 'navigation'
}

const linkData = [
    { to: 'cards', label: 'Cards' },
    { to: 'favorites', label: 'Favorites' },
    { to: 'my-cards', label: 'My cards' },
    { to: 'sandbox', label: 'Sandbox' },
    { to: 'about', label: 'About' }
]

const NavParts = ({ useIn }: Props) => {
    const { setColorScheme } = useMantineColorScheme()
    const colorScheme = useComputedColorScheme()

    const props =
        useIn === 'header' ?
            { direction: 'row' as const, visibleFrom: 'sm' } :
            { direction: 'column' as const }

    return (
        <>
            <Flex {...props}>
                {linkData.map(x => (
                    <NavLink to={`/${x.to}`} key={x.to}>{x.label}</NavLink>
                ))}
            </Flex>
            <Flex {...props}>
                <ActionIcon onClick={() => setColorScheme(colorScheme == 'light' ? 'dark' : 'light')}>
                    {colorScheme === 'dark' ? <TbSun /> : <TbMoon />}
                </ActionIcon>
                <LangSelector />

            </Flex>
        </>
    )
}

export default NavParts