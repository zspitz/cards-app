import { CardPost, FetchArgs } from '../../types'
import { baseUrl, getInit } from './shared'

export const cardsFetchArgs = (): FetchArgs =>
({
    url: `${baseUrl}/cards`,
    init: getInit(false)
})

export const createCardFetchArgs = (card: CardPost): FetchArgs =>
({
    url: `${baseUrl}/cards`,
    init: getInit(true, card, 'post')
})

export const toggleLikedFetchArgs = (cardId: string): FetchArgs =>
({
    url: `${baseUrl}/cards/${cardId}`,
    init: getInit(true, undefined, 'patch')
})
