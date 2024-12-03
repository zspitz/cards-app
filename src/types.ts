import type { z } from 'zod'
import type { cardPost as cardPostSchema } from './schemas/card'
import type { userPost as userPostSchema, userPut as userPutSchema } from './schemas/user'
import type { login as loginSchema } from './schemas/login'
import type { image as imageSchema, address as addressSchema } from './schemas/helpers'

export type Role = 'admin' | 'business' | 'user' | 'guest'

export type UserPost = z.infer<typeof userPostSchema>
export type UserPut = z.infer<typeof userPutSchema>

export type UserResponse = MongoRecord<Omit<UserPost, 'password'>> & {
    isAdmin: boolean
}
export type Login = z.infer<typeof loginSchema>
export type RegisterResponse = {
    _id: string,
    name: {
        first: string,
        middle: string,
        last: string
    },
    email: string
}

export type CardPost = z.infer<typeof cardPostSchema>
export type CardResponse = MongoRecord<CardPost> & {
    bizNumber: number,
    user_id: string,
    likes: string[]
}
export type CachedCardResponse = CardResponse & {
    sortOrder: number
}

export type MongoRecord<T> = {
    _id: string
} & T

export const isMongoRecord = <T = object>(arg: T | MongoRecord<T>): arg is MongoRecord<T> =>
    typeof ((arg as MongoRecord<T>)._id) === 'string'

export type FetchArgs = {
    url: string,
    init: RequestInit | null
}

export type Address = z.infer<typeof addressSchema>

export type ImageAddressValues = {
    image: z.infer<typeof imageSchema>,
    address: Address
}

export type HasContactDetails = CardResponse | UserResponse
