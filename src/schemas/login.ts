import { z } from 'zod'
import * as helperSchemas from './helpers'

export const login =
    z.object({
        email: helperSchemas.email,
        password: z.string().min(1)
    })
