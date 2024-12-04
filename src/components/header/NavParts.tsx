import { Anchor, AppShell, Flex, Group } from '@mantine/core'
import { Link, useFetcher } from 'react-router'
import LangSelector from './LangSelector'
import { Role } from '../../types'
import ThemeSelector from './ThemeSelector'
import { useLang } from '../../context/lang/useLang'
import { useRoles } from '../../hooks/useRoles'

type Props = {
    useIn: 'header' | 'navigation',
    closeNavbar?: () => void
}

type LinkData = {
    to: string,
    label: string,
    roles?: Role[]
}

const baseLinks: LinkData[] = [
    { to: 'cards', label: 'Cards' },
    { to: 'cards/favorites', label: 'Favorites', roles: ['user'] },
    { to: 'cards/my', label: 'My cards', roles: ['business', 'admin'] },
    { to: 'control-panel', label: 'Control panel', roles: ['admin'] },
    { to: 'about', label: 'About' }
]

const guestLinks: LinkData[] = [
    { to: 'register', label: 'Register', roles: ['guest'] },
    { to: 'login', label: 'Log in', roles: ['guest'] }
]

const NavParts = ({ useIn, closeNavbar }: Props) => {
    const { t } = useLang()

    const fetcher = useFetcher()

    const { hasRole } = useRoles()

    const linkDataMapper = ({ to, label }: LinkData) => (
        <Anchor key={to} onClick={closeNavbar} renderRoot={({ ...others }) => (
            <Link to={`/${to}`} key={to} {...others}>{t(label)}</Link>
        )} />
    )

    const links1 =
        baseLinks
            .filter(({ roles }) => !roles || hasRole(...roles))
            .map(linkDataMapper)

    // When not logged in, the second group of links is just navigation to some page
    // But when current user is a user, logout isn't a simple navigation but rather an internal POST
    // For react-router, this requires fetcher.Form and a submit button
    const links2 =
        hasRole('user') ?
            <>
                {linkDataMapper({ to: 'profile', label: 'Profile' })}
                <fetcher.Form method="post" action="/logout">
                    <Anchor onClick={closeNavbar} renderRoot={({ ...others }) => (
                        <button type="submit" {...others}>{t('Log out')}</button>
                    )} />
                </fetcher.Form>
            </> :
            guestLinks.map(linkDataMapper)

    const selectors = (
        <>
            <ThemeSelector />
            <LangSelector />
        </>
    )

    if (useIn === 'header') {
        return (
            <>
                <Flex direction="row" visibleFrom="sm" gap={12}>
                    {links1}
                </Flex>
                <Group gap={10} visibleFrom="sm">
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
