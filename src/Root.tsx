import { Affix, AffixProps, AppShell, Burger, DirectionProvider, Group, Image, MantineProvider } from '@mantine/core'
import { useLang } from './context/lang/useLang'
import { useDisclosure } from '@mantine/hooks'
import logo from '/logo.png'
import { Link, Outlet } from 'react-router-dom'
import NavParts from './components/NavParts'

const Root = () => {
    const { dir } = useLang()
    const [opened, { toggle }] = useDisclosure()

    const burgerPosition: AffixProps['position'] = {
        top: 10,
        right: 10
    }

    return (
        <DirectionProvider initialDirection={dir}>
            <MantineProvider>
                <>

                    <AppShell
                        header={{
                            height: 60
                        }}
                        navbar={{
                            width: 300,
                            breakpoint: 'sm',
                            collapsed: {
                                desktop: true,
                                mobile: !opened
                            }
                        }}
                        padding="md"
                    >
                        <AppShell.Header>
                            <Group justify='space-between' h="100%" p="sm">
                                <Link to="/">
                                    <Image src={logo} h={30} w="auto" />
                                </Link>

                                <NavParts useIn='header' />
                            </Group>
                        </AppShell.Header>

                        <AppShell.Navbar p="md">
                            <NavParts useIn='navigation' />
                        </AppShell.Navbar>

                        <AppShell.Main>
                            <Outlet />
                        </AppShell.Main>
                    </AppShell>
                    <Affix position={burgerPosition} hiddenFrom="sm">
                        <Burger opened={opened} onClick={toggle} size="sm" />
                    </Affix>
                </>

            </MantineProvider>
        </DirectionProvider>
    )
}

export default Root