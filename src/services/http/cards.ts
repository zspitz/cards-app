import { FetchArgs } from '../../types'
import { baseUrl, getInit } from './shared'

export const cardsFetchArgs = (): FetchArgs =>
({
    url: `${baseUrl}/cards`,
    init: getInit(false)
})
