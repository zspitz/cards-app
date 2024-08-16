import { z, ZodTypeAny } from 'zod'

export const mongoSchema = <TSchema extends ZodTypeAny>(schema: TSchema) => z.intersection(
    z.object({
        _id: z.string()
    }),
    schema
)

export type MongoRecord<T> = {
    _id: string
} & T

export const image =
    z.object({
        url: z.string().url().min(14).optional(),
        alt: z.string().min(2).max(256).optional()
    })

export const address =
    z.object({
        street: z.string().min(2).max(256),
        houseNumber: z.number().int().min(2).max(256),
        city: z.string().min(2).max(256),
        state: z.string().min(2).max(256).optional(),
        country: z.string().min(2).max(256),
        zip: z.number().int().min(2).max(256)
    })
