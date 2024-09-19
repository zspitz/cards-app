import { NavLink, useLoaderData, useLocation, useRouteLoaderData } from 'react-router-dom'
import { CardsLoaderReturnData } from '../loadersActions'
import { Masonry } from 'masonic'
import MasonryCard from '../components/cards/MasonryCard'
import { Affix, Button, useMatches } from '@mantine/core'
import { TbPlus } from 'react-icons/tb'
import { useLang } from '../context/lang/useLang'
import { CachedCardResponse, Role } from '../types'
import { useRoles } from '../hooks/useRoles'

const cardCreateRoles: Role[] = ['admin', 'business']

const Cards = () => {
    const { hasRole } = useRoles()
    const { t } = useLang()
    const { pathname } = useLocation()

    const loaderData = useLoaderData()
    const cardsLoaderData = useRouteLoaderData('cards')
    const cards = (loaderData ?? cardsLoaderData) as CardsLoaderReturnData

    const columnWidth = useMatches({
        base: 200,
        sm: 300
    })
    const columnGutter = useMatches({
        base: 0,
        sm: 5
    })

    cards.sort((a, b) => (
        a.sortOrder < b.sortOrder ? -1 :
            a.sortOrder > b.sortOrder ? 1 :
                0
    ))

    return (
        <>
            <Masonry items={[...cards]} render={MasonryCard} key={pathname}
                columnWidth={columnWidth} columnGutter={columnGutter}
                itemKey={(data, index) => (data as CachedCardResponse | undefined)?._id ?? index} />
            {
                hasRole(...cardCreateRoles) &&
                <Affix position={{ top: 80, right: 20 }}>
                    <Button size="lg" leftSection={<TbPlus />} component={NavLink} to="/cards/create">{t('Create card')}</Button>
                </Affix>
            }
        </>
    )
}

export default Cards
