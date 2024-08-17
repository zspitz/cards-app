// https://documenter.getpostman.com/view/25008645/2s9YXcd5BE#8260952d-ab30-417b-b5e7-f8075db5b37d

import { z } from 'zod'
import * as helperSchemas from './helpers'

export const card =
    z.object({
        title: z.string().min(2).max(256),
        subtitle: z.string().min(2).max(256),
        description: z.string().min(2).max(1024),
        phone: z.string().min(9).max(11),
        email: z.string().email().min(5),
        web: z.string().min(14).url().optional(),
        image: helperSchemas.image,
        address: helperSchemas.address
    })
