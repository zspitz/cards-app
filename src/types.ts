import { z } from 'zod'
import { cardPost as cardPostSchema } from './schemas/card'
import { userPost as userPostSchema, userPut as userPutSchema } from './schemas/user'
import { login as loginSchema } from './schemas/login'

export type Role = 'admin' | 'business' | 'user' | 'guest'

// schema-inferred types
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
    bizNumber: number
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
