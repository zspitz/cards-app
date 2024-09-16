// https://documenter.getpostman.com/view/25008645/2s9YXcd5BL

import { z } from 'zod'
import * as helperSchemas from './helpers'

export const userPut =
    z.object({
        name: z.object({
            first: z.string().min(2).max(256),
            middle: z.string().min(2).max(256).optional(),
            last: z.string().min(2).max(256)
        }),
        phone: helperSchemas.phone,
        image: helperSchemas.image,
        address: helperSchemas.address
    })

export const userPost = z.intersection(
    userPut,
    z.object({
        email: helperSchemas.email,
        password: z.string().min(7).max(20),
        isBusiness: z.boolean(),
        isAdmin: z.boolean()
    })
)
