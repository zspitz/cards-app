import { z } from 'zod'
import { card as cardSchema } from './schemas/card'
import { user as userSchema } from './schemas/user'

export type Role = 'admin' | 'business' | 'user' | 'guest'

export type User = z.infer<typeof userSchema>
export type UserResponse = MongoRecord<User> & {
    isAdmin: boolean
}
export type Card = z.infer<typeof cardSchema>
export type MongoRecord<T> = {
    _id: string
} & T

export const isMongoRecord = <T>(arg: T | MongoRecord<T>) =>
    typeof ((arg as MongoRecord<T>)._id) === 'string'
