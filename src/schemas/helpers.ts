import { z } from 'zod'

export const refineNumberLength = (min: number | undefined, max?: number) =>
    (val: number) => {
        const length = `${val}`.length
        return (
            !min || length >= min
        ) && (
                !max || length <= max
            )
    }

export const image =
    z.object({
        url: z.string().url().min(14).optional(),
        alt: z.string().min(2).max(256).optional()
    })

export const address =
    z.object({
        street: z.string().min(2).max(256),
        houseNumber: z.number().int().refine(refineNumberLength(1), 'House number has to be at least one digit.'),
        city: z.string().min(2).max(256),
        state: z.string().min(2).max(256).optional(),
        country: z.string().min(2).max(256),
        zip: z.number().refine(refineNumberLength(4), 'Postal code has to be at least four digits.')
    })

export const email = z.string().email().min(5)
