// https://documenter.getpostman.com/view/25008645/2s9YXcd5BL#132ad6a5-c6ad-473d-9ffb-08da85901234

type MongoRecord = {
    _id: string
}

type Image = MongoRecord & {
    url: string,
    alt: string
}

type Address = MongoRecord & {
    state: string,
    country: string,
    city: string,
    street: string,
    houseNumber: number,
    zip: number
}

export type User = MongoRecord & {
    name: {
        first: string,
        middle?: string,
        last: string
    },
    phone: string,
    email: string,
    image: Image,
    address: Address,
    isBusiness: boolean,
    isAdmin: boolean
}

export type Card = MongoRecord & {
    title: string,
    subtitle: string,
    description: string,
    phone: string,
    email: string,
    web: string,
    image: Image,
    address: Address,
    bizNumber: number,
    likes: string[],
    user_id: string,
    createdAt: string
}

export type Role = 'admin' | 'business' | 'user'
