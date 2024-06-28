import { TbMoon, TbSun } from 'react-icons/tb'
import { ActionIcon, Anchor, Flex, useComputedColorScheme, useMantineColorScheme } from '@mantine/core'
import { Link } from 'react-router-dom'
import LangSelector from './LangSelector'

type Props = {
    useIn: 'header' | 'navigation'
}

const linkData = [
    { to: 'cards', label: 'Cards' },
    { to: 'favorites', label: 'Favorites' },
    { to: 'my-cards', label: 'My cards' },
    { to: 'control-panel', label: 'Control panel' },
    { to: 'about', label: 'About' }
]

const NavParts = ({ useIn }: Props) => {
    const { setColorScheme } = useMantineColorScheme()
    const colorScheme = useComputedColorScheme()

    const props =
        useIn === 'header' ?
            { direction: 'row' as const, visibleFrom: 'sm' } :
            { direction: 'column' as const }

    /*
    {({ className, ...others }) => (
            <NavLink
              className={({ isActive }) =>
                cx(className, { 'active-class': isActive })
              }
              {...others}
            />
          )}
    */

    return (
        <>
            <Flex {...props} w="auto">
                {linkData.map(x => (
                    <Anchor key={x.to} px={10} renderRoot={({ ...others }) => (
                        <Link to={`/${x.to}`} key={x.to} {...others}>{x.label}</Link>
                    )} />
                ))}
            </Flex>
            <Flex {...props}>
                <ActionIcon onClick={() => setColorScheme(colorScheme == 'light' ? 'dark' : 'light')} variant="default">
                    {colorScheme === 'dark' ? <TbSun /> : <TbMoon />}
                </ActionIcon>
                <LangSelector />

            </Flex>
        </>
    )
}

export default NavParts