import { TbMoon, TbSun } from 'react-icons/tb'
import { ActionIcon, Anchor, AppShell, Flex, Group, useComputedColorScheme, useMantineColorScheme } from '@mantine/core'
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

    const [direction, visibleFrom, gap] =
        useIn === 'header' ?
            ['row' as const, 'sm', 20] :
            ['column' as const, undefined, 10]

    const linksFlex = (
        <Flex direction={direction} visibleFrom={visibleFrom} gap={gap}>
            {linkData.map(x => (
                <Anchor key={x.to} renderRoot={({ ...others }) => (
                    <Link to={`/${x.to}`} key={x.to} {...others}>{x.label}</Link>
                )} />
            ))}
        </Flex>
    )

    return (
        <>
            {
                useIn === 'header' ? linksFlex : <AppShell.Section grow>{linksFlex}</AppShell.Section>
            }
            <Group gap={0} visibleFrom={visibleFrom}>
                <ActionIcon onClick={() => setColorScheme(colorScheme == 'light' ? 'dark' : 'light')} variant="default">
                    {colorScheme === 'dark' ? <TbSun /> : <TbMoon />}
                </ActionIcon>
                <LangSelector />
            </Group>
        </>
    )
}

export default NavParts