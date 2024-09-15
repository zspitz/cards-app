import { useLoaderData } from 'react-router-dom'
import { CardsLoaderReturnData } from '../loadersActions'
import { Masonry } from 'masonic'
import MasonryCard from '../components/cards/MasonryCard'
import { Affix, Button, useMatches } from '@mantine/core'
import { TbPlus } from 'react-icons/tb'
import { useLang } from '../context/lang/useLang'
import { Role } from '../types'
import { useRoles } from '../hooks/useRoles'

const cardCreateRoles: Role[] = ['admin', 'business']

const Cards = () => {
    const { hasRole } = useRoles()

    const { t } = useLang()
    const cards = useLoaderData() as CardsLoaderReturnData
    const columnWidth = useMatches({
        base: 200,
        sm: 300
    })
    const columnGutter = useMatches({
        base: 0,
        sm: 5
    })

    return (
        <>
            <Masonry items={cards} render={MasonryCard} columnWidth={columnWidth} columnGutter={columnGutter} />
            {
                hasRole(...cardCreateRoles) &&
                <Affix position={{ top: 80, right: 20 }}>
                    <Button size="lg" leftSection={<TbPlus />}>{t('Create card')}</Button>
                </Affix>
            }
        </>
    )
}

export default Cards
