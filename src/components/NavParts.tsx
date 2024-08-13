import { TbMoon, TbSun } from 'react-icons/tb'
import { ActionIcon, Anchor, AppShell, Flex, Group, useComputedColorScheme, useMantineColorScheme } from '@mantine/core'
import { Link, useRouteLoaderData } from 'react-router-dom'
import LangSelector from './LangSelector'
import { Role, User } from '../http/types'
import { hasIntersection } from '../util'
import { getRoles } from '../shared'

type Props = {
    useIn: 'header' | 'navigation',
    closeNavbar?: () => void
}

type LinkData = {
    to: string,
    label: string,
    roles?: Role[]
}

const linkData: LinkData[] = [
    { to: 'cards', label: 'Cards' },
    { to: 'favorites', label: 'Favorites', roles: ['user'] },
    { to: 'my-cards', label: 'My cards', roles: ['business', 'admin'] },
    { to: 'control-panel', label: 'Control panel', roles: ['admin'] },
    { to: 'about', label: 'About' }
]

const NavParts = ({ useIn, closeNavbar }: Props) => {
    const user = useRouteLoaderData('root') as User | null
    const userRoles = getRoles(user)

    const { setColorScheme } = useMantineColorScheme()
    const colorScheme = useComputedColorScheme()

    const [direction, visibleFrom, gap] =
        useIn === 'header' ?
            ['row' as const, 'sm', 20] :
            ['column' as const, undefined, 10]

    const linksFlex = (
        <Flex direction={direction} visibleFrom={visibleFrom} gap={gap}>
            {
                linkData
                    .filter(({ roles }) => !roles || hasIntersection(userRoles, roles))
                    .map(x => (
                        <Anchor key={x.to} onClick={closeNavbar} renderRoot={({ ...others }) => (
                            <Link to={`/${x.to}`} key={x.to} {...others}>{x.label}</Link>
                        )} />
                    ))
            }
        </Flex>
    )

    return (
        <>
            {
                useIn === 'header' ? linksFlex : <AppShell.Section grow>{linksFlex}</AppShell.Section>
            }
            <Group gap={5} visibleFrom={visibleFrom}>
                {/* user buttons:
                    if user, show Profile and Logout links
                    if guest, show Login and Register links
                 */}
                Hello, {user?.name.first ?? 'Guest'}
                <ActionIcon onClick={() => setColorScheme(colorScheme == 'light' ? 'dark' : 'light')} variant="default">
                    {colorScheme === 'dark' ? <TbSun /> : <TbMoon />}
                </ActionIcon>
                <LangSelector />
            </Group>
        </>
    )
}

export default NavParts
