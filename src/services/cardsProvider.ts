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
        cards =
            ((await res.json()) as CardResponse[])
                .map(x => attachSortNumber(x))

        if (import.meta.env.DEV) {
            // Work around server url validations, which don't allow localhost or specifying the port
            // This allows image URLs to be stored in the public folder and exposed by the Vite dev server
            cards.forEach(card =>
                card.image.url = card.image.url?.replace(
                    'http://localhost.com',
                    ''
                ))
        }
    }
    return cards
}

const upsertCard = async (card: CardResponse) => {
    let found = false as boolean // https://typescript-eslint.io/rules/no-unnecessary-condition/#when-not-to-use-it

    cards =
        (await getCards())
            .map(x => {
                if (x._id !== card._id) { return x }
                found = true
                return attachSortNumber(card, x.sortOrder)
            })

    if (!found) {
        cards.push(attachSortNumber(card))
    }
}

const deleteCard = async (card: CardResponse) => {
    cards =
        (await getCards())
            .filter(x => x._id !== card._id)
}

export {
    getCards,
    upsertCard,
    deleteCard
}
