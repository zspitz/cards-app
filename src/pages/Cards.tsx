import { NavLink, useLoaderData, useLocation } from 'react-router'
import { MasonryScroller, useContainerPosition, usePositioner, useResizeObserver } from 'masonic'
import MasonryCard from '../components/cards/MasonryCard'
import { Affix, Button, useMatches } from '@mantine/core'
import { TbPlus } from 'react-icons/tb'
import { useLang } from '../context/lang/useLang'
import type { CachedCardResponse, Role } from '../types'
import { useRoles } from '../hooks/useRoles'
import { useRef } from 'react'
import { useWindowSize } from '@react-hook/window-size'

const cardCreateRoles: Role[] = ['admin', 'business']

const Cards = () => {
    const { hasRole } = useRoles()
    const { t } = useLang()
    const { pathname } = useLocation()

    const cards = useLoaderData<CachedCardResponse[]>()

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

    // We only want to use positioner when the collection has gotten smaller, because it causes a flicker
    // https://github.com/jaredLunde/masonic/issues/12#issuecomment-1710000167
    const lengthRef = useRef<number>(0)

    const containerRef = useRef(null)
    const [windowWidth, windowHeight] = useWindowSize()
    const { offset, width } = useContainerPosition(containerRef, [
        windowWidth,
        windowHeight
    ])
    const positioner = usePositioner(
        { width, columnWidth, columnGutter },
        [cards.length < lengthRef.current]
    )
    const resizeObserver = useResizeObserver(positioner)

    lengthRef.current = cards.length

    return (
        <>
            <MasonryScroller
                positioner={positioner}
                resizeObserver={resizeObserver}
                containerRef={containerRef}
                items={cards}
                height={windowHeight}
                offset={offset}
                overscanBy={6}
                render={MasonryCard}
                key={pathname}
            />
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
