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

const linkData: LinkData[] = [
    { to: 'cards', label: 'Cards' },
    { to: 'favorites', label: 'Favorites', roles: ['user'] },
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

    const [direction, visibleFrom, gap] =
        useIn === 'header' ?
            ['row' as const, 'sm', 20] :
            ['column' as const, undefined, 10]

    const linksFlex = (
        <Flex direction={direction} visibleFrom={visibleFrom} gap={gap}>
            {
                linkData
                    .filter(({ roles }) => !roles || hasIntersection(userRoles, roles))
                    .map(({ to, label }) => (
                        <Anchor key={to} onClick={closeNavbar} renderRoot={({ ...others }) => (
                            <Link to={`/${to}`} key={to} {...others}>{label}</Link>
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
                <ThemeSelector />
                <LangSelector />
            </Group>
        </>
    )
}

export default NavParts
