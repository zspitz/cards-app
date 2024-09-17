import { CachedCardResponse, CardResponse } from '../types'
import { cardsFetchArgs } from './http/cards'

let cards: CachedCardResponse[] | undefined

const attachSortNumber = (card: CardResponse, sortOrder?: number): CachedCardResponse => {
    const card1 = card as CachedCardResponse
    card1.sortOrder = sortOrder ?? Math.random()
    return card1
}

const getCards = async () => {
    if (cards === undefined) {
        const { url, init } = cardsFetchArgs()
        const res = await fetch(url, init ?? undefined)
        cards = (
            (
                await res.json()
            ) as CardResponse[]
        ).map(x => attachSortNumber(x))
    }
    return cards
}

const upsertCard = async (card: CardResponse) => {
    let found = false as boolean // https://typescript-eslint.io/rules/no-unnecessary-condition/#when-not-to-use-it

    cards = (
        await getCards()
    ).map(x => {
        if (x._id !== card._id) { return x }
        found = true
        return attachSortNumber(card, x.sortOrder)
    })

    if (!found) {
        cards.push(attachSortNumber(card))
    }
}

export {
    getCards,
    upsertCard
}
