import { Anchor, AppShell, Flex, Group } from '@mantine/core'
import { Link, useRouteLoaderData } from 'react-router-dom'
import LangSelector from './LangSelector'
import { Role, User } from '../http/types'
import { hasIntersection } from '../util'
import { getRoles } from '../shared'
import ThemeSelector from './ThemeSelector'

type Props = {
    useIn: 'header' | 'navigation',
    closeNavbar?: () => void
}

type LinkData = {
    to: string,
    label: string,
    roles?: Role[]
}

const linkData1: LinkData[] = [
    { to: 'cards', label: 'Cards' },
    { to: 'favorites', label: 'Favorites', roles: [] },
    { to: 'my-cards', label: 'My cards', roles: ['business', 'admin'] },
    { to: 'control-panel', label: 'Control panel', roles: ['admin'] },
    { to: 'about', label: 'About' }
]

const linkData2: LinkData[] = [
    { to: 'profile', label: 'Profile', roles: ['user'] },
    { to: 'logout', label: 'Log out', roles: ['user'] },
    { to: 'register', label: 'Register', roles: ['guest'] },
    { to: 'login', label: 'Log in', roles: ['guest'] }
]

const NavParts = ({ useIn, closeNavbar }: Props) => {
    const user = useRouteLoaderData('root') as User | null
    const userRoles = getRoles(user)

    const linkBuilder = (linkData: LinkData[]) =>
        linkData
            .filter(({ roles }) => !roles || hasIntersection(roles, userRoles))
            .map(({ to, label }: LinkData) => (
                <Anchor key={to} onClick={closeNavbar} renderRoot={({ ...others }) => (
                    <Link to={`/${to}`} key={to} {...others}>{label}</Link>
                )} />
            ))

    const links1 = linkBuilder(linkData1)
    const links2 = linkBuilder(linkData2)
    const selectors = (
        <>
            <ThemeSelector />
            <LangSelector />
        </>
    )

    if (useIn === 'header') {
        return (
            <>
                <Flex direction="row" visibleFrom="sm" gap={20}>
                    {links1}
                </Flex>
                <Group gap={15} visibleFrom="sm">
                    {links2}
                    {selectors}
                </Group>
            </>
        )
    }

    return (
        <>
            <AppShell.Section grow>
                <Flex direction="column" gap={10}>
                    {links1}
                </Flex>
            </AppShell.Section>
            <AppShell.Section>
                <Flex direction="column" gap={10}>
                    {links2}
                    <Group gap={5}>
                        <ThemeSelector />
                        <LangSelector />
                    </Group>
                </Flex>
            </AppShell.Section>
        </>
    )
}

export default NavParts
