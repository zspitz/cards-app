// https://documenter.getpostman.com/view/25008645/2s9YXcd5BE#8260952d-ab30-417b-b5e7-f8075db5b37d

import { z } from 'zod'
import * as helperSchemas from './helpers'

export const cardPost =
    z.object({
        title: z.string().min(2).max(256),
        subtitle: z.string().min(2).max(256),
        description: z.string().min(2).max(1024),
        phone: helperSchemas.phone,
        email: helperSchemas.email,
        web: z.string().min(14).url().optional(),
        image: helperSchemas.image,
        address: helperSchemas.address,
        bizNumber: z.number().optional(),
        user_id: z.string().optional()
    })
